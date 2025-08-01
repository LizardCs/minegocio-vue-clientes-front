<template>
  <div class="form-general">
    <form @submit.prevent="handleSubmit">
      <h2>{{ cliente.id ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>

      <div class="campo">
        <label>Tipo Identificación </label>
        <select v-model="cliente.identificationType" required>
          <option value="" disabled>Seleccione: </option>
          <option value="RUC">RUC</option>
          <option value="Cédula">DNI</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>

      <div class="campo">
        <label>Número Identificación: </label>
        <input v-model="cliente.identificationNumber" type="text" required />
      </div>

      <div class="campo">
        <label>Nombres completos: </label>
        <input v-model="cliente.names" type="text" required />
      </div>

      <div class="campo">
        <label>Email: </label>
        <input v-model="cliente.email" type="email" />
      </div>

      <div class="campo">
        <label>Celular: </label>
        <input v-model="cliente.cellphone" type="tel" />
      </div>

      <h3>Dirección Principal</h3>
      <div class="campo">
        <label>Provincia: </label>
        <input v-model="cliente.mainProvince" type="text" />
      </div>

      <div class="campo">
        <label>Ciudad: </label>
        <input v-model="cliente.mainCity" type="text" />
      </div>

      <div class="campo">
        <label>Dirección: </label>
        <input v-model="cliente.mainAddress" type="text" />
      </div>

      <div class="botones">
        <button type="submit">{{ cliente.id ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" @click="cancelar">Cancelar</button>
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
