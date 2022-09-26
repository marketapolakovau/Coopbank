import React, {useEffect, useState} from 'react';
import {Form, Table, Row, Col, Container} from "react-bootstrap";
import styles from '../css/range.module.css'
import PersonalDataForm from "./PersonalDataForm";

function Calculator() {
    const minAmount = 5000;
    const maxAmount = 1200000;
    const minMonths = 6;
    const maxMonths = 60;

    const [amountSliderValue, setAmountSliderValue] = useState(minAmount)
    const [monthsSliderValue, setMonthsSliderValue] = useState(minMonths)
    const [periods, setPeriods] = useState()

    const [results, setResults] = useState({})

    const [loanData, setLoanData] = useState()

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
            console.log(payload)
            const data = await res.json();
            setResults(data)
        }

        calculate();
    }, [amountSliderValue, monthsSliderValue])




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


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     const loanData = {
    //         ... results
    //     }
    //
    //     console.log({'info o pujcce': loanData})
    // }


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
                                step={amountSliderValue <= 50000 ? 1000 : 5000}
                                value={amountSliderValue}
                                onChange={e => setAmountSliderValue(Number(e.target.value))}/>
                            <Container className={styles.loanAmountRange}>
                                <Row>
                                    <Col className={styles.minAmount}>{minAmount.toLocaleString()} Kč</Col>
                                    <Col className={styles.maxAmount}>{maxAmount.toLocaleString()} Kč</Col>
                                </Row>
                            </Container>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group className={styles.periodSliderGroup}>
                            <Row>
                                <Form.Label className={styles.loanPeriodText}>Doba splácení </Form.Label>

                                {monthsSliderValue === minMonths ?
                                    (<div className={styles.loanPeriod}>{periods?.months} {periods?.msgMonths}</div>):
                                    monthsSliderValue % 12 === 0 ?
                                    (<div className={styles.loanPeriod}>{periods?.years} {periods?.msgYears}</div>) :
                                    (<div className={styles.loanPeriod}>
                                        {periods?.years || ''} {periods?.msgYears} {periods?.months} {periods?.msgMonths}
                                    </div>)}

                            </Row>
                            <Form.Range
                                className={styles.slider}
                                min={minMonths}
                                max={maxMonths}
                                value={monthsSliderValue === 6 ? minMonths : monthsSliderValue}
                                onChange={(e) => {
                                    setMonthsSliderValue(Number(e.target.value));
                                    calculatePeriod((Number(e.target.value)));
                                }}
                                style={{'cursor': "green"}}/>
                            <Container className={styles.loanPeriodRange}>
                                <Row>
                                    <Col className={styles.minPeriod}>{minMonths} měsíců</Col>
                                    <Col className={styles.maxPeriod}>{maxMonths / 12} let</Col>
                                </Row>
                            </Container>
                        </Form.Group>
                    </Row>
                </Container>
            </Col>

            <Col md={4}>
                <Container className={styles.loanInfoBox}>
                    <table>
                        <tbody>
                        <tr className={styles.tableRow1}>
                            <td>Měsíční částka:</td>
                            <td className={styles.tableValues} id={styles.tableMonthPayment}>{results.monthlyPayment?.toLocaleString()} Kč</td>
                        </tr>
                        <tr>
                            <td>Roční úroková sazba:</td>
                            <td className={styles.tableValues}>{results.yearlyInterest} %</td>
                        </tr>
                        <tr>
                            <td>RPSN:</td>
                            <td className={styles.tableValues}>{results.RPSN} %</td>
                        </tr>
                        <tr>
                            <td>Celková splatná částka:</td>
                            <td className={styles.tableValues}>{results.overallAmount?.toLocaleString()} Kč</td>
                        </tr>
                        {amountSliderValue > 200000 ? (
                            <tr>
                                <td>Fixní poplatek:</td>
                                <td className={styles.tableValues}>{results.fixedFee} Kč</td>
                            </tr>) : (<tr className={styles.tableFixedFee}><td> </td><td> </td></tr>)}
                        </tbody>

                    </table>
                    <div className={styles.buttonSection}>
                    <button className={styles.btnApply}>
                        Chci zažádat o půjčku
                    </button>

                        <PersonalDataForm
                            amount={payload.amount}
                            numOfMonths={payload.numOfMonths}
                        />



                    </div>
                </Container>
            </Col>
        </Row>

    )
}


export default Calculator;