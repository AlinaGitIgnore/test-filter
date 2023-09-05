import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup
    .string()
    .trim('')
    .strict(true)
    .matches(/[A-zА-яёЁЇїІіЄєҐґ-]/, 'title must be letters')
    .min(5, 'Title is too short')
    .max(30, 'Title is too long')
    .required('Required'),

  author: yup
    .string()
    .trim('')
    .strict(true)
    .matches(/[A-zА-яёЁЇїІіЄєҐґ-]/, 'title must be letters')
    .min(5, 'author is too short')
    .max(30, 'author is too long')
    .required('Required'),

  createdAt: yup.number().test('len', 'Must be exactly 4 characters', val => {
    if (!val) return true; // Допустимое значение, если createdAt отсутствует
    return val.toString().length === 4;
  }),
  // .test(
  //   'min-year',
  //   'Must be greater than or equal to the current year',
  //   val => {
  //     if (!val) return true; // Допустимое значение, если createdAt отсутствует
  //     return val >= new Date().getFullYear();
  //   },
  // ),

  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must not exceed 5')
    .test('is-one-decimal', 'Rating must have one decimal place', value => {
      if (!value) return true; // Разрешаем пустое значение (если оно допустимо)
      return /^[0-5](\.\d)?$/.test(value.toString());
    }),
});
