<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\MovementTypeRepository;
use App\Repositories\ItemMovementRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ItemMovementHydratorMiddleware extends HydratorMiddleware
{
    protected MovementTypeRepository $movementTypeRepository;
    public function __construct(
        ItemMovementRepository $itemMovementRepository,
        MovementTypeRepository $movementTypeRepository
    ) {
        parent::__construct('itemMovement', $itemMovementRepository);
        $this->movementTypeRepository = $movementTypeRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'description',
            [$this->model, 'setDescription']
        )->when(
            'movement_type.id',
            [$this->model, 'setMovementType'],
            [$this->movementTypeRepository, 'find']
        );
    }
}
