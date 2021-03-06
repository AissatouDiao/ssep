<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PcemController;
use App\Http\Controllers\PtbaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZoneController;
use App\Http\Controllers\PistesController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\CommuneController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ComposanteController;
use App\Http\Controllers\IndicateurController;
use App\Http\Controllers\PartenaireController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\OrganisationController;
use App\Http\Controllers\SousactiviteController;
use App\Http\Controllers\CalculBudgetsController;
use App\Http\Controllers\DecompteszoneController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\AgreagequaliteController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\IdentificationController;
use App\Http\Controllers\PrealableszoneController;
use App\Http\Controllers\RecommandationController;
use App\Http\Controllers\ValeurannuelleController;
use App\Http\Controllers\PartagedocumentController;
use App\Http\Controllers\PassationmarcheController;
use App\Http\Controllers\AvancementtravauxController;
use App\Http\Controllers\PrealablescommuneController;
use App\Http\Controllers\ProcesverbalszoneController;
use App\Http\Controllers\DocumentsevaluationController;
use App\Http\Controllers\RecommandationtacheController;
use App\Http\Controllers\RapportdactiviteszoneController;
use App\Http\Controllers\ContratsexecutionmarcheController;
use App\Http\Controllers\DecomptesexecutionmarcheController;
use App\Http\Controllers\GarantiesexecutionmarcheController;
use App\Http\Controllers\OrganisationsaccompagneeController;
use App\Http\Controllers\ActivitepartenaireassocieController;
use App\Http\Controllers\LancementsprocedurecommuneController;
use App\Http\Controllers\ActivitepartenairefinancierController;
use App\Http\Controllers\EvaluationsprocedurescommuneController;
use App\Http\Controllers\ProcesverbauxexecutionmarcheController;
use App\Http\Controllers\ActivitepartenaireresponsableController;


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
    Route::post('addPassword',[ChangePasswordController::class,'process1']);
    Route::post('addRole',[RoleController::class,'addRole']);
    Route::get('getRoles',[RoleController::class,'getroles']);
    Route::delete('deleteRole/{id}',[RoleController::class,'delete']);
    Route::post('updateRole',[RoleController::class,'updaterole']);
    Route::get('getModules',[RoleController::class,'getmodules']);
    Route::post('addpermissions',[RoleController::class,'addpermissions']);
    Route::post('updatePermissionsToRole',[PermissionController::class,'updatePermissionsToRole']);
    Route::get('getPermissions',[PermissionController::class,'getPermissions']);
    Route::get('getPermissionsByRoleId/{id}',[PermissionController::class,'getPermissionsByRoleId']);
    Route::get('getUsers',[UserController::class,'getusers']);
    Route::get('getnotifications/{id}',[UserController::class,'getnotifications']);
    Route::get('getunreadnotifications/{id}',[UserController::class,'getunreadnotifications']);
    Route::get('getfivelastunreadnotifications/{id}',[UserController::class,'getfivelastunreadnotifications']);
    Route::delete('deleteNotification/{id}',[UserController::class,'deleteNotification']);
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
    //Recommandations taches
    Route::post('addrecommandationtache',[RecommandationtacheController::class,'add']);
    Route::get('getRecommandationtaches', [RecommandationtacheController::class,'getRecommandationtaches']);
    Route::post('getRecommandationtacheById', [RecommandationtacheController::class,'getRecommandationtacheById']);
    Route::delete('deleteRecommandationTache/{id}',[RecommandationtacheController::class,'delete']);
    Route::post('updaterecommandationtache',[RecommandationtacheController::class,'update']); 
   // Route::post('changestatutrecommandationtache',[RecommandationtacheController::class,'changeStatut']);
   //Partagedocuments 
    Route::post('adddocument',[PartagedocumentController::class,'add']);
    Route::get('getNumberDocuments', [PartagedocumentController::class,'getNumberDocuments']);
    Route::get('getdocuments', [PartagedocumentController::class,'getDocumentpartages']);
    Route::delete('deleteDocument/{id}',[PartagedocumentController::class,'delete']);
    Route::post('updatedocument',[PartagedocumentController::class,'update']); 
   //Evaluations getNumberEvaluations
    Route::post('addevaluation',[DocumentsevaluationController::class,'add']);
    Route::get('getevaluations', [DocumentsevaluationController::class,'getEvaluations']);
    Route::get('getNumberEvaluations', [DocumentsevaluationController::class,'getNumberEvaluations']);
    Route::delete('deleteEvaluation/{id}',[DocumentsevaluationController::class,'delete']);
    Route::post('updateevaluation',[DocumentsevaluationController::class,'update']); 
    //Partenaires
    Route::post('addpartenaire',[PartenaireController::class,'ajouterPartenaire']);
    Route::get('getpartenaires', [PartenaireController::class,'getPartenaires']);
    Route::get('getNumberPartenaires', [PartenaireController::class,'getNumberPartenaires']);
    Route::delete('deletePartenaire/{id}',[PartenaireController::class,'deletePartenaire']);
    Route::post('updatepartenaire',[PartenaireController::class,'updatePartenaire']); 
    Route::post('updatepartenaireapport',[PartenaireController::class,'updatePartenaireApport']);
    Route::post('getPourcentagesPartenairePtba', [PartenaireController::class,'getPourcentages']);

    //Ptba 
    Route::post('addptba',[PtbaController::class,'add']);
    Route::get('getptbas', [PtbaController::class,'getAll']);
    Route::post('getptbabyid', [PtbaController::class,'getptbabyid']);
    Route::post('getpourcentages', [PtbaController::class,'getPourcentages']);
    Route::post('getPourcentagesParComposante', [PtbaController::class,'getPourcentagesParComposante']);
    Route::get('getpartenairesptbas', [PtbaController::class,'getpartenairesbyptbas']);
    Route::delete('deletePtba/{id}',[PtbaController::class,'delete']);
    Route::post('updateptba',[PtbaController::class,'update']);
    Route::post('changestatutreptba',[PtbaController::class,'changeStatut']);
    Route::get('getCurrentOrLastPtba', [PtbaController::class,'getCurrentOrLastPtba']);
    Route::get('getCurrentOrLastPtbaComposante', [PtbaController::class,'getCurrentOrLastPtbaComposante']);
    Route::get('getPourcentageOfComposanteForCurrentPtba/{id}', [PtbaController::class,'getPourcentageOfComposanteForCurrentPtba']);
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
    Route::get('getactivitespartenaires', [ActiviteController::class,'getpartenairesactivites']);
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
    //Passation de march??s addproposition getNumberPassations
    Route::post('addpassationmarche',[PassationmarcheController::class,'add']);
    Route::get('getpassationmarches', [PassationmarcheController::class,'getPassationmarches']);
    Route::get('getNumberPassations', [PassationmarcheController::class,'getNumberPassations']);
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
    Route::get('getrapportdactivitezones', [RapportdactiviteszoneController::class,'getRapportdactiviteszones']);
    Route::delete('deleterapportdactiviteZone/{id}',[RapportdactiviteszoneController::class,'delete']);
    Route::get('getRapportActiviteById/{id}',[RapportdactiviteszoneController::class,'getRapportActiviteById']);
    Route::get('getZoneRapportActiviteById/{id}',[RapportdactiviteszoneController::class,'getZoneRapportActiviteById']);
    Route::post('updaterapportdactivitezone',[RapportdactiviteszoneController::class,'update']); 
    //Region
    Route::post('addregion',[RegionController::class,'add']);
    Route::get('getregions', [RegionController::class,'getRegions']);
    Route::delete('deleteRegion/{id}',[RegionController::class,'delete']);
    Route::get('getRegionById/{id}',[RegionController::class,'getRegionById']);
    Route::post('updateregion',[RegionController::class,'update']); 
    //Commune
    Route::post('addcommune',[CommuneController::class,'add']);
    Route::get('getcommunes', [CommuneController::class,'getCommunes']);
    Route::delete('deleteCommune/{id}',[CommuneController::class,'delete']);
    Route::get('getCommuneRegionById/{id}',[CommuneController::class,'getCommuneRegionById']);
    Route::get('getCommuneById/{id}',[CommuneController::class,'getCommuneById']);
    Route::post('updatecommune',[CommuneController::class,'update']);
    //Prealables Commune
    Route::post('addprealablecommune',[PrealablescommuneController::class,'add']);
    Route::get('getprealablecommunes', [PrealablescommuneController::class,'getPrealablescommunes']);
    Route::delete('deleteprealableCommune/{id}',[PrealablescommuneController::class,'delete']);
    Route::get('getCommunePrealableById/{id}',[PrealablescommuneController::class,'getPrealableCommuneById']);
    Route::post('updateprealablecommune',[PrealablescommuneController::class,'update']); 
    //Evaluations procedure Commune
    Route::post('addevaluationcommune',[EvaluationsprocedurescommuneController::class,'add']);
    Route::get('getevaluationcommunes', [EvaluationsprocedurescommuneController::class,'getEvaluationscommunes']);
    Route::delete('deleteevaluationCommune/{id}',[EvaluationsprocedurescommuneController::class,'delete']);
    Route::get('getCommuneEvaluationById/{id}',[EvaluationsprocedurescommuneController::class,'getEvaluationCommuneById']);
    Route::post('updateevaluationcommune',[EvaluationsprocedurescommuneController::class,'update']);
    //lancement procedure Commune
    Route::post('addlancementpocedurecommune',[LancementsprocedurecommuneController::class,'add']);
    Route::get('getlancementpocedurecommunes', [LancementsprocedurecommuneController::class,'getLancementProcedurescommunes']);
    Route::delete('deletelancementpocedureCommune/{id}',[LancementsprocedurecommuneController::class,'delete']);
    Route::get('getCommuneLancementProcedureById/{id}',[LancementsprocedurecommuneController::class,'getLancementProcedureCommuneById']);
    Route::post('updatelancementpocedurecommune',[LancementsprocedurecommuneController::class,'update']);
    //Prealables execution de marche
    Route::post('addprealablecommune_em',[PcemController::class,'add']);
    Route::get('getprealablecommunes_em', [PcemController::class,'getPrealablescommuneexecutionmarches']);
    Route::delete('deleteprealableCommune_em/{id}',[PcemController::class,'delete']);
    Route::get('getCommunePrealableById_em/{id}',[PcemController::class,'getPrealableCommuneById']);
    Route::post('updateprealablecommune_em',[PcemController::class,'update']); 
    //Contrats execution de marche
    Route::post('addcontratcommune_em',[ContratsexecutionmarcheController::class,'add']);
    Route::get('getcontratcommunes_em', [ContratsexecutionmarcheController::class,'getContratcommuneexecutionmarches']);
    Route::delete('deletecontratCommune_em/{id}',[ContratsexecutionmarcheController::class,'delete']);
    Route::get('getCommuneContratById_em/{id}',[ContratsexecutionmarcheController::class,'getContratEMCommuneById']);
    Route::post('updatecontratcommune_em',[ContratsexecutionmarcheController::class,'update']); 
    //Decompte execution de marche
    Route::post('adddecomptecommune_em',[DecomptesexecutionmarcheController::class,'add']);
    Route::get('getdecomptecommunes_em', [DecomptesexecutionmarcheController::class,'getDecomptesexecutionmarches']);
    Route::delete('deletedecompteCommune_em/{id}',[DecomptesexecutionmarcheController::class,'delete']);
    Route::get('getCommuneDecompteById_em/{id}',[DecomptesexecutionmarcheController::class,'getDecompteEMCommuneById']);
    Route::post('updatedecomptecommune_em',[DecomptesexecutionmarcheController::class,'update']); 
    //Garanties execution de marche
    Route::post('addgarantiecommune_em',[GarantiesexecutionmarcheController::class,'add']);
    Route::get('getgarantiecommunes_em', [GarantiesexecutionmarcheController::class,'getGarantiesexecutionmarches']);
    Route::delete('deletegarantieCommune_em/{id}',[GarantiesexecutionmarcheController::class,'delete']);
    Route::get('getCommuneGarantieById_em/{id}',[GarantiesexecutionmarcheController::class,'getGarantiesEMCommuneById']);
    Route::post('updategarantiecommune_em',[GarantiesexecutionmarcheController::class,'update']); 
    //Proces verbaux execution de marche
    Route::post('addprocesverbalcommune_em',[ProcesverbauxexecutionmarcheController::class,'add']);
    Route::get('getprocesverbalcommunes_em', [ProcesverbauxexecutionmarcheController::class,'getProcesverbauxexecutionmarches']);
    Route::delete('deleteprocesverbalCommune_em/{id}',[ProcesverbauxexecutionmarcheController::class,'delete']);
    Route::get('getCommuneProcesverbalById_em/{id}',[ProcesverbauxexecutionmarcheController::class,'getProcesverbalEMCommuneById']);
    Route::post('updateprocesverbalcommune_em',[ProcesverbauxexecutionmarcheController::class,'update']);
    
    //Gestion des pistes bavardes
    Route::post('addpiste',[PistesController::class,'ajouterPiste']);
    Route::get('getpistes', [PistesController::class,'getPistes']);
    Route::delete('deletepiste/{id}',[PistesController::class,'deletePiste']);
    Route::get('getPisteByCommuneId/{id}',[PistesController::class,'getPisteByCommuneId']);

    Route::get('getPisteById/{id}',[PistesController::class,'getPisteById']);
    Route::post('updatepiste',[PistesController::class,'updatePiste']); 
    //Gestion des avancements de travaux pistes bavardes 
    Route::post('ajouterAvancementTravaux',[AvancementtravauxController::class,'ajouterAvancementTravaux']);
    Route::get('getAvancementTravaux', [AvancementtravauxController::class,'getAvancementTravaux']);
    Route::get('getpourcentages/{id}', [AvancementtravauxController::class,'getpourcentages']);
    Route::delete('deleteAvancementTravaux/{id}',[AvancementtravauxController::class,'deleteAvancementTravaux']);
    Route::get('getAvancementTavauxPisteId/{id}',[AvancementtravauxController::class,'getAvancementTavauxPisteId']);
    Route::post('updateAvancementTravaux',[AvancementtravauxController::class,'updateAvancementTravaux']); 
    //Organisations
    Route::post('importOrganisationFileToDatabase',[OrganisationController::class,'importOrganisationFileToDatabase']);
    Route::post('ajouterOrganisation',[OrganisationController::class,'ajouterOrganisation']);
    Route::get('getOrganisations', [OrganisationController::class,'getOrganisations']);
    Route::delete('deleteOrganisation/{id}',[OrganisationController::class,'deleteOrganisation']);
    Route::post('updateOrganisation',[OrganisationController::class,'updateOrganisation']);
    //Agreagequalite 
    Route::post('importAgreagequaliteFileToDatabase',[AgreagequaliteController::class,'importAgreagequaliteFileToDatabase']);
    Route::post('ajouterAgreagequalite',[AgreagequaliteController::class,'ajouterAgreagequalite']);
    Route::get('getAgreagequalites', [AgreagequaliteController::class,'getAgreagequalites']);
    Route::delete('deleteAgreagequalite/{id}',[AgreagequaliteController::class,'deleteAgreagequalite']);
    Route::post('updateAgreagequalite',[AgreagequaliteController::class,'updateAgreagequalite']);
    //Formations
    Route::post('importFormationFileToDatabase',[FormationController::class,'importFormationFileToDatabase']);
    Route::post('ajouterFormation',[FormationController::class,'ajouterFormation']);
    Route::get('getFormations', [FormationController::class,'getFormations']);
    Route::delete('deleteFormation/{id}',[FormationController::class,'deleteFormation']);
    Route::post('updateFormation',[FormationController::class,'updateFormation']);
    //Georeferencements
    Route::post('importGeoreferencementFileToDatabase',[GeoreferencementController::class,'importGeoreferencementFileToDatabase']);
    Route::post('ajouterGeoreferencement',[GeoreferencementController::class,'ajouterGeoreferencement']);
    Route::get('getGeoreferencements', [GeoreferencementController::class,'getGeoreferencements']);
    Route::delete('deleteGeoreferencement/{id}',[GeoreferencementController::class,'deleteGeoreferencement']);
    Route::post('updateGeoreferencement',[GeoreferencementController::class,'updateGeoreferencement']);
    //Identifications
    Route::post('importIdentificationFileToDatabase',[IdentificationController::class,'importIdentificationFileToDatabase']);
    Route::post('ajouterIdentification',[IdentificationController::class,'ajouterIdentification']);
    Route::get('getIdentifications', [IdentificationController::class,'getIdentifications']);
    Route::delete('deleteIdentification/{id}',[IdentificationController::class,'deleteIdentification']);
    Route::post('updateIdentification',[IdentificationController::class,'updateIdentification']);
    //Organisationaccompagnees
    Route::post('importOrganisationaccompagneeFileToDatabase',[OrganisationsaccompagneeController::class,'importOrganisationaccompagneeFileToDatabase']);
    Route::post('ajouterOrganisationaccompagnee',[OrganisationsaccompagneeController::class,'ajouterOrganisationaccompagnee']);
    Route::get('getOrganisationaccompagnees', [OrganisationsaccompagneeController::class,'getOrganisationaccompagnees']);
    Route::delete('deleteOrganisationaccompagnee/{id}',[OrganisationsaccompagneeController::class,'deleteOrganisationaccompagnee']);
    Route::post('updateOrganisationaccompagnee',[OrganisationsaccompagneeController::class,'updateOrganisationaccompagnee']);
    //Suiviproductions
    Route::post('importSuiviproductionFileToDatabase',[SuiviproductionController::class,'importSuiviproductionFileToDatabase']);
    Route::post('ajouterSuiviproduction',[SuiviproductionController::class,'ajouterSuiviproduction']);
    Route::get('getSuiviproductions', [SuiviproductionController::class,'getSuiviproductions']);
    Route::delete('deleteSuiviproduction/{id}',[SuiviproductionController::class,'deleteSuiviproduction']);
    Route::post('updateSuiviproduction',[SuiviproductionController::class,'updateSuiviproduction']);
    //Organisations
    Route::post('importOrganisationFileToDatabase',[OrganisationController::class,'importOrganisationFileToDatabase']);
    Route::post('ajouterOrganisation',[OrganisationController::class,'ajouterOrganisation']);
    Route::get('getOrganisations', [OrganisationController::class,'getOrganisations']);
    Route::delete('deleteOrganisation/{id}',[OrganisationController::class,'deleteOrganisation']);
    Route::post('updateOrganisation',[OrganisationController::class,'updateOrganisation']);
    //Transformations
    Route::post('importTransformationFileToDatabase',[TransformationController::class,'importTransformationFileToDatabase']);
    Route::post('ajouterTransformation',[TransformationController::class,'ajouterTransformation']);
    Route::get('getTransformations', [TransformationController::class,'getTransformations']);
    Route::delete('deleteTransformation/{id}',[TransformationController::class,'deleteTransformation']);
    Route::post('updateTransformation',[TransformationController::class,'updateTransformation']);
    //Indicateurs
    Route::post('addindicateur',[IndicateurController::class,'add']);
    Route::get('getindicateurs', [IndicateurController::class,'getindicateurs']);
    Route::delete('deleteindicateur/{id}',[IndicateurController::class,'delete']);
    Route::get('getIndicateurById/{id}',[IndicateurController::class,'getindicateurById']);
    Route::post('updateindicateur',[IndicateurController::class,'update']);
    //Valeur Annuelle
    Route::post('addvaleurannuelle',[ValeurannuelleController::class,'add']);
    Route::get('getvaleurannuelles', [ValeurannuelleController::class,'getvaleurannuelles']);
    Route::delete('deletevaleurannuelle/{id}',[ValeurannuelleController::class,'delete']);
    Route::get('getValeurannuelleById/{id}',[ValeurannuelleController::class,'getvaleurannuelleById']);
    Route::get('getvaleurannuellesByIndicateurId/{id}',[ValeurannuelleController::class,'getvaleurannuellesByIndicateurId']);
    Route::post('updatevaleurannuelle',[ValeurannuelleController::class,'update']);
});

