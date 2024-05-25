<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { defineProps } from 'vue';
import axios from 'axios';

let partits = [];
let arbitres = ref([]);
let arbitresPartits = ref([]);

// Fetch the partits data from partits.json
axios.get('partits.json')
    .then(response => {
        partits = response.data;
        arbitres.value = partits.map(partit => partit.arbitre);
        arbitres.value = arbitres.value.filter((arbitre, index) => arbitres.value.indexOf(arbitre) === index);
    })
    .catch(error => {
        console.error(error);
    });

let selectedArbitres = ref([]); // Variable per emmagatzemar els àrbitres seleccionats
let selectArbitre = (arbitre) => {
    arbitreSeleccionat.value = arbitre;
    partitsArbitreSeleccionat.value = partits.filter(partit => partit.arbitre === arbitre);
    
    console.log(partitsArbitreSeleccionat.value);
};

let partitsArbitresSeleccionats = ref([]); // Variable per emmagatzemar els partits amb els àrbitres seleccionats

 // Variable per emmagatzemar les estadístiques dels àrbitres seleccionats

let filtrarPartits = () => {
    arbitresPartits.value = partits.filter(partit => selectedArbitres.value.includes(partit.arbitre));
    console.log(arbitresPartits.value);
    // agafar les estadístiques dels àrbitres seleccionats

    let arbitresSeleccionats = selectedArbitres.value;
    console.log(arbitresSeleccionats);

    let estadistiquesArbitres = [];
    // per cada àrbitre seleccionat calcular les estadístiques
    arbitresSeleccionats.forEach(arbitre => {
        let partitsArbitre = arbitresPartits.value.filter(partit => partit.arbitre === arbitre);
        console.log(partitsArbitre);
        let totalAmarillasJugadoresLocal = 0;
        let totalAmarillasJugadoresVisitante = 0;
        let totalAmarillasCuerpoTecnicoLocal = 0;
        let totalAmarillasCuerpoTecnicoVisitante = 0;
        let totalRojasJugadoresLocal = 0;
        let totalRojasJugadoresVisitante = 0;
        let totalRojasCuerpoTecnicoLocal = 0;
        let totalRojasCuerpoTecnicoVisitante = 0;
        let totalVictoriesLocal = 0;
        let totalVictoriesVisitante = 0;
        let totalEmpats = 0;
        let numpartits = partitsArbitre.length;

        partitsArbitre.forEach(partit => {
            totalAmarillasJugadoresLocal += partit.amarillasJugadoresLocal;
            totalAmarillasJugadoresVisitante += partit.amarillasJugadoresVisitante;
            totalAmarillasCuerpoTecnicoLocal += partit.amarillasCuerpoTecnicoLocal;
            totalAmarillasCuerpoTecnicoVisitante += partit.amarillasCuerpoTecnicoVisitante;
            totalRojasJugadoresLocal += partit.rojasJugadoresLocal;
            totalRojasJugadoresVisitante += partit.rojasJugadoresVisitante;
            totalRojasCuerpoTecnicoLocal += partit.rojasCuerpoTecnicoLocal;
            totalRojasCuerpoTecnicoVisitante += partit.rojasCuerpoTecnicoVisitante;
            if (partit.guanyador === 'local') {
                totalVictoriesLocal++;
            } else if (partit.guanyador === 'visitant') {
                totalVictoriesVisitante++;
            } else {
                totalEmpats++;
            }
        });

        estadistiquesArbitres.push({
            arbitre,
            numpartits,
            totalAmarillasJugadoresLocal,
            totalAmarillasJugadoresVisitante,
            totalAmarillasCuerpoTecnicoLocal,
            totalAmarillasCuerpoTecnicoVisitante,
            totalRojasJugadoresLocal,
            totalRojasCuerpoTecnicoLocal,
            totalRojasJugadoresVisitante,
            totalRojasCuerpoTecnicoVisitante,
            totalVictoriesLocal,
            totalVictoriesVisitante,
            totalEmpats
        });
    });

    console.log(estadistiquesArbitres);

   
};

 


</script>

<template>

<AuthenticatedLayout>
<div class="max-w-sm mx-auto mt-12">
<button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" type="button">Seleccionar àrbitres <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
  <button style="background-color: black; color: white; margin-left: 20px; padding: 10px; border-radius: 10px; font-size: 15px;" @click="getSelectedArbitres">Comparar àrbitres</button>
  </div>

<!-- Dropdown menu -->
<div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60">
    <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 " aria-labelledby="dropdownSearchButton">
      <li v-for="arbitre in arbitres" :key="arbitre">
        <div class="flex items-center p-2 rounded hover:bg-gray-100">
          <input type="checkbox" :id="arbitre" :value="arbitre" v-model="selectedArbitres" @change="filtrarPartits" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
          <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded ">{{ arbitre }}</label>
        </div>
      </li>
    </ul>
</div>


<table>
    <thead>
        <tr>
            <th>Àrbitre</th>
            <th>Partits</th>
            <th>Amarilles Jugadors Local</th>
            <th>Amarilles Jugadors Visitant</th>
            <th>Amarilles Cos Tècnic Local</th>
            <th>Amarilles Cos Tècnic Visitant</th>
            <th>Vermelles Jugadors Local</th>
            <th>Vermelles Jugadors Visitant</th>
            <th>Vermelles Cos Tècnic Local</th>
            <th>Vermelles Cos Tècnic Visitant</th>
            <th>Victòries Local</th>
            <th>Victòries Visitant</th>
            <th>Empats</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="estadistiquesArbitre in estadistiquesArbitres" :key="estadistiquesArbitre.arbitre">
            <td>{{ estadistiquesArbitre.arbitre }}</td>
            <td>{{ estadistiquesArbitre.numpartits }}</td>
            <td>{{ estadistiquesArbitre.totalAmarillasJugadoresLocal }}</td>
            <td>{{ estadistiquesArbitre.totalAmarillasJugadoresVisitante }}</td>
            <td>{{ estadistiquesArbitre.totalAmarillasCuerpoTecnicoLocal }}</td>
            <td>{{ estadistiquesArbitre.totalAmarillasCuerpoTecnicoVisitante }}</td>
            <td>{{ estadistiquesArbitre.totalRojasJugadoresLocal }}</td>
            <td>{{ estadistiquesArbitre.totalRojasJugadoresVisitante }}</td>
            <td>{{ estadistiquesArbitre.totalRojasCuerpoTecnicoLocal }}</td>
            <td>{{ estadistiquesArbitre.totalRojasCuerpoTecnicoVisitante }}</td>
            <td>{{ estadistiquesArbitre.totalVictoriesLocal }}</td>
            <td>{{ estadistiquesArbitre.totalVictoriesVisitante }}</td>
            <td>{{ estadistiquesArbitre.totalEmpats }}</td>
        </tr>
    </tbody>

</table>

    <P>{{ arbitresSeleccionats }}</P>
    <div v-for="arbitre in arbitresSeleccionats" :key="arbitre.id">
        <p>{{ arbitre }}</p>
</div>




        </AuthenticatedLayout>

</template>