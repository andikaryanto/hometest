<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupuserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('groupusers')->insert([
            'group_name' => 'superadmin'
        ]);
        
        DB::table('groupusers')->insert([
            'group_name' => 'partner'
        ]);
    }
}
