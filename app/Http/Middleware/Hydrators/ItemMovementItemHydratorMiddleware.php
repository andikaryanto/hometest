<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ItemMovementitemRepository;
use App\Repositories\ItemMovementRepository;
use App\Repositories\ItemRepository;
use App\Repositories\UomRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ItemMovementItemHydratorMiddleware extends HydratorMiddleware
{
    protected ItemMovementitemRepository $movementTypeRepository;
    protected ItemRepository $itemReppository;
    protected UomRepository $uomRepository;
    protected ItemMovementRepository $itemMovementRepository;
    public function __construct(
        ItemMovementRepository $itemMovementRepository,
        ItemRepository $itemRepository,
        UomRepository $uomRepository,
        ItemMovementitemRepository $itemMovementitemRepository
    ) {
        parent::__construct('itemMovementItem', $itemMovementitemRepository);
        $this->itemMovementRepository = $itemMovementRepository;
        $this->itemReppository = $itemRepository;
        $this->uomRepository = $uomRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'quantity',
            [$this->model, 'setQuantity']
        )->when(
            'price_per_unit',
            [$this->model, 'setPricePerUnit']
        )->when(
            'distirbutor',
            [$this->model, 'setDistributor']
        )->when(
            'item.id',
            [$this->model, 'setItem'],
            [$this->itemReppository, 'find']
        )->when(
            'uom.id',
            [$this->model, 'setUom'],
            [$this->uomRepository, 'find']
        )->when(
            'item_movement.id',
            [$this->model, 'setItemMovement'],
            [$this->itemMovementRepository, 'find']
        );
    }
}
