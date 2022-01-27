<?php

namespace App\Imports;

use App\Models\Suiviproduction;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\ToCollection;

class SuiviproductionImport implements ToModel
{
     /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $the_suiviproduction=[
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'village'=>$row['Nom organisation'],
            'prenom_nom'=>$row['Statut Organisation'],
            'genre'=>$row['Prenom et nom responsable'],
            'statut_producteur'=>$row['Contact responsable'],
            'superficie_totale'=>$row['Nombre de membres de organisation'],
            'superficie_mesuree'=>$row['Nombre de membres Femmes'],
            'coordonnees_x'=>$row['Nombre de membres Hommes'],
            'coordonnees_y'=>$row['Activités principales'],
            'nombre_ovins_suivis'=>$row['MONTANT DE CREDIT RECU'],
            'nombre_poules_suivies'=>$the_suiviproduction['nombre_poules_suivies'],
            'date_premiere_vaccination'=>$row['SOURCE DE FINANCEMENT'],
            'date_deparatisage_interne'=>$row['SOURCE DE FINANCEMENT'],
            'date_deparasitage_externe'=>$row['SOURCE DE FINANCEMENT'],
            'date_deuxieme_vaccination'=>$row['SOURCE DE FINANCEMENT'],
            'date_de_semis_ou_repiquage'=>$row['SOURCE DE FINANCEMENT'],
            'quantite_npk_appliquee'=>$row['SOURCE DE FINANCEMENT'],
            'date_appliquation_npk'=>$row['SOURCE DE FINANCEMENT'],
            'type_maladies'=>$row['SOURCE DE FINANCEMENT'],
            'date_recolte'=>$row['SOURCE DE FINANCEMENT'],
            'production_obtenue'=>$row['SOURCE DE FINANCEMENT'],
            'rendement'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_sujets_obtenus'=>$row['SOURCE DE FINANCEMENT'],
           
        ];
        $organisation= Suiviproduction::where([
            'region'=>$the_suiviproduction['region'],
            'departement'=>$the_suiviproduction['departement'],
            'commune'=>$the_suiviproduction['commune'],
            'village'=>$the_suiviproduction['nom_organisation'],
            'prenom_nom'=>$the_suiviproduction['prenom_nom'],
            'genre'=>$the_suiviproduction['genre'],
            'statut_producteur'=>$the_suiviproduction['statut_producteur'],
            'superficie_totale'=>$the_suiviproduction['superficie_totale'],
            'superficie_mesuree'=>$the_suiviproduction['superficie_mesuree'],
            'coordonnees_x'=>$the_suiviproduction['coordonnees_x'],
            'coordonnees_y'=>$the_suiviproduction['coordonnees_y'],
            'nombre_ovins_suivis'=>$the_suiviproduction['nombre_ovins_suivis'],
            'date_de_semis_ou_repiquage'=>$the_suiviproduction['nombre_poules'],
            'date_premiere_vaccination'=>$the_suiviproduction['date_premiere_vaccination'],
            'date_deparatisage_interne'=>$the_suiviproduction['date_deparatisage_interne'],
            'date_deparasitage_externe'=>$the_suiviproduction['date_deparasitage_externe'],
            'date_deuxieme_vaccination'=>$the_suiviproduction['date_deuxieme_vaccination'],
            'nombre_poules'=>$the_suiviproduction['nombre_poules'],
            'quantite_npk_appliquee'=>$the_suiviproduction['quantite_npk_appliquee'],
            'date_appliquation_npk'=>$the_suiviproduction['date_appliquation_npk'],
            'type_maladies'=>$the_suiviproduction['type_maladies'],
            'date_recolte'=>$the_suiviproduction['date_recolte'],
            'production_obtenue'=>$the_suiviproduction['production_obtenue'],
            'rendement'=>$the_suiviproduction['rendement'],
            'nombre_sujets_obtenus'=>$the_suiviproduction['nombre_sujets_obtenus'],
            'observations'=>$the_suiviproduction['observations'],
    
            ])->first();
        if($suiviproduction===null){
            return  new Suiviproduction($the_suiviproduction);  
        }else {
            return null;
        }
    }
}
