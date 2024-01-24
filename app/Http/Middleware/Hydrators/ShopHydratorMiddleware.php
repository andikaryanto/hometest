<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ShopRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ShopHydratorMiddleware extends HydratorMiddleware
{
    public const NAME = 'app.middleware.hydrators.shop-hydrator-middleware';

    public function __construct(
        ShopRepository $shopRepository
    ) {
        parent::__construct('shop', $shopRepository);
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
            'address',
            [$this->model, 'setAddress']
        )->when(
            'phone',
            [$this->model, 'setPhone']
        )->when(
            'personal_information',
            [$this->model, 'setPersonalInformation']
        )->when(
            'longitude',
            [$this->model, 'setLongitude']
        )->when(
            'latitude',
            [$this->model, 'setLatitude']
        );
    }
}
