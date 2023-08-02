import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap"
import TablaContacto from "./Componentes/TablaContacto"
import ModalContacto from "./Componentes/ModalContacto"
import {useEffect, useState } from "react"

const App = () => {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarContactos = async () => {
        const respond = await fetch("api/contacto/Lista");
        if (respond.ok) {
            const data = await respond.json();
            setContactos(data);
        } else {
           console.log("Error al traer los datos");
        }
    }

    useEffect(() => {
        mostrarContactos();
    }, []);

    const guardarContacto = async (contacto) => {
        const respond = await fetch("api/contacto/Guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contacto)
        });
        if (respond.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        } else {
            console.log("Error al guardar los datos");
        }
    }

    const editarContacto= async (contacto) => {
        const respond = await fetch("api/contacto/Editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contacto)
        });
        if (respond.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        } else {
            console.log("Error al editar los datos");
        }
    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("¿Estás seguro de eliminar este contacto?")
        if (!respuesta)
            return;

        const respond = await fetch("api/contacto/Eliminar/" + id, {
            method: "DELETE",
        });
        if (respond.ok) {
            mostrarContactos();
        } else {
            console.log("Error al borrar los datos");
        }
    }

    return (
        <Container>
            <Row className = "mt-5">
                <Col sm="12">
                <Card>
                    <CardHeader>
                        <h5>Lista de Contactos </h5>
                    </CardHeader>
                    <CardBody>
                            <Button size="sm" color="success"
                               onClick ={() => setMostrarModal(!mostrarModal)}
                            >Nuevo Contacto</Button>
                            <hr></hr>
                            <TablaContacto data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarContacto={eliminarContacto}
                            />
                            
                    </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                
                editar={editar}
                setContactoEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
        )
}

export default App;