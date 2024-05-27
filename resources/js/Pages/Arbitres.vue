<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
});

let partits = ref([]);
let arbitres = ref([]);
let partitsArbitre = ref([]);
let arbitresSeleccionats = ref([]);
let estadistiquesArbitres = ref([]);

axios.get('partits.json').then(response => {
    partits.value = response.data;
    arbitres.value = partits.value.map(partit => partit.arbitre);
    arbitres.value = arbitres.value.filter((arbitre, index) => arbitres.value.indexOf(arbitre) === index);

});

let addArbitre = (arbitre) => {
    if (arbitresSeleccionats.value.includes(arbitre)) {
        arbitresSeleccionats.value = arbitresSeleccionats.value.filter(a => a !== arbitre);
    } else {
        arbitresSeleccionats.value.push(arbitre);
    }
};

const filtrarPartits = () => {
    partitsArbitre.value = partits.value.filter(partit => arbitresSeleccionats.value.includes(partit.arbitre));
    estadistiquesArbitres.value = arbitresSeleccionats.value.map(arbitre => {
        return {
            arbitre: arbitre,
            numpartits: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).length,
            amarillasJugadoresLocal: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.AmarillasJugadoresLocal, 0),
            rojasJugadoresLocal: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.RojasJugadoresLocal, 0),
            amarillasCuerpoTecnicoLocal: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.AmarillasCuerpoTecnicoLocal, 0),
            rojasCuerpoTecnicoLocal: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.RojasCuerpoTecnicoLocal, 0),
            amarillasJugadoresVisitante: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.AmarillasJugadoresVisitante, 0),
            rojasJugadoresVisitante: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.RojasJugadoresVisitante, 0),
            amarillasCuerpoTecnicoVisitante: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.AmarillasCuerpoTecnicoVisitante, 0),
            rojasCuerpoTecnicoVisitante: partitsArbitre.value.filter(partit => partit.arbitre === arbitre).reduce((acc, partit) => acc + partit.RojasCuerpoTecnicoVisitante, 0),
            victoriasLocal: partitsArbitre.value.filter(partit => partit.arbitre === arbitre && partit.ganador === 'Local').length,
            victoriasVisitante: partitsArbitre.value.filter(partit => partit.arbitre === arbitre && partit.ganador === 'Visitante').length,
            empates: partitsArbitre.value.filter(partit => partit.arbitre === arbitre && partit.ganador === 'Empate').length
            
        };

    });
};

function limitarDecimals(num) {
    return num.toFixed(2);
}

</script>

<template>

    <AuthenticatedLayout>

        <div class="max-w-sm mx-auto mt-12">
            <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover"
                class="text-gray-600 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button">Seleccionar àrbitres <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <button
                class="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-4"
                type="button" @click="filtrarPartits">Filtrar partits</button>
        </div>

        <!-- Dropdown menu -->
        <div id="dropdownBgHover" class="z-10 hidden w-70 bg-white rounded-lg shadow h-64 overflow-x-auto">
            <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
                <li v-for="arbitre in arbitres">
                    <div class="flex items-center p-2 rounded hover:bg-gray-100">
                        <input id="checkbox-item-4" type="checkbox" class="w-4 h-4 rounded text-blue-600"
                            @click="addArbitre(arbitre)">

                        <label for="checkbox-item-4"
                            class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ arbitre
                            }}</label>
                    </div>
                </li>
            </ul>
        </div>

        <div class="max-w-full relative overflow-x-auto mt-8">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs bg-gray-800 text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Arbitro
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amarillas Jugadores
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Rojas Jugadores
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amarillas Cuerpo Técnico
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Rojas Cuerpo Técnico
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Victorias Local
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Victorias Visitante
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Empates
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Número partidos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="estadistiquesArbitre in estadistiquesArbitres" class="bg-white border-b">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items center">
                                <div class="text-sm font-medium">
                                    {{ estadistiquesArbitre.arbitre }}
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="bg-yellow-400 py-1 px-3 mr-2 text-black rounded-md"></span>
                                <span class="mt-1">{{ estadistiquesArbitre.amarillasJugadoresLocal + estadistiquesArbitre.amarillasJugadoresVisitante }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals((estadistiquesArbitre.amarillasJugadoresLocal + estadistiquesArbitre.amarillasJugadoresVisitante) / estadistiquesArbitre.numpartits) }} / partit</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="bg-red-500 py-1 px-3 mr-2 text-black rounded-md"></span>
                                <span class="mt-1">{{ estadistiquesArbitre.rojasJugadoresLocal + estadistiquesArbitre.rojasJugadoresVisitante }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals((estadistiquesArbitre.rojasJugadoresLocal + estadistiquesArbitre.rojasJugadoresVisitante) / estadistiquesArbitre.numpartits) }} / partit</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="bg-yellow-400 py-1 px-3 mr-2 text-black rounded-md"></span>
                                <span class="mt-1">{{ estadistiquesArbitre.amarillasCuerpoTecnicoLocal + estadistiquesArbitre.amarillasCuerpoTecnicoVisitante }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals((estadistiquesArbitre.amarillasCuerpoTecnicoLocal + estadistiquesArbitre.amarillasCuerpoTecnicoVisitante) / estadistiquesArbitre.numpartits) }} / partit</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="bg-red-500 py-1 px-3 mr-2 text-black rounded-md"></span>
                                <span class="mt-1">{{ estadistiquesArbitre.rojasCuerpoTecnicoLocal + estadistiquesArbitre.rojasCuerpoTecnicoVisitante }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals((estadistiquesArbitre.rojasCuerpoTecnicoLocal + estadistiquesArbitre.rojasCuerpoTecnicoVisitante) / estadistiquesArbitre.numpartits) }} / partit</span>
                            </div>
                        </td>


                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="mt-1">{{ estadistiquesArbitre.victoriasLocal }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals(estadistiquesArbitre.victoriasLocal / estadistiquesArbitre.numpartits * 100) }} %
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="mt-1">{{ estadistiquesArbitre.victoriasVisitante }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals(estadistiquesArbitre.victoriasVisitante / estadistiquesArbitre.numpartits * 100) }} %
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900 flex">
                                <span class="mt-1">{{ estadistiquesArbitre.empates }} </span>
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ limitarDecimals(estadistiquesArbitre.empates / estadistiquesArbitre.numpartits * 100) }} %
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                                <span class="text-sm text-gray-900 bg-gray-300 py-1 px-2 rounded-lg ml-4">{{ estadistiquesArbitre.numpartits }} partits </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </AuthenticatedLayout>

</template>
