import React from 'react';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './Form.css';

const SignupSchema = yup.object().shape({
  product: yup.string().required(),
  price: yup.number().typeError('price must be a number').positive(),
  quantity: yup
    .number()
    .typeError('quantity must be a number')
    .positive()
    .integer()
});

function Form({ addProduct }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    addProduct(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Product</label>
        <input type='text' name='product' ref={register} />
        {errors.product && <p>{errors.product.message}</p>}
      </div>
      <div>
        <label>Price</label>
        <input
          type='text'
          name='price'
          ref={register({ valueAsNumber: true })}
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <div>
        <label>Quantity</label>
        <input
          type='text'
          name='quantity'
          ref={register({ valueAsNumber: true })}
        />
        {errors.quantity && <p>{errors.quantity.message}</p>}
      </div>
      <Button variant='contained' color='primary' type='submit'>
        Add product
      </Button>
    </form>
  );
}

export default Form;
