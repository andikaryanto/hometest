<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('product_categories')->insert([
            'shop_id' => 1,
            'name' => 'upper',
            'description' => 'upper'
        ]);        
        
        DB::table('product_categories')->insert([
            'shop_id' => 1,
            'name' => 'bottom',
            'description' => 'bottom'
        ]);
        
        DB::table('product_categories')->insert([
            'shop_id' => 2,
            'name' => 'bottom',
            'description' => 'bottom'
        ]);
    }
}
