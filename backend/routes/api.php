<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PtbaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZoneController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ComposanteController;
use App\Http\Controllers\PartenaireController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\SousactiviteController;
use App\Http\Controllers\CalculBudgetsController;
use App\Http\Controllers\DecompteszoneController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\PrealableszoneController;
use App\Http\Controllers\RecommandationController;
use App\Http\Controllers\PartagedocumentController;
use App\Http\Controllers\PassationmarcheController;
use App\Http\Controllers\ProcesverbalszoneController;
use App\Http\Controllers\DocumentsevaluationController;
use App\Http\Controllers\RapportdactiviteszoneController;
use App\Http\Controllers\ActivitepartenaireassocieController;
use App\Http\Controllers\ActivitepartenairefinancierController;
use App\Http\Controllers\ActivitepartenaireresponsableController;
Use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


//AJOUT DES ROUTES DE JWT.
Route::group([

    'middleware' => 'api',
 
    

], function ($router) {

    Route::post('login', [AuthController::class,'login']);
    Route::post('signup', [AuthController::class,'signup']);
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', [AuthController::class,'me']);
    Route::post('sendPasswordResetLink',[ResetPasswordController::class,'sendEmail']);
    Route::post('resetPassword',[ChangePasswordController::class,'process']);
    Route::post('addRole',[RoleController::class,'addRole']);
    Route::get('getRoles',[RoleController::class,'getroles']);
    Route::delete('deleteRole/{id}',[RoleController::class,'delete']);
    Route::get('getModules',[RoleController::class,'getmodules']);
    Route::post('addpermissions',[RoleController::class,'addpermissions']);
    Route::get('getPermissions',[PermissionController::class,'getPermissions']);
    Route::get('getUsers',[UserController::class,'getusers']);
    Route::delete('deleteUser/{id}',[UserController::class,'deleteUser']);
    Route::post('updateuserrole',[UserController::class,'updateRoleUser']);
    Route::post('updateuserprofile',[UserController::class,'updateProfileUser']);
    Route::post('changepasswordprofile',[ChangePasswordController::class,'changePasswordProfile']);
    //Recommandations
    Route::post('addrecommandation',[RecommandationController::class,'add']);
    Route::get('getrecommandations', [RecommandationController::class,'getRecommandations']);
    Route::post('getrecommandationsbyevaluationsid', [RecommandationController::class,'getRecommandationsByEvaluationId']);
    Route::delete('deleteRecommandation/{id}',[RecommandationController::class,'delete']);
    Route::post('updaterecommandation',[RecommandationController::class,'update']); 
    Route::post('changestatutrecommandation',[RecommandationController::class,'changeStatut']);
   //Partagedocuments
    Route::post('adddocument',[PartagedocumentController::class,'add']);
    Route::get('getdocuments', [PartagedocumentController::class,'getDocumentpartages']);
    Route::delete('deleteDocument/{id}',[PartagedocumentController::class,'delete']);
    Route::post('updatedocument',[PartagedocumentController::class,'update']); 
   //Evaluations
    Route::post('addevaluation',[DocumentsevaluationController::class,'add']);
    Route::get('getevaluations', [DocumentsevaluationController::class,'getEvaluations']);
    Route::delete('deleteEvaluation/{id}',[DocumentsevaluationController::class,'delete']);
    Route::post('updateevaluation',[DocumentsevaluationController::class,'update']); 
    //Partenaires
    Route::post('addpartenaire',[PartenaireController::class,'ajouterPartenaire']);
    Route::get('getpartenaires', [PartenaireController::class,'getPartenaires']);
    Route::delete('deletePartenaire/{id}',[PartenaireController::class,'deletePartenaire']);
    Route::post('updatepartenaire',[PartenaireController::class,'updatePartenaire']); 
    Route::post('updatepartenaireapport',[PartenaireController::class,'updatePartenaireApport']);
    //Ptba
    Route::post('addptba',[PtbaController::class,'add']);
    Route::get('getptbas', [PtbaController::class,'getAll']);
    Route::get('getpartenairesptbas', [PtbaController::class,'getpartenairesbyptbas']);
    Route::delete('deletePtba/{id}',[PtbaController::class,'delete']);
    Route::post('updateptba',[PtbaController::class,'update']);
    Route::post('changestatutreptba',[PtbaController::class,'changeStatut']);
    //Composante getComposantePartenaires
    Route::post('addcomposante',[ComposanteController::class,'add']);
    Route::get('getcomposantes', [ComposanteController::class,'getAll']);
    Route::delete('deleteComposante/{id}',[ComposanteController::class,'delete']);
    Route::post('updatecomposante',[ComposanteController::class,'update']);
    Route::get('getComposantePartenaires', [ComposanteController::class,'getComposantePartenaires']);
    //Activite 
    Route::post('addactivite',[ActiviteController::class,'add']);
    Route::post('addactivitepartenairesassocies',[ActiviteController::class,'addPartenairesAssocies']);
    Route::post('addactivitepartenairefinanciers',[ActiviteController::class,'addPartenaireFinanciers']);
    Route::post('addactivitepartenaireresponsables',[ActiviteController::class,'addPartenairesponsables']);
    Route::get('getactivites', [ActiviteController::class,'getAll']);
    Route::delete('deleteActivite/{id}',[ActiviteController::class,'delete']);
    Route::post('updateactivite',[ActiviteController::class,'update']);
    Route::get('getactivitespartenaireassocies', [ActivitepartenaireassocieController::class,'getActivitePartenaireAssocie']);
    Route::get('getactivitespartenairesfinanciers', [ActivitepartenairefinancierController::class,'getActivitePartenaireFinancier']);
    Route::get('getactivitespartenairesresponsables', [ActivitepartenaireresponsableController::class,'getActivitePartenaireResponsable']);
    Route::delete('deletepartenaireassocie/{id}',[ActiviteController::class,'deletepartenaireassocie']);
    Route::delete('deletepartenairefinancier/{id}',[ActiviteController::class,'deletepartenairefinancier']);
    Route::delete('deletepartenaireresponsable/{id}',[ActiviteController::class,'deletepartenaireresponsable']);
    //Sous-activite getpartenaires
    Route::post('addsousactivite',[SousactiviteController::class,'add']);
    Route::get('getsousactivites', [SousactiviteController::class,'getAll']);
    Route::delete('deleteSousactivite/{id}',[SousactiviteController::class,'delete']);
    Route::post('updatesousactivite',[SousactiviteController::class,'update']);
    Route::post('addpartenairefinancierssousactivites',[SousactiviteController::class,'addPartenaireFinanciersSousactivite']);
    Route::post('addmoissousactivites',[SousactiviteController::class,'addMoisSousactivite']);
    Route::get('getmois', [SousactiviteController::class,'getMois']);
    Route::get('getmoissousactivites', [SousactiviteController::class,'getMoisSousActivites']);
    Route::delete('deletePartenaire/{id}',[SousactiviteController::class,'deletePartenaire']);
    Route::delete('deletemoisousactivite/{id}',[SousactiviteController::class,'deletemoisousactivite']);
    Route::get('getpartenaires_sa', [SousactiviteController::class,'getpartenaires_sa']);
    //Calcul des budgetsgetactivitebudgettotal
    Route::post('getsousactivitesbudget',[CalculBudgetsController::class,'getsousactivitebudgettotal']);
    Route::post('getactivitebudgettotal',[CalculBudgetsController::class,'getactivitebudgettotal']);
    Route::post('getcomposantebudgettotal',[CalculBudgetsController::class,'getcomposantebudgettotal']);
    Route::post('getptbabudgettotal',[CalculBudgetsController::class,'getptbabudgettotal']);
    Route::post('getpartenairesactivites',[CalculBudgetsController::class,'getpartenairesactivites']);   
    Route::post('test',[CalculBudgetsController::class,'getpartenairesacomposantes']);
    //Passation de marchés addproposition
    Route::post('addpassationmarche',[PassationmarcheController::class,'add']);
    Route::get('getpassationmarches', [PassationmarcheController::class,'getPassationmarches']);
    Route::delete('deletepassation/{id}',[PassationmarcheController::class,'delete']);
    Route::post('updatepassationmarche',[PassationmarcheController::class,'update']); 
    Route::post('changestatutpassation',[PassationmarcheController::class,'changeStatut']);
    Route::post('addpassationproposition',[PassationmarcheController::class,'addproposition']);
    Route::get('getpassationpropositions', [PassationmarcheController::class,'getPassationproposition']);
    //Zones
    Route::post('addzone',[ZoneController::class,'add']);
    Route::get('getzones', [ZoneController::class,'getZones']);
    Route::delete('deleteZone/{id}',[ZoneController::class,'delete']);
    Route::get('getZoneById/{id}',[ZoneController::class,'getZoneById']);
    Route::post('updatezone',[ZoneController::class,'update']); 
    //Decompte zones 
    Route::post('adddecomptezone',[DecompteszoneController::class,'add']);
    Route::get('getdecomptezones', [DecompteszoneController::class,'getDecompteszones']);
    Route::delete('deletedecompteZone/{id}',[DecompteszoneController::class,'delete']);
    Route::get('getDecompteById/{id}',[DecompteszoneController::class,'getDecompteById']);
    Route::get('getZoneDecompteById/{id}',[DecompteszoneController::class,'getZoneDecompteById']);
    Route::post('updatedecomptezone',[DecompteszoneController::class,'update']); 
    //Prealable Zones 
    Route::post('addprealablezone',[PrealableszoneController::class,'add']);
    Route::get('getprealablezones', [PrealableszoneController::class,'getPrealableszones']);
    Route::delete('deleteprealableZone/{id}',[PrealableszoneController::class,'delete']);
    Route::get('getPrealableById/{id}',[PrealableszoneController::class,'getPrealableById']);
    Route::get('getZonePrealableById/{id}',[PrealableszoneController::class,'getZonePrealableById']);
    Route::post('updateprealablezone',[PrealableszoneController::class,'update']); 
    //Proces verbal Zones 
    Route::post('addprocesverbalzone',[ProcesverbalszoneController::class,'add']);
    Route::get('getprocesverbalzones', [ProcesverbalszoneController::class,'getProcesverbalszones']);
    Route::delete('deleteprocesverbalZone/{id}',[ProcesverbalszoneController::class,'delete']);
    Route::get('getProcesVerbalById/{id}',[ProcesverbalszoneController::class,'getProcesVerbalById']);
    Route::get('getZoneProcesVerbalById/{id}',[ProcesverbalszoneController::class,'getZoneProcesVerbalById']);
    Route::post('updateprocesverbalzone',[ProcesverbalszoneController::class,'update']); 
    //Rapport d'activite Zones 
    Route::post('addrapportdactivitezone',[RapportdactiviteszoneController::class,'add']);
    Route::get('getrapportdactivitezones', [RapportdactiviteszoneController::class,'RapportdactiviteszoneController']);
    Route::delete('deleterapportdactiviteZone/{id}',[RapportdactiviteszoneController::class,'delete']);
    Route::get('getRapportActiviteById/{id}',[RapportdactiviteszoneController::class,'getRapportActiviteById']);
    Route::get('getZoneRapportActiviteById/{id}',[RapportdactiviteszoneController::class,'getZoneRapportActiviteById']);
    Route::post('updaterapportdactivitezone',[RapportdactiviteszoneController::class,'update']); 


});
