<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class PaymentRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'medical_checkup.id' => 'required',
            'amount' => 'required',
            'payment_amount' => 'required'
        ];
    }
}
