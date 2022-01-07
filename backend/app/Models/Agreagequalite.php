<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agreagequalite extends Model
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
        'annee',
        'nom_organisation_ou_producteur',
        'produit',
        'date_controle',
        'nombre_sacs_lot',
        'poids_moyen_sac',
        'taux_humidite',
        'taux_impurete',
        'graines_immatures_taux',
        'conforme_code_qualite',
        'observations'
       ];
}
