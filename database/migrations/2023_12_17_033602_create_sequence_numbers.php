<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use LaravelCommon\System\Database\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sequence_numbers', function (Blueprint $table) {
            $table->id();
            $table->integer('form')->nullable(false);
            $table->integer('year')->nullable(false);
            $table->integer('month')->nullable(false);
            $table->integer('date')->nullable(false);
            $table->string('format')->nullable(false);
            $table->integer('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sequence_numbers');
    }
};
