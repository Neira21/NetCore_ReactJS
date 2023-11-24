
import { Tab } from "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useState} from "react"

const App = () => {
    const [tests, setTests] = useState([])
    const [nombre, setNombre] = useState("")
    const [fecha, setFecha] = useState("")

    const mostrarTest = async () => {
        const res = await fetch("/api/test/Listar")
        if (res.ok) {
            const data = await res.json()
            setTests(data)
            console.log(tests)
        } else {
            console.log("Error al mostrar los datos")
        }
        
    }

    const GuardarTest = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/test/Crear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "nombre": nombre,
                    "fecha": fecha
                }
            )
        })
        if (res.ok) {
            setNombre("")
            setFecha("")
            mostrarTest();
        }
    }

    useEffect(() => {
        mostrarTest();
    }, [])


    return (
        <div className="container">
            <h4 className="text-center mt-4" >
                Lista de Test
            </h4>

            <form onSubmit={GuardarTest}>
                <div className= "input-group">                
                    <input type="text"
                        className="form-control"
                        placeholder="Nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                    <input type="text"
                        className="form-control"
                        placeholder="Fecha"
                        onChange={(e) => setFecha(e.target.value)}
                        value={fecha}                    
                    />
                    <button className="btn btn-primary" type="submit">Guardar</button>
                </div>
            </form>

            <hr/>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td>{test.nombre}</td>
                            <td>{test.fecha}</td>
                            <td>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>        
    )
}

export default App;