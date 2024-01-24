<?php

namespace App\Http\Middleware\Hydrators\Product;

use App\Repositories\Product\VariantRepository;
use App\Repositories\ProductRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class VariantHydratorMiddleware extends HydratorMiddleware
{
    public const NAME = 'app.middleware.hydrators.product-variant-middleware';

    protected ProductRepository $productRepository;

    public function __construct(
        VariantRepository $variantRepository,
        ProductRepository $productRepository
    ) {
        parent::__construct('product_variant', $variantRepository);
        $this->productRepository = $productRepository;
    }

    public function hydrate()
    {
        $this->when(
            'name',
            [$this->model, 'setName']
        )->when(
            'price',
            [$this->model, 'setPrice']
        )->when(
            'stock',
            [$this->model, 'setStock']
        )->when(
            'condition',
            [$this->model, 'setCondition']
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
        )->when(
            'product.id',
            [$this->model, 'setProduct'],
            [$this->productRepository, 'find']
        );
    }
}
