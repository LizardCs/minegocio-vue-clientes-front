<template>
  <div class="form-general">
    <h2>Agregar Dirección Adicional</h2>
    <form @submit.prevent="guardar">
      <div>
        <label>Provincia:</label>
        <input v-model="provincia" required />
      </div>
      <div>
        <label>Ciudad:</label>
        <input v-model="ciudad" required />
      </div>
      <div>
        <label>Dirección:</label>
        <input v-model="direccion" required />
      </div>
      <div class="botones">
        <button type="submit">Guardar nueva dirección</button>
        <button type="button" @click="cancelar">Cancelar</button>
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

