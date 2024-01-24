<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('tables')->insert([
            'name' => 'Table 1',
            'is_reserved' => true
        ], [
            'name' => 'Table 2',
            'is_reserved' => false
        ]);
    }
}
