import Head from "next/head";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Formik, Field, FormikHelpers } from "formik";

interface FormValues {
  birthNumber: string;
  testDate: string;
  gdpr: boolean;
}

const Home = () => (
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
            Ak si chcete overit vysledky svojho testu, vyplnte formular a budeme
            vas informovat
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Formik<FormValues>
            initialValues={{
              birthNumber: "",
              testDate: "",
              gdpr: false,
            }}
            onSubmit={(
              values: FormValues,
              { setSubmitting }: FormikHelpers<FormValues>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
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
                  <Form.Control
                    name="testDate"
                    type="date"
                    placeholder="Datum kedy vas testovali"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.testDate}
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
    </Container>

    <style jsx>{``}</style>
  </div>
);

export default Home;