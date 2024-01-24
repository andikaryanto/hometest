<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\App\Models\TraitModel;

class Table extends Model
{
    use HasFactory;
    use TraitModel;

    protected $table = 'tables';

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
    public function setName(string $name): Table
    {
        $this->name = $name;
        return $this;
    }

    /**
     *
     * @return bool
     */
    public function getIsReserved(): ?bool
    {
        return $this->description;
    }

    /**
 *
     * @param bool $is_reserved
     * @return Table
     */
    public function setIsReserved(bool $description): Table
    {
        $this->is_reserved = $description;
        return $this;
    }
}
