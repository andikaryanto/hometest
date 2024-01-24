<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class CheckupRecordRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'blood_pressure' => 'required|numeric',
            'pulse' => 'required|numeric',
            'respiration' => 'required|numeric',
            'temperature' => 'required|numeric',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'oxygen_saturation' => 'required|numeric',
            'diagnose' => 'required',
            'note' => 'required',
            'complaint' => 'required',
            'action' => 'required',
            'registration.id' => 'required|numeric',
        ];
    }
}
