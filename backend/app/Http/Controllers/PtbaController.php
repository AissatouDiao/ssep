<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Ptba;
use Illuminate\Http\Request;
use App\Models\Ptbapartenaire;
use Illuminate\Support\Facades\DB;

class PtbaController extends Controller
{

    public function add(Request $request){
        Ptba::create($request->all());
        $lastRecordDate = Ptba::latest()->first();
        return response()->json([
            "message"=>"Un nouveau ptba a été ajouté !",
            "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $ptba=Ptba::find($request->id);
        $ptba->libelle=$request->libelle;
        $ptba->annee=$request->annee;
        $ptba->budget=$request->budget;
        $ptba->save();
        return response()->json([
            "message"=>"Ptba mis à jour !"
        ]);
    }
    public function delete($request){
        $ptba= Ptba::find($request);
        $ptba->delete();
        return response()->json(["message" => "suppression ptba effective!"]); 
        
    }

    public function getAll(){
        $ptbas=Ptba::all();
        foreach($ptbas as $p){
            $this->getptbabudgettotal($p);
            $this->getpartenairesptbas($p);
          
        }
        return $ptbas;
    }

    public function getptbabyid(Request $request){
        
        $ptba= Ptba::find($request->id);
        return $ptba;
       
    }
    public function getpartenairesbyptbas(){
        $ptbaspartenaires=Ptbapartenaire::all();
        return $ptbaspartenaires;
    }
    public function getptbabudgettotal( $objet){
        $budget_p=DB::table('composantes')->where('ptba_id',$objet->id)->get()->sum('budget');
        $p=Ptba::find($objet->id);
        $p->budget= $budget_p;$p->save();
       
    }

    public function getpartenairesptbas( $objet){
       // $this->getptbabudgettotal($objet);
        $budgettotalcomposantes = DB::table('composantes')->where('ptba_id',$objet->id)->get()->sum('budget');
        $budgettotalpartenaires =DB::table('ptbapartenaires')->where('ptba_id',$objet->id)->get()->sum('budget');
        $composante_by_id= DB::table('composantes')->where('ptba_id',$objet->id)->get();
        foreach ($composante_by_id as $value){
        $composantepartenaire_by_id= DB::table('composantepartenaires')->where('composante_id',$value->id)->get();
        foreach($composantepartenaire_by_id as $v){
          if(!(Ptbapartenaire::where(['ptba_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())){
             $ptbapartenaire=[
                "ptba_id"=>$objet->id,
                "partenaire_id"=>$v->partenaire_id,
                "budget"=>$v->budget
             ];
             Ptbapartenaire::create($ptbapartenaire);
            // $this->getptbabudgettotal($objet);
            // return response()->json(["message"=>"nouveau ptba enregistré!"]);
          }else if($budgettotalcomposantes>$budgettotalpartenaires){
              {
                $partenaireptba=Ptbapartenaire::where(['ptba_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first();
                $partenaireptba->budget=$partenaireptba->budget + $v->budget;
                $partenaireptba->save();
              }
            
             // $this->getptbabudgettotal($objet);
            // return response()->json(["message"=>"ancien ptba mise à jour!"]);
          }
        }
       }//return response()->json(["message"=>$composante_by_id]);  if((Ptbapartenaire::where(['ptba_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->exists())and(Ptbapartenaire::where(['ptba_id'=>$objet->id,'partenaire_id'=>$v->partenaire_id])->first()->isDirty()))
    }

    public function changeStatut( Request $request){
        $recommandation=Ptba::find($request->id);
        $recommandation->etat=$request->etat;
        $recommandation->save();
        return response()->json([
            "message" => "Statut PTBA mis à jour",      
        ]); 
    }

   public function getPourcentages(Request $request){
             $thepourcentages = DB::table('ptbapartenaires')
            ->where('ptba_id',$request->id)
            ->join('partenaires', 'partenaires.id', '=', 'ptbapartenaires.partenaire_id')
            ->select('partenaires.libelle', 'ptbapartenaires.budget')
            ->get();
            return $thepourcentages;
   }

   public function getPourcentagesParComposante( $request){
     $thepourcentages = DB::table('composantes')
    ->where('ptba_id',$request->id)
    ->select('composantes.libelle', 'composantes.budget','composantes.pourcentage')
    ->get();
    return $thepourcentages; 
    }

    public function getCurrentOrLastPtba(){
       // $currentdate = Carbon::now();
        $currentyear = Carbon::now()->format('Y');
        $currentyearinteger = (int)$currentyear;
        $ptba=PTBA::where('annee',$currentyearinteger)->first();
        if($ptba!=null){
            return $ptba;
        }
        if($ptba===null){
            $lastptbabeforecurrentyear=PTBA::where('annee',$currentyearinteger-1)->first();
            return $lastptbabeforecurrentyear ;
        }else{
            $lastRecordDate = Ptba::latest()->first();
            $lastrecorddateptba=PTBA::where('annee',$lastRecordDate)->first();
            return $lastrecorddateptba;
        }
    }

   public function getCurrentOrLastPtbaComposante(){
    $ptba=$this->getCurrentOrLastPtba();
    return $this->getPourcentagesParComposante($ptba);
   
   }

   public function getPourcentageOfComposanteForCurrentPtba($id){
    $composantes=DB::table('composantes')->where('ptba_id',$id)->get();
    return $composantes;
   }


}
