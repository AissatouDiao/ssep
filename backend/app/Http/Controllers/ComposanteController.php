<?php

namespace App\Http\Controllers;

use App\Models\Composante;
use Illuminate\Http\Request;

class ComposanteController extends Controller
{
    public function add(Request $request){
        Composante::create($request->all());
        $lastRecordDate = Composante::latest()->first();
        return response()->json([
            "message"=>"Un nouveau composante a été ajouté !",
            "last"=> $lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $composante=Composante::find($request->id);
        $composante->ptba_id=$request->ptba_id;
        $composante->libelle=$request->libelle;
        $composante->budget=$request->budget;
        $composante->save();
        return response()->json([
            "message"=>"Composante mis à jour !"
        ]);
    }
    
    public function delete($request){
        $composante= Composante::find($request);
        $composante->delete();
        return response()->json(["message" => "suppression composante effective!"]); 
        
    }

    public function getAll(){
        $composantes=Composante::all();
        return $composantes;
    }
}
