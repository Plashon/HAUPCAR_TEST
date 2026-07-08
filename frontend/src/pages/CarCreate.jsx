import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import CarForm from '../components/car/CarForm';
import { createCar } from '../service/carService';

const CarCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createCar(data);
      toast.success('เพิ่มข้อมูลรถสำเร็จ');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'เพิ่มข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">เพิ่มรถใหม่</h1>
      <CarForm onSubmit={handleSubmit} submitLabel="เพิ่มรถ" />
    </div>
  );
};

export default CarCreate;