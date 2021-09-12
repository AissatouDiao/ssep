<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pistetravauxavancement;

class AvancementtravauxController extends Controller
{
    public function getAvancementTravaux(Request $request){

        $avancementtravauxs= Pistetravauxavancement::all();
        return $avancementtravauxs;
    }

    public function deleteAvancementTravaux( $request){
        $avancementtravaux= Pistetravauxavancement::find($request);
        $avancementtravaux->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function getAvancementTavauxPisteId( $request){
        $avancementtravaux= Pistetravauxavancement::where('piste_id',$request)->get();
        return $avancementtravaux;
      
    }
    public function ajouterAvancementTravaux(Request $request){
        Pistetravauxavancement::create($request->all());
     
        return response()->json([
            "message"=>"Un nouvel avancement a été ajouté !",
        ]);
    }

    public function updateAvancementTravaux(Request $request){
        $avancementtravaux=Pistetravauxavancement::find($request->id);
        $avancementtravaux->nom=$request->nom;
        $avancementtravaux->commune_id=$request->commune_id;
        $avancementtravaux->kilometrage=$request->kilometrage;
        $avancementtravaux->save();
       return response()->json([
           "message"=>"Piste mis à jour avec succès !",
            "Piste"=>$avancementtravaux
       ]);

    }
}
