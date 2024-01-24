<?php

namespace App\Http\Middleware\RequestValidator\MedicalCheckup;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class ItemRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'quantity' => 'required',
            'price_per_unit' => 'required',
            'item.id' => 'required'
        ];
    }
}
