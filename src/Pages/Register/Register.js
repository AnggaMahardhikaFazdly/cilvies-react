import React from 'react';
import { RegisterBg } from '../../Assets';
import { Button, Input, Gap, Link } from '../../Components';
import './Register.scss';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    return (
        <div className="main-page">
            <div className="left">
                <img src={RegisterBg} className="bg-image" alt="imageBg" />
            </div>
            <div className="right">
                <p className="title">Register</p>
                <Input label="Full Name" placeholder="Full Name" />
                <Gap height={18} />
                <Input label="Email" placeholder="Email" type="text" />
                <Gap height={18} />
                <Input label="Password" placeholder="Password" type="password" />
                <Gap height={30} />
                <Button className="button-register" title="register" onClick={() => history.push('/login')} />
                <Gap height={100} />
                <Link className="link-push-login" title="Back to Login" onClick={() => history.push('/login')} />
            </div>
        </div>
    )
}

export default Register