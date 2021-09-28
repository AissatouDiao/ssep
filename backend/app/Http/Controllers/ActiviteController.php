<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Activitepartenaireassocie;
use App\Models\Activitepartenairefinancier;
use App\Models\Activitepartenairesponsable;

class ActiviteController extends Controller
{
    public function add(Request $request){
        Activite::create($request->all());
        $lastRecordDate = Activite::latest()->first();
        return response()->json([
            "message"=>"Un nouveau activite a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }

    public function addPartenairesAssocies(Request $request){
        Activitepartenaireassocie::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire associé a été ajouté !",
        ]);
    }

    public function addPartenaireFinanciers(Request $request){
        Activitepartenairefinancier::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire financier a été ajouté !",
        ]);
    }

    public function addPartenairesponsables(Request $request){
        Activitepartenairesponsable::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire responsable a été ajouté !",
        ]);
    }


    
    public function update(Request $request){

        $activite=Activite::find($request->id);
        $activite->composante_id=$request->composante_id;
        $activite->libelle=$request->libelle;
        $activite->extrant=$request->extrant;
        $activite->budget=$request->budget;
        $activite->etat=$request->etat;
        $activite->pourcentage=$request->pourcentage;
        $activite->save();
        return response()->json([
            "message"=>"Activite mis à jour !"
        ]);

    }
    
    public function delete($request){
        $activite= Activite::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression activite effective!"]); 
        
    }

    public function deletepartenaireassocie($request){
        $activite= Activitepartenaireassocie::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression partenaire associe effective!"]); 
        
    }
    
    public function deletepartenairefinancier($request){
        $activite= Activitepartenairefinancier::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression partenaire financier effective!"]); 
        
    }
    
    public function deletepartenaireresponsable($request){
        $activite= Activitepartenairesponsable::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression partenaire responsable effective!"]); 
        
    }

    public function getAll(){
        $activites=Activite::all();
        foreach($activites as $a){
            $this->getactivitebudgettotal($a);
            $this->getpartenairesactivites($a);
        }
        return $activites;
    }

    public function getactivitebudgettotal( $objet){
        $budget_a= DB::table('sousactivites')->where('activite_id',$objet->id)->get()->sum('cout_estimatif');
        $a= Activite::find($objet->id);
        $a->budget= $budget_a;$a->save();
        return $budget_a;
    }
    public function getpartenairesactivites($objet){
      
      //  $this->getactivitebudgettotal($objet);
        $budgettotalactivites=DB::table('sousactivites')->where('activite_id',$objet->id)->get()->sum('cout_estimatif');
        $budgettotalpartenaires=DB::table('activitepartenairefinanciers')->where('activite_id',$objet->id)->get()->sum('budget');
        $sous_activite_by_id= DB::table('sousactivites')->where('activite_id',$objet->id)->get();
        foreach ($sous_activite_by_id as $value){
            $sous_activitepartenaire_by_id= DB::table('sousactivitepartenaires')->where('sousactivite_id',$value->id)->get();
            foreach($sous_activitepartenaire_by_id as $v){
                if(!(Activitepartenairefinancier::where(['activite_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())){
                    $activitepartenaire=[
                    "activite_id"=>$objet->id,
                    "partenaire_id"=>$v->partenaire_id,
                    "budget"=>$v->budget
                    ];
                    Activitepartenairefinancier::create($activitepartenaire);
                  //  $this->getactivitebudgettotal($objet);
                // return response()->json(["message"=>"nouveau activite enregistré!"]);
                }else if($budgettotalactivites!=$budgettotalpartenaires){
                        $partenaireactivite=Activitepartenairefinancier::where(['activite_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first();
                        $partenaireactivite->budget=$partenaireactivite->budget + $v->budget;
                        $partenaireactivite->save();
                   // $this->getactivitebudgettotal($objet);
                //return response()->json(["message"=>"ancien activite enregistré!"]);
                }

                /* 
                
                else if((Activitepartenairefinancier::where(['activite_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())and(Activitepartenairefinancier::where(['activite_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first()->isDirty())){
                    $partenaireactivite=Activitepartenairefinancier::where(['activite_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first();
                    $partenaireactivite->budget=$partenaireactivite->budget + $v->budget;
                    $partenaireactivite->save();
                    $this->getactivitebudgettotal($objet);
                // return response()->json(["message"=>"ancien activite enregistré!"]);
                }
                */
            }
       }// return response()->json(["message"=>$sous_activite_by_id]);
    }
}
