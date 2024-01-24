<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use LaravelCommon\System\Database\Schema\Blueprint;

class CreateProductProductCategoryMappings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_product_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_category_id');
            $table->auditable();
            $table->timestamps();

            $table->foreign('product_id', 'product_id_product_category_id')
                ->references('id')->on('products')->onDelete('cascade');

            $table->foreign('product_category_id', 'product_id_product_category_id_2')
                ->references('id')->on('product_categories');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_product_categories');
    }
}
