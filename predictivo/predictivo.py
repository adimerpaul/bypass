from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import pandas as pd
from sklearn.linear_model import LinearRegression
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

def build_weekly_regression(df_dates_totals):
    """
    df_dates_totals: DataFrame con columnas ['date','total_ventas'] (date en datetime64)
    Retorna dict con coef, inter, y registros (históricos + 6 semanas futuras)
    """
    if df_dates_totals.empty:
        return {
            "coeficiente": 0.0,
            "interseccion": 0.0,
            "predicciones": []
        }

    df = df_dates_totals.copy()
    df['date'] = pd.to_datetime(df['date'])
    df['week'] = df['date'].dt.to_period('W').apply(lambda r: r.start_time)
    df_weekly = df.groupby('week').agg(total_ventas=('total_ventas', 'sum')).reset_index()

    # si solo hay 1 semana, evitamos romper la regresión
    if len(df_weekly) == 1:
        df_weekly['weeks_since_start'] = 0
    else:
        df_weekly['weeks_since_start'] = (df_weekly['week'] - df_weekly['week'].min()).dt.days // 7

    X = df_weekly[['weeks_since_start']]
    y = df_weekly['total_ventas']

    model = LinearRegression()
    model.fit(X, y)

    df_weekly['predicted'] = model.predict(X).round(2)

    last_week = df_weekly['week'].max()
    future_weeks = pd.DataFrame({
        'weeks_since_start': range(int(df_weekly['weeks_since_start'].max()) + 1,
                                   int(df_weekly['weeks_since_start'].max()) + 7),
        'week': [last_week + pd.Timedelta(weeks=i) for i in range(1, 7)],
        'total_ventas': [None] * 6
    })
    future_weeks['predicted'] = model.predict(future_weeks[['weeks_since_start']]).round(2)

    df_predictions = pd.concat([df_weekly, future_weeks]).reset_index(drop=True)
    df_predictions['total_ventas'] = df_predictions['total_ventas'].fillna(0)

    return {
        "coeficiente": round(float(model.coef_[0]), 2),
        "interseccion": round(float(model.intercept_), 2),
        "predicciones": df_predictions.to_dict(orient="records")
    }

def get_conn():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

@app.route('/regresion', methods=['POST'])
def regresion_lineal():
    try:
        data = request.get_json()
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        if not fecha_inicio or not fecha_fin:
            return jsonify({"error": "Se requieren 'fecha_inicio' y 'fecha_fin'"}), 400

        conn = get_conn()
        query = f"""
            SELECT date, SUM(total) AS total_ventas
            FROM sales
            WHERE date BETWEEN '{fecha_inicio}' AND '{fecha_fin}'
            GROUP BY date
            ORDER BY date;
        """
        df = pd.read_sql(query, conn)
        conn.close()

        result = build_weekly_regression(df.rename(columns={'date': 'date'}))
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/regresion_producto', methods=['POST'])
def regresion_por_producto():
    """
    Body JSON:
    {
      "fecha_inicio":"YYYY-MM-DD",
      "fecha_fin":"YYYY-MM-DD",
      "product_id": 123
    }
    """
    try:
        data = request.get_json()
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')
        product_id = data.get('product_id')

        if not fecha_inicio or not fecha_fin or not product_id:
            return jsonify({"error": "Se requieren 'fecha_inicio', 'fecha_fin' y 'product_id'"}), 400

        conn = get_conn()

        # === Versión usando details.subtotal (RECOMENDADA si es tu total por ítem) ===
        query = """
            SELECT s.date, SUM(d.subtotal) AS total_ventas
            FROM sales s
            JOIN details d ON d.sale_id = s.id
            WHERE s.date BETWEEN %s AND %s
              AND d.product_id = %s
              AND s.status = 'ACTIVO'
              AND d.status = 'ACTIVO'
              AND s.type = 'INGRESO'
            GROUP BY s.date
            ORDER BY s.date;
        """

        # === Alternativa: si prefieres recalcular por cantidad*precio ===
        # query = """
        #     SELECT s.date, SUM(d.quantity * d.price) AS total_ventas
        #     FROM sales s
        #     JOIN details d ON d.sale_id = s.id
        #     WHERE s.date BETWEEN %s AND %s
        #       AND d.product_id = %s
        #       AND s.status = 'ACTIVO'
        #       AND d.status = 'ACTIVO'
        #       AND s.type = 'INGRESO'
        #     GROUP BY s.date
        #     ORDER BY s.date;
        # """

        df = pd.read_sql(query, conn, params=[fecha_inicio, fecha_fin, int(product_id)])
        conn.close()

        result = build_weekly_regression(df.rename(columns={'date': 'date'}))
        result["product_id"] = product_id
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
