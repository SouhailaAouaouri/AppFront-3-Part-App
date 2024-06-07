import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const handleLogin = async () => {

        //api with scope valide && invalide && audience
        const authUrl = `http://localhost:3000/authorize?response_type=code&client_id=3-part-app&redirect_uri=${encodeURIComponent('http://localhost:3009/callback')}&scope=${encodeURIComponent('read:users read:hello write:app')}&audience=${encodeURIComponent('http://localhost:5000 http://localhost:5008 http://localhost:5009')}`;
        // api without audience
        //const authUrl = `http://localhost:3000/authorize?response_type=code&client_id=3-part-app&redirect_uri=${encodeURIComponent('http://localhost:3009/callback')}&scope=${encodeURIComponent('read:users read:hello write:app')}`;
        const authWindow = window.open(authUrl, '_blank');
        window.open('/authorize', '_self');
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'
        }}>
            <Card
                style={{ width: 300, textAlign: 'center', backgroundColor: 'white', borderRadius: 10 }}
                bordered={false}
            >
                <p>Welcome! Please login to continue.</p>
                <Button type="primary" onClick={handleLogin}>Login with IDP</Button>
            </Card>
        </div>
    );
};

export default LoginPage;
