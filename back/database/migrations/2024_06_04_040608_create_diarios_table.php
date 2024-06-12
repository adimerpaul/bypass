<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diarios', function (Blueprint $table) {
            $table->id();
            $table->string('item');
            $table->string('medida');
            $table->unsignedBigInteger('insumo_id');
            $table->foreign('insumo_id')->references('id')->on('insumos');
            $table->unsignedBigInteger('category_insumo_id');
            $table->foreign('category_insumo_id')->references('id')->on('category_insumos');
            $table->decimal('inicio',8,2);
            $table->decimal('ingreso',8,2);
            $table->decimal('egreso',8,2);
            $table->decimal('ventas',8,2);
            $table->decimal('cierre',8,2);
            $table->decimal('local',8,2);
            $table->string('status')->default('ACTIVE');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diarios');
    }
};
