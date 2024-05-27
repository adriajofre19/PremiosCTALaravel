<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { defineProps } from 'vue';
import axios from 'axios';



let partits = [];
let arbitres = ref([]);

// Fetch the partits data from partits.json
axios.get('partits.json')
    .then(response => {
        console.log(response.data);
        partits = response.data;
        arbitres.value = partits.map(partit => partit.arbitre);
        arbitres.value = arbitres.value.filter((arbitre, index) => arbitres.value.indexOf(arbitre) === index);
    })
    .catch(error => {
        console.error(error);
    });

console.log(partits);
console.log(arbitres.value);

let arbitreSeleccionat = ref(''); // Variable per emmagatzemar l'arbitre seleccionat
let partitsArbitreSeleccionat = ref([]); // Variable per emmagatzemar els partits de l'arbitre seleccionat

let totalPartits = 0;
let totalAmarillesJugadors = 0;
let totalAmarillesCuerpoTecnico = 0;
let totalRojasJugadors = 0;
let totalRojasCuerpoTecnico = 0;
let totalVicoriasLocales = 0;
let totalVicoriasVisitantes = 0;
let totalEmpates = 0;

function limitarDecimals(num) {
    return num.toFixed(2);
}

// Mètode per filtrar els partits segons l'arbitre seleccionat
const filtrarPartits = () => {
    partitsArbitreSeleccionat.value = partits.filter(partit => partit.arbitre === arbitreSeleccionat.value);
    totalPartits = 0;
    totalAmarillesJugadors = 0;
    totalAmarillesCuerpoTecnico = 0;
    totalRojasJugadors = 0;
    totalRojasCuerpoTecnico = 0;
    totalVicoriasLocales = 0;
    totalVicoriasVisitantes = 0;
    totalEmpates = 0;
    

    partitsArbitreSeleccionat.value.forEach(partit => {
        totalPartits += 1;
        totalAmarillesJugadors += partit.AmarillasJugadoresLocal + partit.AmarillasJugadoresVisitante;
        totalAmarillesCuerpoTecnico += partit.AmarillasCuerpoTecnicoLocal + partit.AmarillasCuerpoTecnicoVisitante;
        totalRojasJugadors += partit.RojasJugadoresLocal + partit.RojasJugadoresVisitante;
        totalRojasCuerpoTecnico += partit.RojasCuerpoTecnicoLocal + partit.RojasCuerpoTecnicoVisitante;
        if (partit.ganador === 'Local') {
            totalVicoriasLocales += 1;
        } else if (partit.ganador === 'Visitante') {
            totalVicoriasVisitantes += 1;
        } else {
            totalEmpates += 1;
        }
    });
    }
</script>

<template>

<AuthenticatedLayout>

<form class="max-w-sm mx-auto mt-12 pl-4 pr-4 md:p-0">
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Selecciona un àrbitre</label>
  <select v-model="arbitreSeleccionat" @change="filtrarPartits" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option v-for="arbitre in arbitres" :key="arbitre.id" :value="arbitre">{{ arbitre }}</option>
  </select>
</form>

<section v-if="partitsArbitreSeleccionat != ''" class="hidden md:block">
    <div class="py-16">
        <div class="mx-auto px-6 max-w-full text-gray-500">
            <div class="relative">
                <div class="relative z-10 grid gap-3 grid-cols-6">
                    <div class="col-span-full lg:col-span-4 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200">
                        <div class="w-full relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs bg-gray-800 text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Jorndada
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Partido
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ganador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tarjetas Local
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tarjetas Visitante
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="partido in partitsArbitreSeleccionat" :key="partido.id" class="bg-white border-b">
                        <td class="px-6 py-4">
                            {{ partido.Jornada }}
                        </td>
                        <td class="px-6 py-4">
                            {{ partido.equipoLocal }} <span class="bg-gray-300 p-1 rounded-md mx-2 px-2">{{ partido.resLocal
                                }} -
                                {{
                                    partido.resVisitant }} </span> {{
                                    partido.equipoVisitant }}
                        </td>

                        <td class="px-6 py-4">
                            <span v-if="partido.ganador === 'Local'" class="bg-orange-200 p-1 rounded-md">{{
                                partido.ganador }}
                            </span>
                            <span v-else-if="partido.ganador === 'Visitante'" class="bg-green-200 p-1 rounded-md">{{
                                partido.ganador }}</span>
                            <span v-else class="bg-yellow-200 p-1 rounded-md">Empate</span>
                        </td>

                        <td class="px-6 py-4">
                            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.AmarillasJugadoresLocal }}</span>
                            <span class="bg-red-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.RojasJugadoresLocal }}</span>
                            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.AmarillasCuerpoTecnicoLocal }}</span>
                            <span class="bg-red-400 py-1 px-2 text-black rounded-md"> {{ partido.RojasCuerpoTecnicoLocal
                                }}</span>
                        </td>

                        <td class="px-6 py-4">
                            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.AmarillasJugadoresVisitante }}</span>
                            <span class="bg-red-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.RojasJugadoresVisitante
                                }}</span>
                            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{
                                partido.AmarillasCuerpoTecnicoVisitante
                            }}</span>
                            <span class="bg-red-400 py-1 px-2 text-black rounded-md"> {{
                                partido.RojasCuerpoTecnicoVisitante
                                }}</span>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
                    </div>
                    <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200">
                        

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs bg-gray-800 text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Cantidad
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Media
                        </th>
                    </tr>
                </thead>
        <tbody>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Amarillas Jugadores
                </th>
                <td class="px-6 py-4">
                    {{ totalAmarillesJugadors }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalAmarillesJugadors / totalPartits) }} / partit
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Amarillas Cuerpo Técnico
                </th>
                <td class="px-6 py-4">
                    {{ totalAmarillesCuerpoTecnico }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalAmarillesCuerpoTecnico / totalPartits) }} / partit
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Rojas Jugadores
                </th>
                <td class="px-6 py-4">
                    {{ totalRojasJugadors }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalRojasJugadors / totalPartits) }} / partit
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Rojas Cuerpo Técnico
                </th>
                <td class="px-6 py-4">
                    {{ totalRojasCuerpoTecnico }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalRojasCuerpoTecnico / totalPartits) }} / partit
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Vicorias Locales
                </th>
                <td class="px-6 py-4">
                    {{ totalVicoriasLocales }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalVicoriasLocales / totalPartits * 100)}} %
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Vicorias Visitantes
                </th>
                <td class="px-6 py-4">
                    {{ totalVicoriasVisitantes }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalVicoriasVisitantes / totalPartits * 100)}} %
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Empates
                </th>
                <td class="px-6 py-4">
                    {{ totalEmpates }}
                </td> 
                <td class="px-6 py-4">
                    {{ limitarDecimals(totalEmpates / totalPartits * 100)}} %
                </td> 
            </tr>
            <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Total Partits
                </th>
                <td class="px-6 py-4">
                    {{ totalPartits }}
                </td> 
            </tr>
        </tbody>
    </table>
</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div v-if="partitsArbitreSeleccionat != ''" class="md:hidden  mt-4 rounded-lg">
    <div v-for="partido in partitsArbitreSeleccionat" :key="partido.id" class="bg-white m-4 border border-gray-300 rounded-lg">
        <p class="text-gray-900 p-4 bg-gray-300">{{ partido.Jornada }}</p>
        <p class="text-gray-500 p-4">{{ partido.equipoLocal }} <span class="bg-gray-300 px-2 py-1 rounded-lg mx-2">{{ partido.resLocal }} - {{ partido.resVisitant }}</span> {{ partido.equipoVisitant }}</p>
        <span v-if="partido.ganador === 'Local'" class="ml-4 mb-4 mt-4 text-gray-500 bg-yellow-200 py-1 px-2 rounded-lg ">Ganador: {{ partido.ganador }}</span>
        <span v-else-if="partido.ganador === 'Visitante'" class="ml-4 mb-4 mt-4 text-gray-500 bg-orange-200 py-1 px-2 rounded-lg ">Ganador: {{ partido.ganador }}</span>
        <span v-else class="ml-4 mb-4 mt-4 text-gray-500 bg-green-200 py-1 px-2 rounded-lg ">Empate</span>
        
        <h1 class="ml-4 mb-2 text-gray-500 mt-4">{{ partido.equipoLocal }}</h1>
        <div class="flex ml-4">
            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.AmarillasJugadoresLocal }}</span>
            <span class="bg-red-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.RojasJugadoresLocal }}</span>
            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.AmarillasCuerpoTecnicoLocal }}</span>
            <span class="bg-red-400 py-1 px-2 text-black rounded-md"> {{ partido.RojasCuerpoTecnicoLocal }}</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">{{ partido.equipoVisitant }}</h1>
        <div class="flex ml-4 mb-4">
            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.AmarillasJugadoresVisitante }}</span>
            <span class="bg-red-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.RojasJugadoresVisitante }}</span>
            <span class="bg-yellow-400 py-1 px-2 mr-2 text-black rounded-md"> {{ partido.AmarillasCuerpoTecnicoVisitante }}</span>
            <span class="bg-red-400 py-1 px-2 text-black rounded-md"> {{ partido.RojasCuerpoTecnicoVisitante }}</span>
        </div>
    </div>

    <div class="bg-white m-4 border border-gray-300 rounded-lg">
        <p class="text-gray-900 p-4 bg-gray-300">Esadisticas globales</p>
        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Amarillas a jugadores</h1>
        <div class="flex ml-4">
            <span class="bg-yellow-400 py-1 px-3 mr-2 text-black rounded-md"></span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ totalAmarillesJugadors }}</span>
            <span class="bg-gray-300 py-1 px-2 text-black rounded-md"> {{ limitarDecimals(totalAmarillesJugadors / totalPartits) }} / partit</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Rojas a jugadores</h1>
        <div class="flex ml-4">
            <span class="bg-red-400 py-1 px-3 mr-2 text-black rounded-md"></span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ totalRojasJugadors }}</span>
            <span class="bg-gray-300 py-1 px-2 text-black rounded-md"> {{ limitarDecimals(totalRojasJugadors / totalPartits) }} / partit</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Amarillas a cuerpo técnico</h1>
        <div class="flex ml-4">
            <span class="bg-yellow-400 py-1 px-3 mr-2 text-black rounded-md"></span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ totalAmarillesCuerpoTecnico }}</span>
            <span class="bg-gray-300 py-1 px-2 text-black rounded-md"> {{ limitarDecimals(totalAmarillesCuerpoTecnico / totalPartits) }} / partit</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Rojas a cuerpo técnico</h1>
        <div class="flex ml-4">
            <span class="bg-red-400 py-1 px-3 mr-2 text-black rounded-md"></span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ totalRojasCuerpoTecnico }}</span>
            <span class="bg-gray-300 py-1 px-2 text-black rounded-md"> {{ limitarDecimals(totalRojasCuerpoTecnico / totalPartits) }} / partit</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Vicorias locales</h1>
        <div class="flex ml-4">
            <span class="bg-gray-300 py-1 px-3 mr-2 text-black rounded-md"> {{ totalVicoriasLocales }}</span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ limitarDecimals(totalVicoriasLocales / totalPartits * 100) }} %</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Vicorias visitantes</h1>
        <div class="flex ml-4">
            <span class="bg-gray-300 py-1 px-3 mr-2 text-black rounded-md"> {{ totalVicoriasVisitantes }}</span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ limitarDecimals(totalVicoriasVisitantes / totalPartits * 100) }} %</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Empates</h1>
        <div class="flex ml-4">
            <span class="bg-gray-300 py-1 px-3 mr-2 text-black rounded-md"> {{ totalEmpates }}</span>
            <span class="py-1 px-2 text-black rounded-md mr-2"> {{ limitarDecimals(totalEmpates / totalPartits * 100) }} %</span>
        </div>

        <h1 class="ml-4 mb-2 mt-4 text-gray-500">Total partidos</h1>
        <div class="flex ml-4 mb-4">
            <span class="bg-gray-300 py-1 px-3 mr-2 text-black rounded-md"> {{ totalPartits }} partidos</span>
        </div>

    </div>
    
</div>



</AuthenticatedLayout>

</template>