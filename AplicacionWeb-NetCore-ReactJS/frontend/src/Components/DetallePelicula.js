const DetallePelicula = ({ pelicula }) => {
    return (
        <div className='div-pelicula' key={pelicula.id}>
            <img></img>
            <div className='div-info'>
                <div className='div-info-title'>
                    <h3>{pelicula.title}</h3>
                </div>
                <div className='div-info-description'>
                    <p>ID: {pelicula.id} </p>
                    <p>Fecha de lanzamiento: {pelicula.release_date}</p>
                    <p>Popularidad: {pelicula.popularity}</p>
                    <p>Idioma: {pelicula.original_language}</p>
                    <p>Descripción: {pelicula.overview}</p>
                </div>
            </div>
        </div>
    )
}
export default DetallePelicula;