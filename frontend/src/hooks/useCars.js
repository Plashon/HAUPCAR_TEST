import { useState, useEffect, useCallback } from 'react';
import { getCars, deleteCar } from '../service/carService';
import { toast } from 'react-toastify';

export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCars();
      setCars(res.data.data || res.data);
    } catch (err) {
      toast.error('โหลดข้อมูลรถไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeCar = async (id) => {
    try {
      await deleteCar(id);
      toast.success('ลบข้อมูลรถสำเร็จ');
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error('ลบข้อมูลไม่สำเร็จ');
    }
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return { cars, loading, fetchCars, removeCar };
};