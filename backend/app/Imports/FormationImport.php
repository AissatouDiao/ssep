<?php

namespace App\Imports;

use App\Models\Formation;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
HeadingRowFormatter::default('none');
class FormationImport implements ToModel,SkipsOnError, WithHeadingRow, WithValidation
{
    use Importable,SkipsErrors;
  /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    
    public function model(array $row)
    {
        $the_formation=[
            'region'=>$row['Région'],
            'departement'=>$row['Département'],
            'commune'=>$row['Commune'],
            'village'=>$row['Village'],
            'prenom_nom'=>$row['Prénom & Nom'],
            'genre'=>$row['Genre'],
            'organisation_base'=>$row['Organisation de base'],
            'date_formation'=>$row['Date de formation'],
            'theme_formation'=>$row['Theme'],
            'telephone'=>$row['Téléphone'],
            'lieu_formation'=>$row['Lieu de formation'],
            'relais'=>$row['Relais'],
            'telephone_relais'=>$row['N° téléphone relais'],
        ];
        $formation= Formation::where([
            'region'=>$the_formation['region'],
            'departement'=>$the_formation['departement'],
            'commune'=>$the_formation['commune'],
            'village'=>$the_formation['village'],
            'prenom_nom'=>$the_formation['prenom_nom'],
            'genre'=>$the_formation['genre'],
            'organisation_base'=>$the_formation['organisation_base'],
            'date_formation'=>$the_formation['date_formation'],
            'theme_formation'=>$the_formation['theme_formation'],
            'telephone'=>$the_formation['telephone'],
            'lieu_formation'=>$the_formation['lieu_formation'],
            'relais'=>$the_formation['relais'],
            'telephone_relais'=>$the_formation['telephone_relais'],
            ])->first();
        if($formation===null){
            return  new Formation($the_formation);  
        }else {
            return null;
        }

       /* return new Formation([
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'village'=>$row['Nom organisation'],
            'prenom_nom'=>$row['Statut Formation'],
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

    public function rules(): array
    {
       /* return [
            '*.email' => ['email', 'unique:users,email'],
       
        ];*/

        return[
        'Région'=>'required|string',
        'Département'=>'required|string',
        'Commune'=>'required|string',
        'Village'=>'required|string',
        'Prénom & Nom'=>'required|string',
        'Genre'=>'required|string',
        'Organisation de base'=>'required|string',
        'Date de formation'=>'required|date',
        'Theme'=>'required|string',
        'Téléphone'=>'required|numeric',
        'Lieu de formation'=>'required|string',
        'Relais'=>'required|string',
        'N° téléphone relais'=>'required|numeric',
        ];
    }

    function chunkSize(): int {
        return 1000;
    }
}
