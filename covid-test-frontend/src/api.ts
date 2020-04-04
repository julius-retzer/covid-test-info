import { Patient } from "./pages/index";
import { format } from "date-fns";
import bcrypt from "bcryptjs";

const apiUrl = "https://gajdy.pythonanywhere.com/api/check";

export type TestResult = "negative" | "notfound";
interface CheckResult {
  test_result: TestResult;
}

const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export const checkResults = async (patient: Patient): Promise<CheckResult> => {
  const formData = new FormData();
  const date = formatDate(patient.testDate);

  formData.append("executed_at", date);
  formData.append("id_number", patient.birthNumber);

  return (await fetch(apiUrl, { method: "POST", body: formData })).json();
};

export const saveData = async (data: string) => {
  const hashedData = data.split(/\r?\n/).map((line) => {
    const [date, rodneCislo, result] = line.split(";");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rodneCislo, salt);

    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return {
      date: `${year}-${month}-${day}`,
      hash,
      result: result === "1" ? true : false,
    };
  });

  return (await fetch("https://gajdy.pythonanywhere.com/api/add_results", {
    method: "POST",
    body: JSON.stringify(hashedData),
  })).json();
};
