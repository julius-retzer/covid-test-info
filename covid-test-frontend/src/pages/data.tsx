import Head from "next/head";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Formik, Field, FormikHelpers, FormikErrors } from "formik";
import { useState } from "react";
import { saveData } from "../api";

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
                    saveData(values.data);
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

const mockData = `20200318;990225/6089;0
20200318;691120/2859;0
20200318;120811/7658;1
20200318;930626/0986;0
20200318;946215/0588;0
20200318;925719/4001;0
20200318;175318/7535;0
20200318;145416/7924;0
20200318;855524/4720;1
20200318;930716/0808;0
20200318;760513/7089;0
20200318;975701/6236;0
20200318;025217/9455;0
20200318;085221/2856;0
20200318;826126/2867;0
20200318;035206/2315;0
20200318;985826/2293;0
20200318;965126/5151;0
20200318;581218/8525;0
20200318;160127/3542;0
20200318;070505/6429;1
20200318;820203/0232;0
20200318;010801/5787;0
20200318;175606/5410;0
20200318;711112/6286;0
20200318;130904/4704;0
20200318;040823/8490;0
20200318;050117/5972;0
20200318;715414/9783;0
20200318;061202/3258;0
20200318;740506/2335;0
20200318;555728/8209;0
20200318;905928/6489;0
20200318;160210/2975;0
20200318;985604/7036;0
20200318;545718/3303;0
20200318;715319/2662;0
20200318;855510/8386;0
20200318;155120/4754;1
20200318;895911/7332;0
20200318;730607/3357;0
20200318;766215/3279;0`;

export default Data;
