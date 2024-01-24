<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\UomRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class UomHydratorMiddleware extends HydratorMiddleware
{
    public function __construct(
        UomRepository $uomRepository
    ) {
        parent::__construct('uom', $uomRepository);
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
