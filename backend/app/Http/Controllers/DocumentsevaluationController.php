<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Documentsevaluation;
use App\Http\Requests\DocumentevaluationRequest;

class DocumentsevaluationController extends Controller
{
    //documentpartage
    public function add(DocumentevaluationRequest $request){
      
        $document = $request->file('evaluation');
        $path;
            
        if($document){
            $repertoire='./documents/evaluations';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Documentsevaluation::create([
                "titre"=>$request->titre,
                "evaluation"=>$path,
                "user_id"=>$request->user_id,        
            ]);
            $latest=Documentsevaluation::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
   
        }

    }

    public function delete($request){
        $evaluation= Documentsevaluation::find($request);
        $evaluation->delete();
        return response()->json(["message" => "suppression du document effective!"]); 
        
    }

    public function update(DocumentevaluationRequest $request){
        $document = $request->file('evaluation');
       
       $evaluation=Documentsevaluation::find($request->id);
       
       if($evaluation->documentpartage!=$request->documentpartage)
       { 
           File::delete($evaluation->documentpartage);
           $path;
            if($document){
            $repertoire='./documents/evaluations';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $evaluation->titre=$request->titre;
            $evaluation->user_id=$request->user_id;
            $evaluation->evaluation=$path;

           $evaluation->save();

            return response()->json([
                "message"=>"L'évaluation a été mis à jour avec succès  !",
                 "error"=>"L'évaluation n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

      
       $evaluation->titre=$request->titre;
       $evaluation->user_id=$request->user_id;
       $evaluation->evaluation=$request->evaluation;
       
    

       $evaluation->save();
       return response()->json([
           "message"=>"evaluation mis à jour avec succès !",
            "error"=>"L'évaluation n'a pu être mise à jour, veuillez revoir les données remplies."
       ]);

    }

    public function getEvaluations(){
        $evaluations=Documentsevaluation::all();
        return $evaluations;
    }
}
