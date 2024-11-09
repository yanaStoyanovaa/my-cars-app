import * as Yup from 'yup';

export const validationSchema = Yup.object({
  brand: Yup.string().required('Brand is required'),
  model: Yup.string().required('Model is required'),
  modification: Yup.string().required('Modification is required'),
  horsePower: Yup.number()
    .positive('Horse Power must be a positive number')
    .required('Horse Power is required'),
  weight: Yup.number()
    .positive('Weight must be a positive number')
    .required('Weight is required'),
});
