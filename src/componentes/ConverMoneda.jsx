import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import './Convertidor.css'

const unidadesMoneda = [
  { valor: 'USD', etiqueta: 'Dólar Estadounidense (USD)' },
  { valor: 'EUR', etiqueta: 'Euro (EUR)' },
  { valor: 'COP', etiqueta: 'Peso Colombiano (COP)' },
  { valor: 'GBP', etiqueta: 'Libra Esterlina (GBP)' }
]

const SelectUnidad = ({ label, value, onChange }) => (
  <div className="campo">
    <label>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}>
      {unidadesMoneda.map(u => (
        <option key={u.valor} value={u.valor}>{u.etiqueta}</option>
      ))}
    </select>
  </div>
)

const ConverMoneda = () => {
  const [valor, setValor] = useState('')
  const [entrada, setentrada] = useState('USD')
  const [recibo, setrecibo] = useState('COP')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const convertir = async () => {
    if (!valor || isNaN(valor)) {
      setError('Por favor ingrese valores válidos')
      return
    }

    setCargando(true)
    setError('')
    
    try {
      const resp = await fetch(API_ENDPOINTS.moneda, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: parseFloat(valor),
          entrada,
          recibo
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
      <h2>💲 Conversor de Moneda</h2>
      
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

        <SelectUnidad label="De:" value={entrada} onChange={setentrada} />
        <SelectUnidad label="A:" value={recibo} onChange={setrecibo} />

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
            <strong>{resultado.valorOriginal}</strong> {resultado.entrada} = 
            <strong> {resultado.valorConvertido}</strong> {resultado.recibo}
          </p>
        </div>
      )}
    </div>
  )
}

export default ConverMoneda
