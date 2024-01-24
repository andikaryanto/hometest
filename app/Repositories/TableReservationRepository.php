<?php

namespace App\Repositories;

use App\Models\TableReservation;
use App\Repositories\TableReservationRepositoryInterface;
use App\ViewModels\TableReservationCollection;
use App\ViewModels\TableReservationViewModel;
use Exception;
use LaravelCommon\App\Repositories\Repository;
use LaravelCommon\Exceptions\EntityException;
use LaravelOrm\Interfaces\IEntity;

class TableReservationRepository extends Repository
{
    /**
    * Constrcutor
    */
    public function __construct()
    {
        parent::__construct(TableReservation::class);
    }

    /**
     * @inheritDoc
     *
     * @return string
     */
    public function collectionClass(): string
    {
        return TableReservationCollection::class;
    }

    /**
     * @inheritDoc
     *
     * @return stirng
     */
    public function viewModelClass(): string
    {
        return TableReservationViewModel::class;
    }
}
