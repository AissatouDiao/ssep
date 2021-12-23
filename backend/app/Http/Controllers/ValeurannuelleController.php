<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Valeurannuelle;

class ValeurannuelleController extends Controller
{
    public function add(Request $request){
        Valeurannuelle::create($request->all());
        $lastRecordDate = Valeurannuelle::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle valeur annuelle pour l'indicateur indicateur a été enregistré!",
             "last"=>$lastRecordDate,
        ]);
    }

    public function update(Request $request){
        $Valeurannuelle=Valeurannuelle::find($request->id);
        $Valeurannuelle->indicateur_id=$request->indicateur_id;
        $Valeurannuelle->annee=$request->annee;
        $Valeurannuelle->valeur=$request->valeur;
        $Valeurannuelle->save();
       return response()->json([
           "message"=>"Valeur annuelle mise à jour avec succès !",
            "Valeurannuelle"=>$Valeurannuelle
       ]);
    }
    public function delete( $request){
        $Valeurannuelle= Valeurannuelle::find($request);
        $Valeurannuelle->delete();
        return response()->json(["data" => "suppression effective!"]);
    }

    public function getvaleurannuelleById( $request){
        $Valeurannuelle= Valeurannuelle::find($request);
        return $Valeurannuelle; 
    }
    public function getvaleurannuellesByIndicateurId( $request){
        $Valeurannuelles= Valeurannuelle::where('indicateur_id',$request)->get();
        return $Valeurannuelles; 
    }

    public function getvaleurannuelles(Request $request){
        $Valeurannuelle= Valeurannuelle::all();
        return $Valeurannuelle;
    }

}
