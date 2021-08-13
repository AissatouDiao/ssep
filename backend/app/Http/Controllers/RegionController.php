<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function add(Request $request){
        Region::create($request->all());
        $lastRecordDate = Region::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle région a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }

    public function update(Request $request){
        $Region=Region::find($request->id);
        $Region->libelle=$request->libelle;
        $Region->save();
       return response()->json([
           "message"=>"Region mise à jour avec succès !",
            "Region"=>$Region
       ]);
    }

    public function delete( $request){
        $region= Region::find($request);
        $region->delete();
        return response()->json(["data" => "suppression effective!"]);
    }
    public function getRegionById( $request){
        $region= Region::find($request);
        return $region; 
    }

    public function getRegions(Request $request){
        $regions= Region::all();
        return $regions;
    }
}
