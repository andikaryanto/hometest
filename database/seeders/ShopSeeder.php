<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('shops')->insert([
            'partner_id' => 1,
            'name' => 'shop1',
            'address' => 'address1',
            'phone' => '098761',
            'personal_information' => 'john1',
            'longitude' => '11.00000',
            'latitude' => '11.00000'
        ]);
        
        DB::table('shops')->insert([
            'partner_id' => 2,
            'name' => 'shop2',
            'address' => 'address2',
            'phone' => '098762',
            'personal_information' => 'john2',
            'longitude' => '12.00000',
            'latitude' => '12.00000'
        ]);
    }
}
