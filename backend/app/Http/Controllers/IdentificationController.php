<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\IdentificationImport;

class IdentificationController extends Controller
{
    public function importIdentificationFileToDatabase(Request $request){

        //Récupération du fichier et enregistrement en local
        $file=$request->file('fichier')->store('importation_identifications'); 

        //Ajout d'une nouvelle importation
        // (new IdentificationImport)->import($file);
        $import=new IdentificationImport;
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
}
