import { Patient } from "./pages/index";
import { format } from "date-fns";
import bcrypt from "bcryptjs";

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

  return (
    await fetch("https://gajdy.pythonanywhere.com/api/check", {
      method: "POST",
      body: formData,
    })
  ).json();
};

export const saveData = async (data: string) => {
  const hashedData = await Promise.all(
    data.split(/\r?\n/).map(async (line) => {
      const [date, rodneCislo, result] = line.split(";");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(rodneCislo, salt);

      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);

      return {
        date: `${year}-${month}-${day}`,
        hash,
        result: result === "1" ? true : false,
      };
    })
  );

  return await fetch("https://gajdy.pythonanywhere.com/api/add_results", {
    method: "POST",
    body: JSON.stringify(hashedData),
  });
};

export const saveForNotification = async (
  patient: Patient
): Promise<CheckResult> => {
  const formData = new FormData();
  const date = formatDate(patient.testDate);

  formData.append("executed_at", date);
  formData.append("id_number", patient.birthNumber);
  formData.append("email", patient.email);

  return (
    await fetch("https://gajdy.pythonanywhere.com/api/add_request", {
      method: "POST",
      body: formData,
    })
  ).json();
};
