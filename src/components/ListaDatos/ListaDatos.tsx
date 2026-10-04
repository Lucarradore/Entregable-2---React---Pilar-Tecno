import { useState, useEffect } from "react";
import {Card, Row, Col, Badge} from "react-bootstrap";
import axios from "axios";
import { obtenerRopa } from "../../services/RopaServices";
import type { Ropa } from "../../types/Ropa";

const ListaDatos = () => {
    const [datos, setDatos] = useState<Ropa[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerRopa()
            .then(setDatos)
            .catch(() => setError("No se pudieron cargar los productos"))
            .finally(()=>setCargando(false));
    }, []);

    
  return (
    <>
    <h2 className="mb-3"> Ropa </h2>
    {cargando && <p> Cargando... </p>}
    {error && <p> {error} </p>}

    {!cargando && !error && (
        <Row>
            {datos.map((Ropa) =>(
                //FIJATE QUE IRIA EN LUGAR DE ID PORQUE NO TENES ID EN TYPES
                <Col md={4} key={ropa._id}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>
                                {Ropa.titulo}
                            </Card.Title>   
                            <Card.Subtitle className="text-secondary mb-2">
                                {Ropa.categoria}
                            </Card.Subtitle>   
                            <Badge bg="info">{Ropa.estado}</Badge>                 
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )}
    </>
  );
};

export default ListaDatos
