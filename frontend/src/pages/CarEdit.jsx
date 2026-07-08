import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import CarForm from '../components/car/CarForm';
import { getCarById, updateCar } from '../service/carService';

const CarEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    getCarById(id)
      .then((res) => setCar(res.data.data || res.data))
      .catch(() => toast.error('ไม่พบข้อมูลรถ'));
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateCar(id, data);
      toast.success('แก้ไขข้อมูลสำเร็จ');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'แก้ไขข้อมูลไม่สำเร็จ');
    }
  };

  if (!car) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">แก้ไขข้อมูลรถ</h1>
      <CarForm initialData={car} onSubmit={handleSubmit} submitLabel="บันทึกการแก้ไข" />
    </div>
  );
};

export default CarEdit;