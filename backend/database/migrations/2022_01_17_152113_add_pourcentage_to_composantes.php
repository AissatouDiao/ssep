<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPourcentageToComposantes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('composantes', function (Blueprint $table) {
            $table->integer('pourcentage')->unsigned()->after('budget');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('composantes', function (Blueprint $table) {
            $table->dropColumn('pourcentage');
        });
    }
}
