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
            'commune'=>$row['Commune/CR'],
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
            'commune'=>$agreage_qualite['commune'],
            'village'=>$agreage_qualite['village'],
            'nom_organisation_ou_producteur'=>$agreage_qualite['nom_organisation_ou_producteur'],
            'produit'=>$agreage_qualite['produit'],
            'date_controle'=>$agreage_qualite['date_controle'],
            'nombre_sacs_lot'=>$agreage_qualite['nombre_sacs_lot'],
            'poids_moyen_sac'=>$agreage_qualite['poids_moyen_sac'],
            'taux_humidite'=>$agreage_qualite['taux_humidite'],
            'taux_impurete'=>$agreage_qualite['taux_impurete'],
            'graines_immatures_taux'=>$agreage_qualite['graines_immatures_taux'],
            'conforme_code_qualite'=>$agreage_qualite['conforme_code_qualite'],
            'observations'=>$agreage_qualite['observations'],
            ])->first();
        if($ligne_agreage_qualite===null){
            return  new Agreagequalite($agreage_qualite);  
        }else {
            return null;
        }
    }
    public function rules(): array
    {

     return[
        'region'=>'required|string',
        'departement'=>'required|string',
        'commune'=>'required|string',
        'village'=>'required|string',
        'annee'=>'required|string',
        'nom_organisation_ou_producteur'=>'required|string',
        'produit'=>'required|string',
        'date_controle'=>'required|string',
        'nombre_sacs_lot'=>'required|numeric',
        'poids_moyen_sac'=>'required|numeric',
        'taux_humidite'=>'required|numeric',
        'taux_impurete'=>'required|numeric',
        'graines_immatures_taux'=>'required|numeric',
        'conforme_code_qualite'=>'required|string',
        'observations'=>'required|string'
     ];
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



      
    }

  

    function chunkSize(): int {
        return 1000;
    }

    function checkifexist($value){
        $ligne_agreage_qualite= Agreagequalite::find($value)->fisrt();
        if($ligne_agreage_qualite){
            //ds the things
 
        }else {
            return ;
        }
     } 
}
