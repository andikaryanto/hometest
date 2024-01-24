<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        //
        Schema::table('sequence_numbers', function (Blueprint $table) {
            $table->string('name')->nullable();
            $table->integer('length')->nullable();
            $table->boolean('is_include_zero')->nullable()->default(true);
            $table->boolean('reset_per_date')->nullable()->default(true);
            $table->boolean('reset_per_month')->nullable()->default(true);
            $table->boolean('reset_per_year')->nullable()->default(true);
            $table->integer('last_number')->nullable(false)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('sequence_numbers', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('length');
            $table->dropColumn('is_include_zero');
            $table->dropColumn('reset_per_date');
            $table->dropColumn('reset_per_month');
            $table->dropColumn('reset_per_year');
            $table->dropColumn('last_number');
        });
    }
};
