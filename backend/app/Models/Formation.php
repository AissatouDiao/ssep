<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
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
        'village',
        'prenom_nom',
        'genre',
        'organisation_de_base',
        'date_formation',
        'theme_formation',
        'telephone',
        'lieu_formation',
        'relais',
        'telephone_relais',
       ];
}
