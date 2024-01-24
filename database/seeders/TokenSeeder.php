<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_tokens')->insert([
            'token' => 'ABC',
            'user_id' => 1,
            'expired_at' => '2023-11-11 11:11:11'
        ]);
        
        DB::table('user_tokens')->insert([
            'token' => 'ABD',
            'user_id' => 1,
            'expired_at' => '2024-11-11 11:11:11'
        ]);
    }
}
