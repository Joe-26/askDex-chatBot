import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/upload";

export const uploadText = (textDoc) => axios.post(REST_API_URL, textDoc);
