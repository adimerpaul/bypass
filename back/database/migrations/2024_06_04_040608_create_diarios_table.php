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
            $table->unsignedBigInteger('category_insumo_id');
            $table->foreign('category_insumo_id')->references('id')->on('category_insumos');
            $table->decimal('inicio',8,3);
            $table->decimal('ingreso',8,3);
            $table->decimal('egreso',8,3);
            $table->decimal('ventas',8,3);
            $table->decimal('cierre',8,3);
            $table->decimal('local',8,3);
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
