import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fetching all experiences
export const getExperiences = async () => {
  const res = await api.get("/experiences");
  return res.data;
};

//  Fetching one experience by ID
export const getExperienceById = async (id: string) => {
  const res = await api.get(`/experiences/${id}`);
  return res.data;
};

// ✅ Validating the applied promo codes
export const validatePromo = async (code: string, totalPrice: number) => {
  const res = await api.post("/promo/validate", { code, totalPrice });
  return res.data;
};


export const createBooking = async (bookingData: any) => {
  const res = await api.post("/bookings", bookingData);
  return res.data;
};
