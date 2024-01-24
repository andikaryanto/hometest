<?php

namespace App\Models\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\App\Database\Eloquent\Relations\BelongsToRelation;
use LaravelCommon\App\Models\TraitModel;

class Variant extends Model
{
    use HasFactory;
    use TraitModel;

    protected $table = 'product_variants';

    protected BelongsToRelation $product;

    public function __construct(array $attribute = [])
    {
        $this->product = new BelongsToRelation($this, Product::class, 'product_id');
    }

    /**
     *
     * @return ?Variant
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
    public function setProduct(Product $product): Variant
    {
        $this->product->set($product);
        return $this;
    }

    /**
     * Get the value of name
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */
    public function setName(string $name): Variant
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of price
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */
    public function setPrice(float $price): Variant
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of stock
     */
    public function getStock(): int
    {
        return $this->stock;
    }

    /**
     * Set the value of stock
     *
     * @return  self
     */
    public function setStock($stock): Variant
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * Get the value of saleable_stock
     */
    public function getSaleableStock(): int
    {
        return $this->saleable_stock;
    }

    /**
     * Set the value of saleable_stock
     *
     * @return  self
     */
    public function setSaleableStock(int $saleable_stock): Variant
    {
        $this->saleable_stock = $saleable_stock;

        return $this;
    }

    /**
     * Get the value of condition
     */
    public function getCondition(): string
    {
        return $this->condition;
    }

    /**
     * Set the value of condition
     *
     * @return  self
     */
    public function setCondition(string $condition): Variant
    {
        $this->condition = $condition;

        return $this;
    }



    /**
     *
     * @return float
     */
    public function getWeight(): float
    {
        return $this->weight;
    }

   /**
    *
    * @param bool $isActive
    * @return Variant
    */
    public function setWeight(float $weight): Variant
    {
        $this->weight = $weight;
        return $this;
    }

   /**
    *
    * @return float
    */
    public function getHeight(): float
    {
        return $this->height;
    }

   /**
    *
    * @param bool $isActive
    * @return Variant
    */
    public function setHeight(float $height): Variant
    {
        $this->height = $height;
        return $this;
    }

   /**
    *
    * @return float
    */
    public function getWidth(): float
    {
        return $this->width;
    }

   /**
    *
    * @param bool $isActive
    * @return Variant
    */
    public function setWidth(float $width): Variant
    {
        $this->width = $width;
        return $this;
    }

   /**
    *
    * @return float
    */
    public function getLength(): float
    {
        return $this->length;
    }

   /**
    *
    * @param bool $isActive
    * @return Variant
    */
    public function setLength(float $length): Variant
    {
        $this->length = $length;
        return $this;
    }
}
