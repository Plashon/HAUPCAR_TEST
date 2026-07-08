import { Link } from 'react-router';
import { useCars } from '../hooks/useCars';
import CarTable from '../components/car/CarTable';

const CarList = () => {
  const { cars, loading, removeCar } = useCars();

  const handleDelete = (id) => {
    if (window.confirm('ยืนยันการลบข้อมูลรถคันนี้?')) {
      removeCar(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">รายการรถทั้งหมด</h1>
        <Link to="/cars/create" className="btn btn-primary">
          + เพิ่มรถ
        </Link>
      </div>

      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <CarTable cars={cars} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default CarList;