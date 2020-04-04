import Head from "next/head";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Formik, Field, FormikHelpers } from "formik";
import { checkResults, TestResult } from "../api";
import { useState } from "react";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import sk from "date-fns/locale/sk";
registerLocale("sk", sk);
setDefaultLocale("sk");

export interface Patient {
  birthNumber: string;
  testDate: Date;
  gdpr: boolean;
}

const Home = () => {
  const [isPositive, setIsPositive] = useState<TestResult | null>(null);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Covid test result app </h1>
            <p>
              Ak si chcete overit vysledky svojho testu, vyplnte formular a
              budeme vas informovat
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <Formik<Patient>
              initialValues={{
                birthNumber: "",
                testDate: new Date(),
                gdpr: false,
              }}
              onSubmit={async (values: Patient) => {
                const { test_result } = await checkResults(values);
                setIsPositive(test_result);
              }}
            >
              {(formikProps) => (
                <Form
                  onReset={formikProps.handleReset}
                  onSubmit={formikProps.handleSubmit}
                >
                  <Form.Group controlId="birthNumber">
                    <Form.Label>Rodne cislo</Form.Label>
                    <Form.Control
                      name="birthNumber"
                      type="text"
                      placeholder="Rodne cislo vo formate 1234567889"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.birthNumber}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="birthNumber">
                    <Form.Label>Datum testovania</Form.Label>
                    <DatePicker
                      wrapperClassName="d-block"
                      className="form-control"
                      selected={formikProps.values.testDate}
                      onChange={(date) =>
                        formikProps.setFieldValue("testDate", date)
                      }
                      locale="sk"
                      placeholderText="Weeks start on Monday"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Suhlasim so spracovanim osobnych udajov"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Odoslat
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            {isPositive === true && (
              <>
                <Alert variant="danger">Vas vysledok bol pozitivny</Alert>

                <p>Dalsie instrukcie</p>
              </>
            )}
            {isPositive === false && (
              <>
                <Alert variant="success">Vas vysledok bol negativny</Alert>
                <p>Dalsie instrukcie</p>
              </>
            )}
            {isPositive === "not_found" && (
              <>
                <Alert variant="info">Vas vysledok nebol najdeny</Alert>
                <p>
                  Bud este nebol spracovany alebo ste zadali nespravne udaje ...
                  dalsie instrukcie
                </p>
              </>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx>{``}</style>
    </div>
  );
};

export default Home;
