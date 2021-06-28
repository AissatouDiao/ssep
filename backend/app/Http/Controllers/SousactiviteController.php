<?php

namespace App\Http\Controllers;

use App\Models\Sousactivite;
use Illuminate\Http\Request;

class SousactiviteController extends Controller
{
    public function add(Request $request){
        Sousactivite::create($request->all());
        $lastRecordDate = Sousactivite::latest()->first();
        return response()->json([
            "message"=>"Une nouvelle sous-activité a été ajouté !",
            "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){

        $sousactivite=Sousactivite::find($request->id);
        $sousactivite->composante_id=$request->composante_id;
        $sousactivite->libelle=$request->libelle;
        $sousactivite->extrant=$request->extrant;
        $sousactivite->etat=$request->etat;
        $sousactivite->pourcentage=$request->pourcentage;
        $sousactivite->save();
        return response()->json([
            "message"=>"sous-activité mis à jour !"
        ]);

    }
    
    public function delete($request){
        $sousactivite= Sousactivite::find($request);
        $sousactivite->delete();
        return response()->json(["message" => "suppression sous-activité effective !"]); 
        
    }

    public function getAll(){
        $sousactivites=Sousactivite::all();
        return $sousactivites;
    }
}
