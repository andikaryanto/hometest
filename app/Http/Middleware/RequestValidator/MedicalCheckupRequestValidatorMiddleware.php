<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class MedicalCheckupRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'doctor.id' => 'required'
        ];
    }

    public function patch()
    {
        return [
            'doctor.id' => 'required'
        ];
    }
}
