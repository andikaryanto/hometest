<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\ClinicRepository;
use App\Repositories\TreatmentRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class TreatmentHydratorMiddleware extends HydratorMiddleware
{
    protected ClinicRepository $clinicRepository;
    public function __construct(
        TreatmentRepository $diseaseRepository,
        ClinicRepository $clinicRepository
    ) {
        parent::__construct('treatment', $diseaseRepository);
        $this->clinicRepository = $clinicRepository;
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
            'health_worker_price',
            [$this->model, 'setHealthWorkerPrice']
        )->when(
            'doctor_price',
            [$this->model, 'setDoctorPrice']
        )->when(
            'pharmacist_price',
            [$this->model, 'setPharmacistPrice']
        )->when(
            'clinic_price',
            [$this->model, 'setClinicPrice']
        )->when(
            'clinic.id',
            [$this->model, 'setClinic'],
            [$this->clinicRepository, 'find']
        );
    }
}
