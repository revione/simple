// 1. Detección de Tendencia Alcista
function esTendenciaAlcista(data: number[], n: number): boolean {
  if (data.length < n) return false

  for (let i = 1; i < n; i++) {
    if (data[data.length - i] <= data[data.length - i - 1]) {
      return false
    }
  }

  return true
}

// 2. Análisis de Promedio Móvil
function calcularPromedioMovil(data: number[], n: number): number | null {
  if (data.length < n) return null

  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += data[data.length - 1 - i]
  }

  return sum / n
}

function esCruceAlcista(
  data: number[],
  nCorto: number,
  nLargo: number
): boolean {
  const promedioCorto = calcularPromedioMovil(data, nCorto)
  const promedioLargo = calcularPromedioMovil(data, nLargo)

  return (
    promedioCorto !== null &&
    promedioLargo !== null &&
    promedioCorto > promedioLargo
  )
}

// 3. Análisis de Volatilidad
function calcularVolatilidad(data: number[], n: number): number | null {
  if (data.length < n) return null

  const media = calcularPromedioMovil(data, n)
  if (media === null) return null

  let sumSqDiff = 0

  for (let i = 0; i < n; i++) {
    const diff = data[data.length - 1 - i] - media
    sumSqDiff += diff * diff
  }

  return Math.sqrt(sumSqDiff / n)
}

function esBajaVolatilidad(
  data: number[],
  n: number,
  umbralVolatilidad: number
): boolean {
  const volatilidad = calcularVolatilidad(data, n)
  return volatilidad !== null && volatilidad < umbralVolatilidad
}

// 4. Detección de Aceleración
function calcularAceleracion(data: number[]): number | null {
  if (data.length < 3) return null

  const ultimaAceleracion =
    data[data.length - 1] -
    data[data.length - 2] -
    (data[data.length - 2] - data[data.length - 3])

  return ultimaAceleracion
}

function esAceleracionPositiva(
  data: number[],
  umbralAceleracion: number
): boolean {
  const aceleracion = calcularAceleracion(data)
  return aceleracion !== null && aceleracion > umbralAceleracion
}

// 5. Análisis de Ciclos Anteriores
function detectarCicloAnterior(data: number[], longitudCiclo: number): boolean {
  if (data.length < longitudCiclo * 2) return false

  const cicloActual = data.slice(-longitudCiclo)
  const cicloAnterior = data.slice(-longitudCiclo * 2, -longitudCiclo)

  return JSON.stringify(cicloActual) === JSON.stringify(cicloAnterior)
}

// // 6. Detección de Cambios en Volumen o Intensidad
// function detectarCambioEnVolumen(
//   volumenData: number[],
//   umbralVolumen: number
// ): boolean {
//   if (volumenData.length < 2) return false

//   const cambio =
//     volumenData[volumenData.length - 1] - volumenData[volumenData.length - 2]
//   return cambio > umbralVolumen
// }

// 7. Análisis de Osciladores (RSI)
function calcularRSI(data: number[], n: number): number {
  let ganancias = 0,
    perdidas = 0
  for (let i = 1; i < n; i++) {
    const cambio = data[data.length - i] - data[data.length - i - 1]
    if (cambio > 0) {
      ganancias += cambio
    } else {
      perdidas += Math.abs(cambio)
    }
  }
  const rs = ganancias / perdidas
  return 100 - 100 / (1 + rs)
}

function detectarSobrecompraOSobreventa(rsi: number): boolean {
  return rsi > 70 || rsi < 30
}

// Ejemplo de Uso con console.log
export function verificarCondiciones(
  data: number[]
  // volumenData: number[]
): void {
  if (esTendenciaAlcista(data, 4)) {
    console.log("Tendencia alcista detectada")
  }

  if (esCruceAlcista(data, 5, 20)) {
    console.log("Cruce alcista detectado")
  }

  if (esBajaVolatilidad(data, 10, 2.0)) {
    console.log("Baja volatilidad detectada")
  }

  if (esAceleracionPositiva(data, 0.5)) {
    console.log("Aceleración positiva detectada")
  }

  if (detectarCicloAnterior(data, 5)) {
    console.log("Ciclo anterior repetido detectado")
  }

  // if (detectarCambioEnVolumen(volumenData, 100)) {
  //   console.log("Cambio en volumen detectado")
  // }

  const rsi = calcularRSI(data, 14)
  if (detectarSobrecompraOSobreventa(rsi)) {
    console.log("RSI indica sobrecompra o sobreventa")
  }
}
