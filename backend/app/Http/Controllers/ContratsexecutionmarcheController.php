<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Contratsexecutionmarche;


class ContratsexecutionmarcheController extends Controller
{
    public function add(Request $request){

        $document = $request->file('contrat');
        $path;
        if($document){
            $repertoire='./documents/communes/executionmarche/contrats';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $contrat = Contratsexecutionmarche::create([
                "libelle"=>$request->libelle,
                "contrat"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Contratsexecutionmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('contrat');
        
        $contrat=Contratsexecutionmarche::find($request->id);
        
        if($contrat->contrat!=$request->contrat)
        { 
            File::delete($contrat->contrat);
            $path;
             if($document){
             $repertoire='./documents/communes/executionmarche/contrats';
             $extension=$document->getClientOriginalExtension();
             do {
                 $nom = time() . '.' . $extension;
             } while(file_exists( $repertoire . '/' . $nom));
             $document->move( $repertoire, $nom);
             $path=$repertoire.'/'.$nom;
            
     
             $contrat->libelle=$request->libelle;
             $contrat->commune_id=$request->commune_id;
             $contrat->contrat=$path;
 
            $contrat->save();
 
             return response()->json([
                 "message"=>"Le contrat a été mis à jour avec succès  !",
                  "error"=>"Le contrat n'a pu être mise à jour, veuillez revoir les données remplies."
             ]); }
        }
 
        $contrat->libelle=$request->libelle;
        $contrat->commune_id=$request->commune_id;
        $contrat->contrat=$request->contrat;
        
        $contrat->save();
        return response()->json([
            "message"=>"Le contrat mis à jour avec succès !",
             "error"=>"Le contrat n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    
    public function delete( $request){
        $contrat= Contratsexecutionmarche::find($request);
        $contrat->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getContratEMCommuneById( $request){
        $contrat= Contratsexecutionmarche::find($request);
        return $contrat; 
    }

    public function getContratcommuneexecutionmarches(Request $request){
        $prealable= Contratsexecutionmarche::all();
        return $prealable;
    }
}
