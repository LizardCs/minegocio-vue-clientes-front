<template>
  <div>
    <h2>Clientes Registrados</h2>
    <div class="buscador flex gap-2 mb-3">
      <input v-model="filtro" type="text" placeholder="Buscar por cédula o nombre" class="p-inputtext p-component" />
      <Button label="Buscar" style="background-color:  #6ba4e7; " icon="pi pi-search" @click="buscarCliente" />
      <Button label="Limpiar" icon="pi pi-times" severity="secondary" @click="limpiarBusqueda" />
    </div>

    <DataTable :value="clientesOrdenados" dataKey="id" stripedRows paginator :rows="10"
      emptyMessage="No hay clientes registrados." tableStyle="min-width: 50rem">
      <Column field="id" header="N" style="width: 3rem" headerClass="p-text-center" bodyClass="p-text-center"/>
      <Column field="identificationType" header="Tipo" />
      <Column field="identificationNumber" header="ID o RUC" />
      <Column field="names" header="Nombre" />
      <Column field="email" header="Email" />
      <Column field="cellphone" header="Celular" />
      <Column field="mainCity" header="Ciudad" />
      <Column field="mainAddress" header="Dirección" />
      <Column header="Acciones" headerClass="p-text-center" bodyClass="p-text-center">
        <template #body="{ data }">
          <div class="acciones-botones">
            <Button icon="pi pi-trash" severity="danger" rounded aria-label="Eliminar"
              @click="$emit('eliminar', data.id)" />
            <Button icon="pi pi-pencil" severity="warning" rounded aria-label="Editar" @click="$emit('editar', data)" />
            <Button label="DIR" icon="pi pi-map-marker" severity="info" @click="$emit('adicionales', data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import type { Cliente } from '../services/clienteservice'
import { ref, computed } from 'vue'
import { buscarClientes } from '../services/clienteservice'

const props = defineProps<{ clientes: Cliente[] }>()
const emit = defineEmits(['update:clientes', 'eliminar', 'editar', 'adicionales', 'limpiar'])

const filtro = ref('')
const clientesFiltrados = ref<Cliente[] | null>(null)

const clientesOrdenados = computed(() => {
  const lista = clientesFiltrados.value ?? props.clientes
  return [...lista].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
})

async function buscarCliente() {
  if (filtro.value.trim() === '') {
    clientesFiltrados.value = null
    return
  }

  try {
    clientesFiltrados.value = await buscarClientes(filtro.value)
  } catch (error) {
    console.error('Error al buscar cliente:', error)
    clientesFiltrados.value = []
  }
}

function limpiarBusqueda() {
  filtro.value = ''
  clientesFiltrados.value = null
  emit('limpiar')
}

</script>
