import { Patient } from "./pages/index";
import { format } from "date-fns";

const apiUrl = "https://gajdy.pythonanywhere.com/api/check";

export type TestResult = 'positive' | 'negative' | "notfound";
interface CheckResult {
  test_result: TestResult;
}

export const checkResults = async (patient: Patient): Promise<CheckResult> => {
  const formData = new FormData();
  const date = format(patient.testDate, "yyyy-MM-dd");

  formData.append("executed_at", date);
  formData.append("id_number", patient.birthNumber);

  return (await fetch(apiUrl, { method: "POST", body: formData })).json();
};
