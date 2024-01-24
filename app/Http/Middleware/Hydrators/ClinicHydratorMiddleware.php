<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ClinicRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ClinicHydratorMiddleware extends HydratorMiddleware
{
    public function __construct(
        ClinicRepository $clinicRepository
    ) {
        parent::__construct('clinic', $clinicRepository);
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
