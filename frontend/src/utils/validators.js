export const validateCarForm = (data) => {
  const errors = {};

  if (!data.registrationNumber?.trim()) {
    errors.registrationNumber = 'กรุณาระบุเลขทะเบียนรถ';
  }
  if (!data.brand?.trim()) {
    errors.brand = 'กรุณาระบุยี่ห้อรถ';
  }
  if (!data.model?.trim()) {
    errors.model = 'กรุณาระบุรุ่นรถ';
  }

  return errors;
};