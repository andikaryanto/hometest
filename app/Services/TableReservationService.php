<?php

namespace App\Services;

use App\Models\TableReservation;
use App\Repositories\TableRepository;
use Exception;
use LaravelCommon\Utilities\Database\UnitOfWork;

class TableReservationService
{
    protected TableRepository $tableRepository;
    protected UnitOfWork $unitOfWork;
    public function __construct(TableRepository $tableRepository, UnitOfWork $unitOfWork)
    {
        $this->tableRepository = $tableRepository;
        $this->unitOfWork = $unitOfWork;
    }

    public function createReservation(TableReservation $tableReservation)
    {
        // we make sure we fetched table data from database,
        // so we can make sure, if it's reserved or not
        $fetchedTable = $this->tableRepository->find($tableReservation->getTablee()->getId());
        if ($fetchedTable->getIsReserved()) {
            throw new Exception("Table has been reserved by someone else");
        }

        $table = $tableReservation->getTablee();
        $table->setIsReserved(true);
        $this->unitOfWork->persist($table);
        $this->unitOfWork->persist($tableReservation);
    }
}
