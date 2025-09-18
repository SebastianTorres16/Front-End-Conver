import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import './Convertidor.css'

const unidadesTemperatura = [
  { valor: 'celsius', etiqueta: 'Celsius (°C)' },
  { valor: 'fahrenheit', etiqueta: 'Fahrenheit (°F)' },
  { valor: 'kelvin', etiqueta: 'Kelvin (K)' }
]

const SelectUnidad = ({ label, value, onChange }) => (
  <div className="campo">
    <label>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}>
      {unidadesTemperatura.map(u => (
        <option key={u.valor} value={u.valor}>{u.etiqueta}</option>
      ))}
    </select>
  </div>
)

const ConverTemp = () => {
  const [valor, setValor] = useState('')
  const [unidadOrigen, setUnidadOrigen] = useState('celsius')
  const [unidadDestino, setUnidadDestino] = useState('fahrenheit')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const convertir = async () => {
    if (!valor || isNaN(valor)) {
      setError('Por favor ingresa un valor numérico válido')
      return
    }

    setCargando(true)
    setError('')
    
    try {
      const resp = await fetch(API_ENDPOINTS.temperatura, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: parseFloat(valor),
          unidadOrigen,
          unidadDestino
        })
      })

      const datos = await resp.json()
      resp.ok ? setResultado(datos) : setError(datos.error || 'Error en la conversión')
    } catch {
      setError('Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="convertidor">
      <h2>🌡️ Conversor de Temperaturas</h2>
      
      <div className="formulario">
        <div className="campo">
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
            placeholder="Ingresa el valor"
          />
        </div>

        <SelectUnidad label="De:" value={unidadOrigen} onChange={setUnidadOrigen} />
        <SelectUnidad label="A:" value={unidadDestino} onChange={setUnidadDestino} />

        <button 
          onClick={convertir} 
          disabled={cargando}
          className="boton-convertir"
        >
          {cargando ? 'Convirtiendo...' : 'Convertir'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {resultado && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <p>
            <strong>{resultado.valorOriginal}</strong> {resultado.unidadOrigen} = 
            <strong> {resultado.valorConvertido}</strong> {resultado.unidadDestino}
          </p>
        </div>
      )}
    </div>
  )
}

export default ConverTemp
