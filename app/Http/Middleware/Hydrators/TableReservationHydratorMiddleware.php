<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\TableRepository;
use App\Repositories\TableReservationRepository;
use Illuminate\Support\Carbon;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class TableReservationHydratorMiddleware extends HydratorMiddleware
{
    protected TableRepository $tableRepository;

    public function __construct(
        TableReservationRepository $tableReservationRepository,
        TableRepository $tableRepository,
    ) {
        parent::__construct('tableReservation', $tableReservationRepository);
        $this->tableRepository = $tableRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'reserve_at',
            [$this->model, 'setReserveAt'],
            [],
            function ($reserveAt) {
                $reserve = Carbon::createFromFormat('Y-m-d\TH:i', $reserveAt);
                $this->model->setReserveAt($reserve);
            }
        )->when(
            'reserve_for',
            [$this->model, 'setReserveFor']
        )->when(
            'is_complete',
            [$this->model, 'setIsComplete']
        )->when(
            'table.id',
            [$this->model, 'setTablee'],
            [$this->tableRepository, 'find']
        );
    }
}
