<?php

namespace App\Http\Middleware\RequestValidator\MedicalCheckup;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class CompoundRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'ordering' => 'required',
            'medical_checkup.id' => 'required'
        ];
    }
}
