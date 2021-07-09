<?php

namespace App\Http\Controllers;

use App\Models\Ptba;
use App\Models\Activite;
use App\Models\Composante;
use App\Models\Sousactivite;
use Illuminate\Http\Request;
use App\Models\Ptbapartenaire;
use Illuminate\Support\Facades\DB;
use App\Models\Composantepartenaire;
use App\Models\Activitepartenairefinancier;

class CalculBudgetsController extends Controller
{
   public function getsousactivitebudgettotal(Request $request){
    $budget_sa= DB::table('sousactivitepartenaires')->where('sousactivite_id',$request->id)->get()->sum('budget');
    $sa= Sousactivite::find($request->id);
    $sa->cout_estimatif= $budget_sa;$sa->save();
    return $budget_sa;
   }

   public function getactivitebudgettotal(Request $request){
    $budget_a= DB::table('sousactivites')->where('activite_id',$request->id)->get()->sum('cout_estimatif');
    $a= Activite::find($request->id);
    $a->budget= $budget_a;$a->save();
    return $budget_a;
   }

   public function getcomposantebudgettotal(Request $request){
    $budget_c= DB::table('activites')->where('composante_id',$request->id)->get()->sum('budget');
    $c= Composante::find($request->id);
    $c->budget= $budget_c;$c->save();
    return $budget_c;
   }

   public function getptbabudgettotal(Request $request){
    $budget_p= DB::table('composantes')->where('ptba_id',$request->id)->get()->sum('budget');
    $p= Ptba::find($request->id);
    $p->budget=$budget_p;
    $p->save();
    return $budget_p;
   }

   public function getpartenairesactivites(Request $request){
    $sous_activite_by_id= DB::table('sousactivites')->where('activite_id',$request->id)->get();
    foreach ($sous_activite_by_id as $value){
    $sous_activitepartenaire_by_id= DB::table('sousactivitepartenaires')->where('sousactivite_id',$value->id)->get();
    foreach($sous_activitepartenaire_by_id as $v){
      if(Activitepartenairefinancier::where(['activite_id'=>$request->id,'partenaire_id'=>$v->partenaire_id])->exists()!=true){
         $activitepartenaire=[
            "activite_id"=>$request->id,
            "partenaire_id"=>$v->partenaire_id,
            "budget"=>$v->budget
         ];
         Activitepartenairefinancier::create($activitepartenaire);
         //return response()->json(["message"=>"nouveau enregistré!"]);
      }else{
         $partenaireactivite=Activitepartenairefinancier::where('activite_id',$request->id)->first();
         $partenaireactivite->budget=$partenaireactivite->budget + $v->budget;
         $partenaireactivite->save();
         //return response()->json(["message"=>"nouveau enregistré!"]);
      }
    }
   } return response()->json(["message"=>$sous_activitepartenaire_by_id]);
   }

   public function getpartenairesacomposantes(Request $request){
      $activite_by_id= DB::table('activites')->where('composante_id',$request->id)->get();
      foreach ($activite_by_id as $value){
      $activitepartenaire_by_id= DB::table('activitepartenairefinanciers')->where('activite_id',$value->id)->get();
      foreach($activitepartenaire_by_id as $v){
        if(Composantepartenaire::where(['composante_id'=>$request->id,'partenaire_id'=>$v->partenaire_id])->exists()!=true){
           $composantepartenaire=[
              "composante_id"=>$request->id,
              "partenaire_id"=>$v->partenaire_id,
              "budget"=>$v->budget
           ];
           Composantepartenaire::create($composantepartenaire);
           //return response()->json(["message"=>"nouveau enregistré!"]);
        }else{
           $partenairecomposante=Composantepartenaire::where('composante_id',$request->id)->first();
           $partenairecomposante->budget=$partenairecomposante->budget + $v->budget;
           $partenairecomposante->save();
           //return response()->json(["message"=>"nouveau enregistré!"]);
        }
      }
     } return response()->json(["message"=>"ok!"]);
   }

   public function getpartenairesptbas(Request $request){
      $composante_by_id= DB::table('composantes')->where('ptba_id',$request->id)->get();
      foreach ($composante_by_id as $value){
      $composantepartenaire_by_id= DB::table('composantepartenaires')->where('composante_id',$value->id)->get();
      foreach($composantepartenaire_by_id as $v){
        if(Ptbapartenaire::where(['ptba_id'=>$request->id,'partenaire_id'=>$v->partenaire_id])->exists()!=true){
           $ptbapartenaire=[
              "ptba_id"=>$request->id,
              "partenaire_id"=>$v->partenaire_id,
              "budget"=>$v->budget
           ];
           Ptbapartenaire::create($composantepartenaire);
           //return response()->json(["message"=>"nouveau enregistré!"]);
        }else{
           $partenaireptba=Ptbapartenaire::where('ptba_id',$request->id)->first();
           $partenaireptba->budget=$partenaireptba->budget + $v->budget;
           $partenaireptba->save();
           //return response()->json(["message"=>"nouveau enregistré!"]);
        }
      }
     } return response()->json(["message"=>"ok!"]);
   }


}
