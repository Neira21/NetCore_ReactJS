import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from 'react'

const App = () => {

    const [tareas, setTareas] = useState([])
    const [nombreTarea, setNombreTarea] = useState("");

    const ObtenerTareas = async () => {
        const response = await fetch('api/tarea/Lista')
        if (response.ok) {
            const tareas = await response.json()
            setTareas(tareas)
        } else {
            console.log(response.statusText)
        }
    }

    const GuardarTarea = async (e) => {
        console.log("1111")
        e.preventDefault();
        const response = await fetch('api/tarea/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ nombreTarea: nombreTarea })
        })
        console.log("22222")
        if (response.ok) {
            setNombreTarea("");
            await ObtenerTareas();
        } else {
           console.log(response.statusText + " ERROR")
        }
        console.log("3333")
    }

    const cerrarTarea = async (id) => {

        const response = await fetch("api/tarea/Eliminar/" + id, {
            method: "DELETE"
        })

        if (response.ok)
            await ObtenerTareas();
    }


    const formtDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString('es-PE', options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + ' ' + hora;
    }

    useEffect(() => {
        ObtenerTareas();
    }, [])
    

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={GuardarTarea}> {/*   <form></form>   */}

                        <div className="input-group"> {/*  <div class="input-group"></div>    */}
                            <input type="text" className="form-control"
                                placeholder="Ingrese descripcion"
                                value={nombreTarea}
                                onChange={(e) => setNombreTarea(e.target.value)} />

                            <button className="btn btn-success">Agregar</button>
                        </div>

                    </form>
                    
                </div>

            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (tarea, index) => (
                                    <div key={index} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary" >{tarea.nombreTarea}</h5>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formtDate(tarea.fechaRegistro)}</small>
                                            <div className="mb-4">
                                                <button className="btn btn-lg btn-outline-danger" onClick={() => cerrarTarea(tarea.tareaId)}>Cerrar</button>

                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            
        </div>

    )
}

export default App