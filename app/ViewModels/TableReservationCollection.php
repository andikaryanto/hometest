<?php

namespace App\ViewModels;

use App\Models\TableReservation;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\ViewModels\PaggedCollection;

class TableReservationCollection extends PaggedCollection
{
    /**
     * @inheritdoc
     */
    public function shape(Model $model): ?TableReservationViewModel
    {
        if ($model instanceof TableReservation) {
            return new TableReservationViewModel($model, $this->request);
        }
    }
}
