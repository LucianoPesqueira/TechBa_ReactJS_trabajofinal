import react, { useRef, useState } from 'react'
import { Form, Button, Container, Row, Col, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../styles/pages/contacto.css"
import emailjs from "@emailjs/browser";

function Contacto() {
  const form = useRef();
  const [formData, setFormData] = useState({name:"", email:"", message:""})

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kr8b4q5", //Service ID
        "template_al6b3ik",  //Template ID
        form.current, {
          publicKey: "n4_Oy2Rrt0UgIik2V"   //Public KEY
        })
        .then((response) => {
          alert("Formulario enviado exitosamente! ✅")
          console.log("Formulario enviado exitosamente!✅", response);
          setFormData({name:"", email:"", message:""})
        })
        .catch((error) => {
          alert("Error, hubo un problema al enviar el email")
          console.log("Error al enviar el formulario: ", error);
        })        
  };

  return (

    <Container className="d-flex justify-content-center align-items-center">

        <Form ref={form} onSubmit={handleSubmit}>
          <h3>Contacto</h3>

          <FormGroup as={Row} className='mb-4' controlId="formNombre">
            <Form.Label column sm={2} className="col-form-label-sm">
              Nombre
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                type="text"
                name="name"
                value={formData.name}
                placeholder="ej: Esteban Quito"
                required 
                onChange={handleChange}
              />
            </Col>
          </FormGroup>

          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm={2} className="col-form-label-sm">
              Email
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                type="email" 
                name="email"
                value={formData.email} 
                placeholder="ej: tuemail@email.com" 
                required
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formMensaje">
            <Form.Label column sm={2} className="col-form-label-sm">
              Mensaje
            </Form.Label>
            <Col sm={12}>
              <Form.Control 
                as="textarea" 
                name="message"
                value={formData.message}
                aria-label="With textarea" 
                placeholder="Este es un mensaje de ejemplo" 
                required 
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div className="d-grid gap-2">
          <Button variant="info" type="submit" value="send" size="sm">
            Enviar
          </Button>
          </div>
        </Form>

    </Container>

  )
}

export default Contacto

/*
col sm={11} ubico el nombre arriba y debajo el input

*/