<?php

namespace App\Models;

use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use LaravelCommon\App\Database\Eloquent\Relations\BelongsToRelation;
use LaravelCommon\App\Models\TraitModel;
use LaravelCommon\App\Models\User;

class TableReservation extends Model
{
    use HasFactory;
    use TraitModel;

    protected BelongsToRelation $tablee;
    protected BelongsToRelation $user;

    protected $casts = [
        'reserved_at' => 'datetime'
    ];

    public function __construct(array $attribute = [])
    {
        $this->tablee = new BelongsToRelation($this, Table::class, 'table_id');
        $this->user = new BelongsToRelation($this, User::class, 'user_id');
    }

    /**
     * this is bad, getTable is reserved by laravel for database 'table'
     * 
     * @return ?Table
     */
    public function getTablee(): ?Table
    {
        return $this->tablee->get();
    }

    /**
     *
     * @param Table $table
     * @return TableReservation
     */
    public function setTablee(Table $table): TableReservation
    {
        $this->tablee->set($table);
        return $this;
    }

    /**
     *
     * @return User
     */
    public function getUser(): User
    {
        return $this->user->get();
    }

    /**
     *
     * @param Table $user
     * @return TableReservation
     */
    public function setUser(User $user): TableReservation
    {
        $this->user->set($user);
        return $this;
    }    

    /**
     *
     * @return Carbon
     */
    public function getReserveAt(): Carbon
    {
        return $this->reserve_at;
    }

    /**
     *
     * @param Carbon $reserveAt
     * @return TableReservation
     */
    public function setReserveAt(Carbon $reserveAt): TableReservation
    {
        $this->reserve_at = $reserveAt;
        return $this;
    }

       

    /**
     *
     * @return bool
     */
    public function getIsCompleted(): bool
    {
        return $this->is_completed;
    }

    /**
     *
     * @param bool $isCompleted
     * @return TableReservation
     */
    public function setIsCompleted(bool $isCompleted): TableReservation
    {
        $this->is_completed = $isCompleted;
        return $this;
    }
}
