<?php

namespace App\Imports;

use App\Models\Georeferencement;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class GeoreferencementImport implements ToModel
{
   /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    
    public function model(array $row)
    {
        $the_georeferencement=[
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'nom_organisation'=>$row['Nom organisation'],
            'statut_organisation'=>$row['Statut Georeferencement'],
            'prenom_nom'=>$row['Prenom et nom responsable'],
            'genre'=>$row['Contact responsable'],
            'organisation_base'=>$row['Nombre de membres de organisation'],
            'superficie_globale'=>$row['Nombre de membres Femmes'],
            'superficie_mesuree'=>$row['Nombre de membres Hommes'],
            'poulaillers'=>$row['Activités principales'],
            'bergeries'=>$row['MONTANT DE CREDIT RECU'],
            'coordonnee_x'=>$row['SOURCE DE FINANCEMENT'],
            'coordonnee_y'=>$row['SOURCE DE FINANCEMENT'],
           
           
        ];
        $organisation= Georeferencement::where([
            'region'=>$the_georeferencement['region'],
            'departement'=>$the_georeferencement['departement'],
            'commune'=>$the_georeferencement['commune'],
            'nom_organisation'=>$the_georeferencement['nom_organisation'],
            'statut_organisation'=>$the_georeferencement['statut_organisation'],
            'prenom_nom'=>$the_georeferencement['prenom_nom'],
            'genre'=>$the_georeferencement['genre'],
            'organisation_base'=>$the_georeferencement['organisation_base'],
            'superficie_globale'=>$the_georeferencement['superficie_globale'],
            'superficie_mesuree'=>$the_georeferencement['superficie_mesuree'],
            'poulaillers'=>$the_georeferencement['poulaillers'],
            'bergeries'=>$the_georeferencement['bergeries'],
            'coordonnee_x'=>$the_georeferencement['coordonnee_x'],
            'coordonnee_y'=>$the_georeferencement['coordonnee_y'],
            
            ])->first();
        if($organisation===null){
            return  new Georeferencement($the_georeferencement);  
        }else {
            return null;
        }

       /* return new Georeferencement([
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'nom_organisation'=>$row['Nom organisation'],
            'statut_organisation'=>$row['Statut Georeferencement'],
            'prenom_nom'=>$row['Prenom et nom responsable'],
            'genre'=>$row['Contact responsable'],
            'organisation_base'=>$row['Nombre de membres de organisation'],
            'superficie_globale'=>$row['Nombre de membres Femmes'],
            'superficie_mesuree'=>$row['Nombre de membres Hommes'],
            'activités_principales'=>$row['Activités principales'],
            'bergeries'=>$row['MONTANT DE CREDIT RECU'],
            'coordonnee_x'=>$row['SOURCE DE FINANCEMENT'],
           
        ]);*/
    }
}
