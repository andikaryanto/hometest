<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ItemMarginRepository;
use App\Repositories\ItemTypeRepository;
use App\Repositories\ItemRepository;
use App\Repositories\UomRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ItemHydratorMiddleware extends HydratorMiddleware
{
    protected ItemTypeRepository $itemTypeRepository;
    protected UomRepository $uomRepository;
    protected ItemMarginRepository $itemMarginRepository;

    public function __construct(
        ItemRepository $itemRepository,
        ItemTypeRepository $itemTypeRepository,
        UomRepository $uomRepository,
        ItemMarginRepository $itemMarginRepository
    ) {
        parent::__construct('item', $itemRepository);
        $this->itemTypeRepository = $itemTypeRepository;
        $this->uomRepository = $uomRepository;
        $this->itemMarginRepository = $itemMarginRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'code',
            [$this->model, 'setCode']
        )->when(
            'name',
            [$this->model, 'setName']
        )->when(
            'margin',
            [$this->model, 'setMargin']
        )->when(
            'price_per_unit',
            [$this->model, 'setPricePerUnit']
        )->when(
            'uom.id',
            [$this->model, 'setUom'],
            [$this->uomRepository, 'find']
        )->when(
            'item_type.id',
            [$this->model, 'setItemType'],
            [$this->itemTypeRepository, 'find']
        )->when(
            'item_margin.id',
            [$this->model, 'setItemMargin'],
            [$this->itemMarginRepository, 'find']
        );
    }
}
