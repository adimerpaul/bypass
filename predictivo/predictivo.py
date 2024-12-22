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

@app.route('/regresion', methods=['POST'])
def regresion_lineal():
    try:
        data = request.get_json()
        fecha_inicio = data.get('fecha_inicio')
        fecha_fin = data.get('fecha_fin')

        if not fecha_inicio or not fecha_fin:
            return jsonify({"error": "Se requieren las fechas 'fecha_inicio' y 'fecha_fin'"}), 400

        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )

        query = f"""
            SELECT date, SUM(total) as total_ventas
            FROM sales
            WHERE date BETWEEN '{fecha_inicio}' AND '{fecha_fin}'
            GROUP BY date
            ORDER BY date;
        """
        df = pd.read_sql(query, connection)

        # Asegurarse de que la columna 'date' sea de tipo datetime
        df['date'] = pd.to_datetime(df['date'])

        # Agrupar por semana (lunes a domingo)
        df['week'] = df['date'].dt.to_period('W').apply(lambda r: r.start_time)
        df_weekly = df.groupby('week').agg(total_ventas=('total_ventas', 'sum')).reset_index()

        # Crear una columna numérica basada en las semanas
        df_weekly['weeks_since_start'] = (df_weekly['week'] - df_weekly['week'].min()).dt.days // 7

        # Dividir datos para la regresión
        X = df_weekly[['weeks_since_start']]
        y = df_weekly['total_ventas']

        # Crear y entrenar el modelo de regresión lineal
        model = LinearRegression()
        model.fit(X, y)

        # Predecir valores
        df_weekly['predicted'] = model.predict(X)

        connection.close()

        result = {
            "coeficiente": model.coef_[0],
            "interseccion": model.intercept_,
            "predicciones": df_weekly.to_dict(orient="records")
        }
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ejecutar el servidor en el puerto 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)
