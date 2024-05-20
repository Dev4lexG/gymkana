const normalize = (str: string) => {
	// Paso 1: Normalizar el string a la forma "NFD" (Descomposición de Compatibilidad Normalizada)
	let normalizedStr = str.normalize('NFD')

	// Paso 2: Eliminar los caracteres diacríticos
	normalizedStr = normalizedStr.replace(/[\u0300-\u036f]/g, '')

	// Paso 3: Eliminar símbolos y caracteres no deseados, dejando solo letras y números
	normalizedStr = normalizedStr.replace(/[^a-zA-Z0-9]/g, '')

	// Paso 4: Convertir a minúsculas
	normalizedStr = normalizedStr.toLowerCase()

	return normalizedStr
}

export default normalize
