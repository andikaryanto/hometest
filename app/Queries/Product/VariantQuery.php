<?php

namespace App\Queries\Product;

use App\Models\Product;
use App\Models\Product\Variant;
use App\ViewModels\Product\VariantCollection;
use LaravelCommon\App\Queries\Query;

class VariantQuery extends Query
{
    public function identityClass(): string
    {
        return Variant::class;
    }

    public function collectionClass()
    {
        return VariantCollection::class;
    }

    public function whereProduct(Product $product): VariantQuery
    {
        $alias = $this->getTable();
        $this->where("$alias.product_id", '=', $product->getId());
        return $this;
    }
}
