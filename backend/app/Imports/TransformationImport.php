<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class TransformationImport implements ToModel
{
  /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    
    public function model(array $row)
    {
        $the_transformation=[
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'date'=>$row['Nom organisation'],
            'quantite_transformee'=>$row['Statut Organisation'],
            'origine'=>$row['Prenom et nom responsable'],
            'observation'=>$row['Nombre de membres de organisation'],
        ];
        $transformation= Transformation::where([
            'region'=>$the_transformation['region'],
            'departement'=>$the_transformation['departement'],
            'commune'=>$the_transformation['commune'],
            'date'=>$the_transformation['date'],
            'origine'=>$the_transformation['origine'],
            'quantite_transformee'=>$the_transformation['quantite_transformee'],
            'genre'=>$the_transformation['genre'],
            'observation'=>$the_transformation['observation'],
            ])->first();
        if($transformation===null){
            return  new Transformation($the_transformation);  
        }else {
            return null;
        }

       /* return new Organisation([
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'village'=>$row['Nom organisation'],
            'prenom_nom'=>$row['Statut Organisation'],
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

