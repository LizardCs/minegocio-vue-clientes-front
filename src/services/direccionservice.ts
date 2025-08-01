import axios from 'axios'

export interface Direccion {
  id: number
  provincia: string
  ciudad: string
  direccion: string
  esMatriz: boolean
}


export async function obtenerDireccionesAdicionales(clienteId: number): Promise<Direccion[]> {
  const response = await axios.get(`/api/direcciones/cliente/${clienteId}/adicionales`)
  return response.data
}


export async function crearDireccionAdicional(
  clienteId: number,
  data: Omit<Direccion, 'id'>
): Promise<void> {
  await axios.post(`/api/direcciones/cliente/${clienteId}`, data)
}