import React from 'react';
import './Login.scss';
import { LoginBg } from '../../../src/Assets';
import { Button, Input, Gap, Link } from '../../Components';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    return (
        <div className="main-page">
            <div className="left">
                <img src={LoginBg} className="bg-image" alt="imageBg" />
            </div>
            <div className="right">
                <p className="title">Login</p>
                <Gap height={18} />
                <Input label="Email" placeholder="Email" type="text" value="administrator@cilvies.co.id" />
                <Gap height={18} />
                <Input label="Password" placeholder="Password" type="password" value="admin12345" />
                <Gap height={20} />
                <Button className="button-login" title="Login" onClick={() => history.push('/')} />
                <Gap height={100} />
                <Link title="Don't Have an Account? Please Register." onClick={() => history.push('/register')} />
            </div>
        </div>
    )
}

export default Login