<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\PaymentRepository;
use App\Repositories\MedicalCheckupRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class PaymentHydratorMiddleware extends HydratorMiddleware
{
    protected PaymentRepository $paymentRepository;
    protected MedicalCheckupRepository $medicalCheckupRepository;

    public function __construct(
        MedicalCheckupRepository $medicalCheckupRepository,
        PaymentRepository $paymentRepository
    ) {
        parent::__construct('payment', $paymentRepository);
        $this->medicalCheckupRepository = $medicalCheckupRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'compound_fee',
            [$this->model, 'setCompoundFee']
        )->when(
            'discount',
            [$this->model, 'setDiscount']
        )->when(
            'amount',
            [$this->model, 'setAmount']
        )->when(
            'payment_amount',
            [$this->model, 'setPaymentAmount'],
            [],
            function ($paymentAmount) {
                $this->model->setPaymentAmount($paymentAmount);
                $subTotal = $this->model->getCompoundFee() + $this->model->getAmount() - $this->model->getDiscount();
                $change = $this->model->getPaymentAmount() - $subTotal;
                $this->model->setChange($change);
            }
        )->when(
            'medical_checkup.id',
            [$this->model, 'setMedicalCheckup'],
            [$this->medicalCheckupRepository, 'find']
        );
    }
}
