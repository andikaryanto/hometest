<?php

namespace App\Repositories;

use App\Models\Warehouse;
use App\Repositories\WarehouseRepositoryInterface;
use App\ViewModels\WarehouseCollection;
use App\ViewModels\WarehouseViewModel;
use Exception;
use LaravelCommon\App\Repositories\Repository;
use LaravelCommon\Exceptions\EntityException;
use LaravelOrm\Interfaces\IEntity;

class WarehouseRepository extends Repository
{
    /**
    * Constrcutor
    */
    public function __construct()
    {
        parent::__construct(Warehouse::class);
    }

    /**
     * @inheritDoc
     *
     * @return string
     */
    public function collectionClass(): string
    {
        return WarehouseCollection::class;
    }

    /**
     * @inheritDoc
     *
     * @return stirng
     */
    public function viewModelClass(): string
    {
        return WarehouseViewModel::class;
    }
}
