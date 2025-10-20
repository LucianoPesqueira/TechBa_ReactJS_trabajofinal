import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UsuarioContext';

function Login() {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const {user, loadingUser, errorUser, login}  = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ nombre, contrasena });
    };

    useEffect(() => {
        if (user) 
            navigate(from);
    }, [user, navigate, from]);

    //del context usuario obtengo los nombres de estado
    if(loadingUser) return <p>Cargando Usuario...</p>;
    if(errorUser) return <p>{errorUser}</p>;

    return (
        <Container className="d-flex justify-content-center align-items-center">

            <Form onSubmit={handleSubmit}>
                <h3>Iniciar Sesion</h3>
                <FormGroup as={Row} className='mb-3' controlId="formNombre">
                    <Form.Label column sm="2" className="col-form-label-sm">
                    Usuario
                    </Form.Label>
                    <Col sm={12}>
                    <Form.Control 
                        type="text"
                        name="nombre"
                        value={nombre}
                        required 
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} className='mb-3' controlId="formContrasena">
                    <Form.Label column sm="2" className="col-form-label-sm">
                    Contraseña
                    </Form.Label>
                    <Col sm={12}>
                    <Form.Control 
                        type="password"
                        name="contrasena"
                        value={contrasena}
                        required 
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    </Col>
                </FormGroup>

                <div className="d-grid gap-2">
                <Button variant="info" type="submit" value="send" size="sm">
                    Enviar
                </Button>
                </div>

            </Form>
        </Container>
    )
} export default Login;