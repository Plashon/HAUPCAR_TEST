import { useState, useEffect } from 'react';
import { validateCarForm } from '../../utils/validators';

const CarForm = ({ initialData = null, onSubmit, submitLabel = 'บันทึก' }) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    brand: '',
    model: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        registrationNumber: initialData.registrationNumber || '',
        brand: initialData.brand || '',
        model: initialData.model || '',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCarForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">เลขทะเบียนรถ</span>
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.registrationNumber ? 'input-error' : ''}`}
            placeholder="เช่น กข-1234"
          />
          {errors.registrationNumber && (
            <span className="text-error text-sm mt-1">{errors.registrationNumber}</span>
          )}
        </div>

        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text">ยี่ห้อ</span>
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.brand ? 'input-error' : ''}`}
            placeholder="เช่น Toyota"
          />
          {errors.brand && <span className="text-error text-sm mt-1">{errors.brand}</span>}
        </div>

        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text">รุ่น</span>
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={`input input-bordered w-full ${errors.model ? 'input-error' : ''}`}
            placeholder="เช่น Vios"
          />
          {errors.model && <span className="text-error text-sm mt-1">{errors.model}</span>}
        </div>

        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text">หมายเหตุ</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-5">
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default CarForm;