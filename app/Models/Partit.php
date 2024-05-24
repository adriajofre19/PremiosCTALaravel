<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partit extends Model
{
    use HasFactory;

    protected $fillable = [
        'competicio',
        'grup',
        'jornada',
        'equipoLocal',
        'equipoVisitant',
        'resLocal',
        'resVisitant',
        'ganador',
        'arbitre',
        'AmarillasJugadoresLocal',
        'RojasJugadoresLocal',
        'AmarillasCuerpoTecnicoLocal',
        'RojasCuerpoTecnicoLocal',
        'AmarillasJugadoresVisitante',
        'RojasJugadoresVisitante',
        'AmarillasCuerpoTecnicoVisitante',
        'RojasCuerpoTecnicoVisitante'
    ];
}
