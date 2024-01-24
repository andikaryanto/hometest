<?php

namespace App\Http\Middleware\Hydrators\MedicalCheckup;

use App\Repositories\ItemRepository;
use App\Repositories\MedicalCheckup\CompoundRepository;
use App\Repositories\MedicalCheckup\ItemRepository as MedicalCheckupItemRepository;
use App\Repositories\MedicalCheckupRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ItemHydratorMiddleware extends HydratorMiddleware
{
    protected ItemRepository $itemRepository;
    protected MedicalCheckupRepository $medicalCheckupRepository;
    protected CompoundRepository $compoundRepository;

    public function __construct(
        MedicalCheckupItemRepository $medicalCheckupItemRepository,
        MedicalCheckupRepository $medicalCheckupRepository,
        CompoundRepository $compoundRepository,
        ItemRepository $itemRepository
    ) {
        parent::__construct('medicalCheckupItem', $medicalCheckupItemRepository);
        $this->itemRepository = $itemRepository;
        $this->medicalCheckupRepository = $medicalCheckupRepository;
        $this->compoundRepository = $compoundRepository;
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'item.id',
            [$this->model, 'setItem'],
            [$this->itemRepository, 'find']
        )->when(
            'quantity',
            [$this->model, 'setQuantity']
        )->when(
            'signa',
            [$this->model, 'setSigna']
        )->when(
            'note',
            [$this->model, 'setNote']
        )->when(
            'price_per_unit',
            [$this->model, 'setPricePerUnit']
        )->when(
            'medical_checkup.id',
            [$this->model, 'setMedicalCheckup'],
            [$this->medicalCheckupRepository, 'find']
        )->when(
            'medical_checkup_compound.id',
            [$this->model, 'setMedicalCheckupCompound'],
            [$this->compoundRepository, 'find']
        );
    }
}
