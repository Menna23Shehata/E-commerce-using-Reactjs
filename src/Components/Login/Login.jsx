import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { baseUrl } from '../../Utils/BaseUrl.js';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../Utils/notify.js';

export default function Login() {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)

    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9%@!#&^$_-]{6,}$/, "your password must start with capital letter, at least 6 characters long , must contain at least one of those charaters (%@!#&^$_-)").required(),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,

        onSubmit: values => {
            setLoading(true)
            axios.post(`${baseUrl}/auth/signin`, values)
                .then((data) => {
                    if (data.status === 200) {
                        localStorage.setItem('token',data.data.token)
                        setLoading(false)
                        notify("success", "success")
                        navigate('/')
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setLoading(false)
                        notify(error.response.data.message, 'error')
                    }
                })
        },
    });
    return (
        <>
            <div className="container w-50 my-5 mx-auto">
                <h2 className='text-capitalize mb-4'>login form</h2>
                <form action="" onSubmit={formik.handleSubmit}>

                    <label htmlFor="email" className='d-block'> Email
                        <input type="email" className='form-control mt-2 mb-3' id='email' name='email' placeholder='Type Your Email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}


                    <label htmlFor="password" className='d-block'> Password
                        <input type="password" className='form-control mt-2 mb-3' id='password' name='password' placeholder='Type Your Password' onChange={formik.handleChange} value={formik.values.password} autoComplete='off' onBlur={formik.handleBlur} />
                    </label>

                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}


                    <button type="submit" className='btn bg-main text-white mt-4' disabled={!(formik.isValid && formik.dirty && !loading)}>
                        {!loading ? "Login" : <i className='fas fa-spinner fa-spin-pulse'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
