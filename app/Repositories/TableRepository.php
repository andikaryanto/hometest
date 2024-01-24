<?php

namespace App\Repositories;

use App\Models\Table;
use App\Repositories\TableRepositoryInterface;
use App\ViewModels\TableCollection;
use App\ViewModels\TableViewModel;
use Exception;
use LaravelCommon\App\Repositories\Repository;
use LaravelCommon\Exceptions\EntityException;
use LaravelOrm\Interfaces\IEntity;

class TableRepository extends Repository
{
    /**
    * Constrcutor
    */
    public function __construct()
    {
        parent::__construct(Table::class);
    }

    /**
     * @inheritDoc
     *
     * @return string
     */
    public function collectionClass(): string
    {
        return TableCollection::class;
    }

    /**
     * @inheritDoc
     *
     * @return stirng
     */
    public function viewModelClass(): string
    {
        return TableViewModel::class;
    }
}
