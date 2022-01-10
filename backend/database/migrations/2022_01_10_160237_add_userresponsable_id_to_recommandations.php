<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserresponsableIdToRecommandations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recommandations', function (Blueprint $table) {
            $table->foreignId('userresponsable_id')->nullable()->after('id')
            ->constrained('users')
            ->onUpdate('cascade')
            ->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recommandations', function (Blueprint $table) {
            $table->dropColumn('userresponsable_id');
        });
    }
}
