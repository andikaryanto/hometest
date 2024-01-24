<?php

namespace App\Http\Middleware\RequestValidator\Patient;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class RegistrationRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'patient.id' => 'required|numeric',
            'clinic.id' => 'required|numeric',
            'registration_type.id' => 'required|numeric',
            'doctor.id' => 'required|numeric',
            'visit_type.id' => 'required|numeric'
        ];
    }
}
