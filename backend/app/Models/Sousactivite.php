<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sousactivite extends Model
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
'activite_id',
	'libelle', 	
    'budget' ,
    'etat' ,
    'cout_estimatif', 
    'cout_reel' ,	
    'debut_reel',
    'fin_reel' ,
    'debut_planifie',
    'fin_planifie' ,	
  ];
}
