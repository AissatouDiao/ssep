<?php

namespace App\Http\Controllers;

use App\Models\Piste;
use Illuminate\Http\Request;

class PistesController extends Controller
{
    public function getPistes(Request $request){

        $pistes= Piste::all();
        return $pistes;
    }

    public function deletePiste( $request){
        $piste= Piste::find($request);
        $piste->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function getPisteByCommuneId( $request){
        $piste= Piste::where('commune_id',$request)->first();
        return $piste;
      
    }

    public function getPisteById( $request){
        $piste= Piste::where('id',$request)->first();
        return $piste;
      
    }
    public function ajouterPiste(Request $request){
        Piste::create($request->all());
     
        return response()->json([
            "message"=>"Un nouvelle piste a été ajouté !",
        ]);
    }

    public function updatePiste(Request $request){
        $Piste=Piste::find($request->id);
        $Piste->nom=$request->nom;
        $Piste->commune_id=$request->commune_id;
        $Piste->kilometrage=$request->kilometrage;
        $Piste->coordonnees=$request->coordonnees;
        $Piste->save();
       return response()->json([
           "message"=>"Piste mis à jour avec succès !",
            "Piste"=>$Piste
       ]);

    }

}
