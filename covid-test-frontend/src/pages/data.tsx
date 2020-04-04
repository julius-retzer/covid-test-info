import Head from "next/head";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Formik, Field, FormikHelpers, FormikErrors } from "formik";
import { useState } from "react";

export interface Login {
  username: string;
  password: string;
}

export interface DataUpload {
  data: string;
}

const Data = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mb-3 mt-3">
          <Col md={{ span: 6, offset: 3 }}>
            <>
              {!isLoggedIn ? (
                <Formik<Login>
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  // validate={validateLogin}
                  onSubmit={async (values: Login) => {
                    // const { test_result } = await checkResults(values);
                    setIsLoggedIn(true);
                  }}
                >
                  {(formikProps) => (
                    <>
                      <h1>Covid test result app </h1>
                      <p>Pre nahranie dat sa prihlaste</p>
                      <Form
                        onReset={formikProps.handleReset}
                        onSubmit={formikProps.handleSubmit}
                      >
                        <Form.Group controlId="username">
                          <Form.Label>Prihlasovacie meno</Form.Label>
                          <Form.Control
                            name="username"
                            type="text"
                            placeholder="Prihlasovacie meno "
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            value={formikProps.values.username}
                          />
                        </Form.Group>
                        <Form.Group controlId="password">
                          <Form.Label>Heslo</Form.Label>
                          <Form.Control
                            name="password"
                            type="password"
                            placeholder="Heslo "
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                            value={formikProps.values.password}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Prihlasit sa
                        </Button>
                      </Form>
                    </>
                  )}
                </Formik>
              ) : (
                <Formik<DataUpload>
                  initialValues={{
                    data: mockData,
                  }}
                  enableReinitialize={true}
                  onSubmit={async (values: DataUpload) => {
                    // const { test_result } = await checkResults(values);
                    setDataUploaded(true);
                    alert(JSON.stringify(values));
                  }}
                >
                  {(formikProps) => (
                    <Form
                      onReset={formikProps.handleReset}
                      onSubmit={formikProps.handleSubmit}
                    >
                      <Form.Group controlId="data">
                        <Form.Label>Nahrajte data</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="10"
                          name="data"
                          type="text"
                          placeholder="Data"
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                          value={formikProps.values.data}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Poslat
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={{ span: 6, offset: 3 }}>
            {dataUploaded && (
              <>
                <Alert variant="success">Data boli uspene nahrate</Alert>
                <p>Dalsie instrukcie</p>
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

export const validateLogin = (values: Login) => {
  const errors: Partial<FormikErrors<Login>> = {};

  if (!values.username) {
    errors.username = "Zadajte uzivatelske meno";
  }

  if (!values.password) {
    errors.password = "Zadajte heslo";
  }
  return errors;
};

const mockData = `
2020-01-01;$1$qqqqqq=$;0
2020-01-01;$1$wwwwwww=$;0
2020-01-01;$1$eeeeee=$;0
2020-01-01;$rrrrr=$;0
2020-01-01;$1$nJuP$LkmznbaSd!3;1
`;

export default Data;
