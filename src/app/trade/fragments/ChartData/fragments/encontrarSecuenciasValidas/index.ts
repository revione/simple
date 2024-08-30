export const encontrarSecuenciasValidas = (puntos: number[]) => {
  const esSecuenciaAscendente = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] >= arr[i + 1]) {
        return false
      }
    }
    return true
  }

  const esSecuenciaDescendente = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] <= arr[i + 1]) {
        return false
      }
    }
    return true
  }

  let secuenciasValidas = []

  for (let i = 3; i < puntos.length; i++) {
    let cuatroPuntos = [puntos[i - 3], puntos[i - 2], puntos[i - 1], puntos[i]]

    if (
      esSecuenciaAscendente(cuatroPuntos) ||
      esSecuenciaDescendente(cuatroPuntos)
    ) {
      let inicio = Math.max(0, i - 14) // Asegúrate de no ir fuera de los límites del array
      let quincePuntos = puntos.slice(inicio, i + 1) // Tomar 15 puntos incluyendo el actual
      secuenciasValidas.push(quincePuntos)
    }
  }

  console.log({ secuenciasValidas })

  return secuenciasValidas
}
