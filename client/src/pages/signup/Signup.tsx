import style from "./signup.module.css"
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from "../../components/formikComponents/FormikControl"
import { Button } from "@mui/material"
import axios from 'axios'
import usePasswordToggle from "../../usePasswordToggle"

const Signup = () => {
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    
      const validationSchema = Yup.object({
        username: Yup.string().required("Last name is required").min(3, "Name must be at least three characters"),
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
        password: Yup.string().required('Required').min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords much match').required('Required')
      })
    
      const onSubmit = async (values: { email: string; username: string; password: string }, formikHelpers: { resetForm: () => void }) => {  
        console.log('Form data', values)
    
        try{
          await axios.post("/auth/register", { email: values.email, username: values.username, password: values.password });
          console.log("User saved!")
      }catch(err){
        console.log(`YOUR ERRRRROROOORRRR IS ${err}`)
      }
    
        formikHelpers.resetForm();
      }
    
      //password eye-toggle
      const [passwordInputType, EyeIcon, confirmPasswordInputType, confirmPasswordEyeIcon] = usePasswordToggle(); //bringing in the values of "const inputType" and "const icon" which i returned from the usePasswordToggle custom hook as "const passwordInputType" and "const EyeIcon".
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form className={style.formContainer}>
            <h1 className={style.signupText}>SIGN UP</h1>
            <FormikControl
              control='MuiInput'
              // control='chakraInput'
              type='text'
              label='Username'
              name='username'    //the "name" has to match with the initial value's name above.
              error={Boolean(formik.errors.username) && Boolean(formik.touched.username)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.username) && formik.errors.username} //if "formik.touched.firstName" is true, then display the "formik.errors" associated with the "firstName".
            />
            
            <FormikControl
              control='MuiInput'
              type='email'
              label='Email'
              name='email'    //the "name's" value has to match with the initial value's name above.
              error={Boolean(formik.errors.email) && Boolean(formik.touched.email)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.email) && formik.errors.email} //if "formik.touched.email" is true, then display the "formik.errors" associated with the "email".
            />

          <div className={style.passwordArea}>
            <FormikControl
              control='MuiInput'
              type={passwordInputType}
              label='Password'
              name='password'    //the "name's" value has to match with the initial value's name above.
              error={Boolean(formik.errors.password) && Boolean(formik.touched.password)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.password) && formik.errors.password} //if "formik.touched.password" is true, then display the "formik.errors" associated with the "password".
            />
            <div className={style.passwordEyeIcon}>{EyeIcon}</div>
          </div>

          <div className={style.passwordArea}>
            <FormikControl
              control='MuiInput'
              type={confirmPasswordInputType}
              label='Confirm Password'
              name='confirmPassword'    //the "name's" value has to match with the initial value's name above.
              error={Boolean(formik.errors.confirmPassword) && Boolean(formik.touched.confirmPassword)} //if both "formik.errors" and "formik.touched" are true, then the "error" prop is true.
              helperText={Boolean(formik.touched.confirmPassword) && formik.errors.confirmPassword} //if "formik.touched.confirmPassword" is true, then display the "formik.errors" associated with the "confirmPassword".
            />
            <div className={style.passwordEyeIcon}>{confirmPasswordEyeIcon}</div>
          </div>

            {/* <button type='submit' disabled={!formik.isValid} className={style.btn}>Sign Up</button> "formik.isValid is false whenever there is an error" */}
            <Button type="submit" variant="contained" color="primary" size="large" disabled={!formik.dirty || !formik.isValid}>Sign Up</Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Signup
