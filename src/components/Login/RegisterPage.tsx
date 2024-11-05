// import React from 'react'
import { useState, useEffect, CSSProperties } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { object, string } from "yup"
import { registerUser } from "../../redux/reducers/users/userSlice"


const passwordSchema = string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
    'password contain atleast {1} uppercase, lowecase, number and symbol and mininum 8 chars long.'
  )
  .required('Password is Required');

let signupSchema = object({
  firstname: string().min(3, 'minimum 3 characters should be there').required('firstname is required'),
  lastname: string().min(3, 'minimum 3 characters should be there').required('lastname is required'),
  mobile: string().matches(/^[0-9]{10}$/, 'Mobile should contain exactly 10 numeric digits').required('mobile is required'),
  email: string()
    .matches(/\.com$|\.in$|\.org$/, 'Email should end with .com, .in, org')
    .email('Email should be valid').required('Email is Required'),
  password: passwordSchema,
  confirmPassword: string()
    .test('passwords-match', 'Passwords do not match', function (value) {
      return this.parent.password === value;
    })
    .required('Confirm Password is required'),
});
const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { isRegSuccess, isLoading } = useSelector((state: RootState) => state.user)
  const [visible, setVisible] = useState(false)
  const [visibleC, setVisibleC] = useState(false)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    borderRadius: "30px",
    zIndex: 20,
  };
  useEffect(() => {
    if (isRegSuccess) {
      navigate('/login')
    }
  }, [isRegSuccess])
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      dispatch(registerUser(values))
      formik.resetForm()
    },
  });

  return (
    <section className=" bg-skin-background w-full group">
      <Link to="/" className="absolute top-2 left-2 text-[#777777] flex items-center hover:text-black dark:hover:text-white">
        <BsArrowLeftShort size={28} className="inline" />
        <button>back to home</button>
      </Link>
      <div className="flex justify-center items-center min-h-screen 400px:mx-5 py-5">
        <div className=" w-full  flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg border  dark:border mx-2 400px:mx-0 md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <BarLoader
              color="#361AE3"
              loading={isLoading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className={`${isLoading === true ? "block absolute z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-50 group:pointer-events-none overflow-hidden " : "hidden"}`}></div>

            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
              <>
                <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register
                </h1>
                <form className="space-y-2 md:space-y-4 " action="#" onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")} value={formik.values.firstname} name="firstname"
                      type="text" id="firstname" className="bg-gray-50 border dark:text-black border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your firstname" />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.firstname}</div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")} value={formik.values.lastname} name="lastname"
                      type="text" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your lastname" />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.lastname}</div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email} name="email"
                      type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your Email" />

                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <input
                      onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} value={formik.values.mobile} name="mobile"
                      type="tel" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your phone number" />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <input
                      onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} value={formik.values.password} name="password"
                      type={`${visible === true ? "text" : "password"}`} id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div onClick={() => setVisible(!visible)} className="absolute top-2 right-3 sm:cursor-pointer">
                      {visible === true ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <input
                      onChange={formik.handleChange("confirmPassword")} onBlur={formik.handleBlur("confirmPassword")} value={formik.values.confirmPassword} name="confirmPassword"
                      type={`${visibleC === true ? "text" : "password"}`} id="confirmPassword" placeholder="Enter your password again" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <div onClick={() => setVisibleC(!visibleC)} className="absolute top-2 right-3 sm:cursor-pointer">
                      {visibleC === true ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                  <div className="flex justify-evenly">
                    <button type="submit" className="bg-skin-light text-skin-background hover:text-skin-backgroundLight hover:bg-skin-main shadow-lg my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                      Register Here
                    </button>
                    <Link to="/login" className="bg-skin-main text-skin-textBase hover:bg-skin-light hover:text-skin-background my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                      Go to login
                    </Link>
                  </div>
                </form>

              </>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SignUpPage