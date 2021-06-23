<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDocumentsevaluationIdToRecommandations extends Migration
{
    /**

     */
    public function up()
    {
        Schema::table('recommandations', function (Blueprint $table) {
            $table->foreignId('evaluation_id')->after('id')->nullable()
            ->constrained('documentsevaluations')
            ->onUpdate('cascade')
            ->onDelete('cascade');
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
            $table->dropColumn('evaluation_id');
        });
    }
}
