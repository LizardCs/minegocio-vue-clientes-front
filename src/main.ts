import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Ripple from 'primevue/ripple'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

import './style.css'
import './styles/allstyles.scss'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  },
  ripple: true
})

// Registrar componentes globalmente
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
// Registrar directivas
app.directive('ripple', Ripple)

app.mount('#app')
