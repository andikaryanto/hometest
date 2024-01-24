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
        Schema::create('table_reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('table_id')->nullable(false);
            $table->dateTime('reserve_at')->nullable(false);
            $table->unsignedBigInteger('user_id')->nullable(false);
            $table->boolean('is_complete')->nullable(false)->default(true);
            $table->timestamps();            

            $table->foreign('table_id')
                ->references('id')->on('tables')->onDelete('cascade');           

            $table->foreign('user_id')
                ->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_reservations');
    }
};
