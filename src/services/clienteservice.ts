import axios from 'axios'

export interface Cliente {
  id?: number
  identificationType: string
  identificationNumber: string
  names: string
  email: string
  cellphone: string
  mainProvince: string
  mainCity: string
  mainAddress: string
}


// DTO estructura del POST
interface ClienteCrearDTO {
  identificationType: string
  identificationNumber: string
  names: string
  email: string
  cellphone: string
  direccionMatriz: {
    provincia: string
    ciudad: string
    direccion: string
  }
}

const API = 'api/clientes'

// GET /api/clientes
export async function listarClientes(filtro: string = ''): Promise<Cliente[]> {
  const res = await axios.get(API, { params: { filtro } })
  return res.data
}

// GET /api/clientes/buscar?filtro=
export async function buscarClientes(filtro: string): Promise<Cliente[]> {
  const res = await axios.get(`${API}/buscar`, { params: { filtro } })
  return res.data
}

// POST /api/clientes
export async function crearCliente(cliente: ClienteCrearDTO): Promise<any> {
  const res = await axios.post(API, cliente)
  return res.data
}

// PUT /api/clientes/{id}
export async function actualizarCliente(id: number, cliente: Cliente): Promise<Cliente> {
  const res = await axios.put(`${API}/${id}`, cliente)
  return res.data
}

// DELETE /api/clientes/{id}
export async function eliminarCliente(id: number): Promise<void> {
  await axios.delete(`${API}/${id}`)
}

// GET /api/clientes/{id}
export async function obtenerClientePorId(id: number): Promise<Cliente> {
  const res = await axios.get(`${API}/${id}`)
  return res.data
}
