import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Container} from "react-bootstrap";
import styles from '../css/range.module.css'


function Calculator() {
    const minAmount = 5000;
    const maxAmount = 1200000;
    const minMonths = 6;
    const maxMonths = 60;

    const [amountSliderValue, setAmountSliderValue] = useState(minAmount)
    const [monthsSliderValue, setMonthsSliderValue] = useState(minMonths)
    const [periods, setPeriods] = useState()

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
    const calculatePeriod = monthCount => {
        let months = 0, years = 0;
        let msgMonths, msgYears = '';
        // let result;
        while (monthCount) {
            if (monthCount >= 12) {
                years++;
                monthCount -= 12;
            } else {
                months++;
                monthCount--;
            }
        }

        if (years === 0) {
            msgYears = '';
        } else if (years === 1) {
            msgYears = 'rok';
        } else if (years >= 2 && years <= 4) {
            msgYears = 'roky';
        } else {
            msgYears = 'let';
        }

        if (months === 0) {
            msgMonths = '';
        } else if (months === 1) {
            msgMonths = 'měsíc'
        } else if (months >= 2 && months <= 4) {
            msgMonths = 'měsíce'
        } else {
            msgMonths = 'měsíců'
        }

        setPeriods({years, msgYears, months, msgMonths})
    };


    return (
        <Row className={styles.calc} xs={1} md={2}>
            <Col md={8}>
            <Container className={styles.slidersContainer}>
                <Row>
                    <Form.Group className={styles.amountSliderGroup}>
                        <Row>
                            <Form.Label className={styles.loanAmountText}> Chci si půjčit </Form.Label>
                            <div className={styles.loanAmount}>{amountSliderValue.toLocaleString()} Kč</div>
                        </Row>
                        <Form.Range
                            className={styles.slider}
                            min={minAmount}
                            max={maxAmount}
                            step={5000}
                            value={amountSliderValue}
                            onChange={e => setAmountSliderValue(Number(e.target.value))}/>
                        <Container className={styles.loanAmountRange}>
                            <Row>
                                <Col>{minAmount.toLocaleString()} Kč</Col>
                                <Col>{maxAmount.toLocaleString()} Kč</Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group className={styles.periodSliderGroup}>
                        <Row>
                            <Form.Label className={styles.loanPeriodText}>Doba splácení </Form.Label>
                            <div className={styles.loanPeriod}>
                                {periods?.years} {periods?.msgYears} {periods?.months} {periods?.msgMonths}
                            </div>
                        </Row>
                        <Form.Range
                            className={styles.slider}
                            min={minMonths}
                            max={maxMonths}
                            value={monthsSliderValue}
                            onChange={(e) => {
                                setMonthsSliderValue(Number(e.target.value));
                                calculatePeriod(monthsSliderValue);
                            }}
                            style={{'cursor': "green"}}/>
                        <Container className={styles.loanPeriodRange}>
                            <Row>
                                <Col>{minMonths} měsíců</Col>
                                <Col>{maxMonths / 12} let</Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Row>
            </Container>
            </Col>

            <Col md={4}>
            <Container className={styles.loanInfoBox}>
                {/*<div as={Col} className="mb-3">*/}
                <div>Měsíční částka činí: {results.monthlyPayment} Kč</div>
                <div>Roční úroková sazba: {results.yearlyInterest} %</div>
                <div>RPSN: {results.RPSN} %</div>
                <div>Celková splatná částka: {results.overallAmount} Kč</div>
                {/*</div>*/}
                <button className={styles.btnApply}>
                    Chci zažádat o půjčku
                </button>
            </Container>
            </Col>
        </Row>

    )
}


export default Calculator;