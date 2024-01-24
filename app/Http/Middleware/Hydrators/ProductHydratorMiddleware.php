<?php

namespace App\Http\Middleware\Hydrators;

use App\Models\Shop;
use App\Repositories\ProductRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ProductHydratorMiddleware extends HydratorMiddleware
{
    public const NAME = 'app.middleware.hydrators.product-middleware';

    public function __construct(
        ProductRepository $productRepository
    ) {
        parent::__construct('product', $productRepository);
    }

    /**
     *
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'name',
            [$this->model, 'setName']
        )->when(
            'description',
            [$this->model, 'setDescription']
        )->when(
            'is_active',
            [$this->model, 'setIsActive']
        )->when(
            'must_show',
            [$this->model, 'setMustShow']
        )->when(
            'weight',
            [$this->model, 'setWeight']
        )->when(
            'height',
            [$this->model, 'setHeight']
        )->when(
            'width',
            [$this->model, 'setWidth']
        )->when(
            'length',
            [$this->model, 'setLength']
        );
    }

    /**
     * @inheritdoc
     */
    public function beforeHydrate()
    {
        $resource = $this->request->getResource();
        if ($resource instanceof Shop) {
            if (strtoupper($this->method) == 'POST') {
                $this->model->setShop($resource);
            }
        }
    }
}
