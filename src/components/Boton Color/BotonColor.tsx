import {Modal, Button} from "react-bootstrap";
import { useState } from "react";
import "./BotonColor.css";

const BotonColor = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [color, setColor] = useState("#aeaeae");
    const [colorAplicado, setColorAplicado] = useState("#aeaeae");

    const aceptarColor = () => {
        setColorAplicado(color);
        setMostrarModal(false);
    };

    return(
        <>
            <Button 
            style={{
                backgroundColor: colorAplicado, 
                borderColor: colorAplicado,
            }}
                onClick={() => setMostrarModal(true)}
            >
                Cambiar Color
            </Button>
            <Modal show={mostrarModal} onHide={()=>setMostrarModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cambiar Modo
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input className= "form-control form-control-color" type="color" value={color} onChange={(evento) => setColor(evento.target.value)}  />
                    <span className="text-secondary">{color}</span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setMostrarModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={aceptarColor}>Aceptar</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default BotonColor;