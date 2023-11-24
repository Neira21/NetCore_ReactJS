import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import YouTube from 'react-youtube';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '786ee52ce60c9ebb3805127db53d7f67';

const Pelicula = ({id, poster_path, title, vote_averga, release_date, overview, changeMovie}) => {

    const [show, setShow] = useState(false);
    const togleShow = (movie) => {
        setShow(!show);
        fecthMovie(id)
        setMovie(movie)
    }
    
    
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({title: "Loading Movie"});
    
    const fecthMovie = async (id) => {
        const {data} = await axios.get(API_URL + 'movie/' + id, {
          params: {
            api_key: API_KEY,
            append_to_response: 'videos'
          }
        })
        if(data.videos && data.videos.results){
          const trailer = data.videos.results.find(
            (video) => video.name === 'Official Trailer'
          );
          setTrailer(trailer ? trailer : data.videos.results[0]);
        }

    }
    
    return (
        <div className="col-md-3">
            <div className="card text-center mb-3">
                <img src={IMG_URL + poster_path} className="card-img-top" alt={title} />
                <div className="card-title">
                    <h5>{title}</h5>
                </div>
                <div className="card-body">
                    <button type="button" className="btn btn-primary" onClick={()=>togleShow(id)}>Ver Detalles</button>
                    <Modal show={show} onHide={togleShow}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="card-img-top" style={{width:"14rem"}} src={IMG_URL + poster_path} alt={title} />
                            <h3>{title}</h3>
                            <h4>Puntuación: {vote_averga} </h4>
                            <h5>Fecha de lanzamiento: {release_date} </h5>
                            <br/><br/>
                            <h6>Descripción: </h6>
                            <p>{overview}</p>
                            <br/><br/>
                            <YouTube 
                                videoId={trailer ? trailer.key : ''} 
                                className="reproductor container" 
                                containerClassName={"youtube-container amru"}
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                      autoplay: 1,
                                      controls: 0,
                                      cc_load_policy: 0,
                                      fs: 0,
                                      iv_load_policy: 0,
                                      modestbranding: 0,
                                      rel: 0,
                                      showinfo: 0,
                                    },
                                  }} 
                            />
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={togleShow}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                
            </div>
        </div>
    )
}

export default Pelicula