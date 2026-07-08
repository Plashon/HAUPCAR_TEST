import { Link } from 'react-router';

const CarTable = ({ cars, onDelete }) => {
  if (cars.length === 0) {
    return <p className="text-center text-gray-500 mt-6">ยังไม่มีข้อมูลรถ</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>เลขทะเบียน</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
            <th>หมายเหตุ</th>
            <th className="text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.registrationNumber}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td className="max-w-xs truncate">{car.notes || '-'}</td>
              <td className="flex gap-2 justify-end">
                <Link to={`/cars/${car._id}/edit`} className="btn btn-sm btn-outline btn-info">
                  แก้ไข
                </Link>
                <button
                  onClick={() => onDelete(car._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;