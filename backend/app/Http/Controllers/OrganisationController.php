<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
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
       $import=new OrganisationsImport;
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

    public function getOrganisations(Request $request){

        $organisations= Organisation::all();
        return $organisations;
    }

    public function deleteOrganisation( $request){
        $organisation= Organisation::find($request);
        $organisation->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function ajouterOrganisation(OrganisationRequest $request){
        Organisation::create($request->all());
     
        return response()->json([
            "message"=>"Un nouvelle organisation a été ajoutée !",
        ]);
    }

    public function updateOrganisation(OrganisationRequest $request){
        $Organisation=Organisation::find($request->id);
        $Organisation->libelle=$request->libelle;
        $Organisation->type=$request->type;
        $Organisation->apport_financier_total=$request->apport_financier_total;
        $Organisation->save();
       return response()->json([
           "message"=>"Organisation mise à jour avec succès !",
            "Organisation"=>$Organisation
       ]);

    }


    
}
 