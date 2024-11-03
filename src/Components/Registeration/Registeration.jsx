import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { baseUrl } from '../../Utils/BaseUrl.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Registeration() {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    const notify = (msg,type) => toast[type](msg);

    // const phoneRegex = /^01[0125][0-9]{8}$/

    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9%@!#&^$_-]{6,}$/, "your password must start with capital letter, at least 6 characters long , must contain at least one of those charaters (%@!#&^$_-)").required(),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must match your password').required("Re-enter your password"),
        // phone: Yup.string().matches(phoneRegex,'phone number is not valid').required()
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            // phone: ''
        },
        validationSchema,

        onSubmit: values => {
            setLoading(true)
            axios.post(`${baseUrl}/auth/signup`, values)
                .then((data) => {
                    if (data.status === 201) {
                        setLoading(false)
                        notify("success","success")
                        navigate('/login')
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        setLoading(false)
                        notify(error.response.data.message,'error')
                        // alert(error.response.data.message)
                    }
                })
        },
    });
    return (
        <>
            <div className="container w-50 my-5 mx-auto">
                <h2 className='text-capitalize mb-4'>registeration form</h2>
                <form action="" onSubmit={formik.handleSubmit}>

                    <label htmlFor="name" className='d-block'> Name
                        <input type="text" className='form-control mt-2 mb-3' id='name' name='name' placeholder='Type Your Name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ''}


                    <label htmlFor="email" className='d-block'> Email
                        <input type="email" className='form-control mt-2 mb-3' id='email' name='email' placeholder='Type Your Email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}


                    <label htmlFor="password" className='d-block'> Password
                        <input type="password" className='form-control mt-2 mb-3' id='password' name='password' placeholder='Type Your Password' onChange={formik.handleChange} value={formik.values.password} autoComplete='off' onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}


                    <label htmlFor="rePassword" className='d-block'> Re-password
                        <input type="password" className='form-control mt-2 mb-3' id='rePassword' name='rePassword' placeholder='Re-password' onChange={formik.handleChange} value={formik.values.rePassword} autoComplete='off' onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}


                    {/* <label htmlFor="phone" className='d-block'> Phone
                        <input type="number" className='form-control mt-2 mb-3' id='phone' name='phone' placeholder='Phone' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ''} */}


                    <button type="submit" className='btn bg-main text-white mt-4' disabled={!(formik.isValid && formik.dirty && !loading)}>
                        {!loading ? "Register": <i className='fas fa-spinner fa-spin-pulse'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
