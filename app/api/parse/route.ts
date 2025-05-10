import { fetchHandler } from "@/lib/handlers/fetch";

export const parseFile = async (file: File, type: "pdf" | "docx"): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchHandler<string>(
    `http://localhost:8000/parse-${type}/`,
    {
      method: "POST",
      body: formData,
      headers: {},
    }
  );
  
  if (res.success && res.data && res.data.replace(/\s/g, "") !== "") {
    return res.data;
  }
  
  console.warn("API did not return valid text content.", res);
  return null;
  
  
};
