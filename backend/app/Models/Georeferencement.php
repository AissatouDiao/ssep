<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Georeferencement extends Model
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
     'organisation_base',
     'superficie_globale',
     'superficie_mesuree',
     'poulaillers',
     'bergeries',
     'equipements',
     'coordonnee_x',
     'coordonnee_y'
    ];
}
