<?php

namespace App\Http\Controllers;

use App\Models\Indicateur;
use Illuminate\Http\Request;
use App\Models\Valeurannuelle;

class IndicateurController extends Controller
{
    public function add(Request $request){
        Indicateur::create($request->all());  
        $lastRecordDate = Indicateur::latest()->first();
        $valeur_annuelle=[
            'indicateur_id'=>$lastRecordDate->id,
            'annee'=>0,
            'valeur'=>null,
        ];
        for($i=0; $i<$lastRecordDate->nombre_annees; $i++) {
            $valeur_annuelle['annee']=$lastRecordDate->annee_debut+$i;
            Valeurannuelle::create($valeur_annuelle);
 
        }
        return response()->json([
            "message"=>"Un nouvel indicateur a été enregistré!",
             "last"=>$lastRecordDate,
        ]);
    }

    public function update(Request $request){
        $Indicateur=Indicateur::find($request->id);
        $Indicateur->nom=$request->nom;
        $Indicateur->description=$request->description;
        $Indicateur->type=$request->type;
        $Indicateur->annee_debut=$request->annee_debut;
        $Indicateur->nombre_annees=$request->nombre_annees;
        $Indicateur->valeur_reference=$request->valeur_reference;
        $Indicateur->valeur_cible=$request->valeur_cible;
        $Indicateur->save();
       return response()->json([
           "message"=>"L'indicateur mise à jour avec succès !",
            "Indicateur"=>$Indicateur
       ]);
    }
    public function delete( $request){
        $indicateur= Indicateur::find($request);
        $indicateur->delete();
        return response()->json(["data" => "suppression effective!"]);
    }

    public function getindicateurById( $request){
        $indicateur= Indicateur::find($request);
        return $indicateur; 
    }

    public function getindicateurs(Request $request){
        $indicateurs= Indicateur::all();
        return $indicateurs;
    }

}
