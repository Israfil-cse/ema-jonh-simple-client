import React from 'react';
import { useForm } from 'react-hook-form';

const ManageEnventory = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data =>{

    }
    return (
        <div>
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    <input name="title" ref={register({ required: true })} placeholder="Product Title" />
                    {errors.title && <span className='error'>title is required</span>}

                    <input name="price" ref={register({ required: true })} placeholder="Product Price" />
                    {errors.price && <span className='error'>price is required</span>}

                    <input name="stock" ref={register({ required: true })} placeholder="Avalabe Stock" />
                    {errors.stock && <span className='error'>stock is required</span>}
                    <br/>

                    <textarea className="form-control" rows="6" cols="12" name="description" ref={register({ required: true })} placeholder="Product Description" />
                    {errors.description && <span className='error'>Description is required</span>}
                    

                    <input type="submit" />
                </form>
        </div>
    );
};

export default ManageEnventory;