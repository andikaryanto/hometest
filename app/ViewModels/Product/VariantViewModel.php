<?php

namespace App\ViewModels\Product;

use App\Models\Product\Variant;
use LaravelCommon\ViewModels\AbstractViewModel;

class VariantViewModel extends AbstractViewModel
{
    /**
     * @var bool $autoAddResource;
     */
    protected $isAutoAddResource = true;

    /**
     * @var Variant
     */
    protected $model;

    /**
     * @inheritdoc
     */
    public function addResource()
    {
        return $this;
    }

    /**
     * @inheritdoc
     */
    public function toArray()
    {
        return [
            'id' => $this->model->getId(),
            'name' => $this->model->getName(),
            'price' => $this->model->getPrice(),
            'stock' => $this->model->getStock(),
            'saleable_stock' => $this->model->getSaleableStock(),
            'condition' => $this->model->getCondition(),
            'weight' => $this->model->getWeight(),
            'height' => $this->model->getHeight(),
            'width' => $this->model->getWidth(),
            'length' => $this->model->getLength()
        ];
    }
}
