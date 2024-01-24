<?php

namespace App\Http\Middleware\Hydrators;

use App\Models\Shop;
use App\Repositories\ProductCategoryRepository;
use App\Repositories\ShopRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class ProductCategoryHydratorMiddleware extends HydratorMiddleware
{
    public const NAME = 'app.middleware.hydrators.product-category-middleware';

    /**
     *
     * @var ShopRepository
     */
    protected ShopRepository $shopRepository;

    /**
     *
     * @param ProductCategoryRepository $productCategoryRepository
     * @param ShopRepository $shopRepository
     */
    public function __construct(
        ProductCategoryRepository $productCategoryRepository,
        ShopRepository $shopRepository
    ) {
        parent::__construct('productCategory', $productCategoryRepository);
        $this->shopRepository = $shopRepository;
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

    /**
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
            'shop.id',
            [$this->model, 'setShop'],
            [$this->shopRepository, 'find']
        );
    }
}
