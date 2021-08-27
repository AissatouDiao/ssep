<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Garantiesexecutionmarche;

class GarantiesexecutionmarcheController extends Controller
{
    public function add(Request $request){

        $document = $request->file('garantie');
        $path;
        if($document){
            $repertoire='./documents/communes/executionmarche/garanties';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $garantie = Garantiesexecutionmarche::create([
                "libelle"=>$request->libelle,
                "garantie"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Garantiesexecutionmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('garantie');
        
        $garantie=Garantiesexecutionmarche::find($request->id);
        
        if($garantie->garantie!=$request->garantie)
        { 
            File::delete($garantie->garantie);
            $path;
             if($document){
             $repertoire='./ documents/communes/executionmarche/garanties';
             $extension=$document->getClientOriginalExtension();
             do {
                 $nom = time() .'.' . $extension;
             } while(file_exists( $repertoire . '/' . $nom));
             $document->move( $repertoire, $nom);
             $path=$repertoire.'/'.$nom;
            
     
             $garantie->libelle=$request->libelle;
             $garantie->commune_id=$request->commune_id;
             $garantie->garantie=$path;
 
            $garantie->save();
 
             return response()->json([
                 "message"=>"La garantie a été mis à jour avec succès  !",
                  "error"=>"La garantie n'a pu être mise à jour, veuillez revoir les données remplies."
             ]); }
        }
 
        $garantie->libelle=$request->libelle;
        $garantie->commune_id=$request->commune_id;
        $garantie->garantie=$request->garantie;
        
        $garantie->save();
        return response()->json([
            "message"=>"La garantie mis à jour avec succès !",
             "error"=>"La garantie n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $garantie= Garantiesexecutionmarche::find($request);
        $garantie->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getGarantieEMCommuneById( $request){
        $garantie= Garantiesexecutionmarche::find($request);
        return $garantie; 
    }

    public function getGarantiesexecutionmarches(Request $request){
        $garantie= Garantiesexecutionmarche::all();
        return $garantie;
    }
}
