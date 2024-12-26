import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../app/components/Spinner'
import { login, reset } from '../features/auth/authslice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSucess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSucess || user) {
            navigate('/')
        }
        dispatch(reset())

    }, [user, isError, isSucess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    const { email, password, } = formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email, password
        }
        dispatch(login(userData))
    }

    return (
        <  >
            <section className="heading">
                <h1><FaSignInAlt />Login</h1>
                <p>login for setting goals</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit} action="">
                    <div className="form-group">
                        <input
                            type='email'
                            className="form-control"
                            id='email'
                            name='email'
                            value={email}
                            placeholder='enter your email'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type='password'
                            className="form-control"
                            id='password'
                            name='password'
                            value={password}
                            placeholder='enter your password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section >
        </ >
    )
}

export default Login