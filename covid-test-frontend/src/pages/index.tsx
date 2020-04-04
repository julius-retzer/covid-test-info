import Head from "next/head";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Formik, Field, FormikHelpers, FormikErrors } from "formik";
import { checkResults, TestResult } from "../api";
import { useState } from "react";
import { rodnecislo } from "rodnecislo";

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
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mb-3 mt-3">
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
                setTestResult(test_result);
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
            {testResult === "negative" && (
              <>
                <Alert variant="success">Vas vysledok bol negativny</Alert>
                <p>Dalsie instrukcie</p>
              </>
            )}
            {testResult === "notfound" && (
              <>
                <Alert variant="info">Vas vysledok nebol najdeny</Alert>
                <p>Vase udaje neboli najdene medzi negativnymi záznamami</p>
              </>
            )}
          </Col>
        </Row>
      </Container>

      <style jsx>{``}</style>
    </div>
  );
};

// export const formatRodneCislo = (value: string, withSlash = true) =>
//   value
//     .replace(/\D/g, "")
//     .replace(/^(\d{6})(\d{4})$/, withSlash ? "$1 / $2" : "$1$2");

export const validate = (values: Patient) => {
  const errors: Partial<FormikErrors<Patient>> = {};

  if (!values.birthNumber) {
    errors.birthNumber = "Zadajte rodné číslo";
  } else if (!rodnecislo(values.birthNumber).isValid()) {
    errors.birthNumber = "Zadajte platne rodné číslo (bez medzier)";
  }

  return errors;
};

export default Home;
