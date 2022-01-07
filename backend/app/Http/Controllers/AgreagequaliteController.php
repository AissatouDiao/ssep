<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Agreagequalite;
use App\Imports\AgreagequaliteImport;

class AgreagequaliteController extends Controller
{
    public function importAgreagequaliteFileToDatabase(Request $request){

        //Récupération du fichier et enregistrement en local
        $file=$request->file('fichier')->store('importation_agreagequalites'); 

        //Ajout d'une nouvelle importation
       // (new AgreagequalitesImport)->import($file);
       $import=new AgreagequaliteImport;
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

    public function getAgreagequalites(Request $request){

        $agreagequalites= Agreagequalite::all();
        return $agreagequalites;
    }

    public function deleteAgreagequalite( $request){
        $agreagequalite= Agreagequalite::find($request);
        $agreagequalite->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function ajouterAgreagequalite(AgreagequaliteRequest $request){
        Agreagequalite::create($request->all());
     
        return response()->json([
            "message"=>"Un nouvelle agreagequalite a été ajoutée !",
        ]);
    }

    public function updateAgreagequalite(AgreagequaliteRequest $request){
        $Agreagequalite=Agreagequalite::find($request->id);
        $Agreagequalite->libelle=$request->libelle;
        $Agreagequalite->type=$request->type;
        $Agreagequalite->apport_financier_total=$request->apport_financier_total;
        $Agreagequalite->save();
       return response()->json([
           "message"=>"Agreagequalite mise à jour avec succès !",
            "Agreagequalite"=>$Agreagequalite
       ]);

    }
}
