// API client import
import { apiClient } from "../apiClient";

export const fetchFormHandler = async (setFormData, setDefaultValues) => {
    try {
        const res = await apiClient.get("/getTableFields?tablename=tbuser");
        setFormData(res.data.data);
        const defaultValues = res.data.data.reduce((acc, cur) => {
            acc[cur.Field] = "";
            return acc;
        }, {});
        setDefaultValues(defaultValues);
    } catch (error) {
        throw new Error(error);
    }
}

export const sendFromDataHandler = async (formdata, reset, setSuccessResponse) => {
    try {
        const res = await apiClient.post("/test/submit", { data: formdata });
        setSuccessResponse(res.data);
        reset();
    } catch (error) {
        throw new Error(error);
    }
}