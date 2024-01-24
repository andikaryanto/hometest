<?php

namespace App\ViewModels\Product;

use App\Models\Product\Variant;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\ViewModels\PaggedCollection;

class VariantCollection extends PaggedCollection
{
    /**
     * @inheritdoc
     */
    public function shape(Model $model): VariantViewModel|null
    {
        if ($model instanceof Variant) {
            return new VariantViewModel($model, $this->request);
        }
    }
}
