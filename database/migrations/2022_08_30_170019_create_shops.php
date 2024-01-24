<?php

use Illuminate\Database\Migrations\Migration;
use LaravelCommon\System\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShops extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('partner_id');
            $table->string('name');
            $table->string('address');
            $table->string('phone')->nullable();
            $table->string('personal_information')->nullable();
            $table->string('longitude');
            $table->string('latitude');
            $table->string('description')->nullable();
            $table->softDelete();
            $table->auditable();
            $table->timestamps();

            $table->foreign('partner_id')
                ->references('id')->on('partners')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
