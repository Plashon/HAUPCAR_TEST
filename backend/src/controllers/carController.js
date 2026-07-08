const Car = require('../models/Car');

// ฟังก์ชันช่วยดึงข้อความ error จาก mongoose ValidationError
// ให้เหลือแค่ข้อความที่กำหนดไว้ใน required ของแต่ละ field (เอาอันแรกที่เจอ)
const getValidationMessage = (error) => {
  if (error.name === 'ValidationError') {
    const firstErrorField = Object.keys(error.errors)[0];
    return error.errors[firstErrorField].message;
  }
  return error.message;
};

// @desc    เพิ่มข้อมูลรถใหม่
// @route   POST /api/cars
const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'เลขทะเบียนนี้มีอยู่แล้วในระบบ' });
    }
    return res.status(400).json({ success: false, message: getValidationMessage(error) });
    if (error.status === 500) {
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
    }
  };
}

// @desc    ดึงข้อมูลรถทั้งหมด (รองรับค้นหาตามเลขทะเบียน/ยี่ห้อ/รุ่น)
// @route   GET /api/cars?search=xxx
const getCars = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { registrationNumber: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { model: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
};

// @desc    ดึงข้อมูลรถตาม id
// @route   GET /api/cars/:id
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลรถ' });
    }
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
};

// @desc    แก้ไขข้อมูลรถ
// @route   PUT /api/cars/:id
const updateCar = async (req, res) => {
  try {
    // ถ้ามีการส่ง registrationNumber มาแก้ไข ให้เช็คก่อนว่าซ้ำกับคันอื่นในระบบหรือไม่
    // (ยกเว้นตัวเอง โดยใช้ $ne กับ id ปัจจุบัน)
    if (req.body.registrationNumber) {
      const existingCar = await Car.findOne({
        registrationNumber: req.body.registrationNumber,
        _id: { $ne: req.params.id },
      });

      if (existingCar) {
        return res.status(400).json({
          success: false,
          message: 'เลขทะเบียนนี้มีอยู่แล้วในระบบ',
        });
      }
    }

    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลรถ' });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'เลขทะเบียนนี้มีอยู่แล้วในระบบ' });
    }
    return res.status(400).json({ success: false, message: getValidationMessage(error) });
  }
};

// @desc    ลบข้อมูลรถ
// @route   DELETE /api/cars/:id
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลรถ' });
    }
    res.status(200).json({ success: true, message: 'ลบข้อมูลรถเรียบร้อยแล้ว' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
}
