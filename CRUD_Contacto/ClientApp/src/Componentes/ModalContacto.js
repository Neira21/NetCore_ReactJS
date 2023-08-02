import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button} from "reactstrap"

import {useEffect, useState } from "react";

const modeloContacto = {
    idContacto: 0,
    nombre: "",
    correo: "",
    telefono: ""    
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " +e.target.value);
        const { name, value } = e.target;
        setContacto({ ...contacto, [name]: value });
    }

    const enviarDatos = () => {
        if (contacto.idContacto === 0) {
            guardarContacto(contacto);
        } else {
            editarContacto(contacto)
        }
        setContacto(modeloContacto);
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar);
        } else {
            setContacto(modeloContacto);
        }
    }, [editar]);

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        setEditar(null);
    }

    return (
        <Modal isOpen={mostrarModal} >
            <ModalHeader>
                {contacto.idContacto === 0 ? "Nuevo Contacto" : "Editar Contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input type="text" name="nombre" id="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre} placeholder="Ingrese su nombre" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="correo">Correo</Label>
                        <Input type="email" name="correo" id="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} placeholder="Ingrese su correo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="telefono">Telefono</Label>
                        <Input type="text" name="telefono" id="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} placeholder="Ingrese su telefono" />
                    </FormGroup>
                    <ModalFooter>
                        <Button color="primary" size="lg" onClick={enviarDatos} >Guardar</Button>
                        <Button color="danger" size="lg" onClick={cerrarModal}>Cancelar</Button>
                    </ModalFooter>

                </Form>  

            </ModalBody>
        </Modal>
    )
}

export default ModalContacto;
