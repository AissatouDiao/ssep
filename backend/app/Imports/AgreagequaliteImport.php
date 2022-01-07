<?php

namespace App\Imports;


use App\Models\Organisation;
use App\Models\Agreagequalite;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class AgreagequaliteImport implements ToModel,SkipsOnError, WithHeadingRow, WithValidation
{
   
    use Importable,SkipsErrors;
    /**
    * @param array $row
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $agreage_qualite=[
            'region'=>$row['Région'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'village'=>$row['Village'],
            'annee'=>$row['Annee'],
            'nom_organisation_ou_producteur'=>$row['Nom organisation ou Producteur'],
            'produit'=>$row['Produit'],
            'date_controle'=>$row['Date de controle'],
            'nombre_sacs_lot'=>$row['Nombre de sacs du lot'],
            'poids_moyen_sac'=>$row['Poids moyen d \'un sac'],
            'taux_humidite'=>$row['Taux d\'humidite'],
            'taux_impurete'=>$row['Taux d\'impurete'],
            'graines_immatures_taux'=>$row['Graines immatures'],
            'conforme_code_qualite'=>$row['Conforme au code qualite'],
            'observations'=>$row['Observations'],
           
        ];
        $ligne_agreage_qualite= Agreagequalite::where([
            'region'=>$agreage_qualite['region'],
            'departement'=>$agreage_qualite['departement'],
            'commune'=>$the_organisation['commune'],
            'village'=>$the_organisation['village'],
            'nom_organisation_ou_producteur'=>$the_organisation['nom_organisation_ou_producteur'],
            'produit'=>$the_organisation['produit'],
            'date_controle'=>$the_organisation['date_controle'],
            'nombre_sacs_lot'=>$the_organisation['nombre_sacs_lot'],
            'poids_moyen_sac'=>$the_organisation['poids_moyen_sac'],
            'taux_humidite'=>$the_organisation['taux_humidite'],
            'taux_impurete'=>$the_organisation['taux_impurete'],
            'graines_immatures_taux'=>$the_organisation['graines_immatures_taux'],
            'conforme_code_qualite'=>$the_organisation['conforme_code_qualite'],
            'observations'=>$the_organisation['observations'],
            ])->first();
        if($ligne_agreage_qualite===null){
            return  new Agreagequalite($agreage_qualite);  
        }else {
            return null;
        }
    }
    public function rules(): array
    {
       /* return [
            '*.email' => ['email', 'unique:users,email'],
       
        ];*/
      /*  return [
            'Region'=>'required|string',
            'Departement'=>'required|string',
            'Commune'=>'required|string',
            'Village'=>'required|string',
            'Statut Agreagequalite'=>'required|string',
            'Prenom et nom responsable'=>'required|string',
            'Contact responsable'=>'required|numeric',
            'Nombre de membres de organisation'=>'required',
            'Nombre de membres Femmes'=>'required|numeric',
            'Nombre de membres Hommes'=>'required|numeric',
            'Activités principales'=>'required|string',
            'MONTANT DE CREDIT RECU'=>'required|numeric',
            'SOURCE DE FINANCEMENT'=>'required|string',
        ];*/

        return [];
    }

  

    function chunkSize(): int {
        return 1000;
    }

    function checkifexist($value){
        $ligne_agreage_qualite= Organisation::find($value)->fisrt();
        if($ligne_agreage_qualite){
            //ds the things
 
        }else {
            return ;
        }
     } 
}
