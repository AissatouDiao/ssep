<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Passationmarche;

class PassationmarcheController extends Controller
{
    //passationmarche
    public function add(Request $request){
      
        $document = $request->file('passationmarche');
        $path;
            
        if($document){
            $repertoire='./documents/passationsmarche';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $passationmarche = Passationmarche::create([
                "libelle"=>$request->libelle,
                "passationmarche"=>$path,
                "user_id"=>$request->user_id,
                "auteur"=>$request->auteur,
                "statut"=>$request->statut        
            ]);
            $latest=Passationmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
   
        }

    }

    public function delete($request){
        $passationmarche= Passationmarche::find($request);
        $passationmarche->delete();
        return response()->json(["message" => "suppression du document effective!"]); 
        
    }

    public function update(Request $request){
       $document = $request->file('passationmarche');
       
       $passationmarche=Passationmarche::find($request->id);
       
       if($passationmarche->passationmarche!=$request->passationmarche)
       { 
           File::delete($passationmarche->passationmarche);
           $path;
            if($document){
            $repertoire='./documents/passationsmarche';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $passationmarche->libelle=$request->libelle;
            $passationmarche->user_id=$request->user_id;
            $passationmarche->passationmarche=$path;
            $passationmarche->auteur=$request->auteur;
            $passationmarche->statut=$request->statut;

           $passationmarche->save();

            return response()->json([
                "message"=>"L'évaluation a été mis à jour avec succès  !",
                 "error"=>"L'évaluation n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

    
       $passationmarche->user_id=$request->user_id;
       $passationmarche->libelle=$request->libelle;
       $passationmarche->passationmarche=$request->passationmarche;
       $passationmarche->auteur=$request->auteur;
       $passationmarche->statut=$request->statut;
       $passationmarche->save();
       return response()->json([
           "message"=>"Passation mis à jour avec succès !",
            "error"=>"La passation de marché n'a pu être mise à jour, veuillez revoir les données remplies."
       ]);

    }

    public function getPassationmarches(){
        $passationmarches=Passationmarche::all();
        return $passationmarches;
    }

    
    public function changeStatut( Request $request){
        $passationmarche=Passationmarche::find($request->id);
        $passationmarche->statut=$request->statut;
        $passationmarche->save();
        return response()->json([
            "message" => "Statut Passation Marché mis à jour",      
        ]); 
    }

}
