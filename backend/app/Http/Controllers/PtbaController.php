<?php

namespace App\Http\Controllers;

use App\Models\Ptba;
use Illuminate\Http\Request;

class PtbaController extends Controller
{
    public function add(Request $request){
        Ptba::create($request->all());
        $lastRecordDate = Ptba::latest()->first();
        return response()->json([
            "message"=>"Un nouveau ptba a été ajouté !",
            "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $ptba=Ptba::find($request->id);
        $ptba->libelle=$request->libelle;
        $ptba->annee=$request->annee;
        $ptba->budget=$request->budget;
        $ptba->save();
        return response()->json([
            "message"=>"Ptba mis à jour !"
        ]);
    }
    public function delete($request){
        $ptba= Ptba::find($request);
        $ptba->delete();
        return response()->json(["message" => "suppression ptba effective!"]); 
        
    }

    public function getAll(){
        $ptbas=Ptba::all();
        return $ptbas;
    }

 

}
