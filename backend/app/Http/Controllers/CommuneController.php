<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use Illuminate\Http\Request;

class CommuneController extends Controller
{
    public function add(Request $request){
        Commune::create($request->all());
        $lastRecordDate = Commune::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle commune a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }

    public function update(Request $request){
        $Commune=Commune::find($request->id);
        $Commune->libelle=$request->libelle;
        $Commune->save();
       return response()->json([
           "message"=>"Commune mise à jour avec succès !",
            "Commune"=>$Commune
       ]);
    }

    public function delete( $request){
        $commune= Commune::find($request);
        $commune->delete();
        return response()->json(["data" => "suppression effective!"]);
    }
    public function getCommuneById( $request){
        $commune= Commune::find($request);
        return $commune; 
    }

    public function getCommunes(Request $request){
        $communes= Commune::all();
        return $communes;
    }
}
