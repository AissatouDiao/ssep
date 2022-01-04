<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Identification extends Model
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
     'genre',
     'statut_producteur',
     'numero_cni',
     'telephone',
     'activite',
     'organisation_de_base',
     'statut_organisation_de_base',
     'nombre_organisations_de_base',
     'superificie_totale_cultivee',
     'chef_de_menage',
     'membre_menage_chef_appuye',
     'quantite_semences_utilisee',
     'nombre_poules',
     'nombre_brebis',
     'montant_credit_recu',
     'source_financement',
     'superficie_assuréee',
     'superficie_totale_recoltee',
     'production_totale_obtenue',
     'quantite_commercialisee',
     'nombre_moutons_produits',
     'nombre_poussins_produits',
     'quantite_paddy_transformee'
    ];
}
