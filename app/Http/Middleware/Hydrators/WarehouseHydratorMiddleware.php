<?php

namespace App\Http\Middleware\Hydrators;

use App\Models\Warehouse;
use App\Repositories\WarehouseRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class WarehouseHydratorMiddleware extends HydratorMiddleware
{
    public const NAME = 'app.middleware.hydrators.warehouse-hydrator-middleware';

    public function __construct(
        WarehouseRepository $warehouseRepository
    ) {
        parent::__construct('warehouse', $warehouseRepository);
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'name',
            [$this->model, 'setName']
        )->when(
            'description',
            [$this->model, 'setDescription']
        );
    }
}
