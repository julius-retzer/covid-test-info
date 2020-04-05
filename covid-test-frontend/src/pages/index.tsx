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
  // gdpr: boolean;
}

const Home = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  return (
    <div className="container">
      <Head>
        <title>Covid negative test management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mb-3 mt-3">
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Overenie negatívneho výsledku testu na Covid-19</h1>
            <p className="mt-3">
              Pre overenie negatívneho výsledku vyplňte následovný formulár.
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            <Formik<Patient>
              initialValues={{
                birthNumber: "",
                testDate: new Date(),
              }}
              validate={validate}
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
                    <Form.Label>Rodné číslo</Form.Label>
                    <Form.Control
                      name="birthNumber"
                      type="text"
                      placeholder="Rodne cislo vo formate 1234567890"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.birthNumber}
                      isInvalid={
                        formikProps.touched.birthNumber &&
                        !!formikProps.errors.birthNumber
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {formikProps.errors.birthNumber}
                    </Form.Control.Feedback>

                    <Form.Text className="text-muted">
                      Vaše rodné číslo je bezpečne zašifrované
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="birthNumber">
                    <Form.Label>Dátum testovania</Form.Label>
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
                  <Button variant="primary" type="submit">
                    Odoslať
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
                <Alert variant="success">
                  Overili sme vašu vzorku a je negatívna
                </Alert>
                <p>
                  Naďalej prosím dodržiavajte{" "}
                  <a href="https://www.korona.gov.sk/#precautions">
                    preventívne odporúčania
                  </a>
                  .
                </p>
              </>
            )}
            {testResult === "notfound" && (
              <>
                <Alert variant="info">Vašu vzorku sme nedokázali overiť </Alert>
                <p>To môže znamenať jednu z nasledujúcich možnosti</p>
                <ul>
                  <li>
                    Vaša vzorka ešte nebola spracovaná. Nechajte nám na seba
                    kontakt a budeme vás informovať, ak vzorka bude negatívna
                  </li>
                  <li>
                    Vaša vzorka bola pozitívna. Čakajte prosím na telefonát z
                    príslušného úradu, ktorý vás bude informovať o ďalšom
                    postupe
                  </li>
                </ul>
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

const validate = (values: Patient) => {
  const errors: Partial<FormikErrors<Patient>> = {};

  if (!values.birthNumber) {
    errors.birthNumber = "Zadajte rodné číslo";
  }
  // } else if (!rodnecislo(values.birthNumber).isValid()) {
  //   errors.birthNumber = "Zadajte platne rodné číslo (bez medzier)";
  // }

  return errors;
};

export default Home;
