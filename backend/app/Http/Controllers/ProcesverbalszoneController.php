<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProcesverbalszoneController extends Controller
{
    public function add(Request $request){
        Procesverbalszone::create($request->all());
        $lastRecordDate = Procesverbalszone::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle zone a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $Procesverbalszone=Procesverbalszone::find($request->id);
        $Procesverbalszone->libelle=$request->libelle;
        $Procesverbalszone->save();
       return response()->json([
           "message"=>"Procesverbalszone mis à jour avec succès !",
            "Procesverbalszone"=>$Procesverbalszone
       ]);
    }

    public function delete( $request){
        $procesverbal= Procesverbalszone::find($request);
        $procesverbal->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }
    public function getProcesVerbalById( $request){
        $pv= Procesverbalszone::find($request);
        return $pv; 
    }

    public function getZoneProcesVerbalById( $request){
        $zone= Procesverbalszone::find($request);
        return $zone; 
    }

    public function getProcesverbalszones(Request $request){
        $procesverbals= Procesverbalszone::all();
        return $procesverbals;
    }
}
