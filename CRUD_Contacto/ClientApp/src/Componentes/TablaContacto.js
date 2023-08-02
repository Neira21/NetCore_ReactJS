import { Button, Table } from "reactstrap";

const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto);
        setMostrarModal(!mostrarModal);
    }


    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
            {
                    (data.length < 1) ?
                        <tr>
                            <td colSpan="3">No hay datos</td>
                        </tr>
                        :
                        data.map((contacto) => (
                            <tr key={contacto.idContacto}>
                                <td>{contacto.idContacto}</td>
                                <td>{contacto.nombre}</td>
                                <td>{contacto.correo}</td>
                                <td>{contacto.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(contacto)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarContacto(contacto.idContacto)}> Eliminar</Button>
                                </td>
                            </tr>
                        ))
            }          
            </tbody>
        </Table>
        )
}

export default TablaContacto;