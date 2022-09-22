import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Container} from "react-bootstrap";


function Calculator() {
    const minAmount = 5000;
    const maxAmount = 1200000;
    const minMonths = 6;
    const maxMonths = 60;

    const [amountSliderValue, setAmountSliderValue] = useState(minAmount)
    const [monthsSliderValue, setMonthsSliderValue] = useState(minMonths)

    const [results, setResults] = useState({})

    useEffect(() => {
        async function calculate() {
            // console.log({amountSliderValue, monthsSliderValue})
            const payload = {
                amount: amountSliderValue,
                numOfMonths: monthsSliderValue
            }
            const res = await fetch('http://localhost:8000/request/calculate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            setResults(data)
        }

        calculate();
    }, [amountSliderValue, monthsSliderValue])


    // function monthWord () {
    //     let msgMonths = '';
    //     if ((monthsSliderValue%12) === 1) {
    //         msgMonths = 'měsíc'
    //     } else if ((monthsSliderValue%12) >= 2 || (monthsSliderValue%12) <= 4) {
    //         msgMonths = 'měsíce'
    //     } else {
    //         msgMonths = 'měsíců'
    //     }
    //     monthWord()
    // }


    // console.log(monthWord(2))
    //
    // function yearWord () {
    //     let msgYears = '';
    //     if(Math.floor(monthsSliderValue / 12)){
    //
    //     }
    //
    // }

    // const period = monthsSliderValue;
    // const calculatePeriod = monthCount => {
    //     let months = 0, years = 0;
    //     let msgMonths, msgYears = ''
    //     while(monthCount){
    //         if(monthCount >= 12){
    //             years++;
    //             monthCount -= 12;
    //         } else{
    //             months++;
    //             monthCount--;
    //         }
    //     };
    //     return (
    //         if (years === 1){
    //             msgYears = 'rok',
    //         } else if ()
    // )
    // };

    // console.log(calculatePeriod(period));

    return (
        <div>
            <Row>
                <Form.Group>
                    <Form.Label>Částka</Form.Label>
                    <Form.Range
                        min={minAmount}
                        max={maxAmount}
                        value={amountSliderValue}
                        onChange={e => setAmountSliderValue(Number(e.target.value))}/>
                    <Container>
                        <Row>
                            <Col>{minAmount}</Col>
                            <Col>{maxAmount}</Col>
                        </Row>
                    </Container>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Form.Label>Doba splácení </Form.Label>
                    <div> {Math.floor(monthsSliderValue / 12)} rok {monthsSliderValue % 12}</div>
                    <Form.Range
                        min={minMonths}
                        max={maxMonths}
                        value={monthsSliderValue}
                        onChange={e => setMonthsSliderValue(Number(e.target.value))}/>
                    <Container>
                        <Row>
                            <Col>{minMonths} měsíců</Col>
                            <Col>{maxMonths / 12} let</Col>
                        </Row>
                    </Container>
                </Form.Group>
            </Row>

            <div>
                <div>Měsíční částka činí {results.monthlyPayment}</div>
                <div>Roční úroková sazba {results.yearlyInterest}</div>
                <div>RPSN {results.RPSN}</div>
                <div>Celková splatná částka {results.overallAmount}</div>
            </div>


            <Button
                variant='primary'
                style={{width: '20%', margin: 10}}>
                Chci zažádat o půjčku
            </Button>
        </div>

    )
}


export default Calculator;