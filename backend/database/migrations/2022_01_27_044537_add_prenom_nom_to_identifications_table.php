<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPrenomNomToIdentificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('identifications', function (Blueprint $table) {
            $table->string('prenom_nom')->after('village');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('identifications', function (Blueprint $table) {
            $table->dropColumn('prenom_nom');
        });

     
    }
}
