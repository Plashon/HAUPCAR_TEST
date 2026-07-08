import api from "./api";

const API_URL = "/api/cars/";

// ฟังก์ชันสำหรับดึงข้อมูลรถทั้งหมด
export const getCars = async () => {
 return await api.get(API_URL);
}

// ฟังก์ชันสำหรับดึงข้อมูลรถตาม ID
export const getCarById = async (id) => {
 return await api.get(`${API_URL}${id}`);
}

// ฟังก์ชันสำหรับสร้างรถใหม่
export const createCar = async (carData) => {
 return await api.post(API_URL, carData);
}

// ฟังก์ชันสำหรับแก้ไขข้อมูลรถ
export const updateCar = async (id, carData) => {
 return await api.put(`${API_URL}${id}`, carData);
}

// ฟังก์ชันสำหรับลบข้อมูลรถ
export const deleteCar = async (id) => {
 return await api.delete(`${API_URL}${id}`);
}

const carService = {
 getCars,
 getCarById,
 createCar,
 updateCar,
 deleteCar,
};

export default carService;