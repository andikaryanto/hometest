<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('partners')->insert([
            'user_id' => 1
        ]);
        
        DB::table('partners')->insert([
            'user_id' => 2
        ]);
    }
}
