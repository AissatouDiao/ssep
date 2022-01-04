<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suiviproduction extends Model
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
        'observation',
        'statut_producteur',
        'superficie_totale',
        'superficie_mesuree',
        'coordonnees_x',
        'coordonnees_y',
        'nombre_ovins_suivis',
        'nombre_poules_suivies',
        'date_premiere_vaccination',
        'date_deparatisage_interne',
        'date_deparasitage_externe',
        'date_deuxieme_vaccination',
        'date_de_semis_ou_repiquage',
        'quantite_npk_appliquee',
        'date_appliquation_npk',
        'type_maladies',
        'date_recolte',
        'production_obtenue',
        'rendement',
        'nombre_sujets_obtenus',
        'observations'
       ];
}
