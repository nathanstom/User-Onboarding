import axios from 'axios';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import User from './User'

const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        agreedTOS: false,
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        agreedTOS: '',
    });
    const [users, setUsers] = useState([]);

    const formSchema = Yup.object().shape({
        username: Yup
            .string()
            .trim()
            .required("Must include a username.")
            .min(6, "Username must be at least 6 characters long."),
        email: Yup
            .string()
            .trim()
            .email("Must be a valid email address.")
            .required("Must include email address."),
        password: Yup
            .string()
            .trim()
            .required("Password is Required")
            .min(8, "Passwords must be at least 8 characters long."),
        agreedTOS: Yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions")
    });

    useEffect(() => {
        formSchema.isValid(formData).then((valid) => {
            setButtonDisabled(!valid);
        })
    }, [formData])

    const inputChange = e => {
        const { name, value, checked, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value;

        Yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setErrors({
                    ...errors, [name]: ''
                })
            })
            .catch(err => {
                setErrors({
                    ...errors, [name]: err.errors[0]
                })
            })

        setFormData({
            ...formData, [name]: valueToUse
        })
    }

    const submit = (e) => {
        e.preventDefault();
        const newUser = { username: formData.username, email: formData.email, password: formData.password, agreedTOS: formData.agreedTOS }
        axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                console.log(res.data);
                setUsers([...users, res.data]);
            })
            .catch(err => {
                console.log(err)
            })
        setFormData({
            username: '',
            email: '',
            password: '',
            agreedTOS: false,
        });
    }

    return (
        <>
            <form id='newUserForm' onSubmit={submit}>

                <label>
                    Username
                    <input onChange={inputChange} id='username' type='text' name='username' value={formData.username} placeholder='Enter a Username'></input>
                </label>
                {errors.username.length > 0 && <p className='errorMsg'>{errors.username}</p>}

                <label>
                    Email
                    <input onChange={inputChange} id='email' type='email' name='email' value={formData.email} placeholder='Enter your Email'></input>
                </label>
                {errors.email.length > 0 && <p className='errorMsg'>{errors.email}</p>}

                <label>
                    Password
                    <input onChange={inputChange} id='password' type='password' name='password' value={formData.password} placeholder='Enter a Secure Password'></input>
                </label>
                {errors.password.length > 0 && <p className='errorMsg'>{errors.password}</p>}

                <label>
                    Terms and Conditions
                    <input onChange={inputChange} id='tos' type='checkbox' name='agreedTOS' checked={formData.agreedTOS} ></input>
                </label>
                <button disabled={buttonDisabled} id='submit'>Submit!</button>

            </form>
            <div>
                {users.map((user, index) => <User key={index} user={user} />)}
            </div>
        </>
    )
}

export default Form;