<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcesverbalszonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('procesverbalszones', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->foreignId('zone_id')
            ->constrained('zones')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('procesverbal')->unique();
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
        Schema::dropIfExists('procesverbalszones');
    }
}
