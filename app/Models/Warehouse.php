<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\App\Models\TraitModel;

class Warehouse extends Model
{
    use HasFactory;
    use TraitModel;

    /**
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     *
     * @param string $name
     * @return ProductCategory
     */
    public function setName(string $name): Warehouse
    {
        $this->name = $name;
        return $this;
    }

    /**
     *
     * @return ?string
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
 *
     * @param string $description
     * @return ProductCategory
     */
    public function setDescription(?string $description): Warehouse
    {
        $this->description = $description;
        return $this;
    }
}
