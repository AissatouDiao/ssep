<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\OrganisationsImport;
use Maatwebsite\Excel\Facades\Excel;

class OrganisationController extends Controller
{
    public function importOrganisationFileToDatabase(Request $request){

        //Récupération du fichier et enregistrement en local
        $file=$request->file('fichier')->store('importation_organisations'); 

        //Ajout d'une nouvelle importation
       // (new OrganisationsImport)->import($file);
        Excel::import(new OrganisationsImport,$file);

        return response()->json(
            ["message"=>"Les données ont été enregistrés dans la base de données.",
          
            ]
        );
    }
}
 