<template>
  <div class="lista-general">
    <h2>Clientes Registrados</h2>

    <div class="buscador">
      <input v-model="filtro" type="text" placeholder="Buscar por cédula o nombre" />
      <button @click="buscarCliente">Buscar</button>
      <button @click="limpiarBusqueda">Limpiar</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Tipo</th>
          <th>ID o RUC</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Celular</th>
          <th>Ciudad</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientesOrdenados" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.identificationType }}</td>
          <td>{{ cliente.identificationNumber }}</td>
          <td>{{ cliente.names }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.cellphone }}</td>
          <td>{{ cliente.mainCity }}</td>
          <td>{{ cliente.mainAddress }}</td>
          <td>
            <button class="btn-eliminar" @click="$emit('eliminar', cliente.id)">BORRAR</button>
            <button class="btn-editar" @click="$emit('editar', cliente)">EDITAR</button>
            <button class="btn-listarC" @click="$emit('adicionales', cliente)">DIR ADICIONALES</button>
          </td>
        </tr>
        <tr v-if="clientesOrdenados.length === 0">
          <td colspan="9" class="no-data">No hay clientes registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { Cliente } from '../services/clienteservice'
import { ref, computed } from 'vue'
import { buscarClientes } from '../services/clienteservice'
import type { Direccion } from '../services/direccionservice';

const props = defineProps<{ clientes: Cliente[] }>()
const emit = defineEmits(['update:clientes', 'eliminar', 'editar', 'adicionales', 'limpiar'])

const mostrarFormularioDireccion = ref(false)
const clienteSeleccionadoParaDirecciones = ref<Cliente | null>(null)
const direccionesAdicionales = ref<Direccion[]>([])


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
