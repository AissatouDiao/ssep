<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    public function add(Request $request){
        Activite::create($request->all());
        $lastRecordDate = Activite::latest()->first();
        return response()->json([
            "message"=>"Un nouveau activite a été ajouté !",
            $lastRecordDate,
        ]);
    }
    
    public function update(Request $request){

        $activite=Activite::find($request->id);
        $activite->composante_id=$request->composante_id;
        $activite->libelle=$request->libelle;
        $activite->extrant=$request->extrant;
        $activite->budget=$request->budget;
        $activite->etat=$request->etat;
        $activite->pourcentage=$request->pourcentage;
        $activite->save();
        return response()->json([
            "message"=>"Activite mis à jour !"
        ]);

    }
    
    public function delete($request){
        $activite= Activite::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression activite effective!"]); 
        
    }

    public function getAll(){
        $activites=Activite::all();
        return $activites;
    }
}
