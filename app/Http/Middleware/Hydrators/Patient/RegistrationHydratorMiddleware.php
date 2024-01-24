<?php

namespace App\Http\Middleware\Hydrators\Patient;

use App\Repositories\ClinicRepository;
use App\Repositories\DoctorRepository;
use App\Repositories\Patient\RegistrationRepository;
use App\Repositories\Patient\RegistrationStatusRepository;
use App\Repositories\PatientRepository;
use App\Repositories\RegistrationTypeRepository;
use App\Repositories\VisitTypeRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class RegistrationHydratorMiddleware extends HydratorMiddleware
{
    protected PatientRepository $patientRepository;
    protected ClinicRepository $clinicRepository;
    protected RegistrationTypeRepository $registrationTypeRepository;
    protected DoctorRepository $doctorRepository;
    protected VisitTypeRepository $visitTypeRepository;
    protected RegistrationStatusRepository $registrationStatusRepository;

    public function __construct(
        RegistrationRepository $registrationRepository,
        PatientRepository $patientRepository,
        ClinicRepository $clinicRepository,
        RegistrationTypeRepository $registrationTypeRepository,
        DoctorRepository $doctorRepository,
        VisitTypeRepository $visitTypeRepository,
        RegistrationStatusRepository $registrationStatusRepository
    ) {
        parent::__construct('patientRegistration', $registrationRepository);
        $this->patientRepository = $patientRepository;
        $this->clinicRepository = $clinicRepository;
        $this->registrationTypeRepository = $registrationTypeRepository;
        $this->doctorRepository = $doctorRepository;
        $this->visitTypeRepository = $visitTypeRepository;
        $this->registrationStatusRepository = $registrationStatusRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'patient.id',
            [$this->model, 'setPatient'],
            [$this->patientRepository, 'find']
        )->when(
            'clinic.id',
            [$this->model, 'setClinic'],
            [$this->clinicRepository, 'find']
        )->when(
            'registration_type.id',
            [$this->model, 'setRegistrationType'],
            [$this->registrationTypeRepository, 'find']
        )->when(
            'doctor.id',
            [$this->model, 'setDoctor'],
            [$this->doctorRepository, 'find']
        )->when(
            'visit_type.id',
            [$this->model, 'setVisitType'],
            [$this->visitTypeRepository, 'find']
        )->when(
            'registration_status.id',
            [$this->model, 'setRegistrationStatus'],
            [$this->registrationStatusRepository, 'find']
        );
    }
}
