<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPourcentagefinancierToPistes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pistes', function (Blueprint $table) {
            $table->string('pourcentagefinancier')->after('pourcentagephysique'); 
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
            $table->dropColumn('pourcentagefinancier');
        });
    }
}
