import * as yup from 'yup';

const currentYear = new Date().getFullYear();

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

  createdAt: yup
    .number()
    .max(currentYear)
    .test('len', 'Must be exactly 4 characters', val =>
      val ? val.toString().length === 4 : true,
    ),

  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must not exceed 5')
    .test('is-one-decimal', 'Rating must have one decimal place', val =>
      val ? /^[0-5](\.\d)?$/.test(val.toString()) : true,
    ),
});
