<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\GenderRepository;
use App\Repositories\PersonRepository;
use App\Repositories\VillageRepository;
use Carbon\Carbon;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class PersonHydratorMiddleware extends HydratorMiddleware
{
    protected GenderRepository $genderRepository;
    protected VillageRepository $villageRepository;

    public function __construct(
        PersonRepository $personRepository,
        GenderRepository $genderRepository,
        VillageRepository $villageRepository
    ) {
        parent::__construct('person', $personRepository);
        $this->genderRepository = $genderRepository;
        $this->villageRepository = $villageRepository;
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
            'nik',
            [$this->model, 'setNik']
        )->when(
            'date_of_birth',
            [$this->model, 'setDateOfBirth'],
            [],
            function ($dateOfBirth) {
                $dob = Carbon::createFromFormat('Y-m-d', $dateOfBirth);
                $this->model->setDateOfBirth($dob);
            }
        )->when(
            'place_of_birth',
            [$this->model, 'setPlaceOfBirth']
        )->when(
            'phone',
            [$this->model, 'setPhone']
        )->when(
            'job',
            [$this->model, 'setJob']
        )->when(
            'religion',
            [$this->model, 'setReligion']
        )->when(
            'degree',
            [$this->model, 'setDegree']
        )->when(
            'person_in_charge',
            [$this->model, 'setPersonInCharge']
        )->when(
            'person_in_charge',
            [$this->model, 'setPersonInCharge']
        )->when(
            'gender.id',
            [$this->model, 'setGender'],
            [$this->genderRepository, 'find']
        )->when(
            'village.id',
            [$this->model, 'setVillage'],
            [$this->villageRepository, 'find']
        )->when(
            'current_village.id',
            [$this->model, 'setCurrentVillage'],
            [$this->villageRepository, 'find']
        )->when(
            'address',
            [$this->model, 'setAddress']
        );
    }
}
