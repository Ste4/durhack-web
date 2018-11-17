<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEveningsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evenings', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->string('open');
            $table->string('close');
            $table->string('charge_time');
            $table->string('charge_cost');
            $table->unsignedInteger('venue_id');
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
        Schema::dropIfExists('evenings');
    }
}
