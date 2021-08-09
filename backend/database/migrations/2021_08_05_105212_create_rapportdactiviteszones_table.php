<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRapportdactiviteszonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rapportdactiviteszones', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->foreignId('zone_id')
            ->constrained('zones')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('rapportdactivite')->unique();
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
        Schema::dropIfExists('rapportdactiviteszones');
    }
}
