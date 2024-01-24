<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ClinicRepository;
use App\Repositories\DiseaseRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class DiseaseHydratorMiddleware extends HydratorMiddleware
{
    protected ClinicRepository $clinicRepository;
    public function __construct(
        DiseaseRepository $diseaseRepository,
        ClinicRepository $clinicRepository
    ) {
        parent::__construct('disease', $diseaseRepository);
        $this->clinicRepository = $clinicRepository;
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
            'description',
            [$this->model, 'setDescription']
        )->when(
            'clinic.id',
            [$this->model, 'setClinic'],
            [$this->clinicRepository, 'find']
        );
    }
}
