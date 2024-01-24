<?php

namespace App\Queries;

use App\Models\Warehouse;
use App\ViewModels\WarehouseCollection;
use LaravelCommon\App\Queries\Query;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Query\Processors\Processor;
use Illuminate\Database\Query\Grammars\Grammar;

class WarehouseQuery extends Query
{
    public function identityClass(): string
    {
        return Warehouse::class;
    }

    public function collectionClass()
    {
        return WarehouseCollection::class;
    }
}
