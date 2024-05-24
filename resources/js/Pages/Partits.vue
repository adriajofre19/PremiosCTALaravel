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

        <div class="relative overflow-x-auto">
            <table class="text-sm text-left rtl:text-right text-gray-500">
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
                            {{ partido.jornada }}
                        </td>
                        <td class="px-6 py-4">
                            {{ partido.equipoLocal }} <span class="bg-gray-300 p-1 rounded-md mx-2">{{ partido.resLocal
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





    </AuthenticatedLayout>
</template>

<style scoped>
.yellow-card {
    background-color: yellow;
    width: 20px;
    height: 25px;
    color: black;
}
</style>