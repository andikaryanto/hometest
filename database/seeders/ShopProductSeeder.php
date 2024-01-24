<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('products')->insert([
            'shop_id' => 1,
            'name' => 'sky',
            'description' => 'sky',
            'rating' => 1,
            'is_active' => true,
            'is_deleted' => false,
            'must_show' => true,
            'weight' => 1,
            'height' => 1,
            'width' => 1,
            'length' => 0
        ]);        
        
        DB::table('products')->insert([
            'shop_id' => 1,
            'name' => 'horizon',
            'description' => 'horizon',
            'rating' => 1,
            'is_active' => false,
            'is_deleted' => true,
            'must_show' => true,
            'weight' => 1,
            'height' => 1,
            'width' => 1,
            'length' => 0
        ]);
        
        DB::table('products')->insert([
            'shop_id' => 2,
            'name' => 'cut',
            'description' => 'cut',
            'rating' => 1,
            'is_active' => true,
            'is_deleted' => false,
            'must_show' => true,
            'weight' => 1,
            'height' => 1,
            'width' => 1,
            'length' => 0
        ]);
    }
}
