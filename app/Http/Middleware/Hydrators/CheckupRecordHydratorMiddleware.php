<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\CheckupRecordRepository;
use App\Repositories\Patient\RegistrationRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class CheckupRecordHydratorMiddleware extends HydratorMiddleware
{
    protected RegistrationRepository $registrationRepository;

    public function __construct(
        CheckupRecordRepository $personRepository,
        RegistrationRepository $registrationRepository
    ) {
        parent::__construct('checkupRecord', $personRepository);
        $this->registrationRepository = $registrationRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'blood_pressure',
            [$this->model, 'setBloodPressure']
        )->when(
            'pulse',
            [$this->model, 'setPulse']
        )->when(
            'respiration',
            [$this->model, 'setRespiration'],
        )->when(
            'temperature',
            [$this->model, 'setTemperature']
        )->when(
            'oxygen_saturation',
            [$this->model, 'setOxygenSaturation']
        )->when(
            'weight',
            [$this->model, 'setWeight']
        )->when(
            'height',
            [$this->model, 'setHeight']
        )->when(
            'diagnose',
            [$this->model, 'setDiagnose']
        )->when(
            'anamnesis',
            [$this->model, 'setAnamnesis']
        )->when(
            'note',
            [$this->model, 'setNote']
        )->when(
            'complaint',
            [$this->model, 'setComplaint']
        )->when(
            'action',
            [$this->model, 'setAction']
        )->when(
            'form',
            [$this->model, 'setForm'],
            [],
            function ($form) {
                $this->model->setForm(serialize($form));
            }
        )->when(
            'registration.id',
            [$this->model, 'setRegistration'],
            [$this->registrationRepository, 'find']
        );
    }
}
