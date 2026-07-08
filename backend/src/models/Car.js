const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, 'กรุณาระบุเลขทะเบียนรถ'],
      unique: true,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'กรุณาระบุยี่ห้อรถ'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'กรุณาระบุรุ่นรถ'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);