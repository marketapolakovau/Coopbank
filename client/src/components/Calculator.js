import React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";


function Calculator() {

    return (
    <div>
        <Row>
        <Form.Group>
            <Form.Label>Částka</Form.Label>
            <Form.Control
                type='number'
                style={{width: '150px'}}
            />
            </Form.Group>
        </Row>

        <Row>
            <Form.Group>
            <Form.Label>Doba splácení</Form.Label>
            <Form.Control
                type='number'
                style={{width: '150px'}}
            />
        </Form.Group>
        </Row>

        <div>
            <div>Měsíční částka činí </div>
            <div>Roční úroková sazba </div>
            <div>RPSN </div>
            <div>Celková splatná částka </div>
        </div>



        <Button
        variant='primary'
        style={{width: '20%', margin: 10}}>
            Chci zažádat o půjčku
        </Button>
    </div>

    )}


export default Calculator;