<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organisationsaccompagnee;
use App\Imports\OrganisationsaccompagneeImport;

class OrganisationsaccompagneeController extends Controller
{
    public function importOrganisationaccompagneeFileToDatabase(Request $request){

        //Récupération du fichier et enregistrement en local
        $file=$request->file('fichier')->store('importation_organisationsaccompagnees'); 

       $import=new OrganisationsaccompagneeImport;
       $import->import($file);
      if($import->errors()){
        return response()->json(
            ["message"=>"Les nouvelles données ont été enregistrées."]
        );
      }else{
        return response()->json(
            ["message"=>"Les données ont été enregistrés dans la base de données.",
            "error"=>$import->errors()
            ]
        );
      }
    }

    public function getOrganisationaccompagnees(Request $request){

        $organisations= Organisationsaccompagnee::all();
        return $organisations;
    }
}
