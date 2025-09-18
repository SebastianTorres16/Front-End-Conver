import { useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import './Convertidor.css'

const ConverTiempo = () => {
  const [valor, setValor] = useState('')
  const [entrada, setentrada] = useState('segundos')
  const [recibo, setrecibo] = useState('minutos')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const unidadesTiempo = [
    { valor: 'segundos', etiqueta: 'Segundos' },
    { valor: 'minutos', etiqueta: 'Minutos' },
    { valor: 'horas', etiqueta: 'Horas' },
    { valor: 'dias', etiqueta: 'Días' }
  ]

  const convertir = async () => {
    if (!valor || isNaN(valor)) {
      setError('Por favor ingresa un valor numérico válido')
      return
    }

    setCargando(true)
    setError('')
    
    try {
      const respuesta = await fetch(API_ENDPOINTS.tiempo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor: parseFloat(valor),
          entrada,
          recibo
        })
      })

      const datos = await respuesta.json()
      
      if (respuesta.ok) {
        setResultado(datos)
      } else {
        setError(datos.error || 'Error en la conversión')
      }
    } catch (error) {
      setError('Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="convertidor">
      <h2>⏰ Conversor de Tiempo</h2>
      
      <div className="formulario">
        <div className="campo">
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ingresa el valor"
          />
        </div>

        <div className="campo">
          <label>De:</label>
          <select value={entrada} onChange={(e) => setentrada(e.target.value)}>
            {unidadesTiempo.map(unidad => (
              <option key={unidad.valor} value={unidad.valor}>
                {unidad.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>A:</label>
          <select value={recibo} onChange={(e) => setrecibo(e.target.value)}>
            {unidadesTiempo.map(unidad => (
              <option key={unidad.valor} value={unidad.valor}>
                {unidad.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={convertir} 
          disabled={cargando}
          className="boton-convertir"
        >
          {cargando ? 'Convirtiendo...' : 'Convertir'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

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

export default ConverTiempo