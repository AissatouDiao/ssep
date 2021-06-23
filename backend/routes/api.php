<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PtbaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ComposanteController;
use App\Http\Controllers\PartenaireController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\RecommandationController;
use App\Http\Controllers\PartagedocumentController;
use App\Http\Controllers\DocumentsevaluationController;
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
    Route::delete('deletePtba/{id}',[PtbaController::class,'delete']);
    Route::post('updateptba',[PtbaController::class,'update']);
    //Composante
    Route::post('addcomposante',[ComposanteController::class,'add']);
    Route::get('getcomposantes', [ComposanteController::class,'getAll']);
    Route::delete('deleteComposante/{id}',[ComposanteController::class,'delete']);
    Route::post('updatecomposante',[ComposanteController::class,'update']);
    //Activite
    Route::post('addactivite',[ActiviteController::class,'add']);
    Route::get('getactivites', [ActiviteController::class,'getAll']);
    Route::delete('deleteActivite/{id}',[ActiviteController::class,'delete']);
    Route::post('updateactivite',[ActiviteController::class,'update']);
});
