<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('village');
            $table->string('prenom_nom');
            $table->string('genre');
            $table->string('organisation_de_base');
            $table->date('date_formation');
            $table->string('theme_formation');
            $table->unsignedInteger('telephone');
            $table->string('lieu_formation');
            $table->unsignedInteger('telephone_relais');
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
        Schema::dropIfExists('formations');
    }
}
