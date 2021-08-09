<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;

class ZoneController extends Controller
{
    public function add(Request $request){
        Zone::create($request->all());
        $lastRecordDate = Zone::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle zone a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $Zone=Zone::find($request->id);
        $Zone->libelle=$request->libelle;
        $Zone->save();
       return response()->json([
           "message"=>"Zone mis à jour avec succès !",
            "Zone"=>$Zone
       ]);
    }

    public function delete( $request){
        $zone= Zone::find($request);
        $zone->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }
    public function getZoneById( $request){
        $zone= Zone::find($request);
        return $zone; 
    }

    public function getZones(Request $request){
        $zones= Zone::all();
        return $zones;
    }
}
