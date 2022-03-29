<?php

namespace App\Http\Controllers;

use App\Models\Piste;
use Illuminate\Http\Request;
use App\Models\Pistetravauxavancement;

class AvancementtravauxController extends Controller
{
    public function getAvancementTravaux(Request $request){

        $avancementtravauxs= Pistetravauxavancement::all();
        return $avancementtravauxs;
    }

    public function deleteAvancementTravaux( $request){
        $avancementtravaux= Pistetravauxavancement::find($request);
        $avancementtravaux->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }

    public function getAvancementTavauxPisteId( $request){
        $avancementtravaux= Pistetravauxavancement::where('piste_id',$request)->get();
        return $avancementtravaux;
      
    }
    public function ajouterAvancementTravaux(Request $request){
        $avancementspistes= $this->getAvancementTavauxPisteId($request->id);
        $pourcentagetotal_p= Pistetravauxavancement::where('piste_id',$request->piste_id)->sum('p_physique');
        $pourcentagetotal_f= Pistetravauxavancement::where('piste_id',$request->piste_id)->sum('p_financier');
        $reste_p= 100 - $pourcentagetotal_p;
        $reste_f= 100 - $pourcentagetotal_f;
        if((($pourcentagetotal_p<100) and ($pourcentagetotal_f<100)) and (($reste_p >= $request->p_physique)and($reste_f>=$request->p_financier))){
            Pistetravauxavancement::create($request->all());
            $piste= Piste::where('id',$request->piste_id)->first();
            $piste->pourcentagephysique=$request->p_physique;
            $piste->pourcentagefinancier=$request->p_financier;
            return response()->json([
                "message"=>"Un nouvel avancement a été ajouté !",
            ]);
        }else{
     
            return response()->json([
                "message"=>"Pourcentages impossible à ajouter, veuillez revoir vos chiffres.",
            ]);
        }
     
    }

    public function getpourcentages($request){
        $pourcentagetotal_p= Pistetravauxavancement::where('piste_id',$request)->sum('p_physique');
        $pourcentagetotal_f= Pistetravauxavancement::where('piste_id',$request)->sum('p_financier');
        return response()->json([
            "pourcentagePhysique"=>$pourcentagetotal_p,
            "pourcentageFinancier"=>$pourcentagetotal_f
        ]);

    }

    public function updateAvancementTravaux(Request $request){
        $avancementtravaux=Pistetravauxavancement::find($request->id);
        $avancementtravaux->piste_id=$request->piste_id;
        $avancementtravaux->mois_id=$request->mois_id;
        $avancementtravaux->p_physique=$request->p_physique;
        $avancementtravaux->p_financier=$request->p_financier;
        $avancementtravaux->save();
       return response()->json([
           "message"=>"Avancement Travaux mis à jour avec succès !",
            "Piste"=>$avancementtravaux
       ]);

    }
}
