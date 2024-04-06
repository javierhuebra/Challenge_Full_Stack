export const formatearFecha = (date) => {
    const nuevaFecha = new Date(date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('en-EN', options)
}