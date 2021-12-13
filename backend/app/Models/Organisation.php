<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
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
        'nom_organisation',
        'statut_organisation',
        'prenom_et_nom_responsable',
        'contact_responsable',
        'nombre_membre_organisation',
        'nombre_femmes',
        'nombre_hommes',
        'activités_principales',
        'montant_credit_recu',
        'source_financement',
       ];
}
