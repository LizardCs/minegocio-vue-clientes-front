<template>
  <div v-if="direcciones.length > 0" class="direcciones-adicionales">
    <h2>Direcciones adicionales: {{ cliente?.names }}</h2>

    <div class="lista-general">
      <DataTable :value="direcciones" responsiveLayout="scroll" :showGridlines="true" class="p-datatable-sm">
        <Column field="provincia" header="Provincia" />
        <Column field="ciudad" header="Ciudad" />
        <Column field="direccion" header="Dirección" />
      </DataTable>
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
