<?php

namespace App\Http\Controllers;

use App\Models\Composante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Composantepartenaire;

class ComposanteController extends Controller
{
    public function add(Request $request){
        Composante::create($request->all());
        $lastRecordDate = Composante::latest()->first();
        return response()->json([
            "message"=>"Un nouveau composante a été ajouté !",
            "last"=> $lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $composante=Composante::find($request->id);
        $composante->ptba_id=$request->ptba_id;
        $composante->libelle=$request->libelle;
        $composante->budget=$request->budget;
        $composante->save();
        return response()->json([
            "message"=>"Composante mis à jour !"
        ]);
    }
    
    public function delete($request){
        $composante= Composante::find($request);
        $composante->delete();
        return response()->json(["message" => "suppression composante effective!"]); 
        
    }

    public function getAll(){
        $composantes=Composante::all();
        foreach($composantes as $c){
            $this->getcomposantebudgettotal($c);
            $this->getpartenairesacomposantes($c);
        }
        return $composantes;
    }
    public function getComposantePartenaires(){
        $composantespartenaires=Composantepartenaire::all();
        return $composantespartenaires;
    }
    public function getcomposantebudgettotal( $objet){
        $budget_c= DB::table('activites')->where('composante_id',$objet->id)->get()->sum('budget');
        $c= Composante::find($objet->id);
        $c->budget= $budget_c;$c->save();
       
    }

    public function getpartenairesacomposantes($objet){
       // $this->getcomposantebudgettotal($objet);
        $budgettotalcomposantes=DB::table('activites')->where('composante_id',$objet->id)->get()->sum('budget');
        $budgettotalpartenaires=DB::table('composantepartenaires')->where('composante_id',$objet->id)->get()->sum('budget');     
        $activite_by_id= DB::table('activites')->where('composante_id',$objet->id)->get();
        foreach ($activite_by_id as $value){
        $activitepartenaire_by_id= DB::table('activitepartenairefinanciers')->where('activite_id',$value->id)->get();
            foreach($activitepartenaire_by_id as $v){
                if(!(Composantepartenaire::where(['composante_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())){
                    $composantepartenaire=[
                        "composante_id"=>$objet->id,
                        "partenaire_id"=>$v->partenaire_id,
                        "budget"=>$v->budget
                    ];
                    Composantepartenaire::create($composantepartenaire);
                    // $this->getcomposantebudgettotal($objet);
                    // return response()->json(["message"=>"nouveau composante enregistré!"]);
                }else  if($budgettotalpartenaires<$budgettotalcomposantes ) {
                    
                        $partenairecomposante=Composantepartenaire::where(['composante_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first();
                        $partenairecomposante->budget=$partenairecomposante->budget + $v->budget;
                        $partenairecomposante->save();
                    
                    
                //  $this->getpartenairesacomposantes($objet);
                    // return response()->json(["message"=>"composante mis à jour!"]);
                }
            }
       }// return response()->json(["message"=>$activite_by_id]); if((Composantepartenaire::where(['composante_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())and(Composantepartenaire::where(['composante_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first()->isDirty()))
     }
}
