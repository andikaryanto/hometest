<?php

namespace App\Queries;

use App\Models\TableReservation;
use App\ViewModels\TableReservationCollection;
use LaravelCommon\App\Queries\Query;

class TableReservationQuery extends Query
{
    public function identityClass(): string
    {
        return TableReservation::class;
    }

    public function collectionClass()
    {
        return TableReservationCollection::class;
    }
}
