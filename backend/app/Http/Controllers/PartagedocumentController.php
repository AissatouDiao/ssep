<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partagedocument;
use Illuminate\Support\Facades\File;
use App\Http\Requests\PartagedocumentRequest;

class PartagedocumentController extends Controller
{
    //documentpartage
    public function add(PartagedocumentRequest $request){
      
        $document = $request->file('documentpartage');
        $path;
            
        if($document){
            $repertoire='./documents/partagedocuments';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $partagedocument = Partagedocument::create([
                "titre"=>$request->titre,
                "documentpartage"=>$path,
                "user_id"=>$request->user_id,
               
            ]);
        }
       
     
        return response()->json(["message" => "enregistrement du document effectué !"]);
       
       
    }

    public function delete($request){
        $partagedocument= Partagedocument::find($request);
        $partagedocument->delete();
        return response()->json(["message" => "suppression du document effective!"]); 
        
    }

    public function update(PartagedocumentRequest $request){
        $document = $request->file('documentpartage');
       
       $partagedocument=Partagedocument::find($request->id);
       
       if($partagedocument->documentpartage!=$request->documentpartage)
       { 
           File::delete($partagedocument->documentpartage);
           $path;
            if($document){
            $repertoire='./documents/partagedocuments';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $partagedocument->titre=$request->titre;
            $partagedocument->user_id=$request->user_id;
            $partagedocument->documentpartage=$path;

           $partagedocument->save();

            return response()->json([
                "message"=>"Le document a été mis à jour avec succès  !",
                 "error"=>"Le document n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

      
       $partagedocument->titre=$request->titre;
       $partagedocument->user_id=$request->user_id;
       $partagedocument->documentpartage=$request->documentpartage;
       
    

       $partagedocument->save();
       return response()->json([
           "message"=>"partagedocument mis à jour avec succès !",
            "error"=>"La partagedocument n'a pu être mise à jour, veuillez revoir les données remplies."
       ]);

    }

    public function getDocumentpartages(){
        $partagedocuments= Partagedocument::all();
        return $partagedocuments;
    }

}
