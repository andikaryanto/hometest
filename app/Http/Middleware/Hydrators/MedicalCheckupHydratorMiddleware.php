<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\CertificateRepository;
use App\Repositories\MedicalCheckupRepository;
use App\Repositories\CheckupRecordRepository;
use App\Repositories\DoctorRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class MedicalCheckupHydratorMiddleware extends HydratorMiddleware
{
    protected CheckupRecordRepository $checkupRecordRepository;
    protected CertificateRepository $certificateRepository;
    protected DoctorRepository $doctorRepository;

    public function __construct(
        MedicalCheckupRepository $medicalCheckupRepository,
        CheckupRecordRepository $checkupRecordRepository,
        CertificateRepository $certificateRepository,
        DoctorRepository $doctorRepository
    ) {
        parent::__construct('medicalCheckup', $medicalCheckupRepository);
        $this->checkupRecordRepository = $checkupRecordRepository;
        $this->certificateRepository = $certificateRepository;
        $this->doctorRepository = $doctorRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'form',
            [$this->model, 'setForm'],
            [],
            function ($form) {
                $this->model->setForm(serialize($form));
            }
        )->when(
            'electrocardiography',
            [$this->model, 'setElectrocardiography']
        )->when(
            'spirometry',
            [$this->model, 'setSpirometry']
        )->when(
            'governance',
            [$this->model, 'setGovernance']
        )->when(
            'reference',
            [$this->model, 'setReference']
        )->when(
            'is_prescription_given',
            [$this->model, 'setIsPrescriptionGiven']
        )->when(
            'checkup_record.id',
            [$this->model, 'setCheckupRecord'],
            [$this->checkupRecordRepository, 'find']
        )->when(
            'certificate.id',
            [$this->model, 'setCertificate'],
            [$this->certificateRepository, 'find']
        )->when(
            'doctor.id',
            [$this->model, 'setDoctor'],
            [$this->doctorRepository, 'find']
        );
    }
}
