<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prealablescommune;
use Illuminate\Support\Facades\File;

class PrealablescommuneController extends Controller
{
    public function add(Request $request){

        $document = $request->file('prealable');
        $path;
        if($document){
            $repertoire='./documents/communes/prealables';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Prealablescommune::create([
                "libelle"=>$request->libelle,
                "prealable"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Prealablescommune::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('prealable');
        
        $prealable=Prealablescommune::find($request->id);
        
        if($prealable->prealable!=$request->prealable)
        { 
            File::delete($prealable->prealable);
            $path;
             if($document){
             $repertoire='./documents/communes/prealables';
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
        $prealable= Prealablescommune::find($request);
        $prealable->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getPrealableCommuneById( $request){
        $prealable= Prealablescommune::find($request);
        return $prealable; 
    }

    public function getPrealablescommunes(Request $request){
        $prealable= Prealablescommune::all();
        return $prealable;
    }


}
