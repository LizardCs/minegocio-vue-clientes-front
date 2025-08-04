<template>
  <div class="Centro">
    <h2>Agregar Dirección Adicional</h2>
    <form @submit.prevent="guardar" class="p-fluid">
      <div class="campo">
        <label for="provincia">Provincia: </label>
        <InputText id="provincia" v-model="provincia" required />
      </div>
      <div class="campo">
        <label for="ciudad">Ciudad: </label>
        <InputText id="ciudad" v-model="ciudad" required />
      </div>
      <div class="campo">
        <label for="direccion">Dirección: </label>
        <InputText id="direccion" v-model="direccion" required />
      </div>
      <div>
        <Button label="Guardar" icon="pi pi-check" type="submit" class="mr-2"
          style="background-color: #6ba4e7; border-color: #6ba4e7; color: white;" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" type="button" @click="cancelar" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { crearDireccionAdicional } from '../services/direccionservice'
import type { Cliente } from '../services/clienteservice'

const emit = defineEmits(['guardado', 'cancelar'])

const props = defineProps<{
  cliente: Cliente | null
}>()

const provincia = ref('')
const ciudad = ref('')
const direccion = ref('')

const guardar = async () => {
  if (!props.cliente) {
    alert('Debe seleccionar un cliente.')
    return
  }

  try {
    await crearDireccionAdicional(props.cliente.id!, {
      provincia: provincia.value,
      ciudad: ciudad.value,
      direccion: direccion.value,
      esMatriz: false
    })
    emit('guardado')
    provincia.value = ''
    ciudad.value = ''
    direccion.value = ''
  } catch (error) {
    console.error('Error al guardar dirección:', error)
  }
}

const cancelar = () => {
  emit('cancelar')
}
</script>
