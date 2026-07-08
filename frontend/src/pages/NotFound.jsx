import { Link } from 'react-router';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen gap-4">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-gray-500">ไม่พบหน้าที่คุณต้องการ</p>
    <Link to="/" className="btn btn-primary">
      กลับหน้าหลัก
    </Link>
  </div>
);

export default NotFound;