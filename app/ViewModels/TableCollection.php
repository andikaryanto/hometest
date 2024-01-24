<?php

namespace App\ViewModels;

use App\Models\Table;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\ViewModels\PaggedCollection;

class TableCollection extends PaggedCollection
{
    /**
     * @inheritdoc
     */
    public function shape(Model $model): ?TableViewModel
    {
        if ($model instanceof Table) {
            return new TableViewModel($model, $this->request);
        }
    }
}
