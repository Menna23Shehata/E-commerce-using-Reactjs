import { useFormik } from 'formik'
import React from 'react'

export default function Checkout() {
    let checkoutFormik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <>
            <div className="w-50 m-auto bg-main-light mt-5 p-4 rounded-3">
                <form onSubmit={checkoutFormik.handleSubmit}>

                    <label htmlFor="details" className='w-100 fw-bold '> Details
                        <input type="text" id='details' name='details' className='form-control my-3' onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur}/>
                    </label>

                    <label htmlFor="phone" className='w-100 fw-bold'> Phone
                        <input type="number" id='phone' name='phone' className='form-control my-3' onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} />
                    </label>

                    <label htmlFor="city" className='w-100 fw-bold'> City
                        <input type="text" id='city' name='city' className='form-control my-3' onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} />
                    </label>
                </form>

                <button className='text-uppercase btn bg-main text-white mt-4'>place order</button>

            </div>
        </>
    )
}
