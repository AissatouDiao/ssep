<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommandation extends Model
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
      'evaluation_id',
     'titre',
     'description',
     'created_at',
     'date_finale',
     'statut',
     'responsable',
     'pourcentage'
    ]; 
}
