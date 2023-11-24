import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
//import axios from 'axios';
//import DetallePelicula from './Components/DetallePelicula';
import Pelicula from './Components/Pelicula';
//import Buscador from './Components/Buscador';
import BarraNav from './Components/BarraNav';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '786ee52ce60c9ebb3805127db53d7f67';
//const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
//const IMG_URL2 = 'https://api.themoviedb.org/3/movie/'
const API_BUSCADOR = 'https://api.themoviedb.org/3/search/movie?api_key=786ee52ce60c9ebb3805127db53d7f67&query='

function App() {
  
  const [peliculas, setPeliculas] = useState([]);
  const [query, setQuery] = useState('');

 


  //const [peliculaTrending, setPeliculaTrending] = useState([]);

  const obtenerPeliculas = async () => {
    //Buscar con fecth
    const respuesta = await fetch(API_URL + 'movie/popular?api_key=' + API_KEY);
    const datos = await respuesta.json();
    //Buscar con axios
    // const respuesta = await axios.get(API_URL + 'movie/popular?api_key=' + API_KEY);
    // const datos = await respuesta.data;
    setPeliculas(datos.results);
    
  }
   
  useEffect(() => {
    obtenerPeliculas();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (query !== '') {
      const respuesta = await fetch(API_BUSCADOR + query);
      const datos = await respuesta.json();
      setPeliculas(datos.results);
      setQuery('');
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <BarraNav searchMovies={searchMovies} changeHandler={changeHandler} query={query} />
      <div className="container">
        <h1 className='text-light'>"asd"</h1>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        {peliculas.length > 0 && (
          <div className="container">
              <div className='row'>
                {peliculas.map((pelicula) => (
                  <Pelicula key={pelicula.id} {...pelicula} />
                ))}
              </div>
          </div>
        )}:(
          <div>
            {/* Mensaje de aviso de color blanco */}
            <h2 className='text-white text-center'>No se encontraron resultados</h2>
          </div>
        )

      </div>


    </>
  );
}

export default App;
