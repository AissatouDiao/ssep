<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use App\Imports\FormationImport;

class FormationController extends Controller
{
    public function importFormationFileToDatabase(Request $request){

        //Récupération du fichier et enregistrement en local
        $file=$request->file('fichier')->store('importation_formations'); 

        //Ajout d'une nouvelle importation
       // (new FormationsImport)->import($file);
       $import=new FormationImport;
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

    public function getFormations(Request $request){

        $organisations= Formation::all();
        return $organisations;
    }

    public function deleteFormation( $request){
        $organisation= Formation::find($request);
        $organisation->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function ajouterFormation(FormationRequest $request){
        Formation::create($request->all());
     
        return response()->json([
            "message"=>"Un nouvelle organisation a été ajoutée !",
        ]);
    }

    public function updateFormation(FormationRequest $request){
        $Formation=Formation::find($request->id);
        $Formation->libelle=$request->libelle;
        $Formation->type=$request->type;
        $Formation->apport_financier_total=$request->apport_financier_total;
        $Formation->save();
       return response()->json([
           "message"=>"Formation mise à jour avec succès !",
            "Formation"=>$Formation
       ]);

    }
}
