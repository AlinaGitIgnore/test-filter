import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { NewProduct } from '../../redux/types';
import { ReactComponent as CirclePlusSvg } from '../../assets/svg/circlePlus.svg';
import styled from './index.module.scss';
import { validationSchema } from '../../utils/validationShema';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../redux/hooks/reduxHooks';
import { addNewProduct, fetchProducts } from '../../redux/productsSlice';
import { useNavigate } from 'react-router-dom';

const NewProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const products = useTypedSelector(state => state.list);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const initialValues: NewProduct = {
    title: '',
    author: '',
    createdAt: 0,
    rating: 0,
  };

  const handleCreate = (values: NewProduct) => {
    console.log(values);

    dispatch(addNewProduct(values));

    navigate('/products');
  };

  return (
    <div className={styled.createWrap}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleCreate(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styled.formWrap}>
              <label htmlFor="title">title</label>
              {errors.title || touched.title ? (
                <div className={styled.error}>{errors.title}</div>
              ) : (
                <></>
              )}
              <Field
                className={styled.input}
                type="text"
                name="title"
                id="title"
                placeholder={'Title of the product'}
              />
            </div>
            <div className={styled.formWrap}>
              <label htmlFor="author">author</label>
              {errors.author && touched.author ? (
                <div className={styled.error}>{errors.author}</div>
              ) : (
                <></>
              )}

              <Field
                className={styled.input}
                type="text"
                name="author"
                id="author"
                placeholder={'Author of the product'}
              />
            </div>

            <div className={styled.formWrap}>
              <label htmlFor="createdAt">createdAt</label>
              {errors.createdAt && touched.createdAt ? (
                <div className={styled.error}>{errors.createdAt}</div>
              ) : (
                <></>
              )}

              <Field
                className={styled.input}
                type="number"
                name="createdAt"
                id="createdAt"
                placeholder={'Year of the publication'}
              />
            </div>

            <div className={styled.formWrap}>
              <label htmlFor="rating">rating</label>
              {errors.rating && touched.rating ? (
                <div className={styled.error}>{errors.rating}</div>
              ) : (
                <></>
              )}

              <Field
                className={styled.input}
                type="number"
                name="rating"
                id="rating"
                placeholder={'Rating of the product'}
              />
            </div>

            <button type="submit" className={styled.buttonSubmit}>
              <span> Create</span>
              <CirclePlusSvg />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProductForm;
