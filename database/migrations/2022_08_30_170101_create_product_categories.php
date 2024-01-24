<?php

use Illuminate\Database\Migrations\Migration;
use LaravelCommon\System\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->auditable();
            $table->timestamps();


            $table->foreign('shop_id')
                ->references('id')->on('shops')->onDelete('cascade');

            $table->unique(['name', 'shop_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_categories');
    }
}
