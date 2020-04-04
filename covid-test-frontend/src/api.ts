import { Patient } from "./pages/index";

const apiUrl = "http://localhost:3000/";

export const checkResults = (patient: Patient) => {
  // fetch(apiUrl, { body: JSON.stringify(patient) });
  return Promise.resolve({ positive: Math.random() > 0.5 ? true : false });
};
