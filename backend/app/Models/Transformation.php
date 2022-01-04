<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transformation extends Model
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
        'region',
        'departement',
        'commune',
        'date',
        'quantite_transformee',
        'origine',
        'observation',
       ];
}
