<?php

namespace App\Queries;

use App\Models\Table;
use App\ViewModels\TableCollection;
use LaravelCommon\App\Queries\Query;

class TableQuery extends Query
{
    public function identityClass(): string
    {
        return Table::class;
    }

    public function collectionClass()
    {
        return TableCollection::class;
    }
}
