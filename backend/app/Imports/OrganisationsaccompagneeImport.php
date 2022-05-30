<?php

namespace App\Imports;
use App\Models\Organisationsaccompagnee;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
HeadingRowFormatter::default('none');
class OrganisationsaccompagneeImport implements ToModel,SkipsOnError, WithHeadingRow, WithValidation
{
    use Importable,SkipsErrors; 
    
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $the_organisation=[
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'nom_organisation'=>$row['Nom organisation'],
            'statut_organisation'=>$row['Statut Organisation'],
            'prenom_et_nom_responsable'=>$row['Prenom et nom responsable'],
            'contact_responsable'=>$row['Contact responsable'],
            'nombre_membre_organisation'=>$row['Nombre de membres de organisation'],
            'nombre_femmes'=>$row['Nombre de membres Femmes'],
            'nombre_hommes'=>$row['Nombre de membres Hommes'],
            'activites_principales'=>$row['Activités principales'],
            'montant_credit_recu'=>$row['MONTANT DE CREDIT RECU'],
            'source_financement'=>$row['SOURCE DE FINANCEMENT'],
           
        ];
        $organisation= Organisationsaccompagnee::where([
            'region'=>$the_organisation['region'],
            'departement'=>$the_organisation['departement'],
            'commune'=>$the_organisation['commune'],
            'nom_organisation'=>$the_organisation['nom_organisation'],
            'statut_organisation'=>$the_organisation['statut_organisation'],
            'prenom_et_nom_responsable'=>$the_organisation['prenom_et_nom_responsable'],
            'contact_responsable'=>$the_organisation['contact_responsable'],
            'nombre_membre_organisation'=>$the_organisation['nombre_membre_organisation'],
            'nombre_femmes'=>$the_organisation['nombre_femmes'],
            'nombre_hommes'=>$the_organisation['nombre_hommes'],
            'activites_principales'=>$the_organisation['activites_principales'],
            'montant_credit_recu'=>$the_organisation['montant_credit_recu'],
            'source_financement'=>$the_organisation['source_financement'],   
        ])->first();
        
        if($organisation===null){
            return  new Organisationsaccompagnee($the_organisation);  
        }else {
            return null;
        }

        
    }

    public function rules(): array
    {
       
        return [
            'Region'=>'required|string',
            'Departement'=>'required|string',
            'Commune'=>'required|string',
            'Nom organisation'=>'required|string',
            'Statut Organisation'=>'required|string',
            'Prenom et nom responsable'=>'required|string',
            'Contact responsable'=>'required|numeric',
            'Nombre de membres de organisation'=>'required',
            'Nombre de membres Femmes'=>'required|numeric',
            'Nombre de membres Hommes'=>'required|numeric',
            'Activités principales'=>'required|string',
            'MONTANT DE CREDIT RECU'=>'required|numeric',
            'SOURCE DE FINANCEMENT'=>'required|string',
        ];
    }

    function chunkSize(): int {
        return 1000;
    }

    function checkifexist($value){
       $organisation= Organisation::find($value)->fisrt();
       if($organisation){
           //ds the things

       }else {
           return ;
       }
    } 
}
