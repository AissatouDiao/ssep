<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recommandation;
use Illuminate\Support\Facades\File;
use App\Http\Requests\RecommandationRequest;

class RecommandationController extends Controller
{
    public function add(RecommandationRequest $request){
      
        $document = $request->file('recommandation');
        $path;
            
        if($document){
            $repertoire='./documents/recommandations';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
        }
       
        $recommandation = Recommandation::create([
            "titre"=>$request->titre,
            "recommandation"=>$path,
            "date_finale"=>$request->date_finale,
            "statut"=>$request->statut
        ]);
        return response()->json(["message" => "enregistrement effectué !"]);
       
       
    }

    public function delete($request){
        $recommandation= Recommandation::find($request);
        $recommandation->delete();
        return response()->json(["data" => "suppressonn recommandation effective!"]); 
        
    }

    public function update(RecommandationRequest $request){
        $document = $request->file('recommandation');
       
       $recommandation=Recommandation::find($request->id);
       
       if($recommandation->recommandation!=$request->recommandation)
       { 
           File::delete($recommandation->recommandation);
           $path;
            if($document){
            $repertoire='./documents/recommandations';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $recommandation->titre=$request->titre;
            $recommandation->recommandation=$path;
            $recommandation->date_finale=$request->date_finale;
            $recommandation->statut=$request->statut; 

           $recommandation->save();

            return response()->json([
                "message"=>"recommandation avec nouveau document mis à jour avec succès  !",
                 "error"=>"La recommandation n'a pu être effectuée, veuillez revoir les données remplies."
            ]); }
       }

      
       $recommandation->titre=$request->titre;
       $recommandation->recommandation=$request->recommandation;
       $recommandation->date_finale=$request->date_finale;
       $recommandation->statut=$request->statut;

       $recommandation->save();
       return response()->json([
           "message"=>"recommandation mis à jour avec succès !",
            "error"=>"La recommandation n'a pu être effectuée, veuillez revoir les données remplies."
       ]);

    }

    public function getRecommandations(){
        $recommandations= Recommandation::all();
        return $recommandations;
    }

    public function changeStatut( Request $request){
        $recommandation=Recommandation::find($request->id);
        $recommandation->statut=$request->statut;
        $recommandation->save();
        return response()->json([
            "message" => "recommandation mis à jour",
            
            ]); 
    }
}

