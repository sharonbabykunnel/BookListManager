import { useFormik } from "formik"
import { registerApi } from "../../apis"
import { Link, useNavigate } from "react-router-dom"
import { EyeSlashIcon, LockClosedIcon } from "@heroicons/react/16/solid"
import { EyeIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { userSchema } from "../../schema"
import { setCredentials } from "../../utils/userSlice"
import { useDispatch } from "react-redux"

const Register = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'', 
        },
        validationSchema:userSchema,
        onSubmit: async(values)=>{
            const result = await registerApi(values);
            if(result){
                localStorage.setItem('accessToken',result.accessToken)
                dispatch(setCredentials(result.user));
                navigate('/');
            }
        }
    })

    const toggleShow = ()=>{
        setShow(!show);
    }

  return (

    <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Register</h2>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-8">
                    <div className="space-y-5">
                    <div>
                    <div className="flex items-center justify-between">
                            <label for="" className="text-base font-medium text-gray-900"> Name </label>
                            <Link to='/login' className="text-sm font-medium transition-all duration-200 text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline" >allready have a account? Login</Link>
                        </div>
                            <div className="mt-2.5">
                                <input {...formik.getFieldProps('name')} type="text" name="name" id="" placeholder="Enter your full name" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                            {formik.touched.name && formik.errors.name && (
                                <div className="error-message text-red-500">{formik.errors.name}</div>
                                )}
                        </div>

                        <div>
                            <label className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2.5">
                                <input {...formik.getFieldProps('email')} type="text" name="email" id="" placeholder="Enter email to get started" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <div className="error-message text-red-500">{formik.errors.email}</div>
                                )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Password </label>
                            </div>
                                <div className="flex items-center mt-3 border rounded-md">
                                    <LockClosedIcon className="w-5 ml-4 h-5 text-gray-500"/>
                                    <input {...formik.getFieldProps('password')} type={show ? 'text' : 'password'} className="w-full py-4 focus:outline-none ml-3" placeholder="Enter your Password"/>
                                    <div onClick={toggleShow}>
                                    { show ? <EyeIcon className="w-5 h-5 mr-4 cursor-pointer"/> : <EyeSlashIcon className="w-5 h-5 mr-4 cursor-pointer"/>  }
                                    </div>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                <div className="error-message text-red-500">{formik.errors.password}</div>
                                )}
                        </div>

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
