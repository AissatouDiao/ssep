<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moissousactivite extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'sousactivite_id',
      'mois_id',
       ];
}
