import { useState } from 'react'
import ConverTiempo from './componentes/ConverTiempo'
import ConverPeso from './componentes/ConverPeso'
import ConverTemp from './componentes/ConverTemp'
import ConverMoneda from './componentes/ConverMoneda'
import './App.css'

function App() {
  const [tipoConvertidor, setTipoConvertidor] = useState('tiempo')

  const renderizarConvertidor = () => {
    switch (tipoConvertidor) {
      case 'tiempo':
        return <ConverTiempo />
      case 'peso':
        return <ConverPeso />
      case 'temperatura':
        return <ConverTemp />
      case 'moneda':
        return <ConverMoneda />
      default:
        return <ConverTiempo />
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Conversor Universal </h1>
      </header>
      
      <nav className="navegacion">
        <button 
          className={tipoConvertidor === 'tiempo' ? 'activo' : ''}
          onClick={() => setTipoConvertidor('tiempo')}
        >
          ⌛Time
        </button>
        <button 
          className={tipoConvertidor === 'peso' ? 'activo' : ''}
          onClick={() => setTipoConvertidor('peso')}
        >
          ⚖️ Weight
        </button>
        <button 
          className={tipoConvertidor === 'temperatura' ? 'activo' : ''}
          onClick={() => setTipoConvertidor('temperatura')}
        >
          🔥/❄️ Temperature
        </button>
        <button 
          className={tipoConvertidor === 'moneda' ? 'activo' : ''}
          onClick={() => setTipoConvertidor('moneda')}
        >
          💲 Moneda
        </button>
      </nav>

      <main className="contenido-principal">
        {renderizarConvertidor()}
      </main>
    </div>
  )
}

export default App
