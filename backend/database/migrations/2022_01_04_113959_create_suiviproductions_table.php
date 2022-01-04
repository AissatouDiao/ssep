<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuiviproductionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suiviproductions', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('village');
            $table->string('prenom_nom');
            $table->string('genre');
            $table->string('statut_producteur');
            $table->unsignedDecimal('superficie_totale');
            $table->unsignedDecimal('superficie_mesuree');
            $table->unsignedDecimal('coordonnees_x');
            $table->unsignedDecimal('coordonnees_y');
            $table->unsignedInteger('nombre_ovins_suivis');
            $table->unsignedInteger('nombre_poules_suivies');
            $table->date('date_premiere_vaccination');
            $table->date('date_deparatisage_interne');
            $table->date('date_deparasitage_externe');
            $table->date('date_deuxieme_vaccination');
            $table->date('date_de_semis_ou_repiquage');
            $table->unsignedDecimal('quantite_npk_appliquee');
            $table->date('date_appliquation_npk');
            $table->string('type_maladies');
            $table->date('date_recolte');
            $table->unsignedDecimal('production_obtenue');
            $table->unsignedDecimal('rendement');
            $table->unsignedInteger('nombre_sujets_obtenus');
            $table->string('observations');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suiviproductions');
    }
}
