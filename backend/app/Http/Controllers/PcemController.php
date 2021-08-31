<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Prealablescommuneexecutionmarche;

class PcemController extends Controller
{
    public function add(Request $request){

        $document = $request->file('prealable');
        $path;
        if($document){
            $repertoire='./documents/communes/executionmarche/prealables';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Prealablescommuneexecutionmarche::create([
                "libelle"=>$request->libelle,
                "prealable"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Prealablescommuneexecutionmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('prealable');
        
        $prealable=Prealablescommuneexecutionmarche::find($request->id);
        
        if($prealable->prealable!=$request->prealable)
        { 
            File::delete($prealable->prealable);
            $path;
             if($document){
             $repertoire='./documents/communes/executionmarche/prealables';
             $extension=$document->getClientOriginalExtension();
             do {
                 $nom = time() . '.' . $extension;
             } while(file_exists( $repertoire . '/' . $nom));
             $document->move( $repertoire, $nom);
             $path=$repertoire.'/'.$nom;
            
     
             $prealable->libelle=$request->libelle;
             $prealable->commune_id=$request->commune_id;
             $prealable->prealable=$path;
 
            $prealable->save();
 
             return response()->json([
                 "message"=>"Le prealable a été mis à jour avec succès  !",
                  "error"=>"Le prealable n'a pu être mise à jour, veuillez revoir les données remplies."
             ]); }
        }
 
        $prealable->libelle=$request->libelle;
        $prealable->commune_id=$request->commune_id;
        $prealable->prealable=$request->prealable;
        
        $prealable->save();
        return response()->json([
            "message"=>"Le prealable mis à jour avec succès !",
             "error"=>"Le prealable n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $prealable= Prealablescommuneexecutionmarche::find($request);
        $prealable->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getPrealableCommuneById( $request){
        $prealable= Prealablescommuneexecutionmarche::find($request);
        return $prealable; 
    }

    public function getPrealablescommuneexecutionmarches(Request $request){
        $prealable= Prealablescommuneexecutionmarche::all();
        return $prealable;
    }
}
