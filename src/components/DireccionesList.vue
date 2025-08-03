<template>
  <div v-if="direcciones.length > 0" class="direcciones-adicionales">
    <h2>Direcciones adicionales: {{ cliente?.names }}</h2>

    <div class="lista-general">

      <table>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Ciudad</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dir in direcciones" :key="dir.id">
            <td>{{ dir.provincia }}</td>
            <td>{{ dir.ciudad }}</td>
            <td>{{ dir.direccion }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { Cliente } from '../services/clienteservice'
import type { Direccion } from '../services/direccionservice'


const props = defineProps<{
  direcciones: Direccion[]
  cliente: Cliente | null
}>()
</script>
