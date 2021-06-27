import { Button, Container, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';

function Login() {

    const formPreventDefault = (event: any) => {
        event.preventDefault()
        console.log('aca')
    }

    return (
        <Container className='mt-5 w-50 border shadow p-5 d-flex justify-content-center'>
        <Form onSubmit={formPreventDefault}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>User</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Enter
            </Button>
        </Form>
        </Container>
    )
}

export default Login