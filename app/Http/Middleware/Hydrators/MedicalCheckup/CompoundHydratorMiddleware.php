<?php

namespace App\Http\Middleware\Hydrators\MedicalCheckup;

use App\Repositories\CompoundRepository;
use App\Repositories\MedicalCheckup\CompoundRepository as MedicalCheckupCompoundRepository;
use App\Repositories\MedicalCheckupRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class CompoundHydratorMiddleware extends HydratorMiddleware
{
    protected MedicalCheckupRepository $medicalCheckupRepository;

    public function __construct(
        MedicalCheckupCompoundRepository $medicalCheckupCompoundRepository,
        MedicalCheckupRepository $medicalCheckupRepository
    ) {
        parent::__construct('medicalCheckupCompound', $medicalCheckupCompoundRepository);
        $this->medicalCheckupRepository = $medicalCheckupRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'ordering',
            [$this->model, 'setOrdering']
        )->when(
            'medical_checkup.id',
            [$this->model, 'setMedicalCheckup'],
            [$this->medicalCheckupRepository, 'find']
        );
    }
}
