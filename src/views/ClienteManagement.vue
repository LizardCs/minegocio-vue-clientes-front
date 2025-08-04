<template>
  <main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Gestión de Clientes</h1>

    <!-- Botón Prime para mostrar formulario -->
    <Button v-if="!mostrarFormulario" label="Nuevo Cliente" icon="pi pi-plus" class="mb-4" @click="toggleFormulario" style="background-color: #6ba4e7; border-color: #6ba4e7; color: white;" />

    <ClienteForm v-if="mostrarFormulario" :modelo="clienteSeleccionado" @guardado="guardarCliente"
      @cancelar="cancelarFormulario" />

    <ClienteList :clientes="clientes" @editar="editarCliente" @eliminar="eliminarCliente"
      @adicionales="cargarDireccionesAdicionales" @limpiar="limpiarTodo" />

    <DireccionForm v-if="mostrarFormularioDireccion && clienteSeleccionadoParaDirecciones"
      :cliente="clienteSeleccionadoParaDirecciones" @guardado="direccionGuardada"
      @cancelar="mostrarFormularioDireccion = false" />

    <DireccionesList :direcciones="direccionesAdicionales" :cliente="clienteSeleccionadoParaDirecciones" />

    <div v-if="clienteSeleccionadoParaDirecciones" class="general mt-3">
      <Button label="Agregar Dirección Adicional" icon="pi pi-map-marker" class="btn-direccion"
        @click="mostrarFormularioAgregarDireccion" style="background-color: #6ba4e7; border-color: #6ba4e7; color: white;" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ClienteForm from '../components/Clienteform.vue'
import ClienteList from '../components/ClienteList.vue'
import DireccionForm from '../components/DireccionadicionalForm.vue'
import DireccionesList from '../components/DireccionesList.vue'
import type { Cliente } from '../services/clienteservice'
import type { Direccion } from '../services/direccionservice'
import { obtenerDireccionesAdicionales } from '../services/direccionservice'

import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente as eliminarClienteService
} from '../services/clienteservice'

// metodos referenciados
const clientes = ref<Cliente[]>([])
const clienteSeleccionado = ref<Cliente | null>(null)
const mostrarFormulario = ref(false)
const direccionesAdicionales = ref<Direccion[]>([])
const clienteSeleccionadoParaDirecciones = ref<Cliente | null>(null)
const mostrarFormularioDireccion = ref(false)

onMounted(async () => {
  clientes.value = await listarClientes()
})

// Mostrar/ocultar formulario de cliente
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value
  if (!mostrarFormulario.value) clienteSeleccionado.value = null
}

const guardarCliente = async (cliente: Cliente) => {
  if (cliente.id) {
    await actualizarCliente(cliente.id, cliente)
  } else {
    const clienteCrearDTO = {
      identificationType: cliente.identificationType,
      identificationNumber: cliente.identificationNumber,
      names: cliente.names,
      email: cliente.email,
      cellphone: cliente.cellphone,
      direccionMatriz: {
        provincia: cliente.mainProvince,
        ciudad: cliente.mainCity,
        direccion: cliente.mainAddress
      }
    }
    await crearCliente(clienteCrearDTO)
  }

  await cargarClientes()
  cancelarFormulario()
}


const editarCliente = (cliente: Cliente) => {
  clienteSeleccionado.value = { ...cliente }
  mostrarFormulario.value = true
}


const eliminarCliente = async (id?: number) => {
  if (id && confirm('¿Eliminar este cliente?')) {
    await eliminarClienteService(id)
    await cargarClientes()
  }
}

// Cancelar
const cancelarFormulario = () => {
  clienteSeleccionado.value = null
  mostrarFormulario.value = false
}


const cargarClientes = async () => {
  clientes.value = await listarClientes()
}

// Cargar direcciones adicionales por cliente
const cargarDireccionesAdicionales = async (cliente: Cliente) => {
  clienteSeleccionadoParaDirecciones.value = cliente
  try {
    direccionesAdicionales.value = await obtenerDireccionesAdicionales(cliente.id!)
  } catch (error) {
    console.error('Error al obtener direcciones adicionales:', error)
    direccionesAdicionales.value = []
  }
}

const mostrarFormularioAgregarDireccion = () => {
  mostrarFormularioDireccion.value = true
}

const direccionGuardada = async () => {
  mostrarFormularioDireccion.value = false
  if (clienteSeleccionadoParaDirecciones.value) {
    direccionesAdicionales.value = await obtenerDireccionesAdicionales(clienteSeleccionadoParaDirecciones.value.id!)
  }
}

const limpiarTodo = () => {
  direccionesAdicionales.value = []
  clienteSeleccionadoParaDirecciones.value = null
  mostrarFormularioDireccion.value = false
}

</script>
