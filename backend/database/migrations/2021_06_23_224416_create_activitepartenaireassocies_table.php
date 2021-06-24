<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitepartenaireassociesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activitepartenaireassocies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activite_id')
            ->constrained('activites')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('partenaire_id')
            ->constrained('partenaires')
            ->onUpdate('cascade')
            ->onDelete('cascade');
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
        Schema::dropIfExists('activitepartenaireassocies');
    }
}
