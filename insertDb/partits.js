const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const mysql = require('mysql');

async function obtenerPartido() {
    let arrayArbitres = ['COBOS PUJOL, JAN', 'BALLESTEROS JURADO, ADRIA', 'MURILLO FIOL, RODRIGO', 'JOFRE CANTON, ADRIA', 'HARTI ELMOUADDAN, ABDULLAH', 'CORTES PORTELL, ALBERT', 'MBALLOW BALDEH, DAUDA', 'ZAMBRANO ACOSTA, JAIRO', 'FERNANDEZ SERRA, ARNALD', 'ELMEZOUAK BENNADI, MOHAMED', 'CLAPAROLS FABRI, MARC', 'NOGUEIRA ORELLANA, DANIEL', 'GOZALVEZ NOVELLA, OSCAR', 'ACHKIROU MATVIYNKO, SAMIR', 'LAKTAMI MOUSMI, ALAE'];
    const arrayCategorias = ['tercera-federacion', 'lliga-elit', 'primera-catalana', 'segona-catalana', 'tercera-catalana', 'quarta-catalana'];
    const arrayGrupos = ['grup-1', 'grup-2', 'grup-3', 'grup-v'];

    for (let cat of arrayCategorias) {
        for (let grupo of arrayGrupos) {
            for (let jornada = 1; jornada <= 30; jornada++) {

                let url = 'https://www.fcf.cat/resultats/2324/futbol-11/' + cat + '/' + grupo + '/jornada-' + jornada;

                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                $('.linia').each((index, element) => {
                    const arbitreCamp = $(element).find('td').eq(5).text().trim();
                    const camp = $(element).find('td').eq(5).find('a').text().trim();
                    const arbitre = arbitreCamp.replace(camp, '');

                    let equipoLocal = $(element).find('td').eq(1).text().trim();
                    let equipoVisitante = $(element).find('td').eq(3).text().trim();

                    equipoLocal = equipoLocal.replace(/\s+/g, ' ');
                    equipoVisitante = equipoVisitante.replace(/\s+/g, ' ');


                    let SearchequipoLocal = equipoLocal.replace(/[.,']/g, '').replace(/\s+/g, '-');
                    let SearchequipoVisitante = equipoVisitante.replace(/[.,']/g, '').replace(/\s+/g, '-');

                    SearchequipoLocal = CambiarNombreEquipo(SearchequipoLocal);
                    SearchequipoVisitante = CambiarNombreEquipo(SearchequipoVisitante);


                    let cat_aux = '';

                    if (cat === 'primera-catalana') {
                        cat_aux = '1cat';
                    } else if (cat === 'segona-catalana') {
                        cat_aux = '2cat';
                    } else if (cat === 'tercera-catalana') {
                        cat_aux = '3cat';
                    } else if (cat === 'lliga-elit') {
                        cat_aux = 'elit';
                    } else if (cat === 'tercera-federacion') {
                        cat_aux = 'aa';
                    } else if (cat === 'quarta-catalana') {
                        cat_aux = '4cat';
                    }

                    if (cat === 'quarta-catalana') {
                        arrayArbitres = ['POT PAVON, MANUEL', 'ASBAI ELHARCHE, YOUSSEF', 'MORAGA VIDAL, ALBERTO', 'PALOU BAYONA, DERAY', 'ROMERO MOTA, CÉSAR', 'BOJNOWSKI PRIM, LLUIS', 'FORTUNY MATUTE, MARC', 'LOPEZ MORENTE, DANIEL'];
                    }


                    if (arrayArbitres.includes(arbitre)) {

                        const url = 'https://www.fcf.cat/acta/2324/futbol-11/' + cat + '/' + grupo + '/' + cat_aux + '/' + SearchequipoLocal + '/' + cat_aux + '/' + SearchequipoVisitante;

                        getActa(url);
                    }

                });
            }
        }
    }
}

async function getActa(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let targetesTableLocal = $('.col-md-4').eq(0).find('table').last();
    let targetesTableVisitant = $('.col-md-4').eq(2).find('table').last();

    let AmarillasJugadoresLocal = 0;
    targetesTableLocal.find('.groga-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta !== '') {
            AmarillasJugadoresLocal++;
        }
    });

    let RojasJugadoresLocal = 0;
    targetesTableLocal.find('.vermella-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta !== '') {
            RojasJugadoresLocal++;
        }
    });


    let AmarillasCuerpoTecnicoLocal = 0;
    targetesTableLocal.find('.groga-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta === '') {
            AmarillasCuerpoTecnicoLocal++;
        }
    });

    let RojasCuerpoTecnicoLocal = 0;
    targetesTableLocal.find('.vermella-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta === '') {
            RojasCuerpoTecnicoLocal++;
        }
    });

    let AmarillasJugadoresVisitante = 0;
    targetesTableVisitant.find('.groga-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta !== '') {
            AmarillasJugadoresVisitante++;
        }
    });

    let RojasJugadoresVisitante = 0;
    targetesTableVisitant.find('.vermella-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta !== '') {
            RojasJugadoresVisitante++;
        }
    });


    let AmarillasCuerpoTecnicoVisitante = 0;
    targetesTableVisitant.find('.groga-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta === '') {
            AmarillasCuerpoTecnicoVisitante++;
        }
    });

    let RojasCuerpoTecnicoVisitante = 0;
    targetesTableVisitant.find('.vermella-s').each((index, element) => {
        const numSamarreta = $(element).parent().parent().parent().parent().find('.num-samarreta-acta2').text().trim();
        if (numSamarreta === '') {
            RojasCuerpoTecnicoVisitante++;
        }
    });

    const equipoLocal = $('.acta-equip').eq(0).text().trim();

    const equipoVisitant = $('.acta-equip').eq(1).text().trim();

    let arbitre = $('th:contains("Àrbitre")').closest('table').find('td').eq(1).text().trim();
    arbitre = arbitre.replace('(Figueres)', '').trim();
    arbitre = arbitre.replace('(Girona)', '').trim();
    console.log(arbitre);

    let resultat = $('.acta-marcador').find('span').text().trim();

    resultat = resultat.split('-');
    let resLocal = parseInt(resultat[0]);
    let resVisitant = parseInt(resultat[1]);

    let ganador = '';
    if (resLocal > resVisitant) {
        ganador = 'Local';
    } else if (resLocal < resVisitant) {
        ganador = 'Visitante'
    } else {
        ganador = 'Empate';
    }

    let competiciogrup = $('.print-acta-comp').text().trim();

    competiciogrup = competiciogrup.split(' - ');
    competicio = competiciogrup[0];
    grup = competiciogrup[1];

    let Jornada = $('.print-acta-jornada').text().trim();


    const data = {
        competicio,
        grup,
        Jornada,
        equipoLocal,
        equipoVisitant,
        resLocal,
        resVisitant,
        ganador,
        arbitre,
        AmarillasJugadoresLocal,
        RojasJugadoresLocal,
        AmarillasCuerpoTecnicoLocal,
        RojasCuerpoTecnicoLocal,
        AmarillasJugadoresVisitante,
        RojasJugadoresVisitante,
        AmarillasCuerpoTecnicoVisitante,
        RojasCuerpoTecnicoVisitante
    };


    if (competicio === 'QUARTA CATALANA') {
        arrayArbitres = ['POT PAVON, MANUEL', 'ASBAI ELHARCHE, YOUSSEF', 'MORAGA VIDAL, ALBERTO', 'PALOU BAYONA, DERAY', 'ROMERO MOTA, CÉSAR', 'BOJNOWSKI PRIM, LLUIS', 'FORTUNY MATUTE, MARC', 'LOPEZ MORENTE, DANIEL'];
    } else {
        arrayArbitres = ['COBOS PUJOL, JAN', 'BALLESTEROS JURADO, ADRIA', 'MURILLO FIOL, RODRIGO', 'JOFRE CANTON, ADRIA', 'CORTES PORTELL, ALBERT', 'MBALLOW BALDEH, DAUDA', 'ZAMBRANO ACOSTA, JAIRO', 'FERNANDEZ SERRA, ARNALD', 'ELMEZOUAK BENNADI, MOHAMED', 'CLAPAROLS FABRI, MARC', 'NOGUEIRA ORELLANA, DANIEL', 'GOZALVEZ NOVELLA, OSCAR', 'ACHKIROU MATVIYNKO, SAMIR', 'LAKTAMI MOUSMI, ALAE'];
    }


    if (arrayArbitres.includes(arbitre)) {
        console.log('-');
    } else {
        console.log(url);
    }


    createJson(data);
}

obtenerPartido();

function createJson(info) {
    // recorrer el array de info y crear un json con todos los datos
    let json = JSON.stringify(info, null, 2);

    // afegir al fitxer json, separa els diferents partits amb una coma i un salt de línia, posa tota la informació entre []
    fs.appendFile('public/partits.json', json + ',\n', (err) => {
        if (err) {
            console.log(err);
        } else {
        }
    });
}


function CambiarNombreEquipo(equipo) {
    switch (equipo) {
        case 'MONT-RASCE-A':
            return 'mont-ras-ce-a';
            break;
        case 'ARBUCIESCLUB-FUTBOL-A':
            return 'arbucies-club-futbol-a';
            break;
        case 'MOLLET-UECF-A':
            return 'mollet-ue-cf-a';
            break;
        case 'VILASSAR-MARUE-A':
            return 'vilassar-mar-ue-a';
            break;
        case 'MONTAÑESA-CF-A':
            return 'montanesa-cf-a';
            break;
        case 'GARRIGUELLACE-A':
            return 'garriguella-ce-a';
            break;
        case 'JOANETESCF-A':
            return 'joanetes-cf-a';
            break;
        case 'MAS-MASCORT-DE-PALAFRUGELLFC-A':
            return 'mas-mascort-de-palafrugell-fc-a';
            break;
    }
    return equipo;
}