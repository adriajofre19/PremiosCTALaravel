<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /*
`INSERT INTO partits (competicio, grup, jornada, equipoLocal, equipoVisitant, resLocal, resVisitant, ganador, arbitre, AmarillasJugadoresLocal, RojasJugadoresLocal, AmarillasCuerpoTecnicoLocal,RojasCuerpoTecnicoLocal,AmarillasJugadoresVisitante,RojasJugadoresVisitante, AmarillasCuerpoTecnicoVisitante,RojasCuerpoTecnicoVisitante ) VALUES ('${partit.competicio}', '${partit.grup}', '${partit.Jornada}', '${partit.equipoLocal}', '${partit.equipoVisitant}', ${partit.resLocal}, ${partit.resVisitant}, '${partit.ganador}', '${partit.arbitre}', ${partit.AmarillasJugadoresLocal}, ${partit.RojasJugadoresLocal}, ${partit.AmarillasCuerpoTecnicoLocal}, ${partit.RojasCuerpoTecnicoLocal}, ${partit.AmarillasJugadoresVisitante}, ${partit.RojasJugadoresVisitante}, ${partit.AmarillasCuerpoTecnicoVisitante}, ${partit.RojasCuerpoTecnicoVisitante})`;
*/
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partits', function (Blueprint $table) {
            $table->id();
            $table->string('competicio');
            $table->string('grup');
            $table->string('jornada');
            $table->string('equipoLocal');
            $table->string('equipoVisitant');
            $table->integer('resLocal');
            $table->integer('resVisitant');
            $table->string('ganador');
            $table->string('arbitre');
            $table->integer('AmarillasJugadoresLocal');
            $table->integer('RojasJugadoresLocal');
            $table->integer('AmarillasCuerpoTecnicoLocal');
            $table->integer('RojasCuerpoTecnicoLocal');
            $table->integer('AmarillasJugadoresVisitante');
            $table->integer('RojasJugadoresVisitante');
            $table->integer('AmarillasCuerpoTecnicoVisitante');
            $table->integer('RojasCuerpoTecnicoVisitante');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partits');
    }
};
