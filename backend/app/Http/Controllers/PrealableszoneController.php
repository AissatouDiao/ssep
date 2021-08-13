<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prealableszone;
use Illuminate\Support\Facades\File;

class PrealableszoneController extends Controller
{
    public function add(Request $request){

        $document = $request->file('prealable');
        $path;
        if($document){
            $repertoire='./documents/zones/prealables';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Prealableszone::create([
                "libelle"=>$request->libelle,
                "prealable"=>$path,
                "zone_id"=>$request->zone_id,        
            ]);
            $latest=Prealableszone::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }
    
    public function update(Request $request){
       $document = $request->file('prealable');
       
       $prealable=Prealableszone::find($request->id);
       
       if($prealable->prealable!=$request->prealable)
       { 
           File::delete($prealable->prealable);
           $path;
            if($document){
            $repertoire='./documents/zones/prealables';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $prealable->libelle=$request->libelle;
            $prealable->zone_id=$request->zone_id;
            $prealable->prealable=$path;

           $prealable->save();

            return response()->json([
                "message"=>"La décompte a été mis à jour avec succès  !",
                 "error"=>"La décompte n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

       $prealable->libelle=$request->libelle;
       $prealable->zone_id=$request->zone_id;
       $prealable->prealable=$request->prealable;
       
       $prealable->save();
       return response()->json([
           "message"=>"La décompte mis à jour avec succès !",
            "error"=>"La décompte n'a pu être mise à jour, veuillez revoir les données remplies."
       ]);
    }

    public function delete( $request){
        $zone= Prealableszone::find($request);
        $zone->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
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
