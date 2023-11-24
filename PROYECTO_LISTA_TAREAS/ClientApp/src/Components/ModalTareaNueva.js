import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import { useEffect, useState } from "react";

const modeloTarea= {
    tareaId: 0,
    nombre: "",
    fechaRegistro: new Date(),
}

const ModalTareaNueva = ({ mostrarModal, setMostrarModal, guardarTarea }) => {

    const [tarea, setTarea] = useState(modeloTarea)

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        const { name, value } = e.target;
        setTarea({ ...tarea, [name]: value });
    }

    const enviarDatos = () => {
        if (tarea.tareaId === 0) {
            guardarTarea(tarea);
        }
        setTarea(modeloTarea);
    }

    useEffect(() => {
        if (tarea.tareaId !== 0) {
            setTarea(tarea);
        }
    }, [tarea])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
    }


    return (
        <Modal isOpen={mostrarModal} >
            <ModalHeader>
                <p>Modal</p>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nombre">Nombre de la tarea</Label>
                        <Input type="text" name="nombre" id="nombre"
                            placeholder="Nombre de la tarea"
                            onChange={(e) => actualizarDato(e)} value={tarea.nombreTarea}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaRegistro">Fecha de registro</Label>
                        <Input type="date" name="fechaRegistro" id="fechaRegistro"
                            placeholder="Fecha de registro"
                            
                        />
                    </FormGroup>

                    
                    <ModalFooter>
                        <Button color="primary" size="lg" onClick={enviarDatos} >Guardar</Button>
                        <Button color="danger" size="lg" onClick={cerrarModal} >Cancelar</Button>
                    </ModalFooter>

                </Form>
                

            </ModalBody>
        </Modal>

    )

}

export default ModalTareaNueva;