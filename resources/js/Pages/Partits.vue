<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { defineProps } from 'vue';

const props = defineProps({
    partits: {
        type: Array,
        required: true
    }
});

console.log(props.partits);

let arbitres = ref([]);
arbitres.value = props.partits.map(partit => partit.arbitre);
arbitres.value = arbitres.value.filter((arbitre, index) => arbitres.value.indexOf(arbitre) === index);

let arbitreSeleccionat = ref(''); // Variable per emmagatzemar l'arbitre seleccionat
let partitsArbitreSeleccionat = ref([]); // Variable per emmagatzemar els partits de l'arbitre seleccionat

// Mètode per filtrar els partits segons l'arbitre seleccionat
const filtrarPartits = () => {
    partitsArbitreSeleccionat.value = props.partits.filter(partit => partit.arbitre === arbitreSeleccionat.value);
}
</script>

<template>
    <AuthenticatedLayout>
        <select v-model="arbitreSeleccionat" @change="filtrarPartits">
            <option value="">Tots els àrbitres</option>
            <!-- Loop through the arbitres array and generate an option for each one -->
            <option v-for="arbitre in arbitres" :key="arbitre.id" :value="arbitre">{{ arbitre }}</option>
        </select>

        <div v-if="partitsArbitreSeleccionat != ''">
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Targetas Jug Local</th>
                        <th>Targetas Cp Local</th>
                        <th>Resultat</th>
                        <th>Visitant</th>
                        <th>Àrbitre</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loop through the partits array and generate a row for each one -->
                    <tr v-for="partit in partitsArbitreSeleccionat" :key="partit.id">
                        <td>{{ partit.equipoLocal }}</td>
                        <td>Amarillas: {{ partit.AmarillasJugadoresLocal }} Rojas: {{ partit.RojasJugadoresLocal }}</td>
                        <td>Amarillas: {{ partit.AmarillasCuerpoTecnicoLocal }} Rojas: {{ partit.RojasCuerpoTecnicoLocal
                            }}</td>
                        <td>{{ partit.resLocal }} - {{ partit.resVisitant }}</td>
                        <td>{{ partit.equipoVisitant }}</td>
                        <td>{{ partit.arbitre }}</td>
                    </tr>
                </tbody>
            </table>
        </div>






        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Local
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Resultat
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Visitant
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="partit in partitsArbitreSeleccionat"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            class="px-6 flex py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ partit.equipoLocal }}
                            <svg class="w-6 h-6 text-yellow-500" style="color: yellow;" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M4 4c0-.975.718-2 1.875-2h12.25C19.282 2 20 3.025 20 4v16c0 .975-.718 2-1.875 2H5.875C4.718 22 4 20.975 4 20V4Zm7 13a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
                                    clip-rule="evenodd" />
                            </svg> {{ partit.AmarillasJugadoresLocal }}


                        </th>
                        <td class="px-6 py-4">
                            {{ partit.resLocal }} - {{ partit.resVisitant }}
                        </td>
                        <td class="px-6 py-4">
                            {{ partit.equipoVisitant }}
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>




    </AuthenticatedLayout>
</template>