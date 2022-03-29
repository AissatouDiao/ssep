<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPourcentagephysiqueToPistes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pistes', function (Blueprint $table) {
            $table->string('pourcentagephysique')->after('coordonnees'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pistes', function (Blueprint $table) {
            $table->dropColumn('pourcentagephysique');
        });
    }
}
