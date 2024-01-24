<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            'groupuser_id' => 1,
            'username' => 'superadmin',
            'email' => 'johnsuperadmin@mail.com',
            'password' => 'password',
            'created_at' => '2023-10-10 10:10:10'
        ]);
        
        DB::table('users')->insert([
            'groupuser_id' => 2,
            'username' => 'partner',
            'email' => 'johnaspartner@mail.com',
            'password' => 'password',
            'created_at' => '2023-11-10 10:10:10'
        ]);
    }
}
