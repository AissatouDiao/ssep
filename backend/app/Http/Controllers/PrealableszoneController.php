<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prealableszone;

class PrealableszoneController extends Controller
{
    public function add(Request $request){
        Prealableszone::create($request->all());
        $lastRecordDate = Prealableszone::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle zone a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $Prealableszone=Prealableszone::find($request->id);
        $Prealableszone->libelle=$request->libelle;
        $Prealableszone->save();
       return response()->json([
           "message"=>"Prealableszone mis à jour avec succès !",
            "Prealableszone"=>$Prealableszone
       ]);
    }

    public function delete( $request){
        $zone= Prealableszone::find($request);
        $zone->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }
    public function getPrealableById( $request){
        $prealable= Prealableszone::find($request);
        return $prealable; 
    }
    public function getZonePrealableById( $request){
        $zone= Prealableszone::find($request);
        return $zone; 
    }

    public function getPrealableszones(Request $request){
        $zones= Prealableszone::all();
        return $zones;
    }
}
