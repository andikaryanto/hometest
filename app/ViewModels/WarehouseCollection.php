<?php

namespace App\ViewModels;

use App\Models\Warehouse;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\ViewModels\PaggedCollection;

class WarehouseCollection extends PaggedCollection
{
    /**
     * @inheritdoc
     */
    public function shape(Model $model): ?WarehouseViewModel
    {
        if ($model instanceof Warehouse) {
            return new WarehouseViewModel($model, $this->request);
        }
    }
}
