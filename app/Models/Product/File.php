<?php

namespace App\Models\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use LaravelCommon\App\Database\Eloquent\Relations\BelongsToRelation;
use LaravelCommon\App\Models\TraitModel;

class File extends Model
{
    use HasFactory;
    use TraitModel;

    protected $table = 'product_files';

    protected BelongsToRelation $product;

    public function __construct(array $attribute = [])
    {
        $this->product = new BelongsToRelation($this, Product::class, 'product_id');
    }

    /**
     *
     * @return ?Product
     */
    public function getProduct(): ?Product
    {
        return $this->product->get();
    }

    /**
     *
     * @param Product $product
     * @return File
     */
    public function setProduct(Product $product): File
    {
        $this->product->set($product);
        return $this;
    }

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
     * @return File
     */
    public function setName(string $name): File
    {
        $this->name = $name;
        return $this;
    }

    /**
     *
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     *
     * @param string $type
     * @return File
     */
    public function setType(string $type): File
    {
        $this->type = $type;
        return $this;
    }

    /**
     *
     * @return string
     */
    public function getExtension(): string
    {
        return $this->extension;
    }

    /**
     *
     * @param string $extension
     * @return File
     */
    public function setExtension(string $extension): File
    {
        $this->extension = $extension;
        return $this;
    }

    /**
     *
     * @return int
     */
    public function getSize(): int
    {
        return $this->size;
    }

    /**
     *
     * @param int $size
     * @return File
     */
    public function setSize(int $size): File
    {
        $this->size = $size;
        return $this;
    }
}
