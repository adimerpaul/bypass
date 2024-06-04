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
        Schema::create('insumo_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('insumo_id');
            $table->foreign('insumo_id')->references('id')->on('insumos');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->decimal('quantity', 8, 2);
            $table->string('status')->default('ACTIVE');
            $table->unique(['insumo_id', 'product_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insumo_products');
    }
};
