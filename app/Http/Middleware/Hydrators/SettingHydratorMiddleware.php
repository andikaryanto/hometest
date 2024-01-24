<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\SettingRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class SettingHydratorMiddleware extends HydratorMiddleware
{
    public function __construct(
        SettingRepository $uomRepository
    ) {
        parent::__construct('setting', $uomRepository);
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
            'string_value',
            [$this->model, 'setStringValue']
        )->when(
            'integer_value',
            [$this->model, 'setIntegerValue']
        )->when(
            'boolean_value',
            [$this->model, 'setBooleanValue']
        )->when(
            'date_time_value',
            [$this->model, 'setDateTimeValue']
        )->when(
            'decimal_value',
            [$this->model, 'setDecimalValue']
        )->when(
            'is_active',
            [$this->model, 'setIsActive']
        );
    }
}
