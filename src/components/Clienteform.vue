<template>
  <div class="centro">
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <h2>{{ cliente.id ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>

      <div class="campo">
        <label for="identificationType">Tipo Identificación: </label>
        <Dropdown id="identificationType" v-model="cliente.identificationType" :options="tiposIdentificacion"
          optionLabel="label" optionValue="value" placeholder="Seleccione" required />
      </div>

      <div class="campo">
        <label for="identificationNumber">Número Identificación: </label>
        <InputText id="identificationNumber" v-model="cliente.identificationNumber" required />
      </div>

      <div class="campo">
        <label for="names">Nombres completos: </label>
        <InputText id="names" v-model="cliente.names" required />
      </div>

      <div class="campo">
        <label for="email">Email: </label>
        <InputText id="email" v-model="cliente.email" type="email" />
      </div>

      <div class="campo">
        <label for="cellphone">Celular: </label>
        <InputText id="cellphone" v-model="cliente.cellphone" type="tel" />
      </div>

      <h3>Dirección Matriz</h3>

      <div class="campo">
        <label for="mainProvince">Provincia: </label>
        <InputText id="mainProvince" v-model="cliente.mainProvince" />
      </div>

      <div class="campo">
        <label for="mainCity">Ciudad: </label>
        <InputText id="mainCity" v-model="cliente.mainCity" />
      </div>

      <div class="campo">
        <label for="mainAddress">Dirección: </label>
        <InputText id="mainAddress" v-model="cliente.mainAddress" />
      </div>

      <div class="botones p-d-flex p-jc-start p-gap-3 mt-3">
        <Button label="Actualizar" icon="pi pi-refresh" v-if="cliente.id" type="submit" class="mr-2"
          style="background-color: #6ba4e7; border-color: #6ba4e7; color: white;" />
        <Button label="Crear" icon="pi pi-check" v-else type="submit" class="mr-2"
          style="background-color: #6ba4e7; border-color: #6ba4e7; color: white;" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary " type="button" @click="cancelar" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { Cliente } from '../services/clienteservice'

const props = defineProps<{
  modelo: Cliente | null
}>()

const emit = defineEmits<{
  (e: 'guardado', cliente: Cliente): void
  (e: 'cancelar'): void
}>()

const cliente = reactive<Cliente>({
  id: undefined,
  identificationType: '',
  identificationNumber: '',
  names: '',
  email: '',
  cellphone: '',
  mainProvince: '',
  mainCity: '',
  mainAddress: ''
})

// Dropdown para PRIME
const tiposIdentificacion = [
  { label: 'RUC', value: 'RUC' },
  { label: 'DNI', value: 'DNI' },
  { label: 'Pasaporte', value: 'Pasaporte' }
]

watch(
  () => props.modelo,
  (nuevo) => {
    if (nuevo) {
      Object.assign(cliente, nuevo)
    } else {
      Object.assign(cliente, {
        id: undefined,
        identificationType: '',
        identificationNumber: '',
        names: '',
        email: '',
        cellphone: '',
        mainProvince: '',
        mainCity: '',
        mainAddress: ''
      })
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('guardado', { ...cliente })
}

const cancelar = () => {
  emit('cancelar')
}
</script>
