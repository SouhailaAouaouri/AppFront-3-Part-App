import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Result, Input, Button } from 'antd';
import {LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoOutlined} from '@ant-design/icons';

const CallbackPage = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
    }, []);

    const handleInputChange = (e:any) => {
        setToken(e.target.value);
    };

    const handleButtonClick = () => {
        console.log(token);
        window.open(`/home?code=${token}`, '_self');
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            <Result
                title="Please enter the access token form IDP to continue..."
                extra={
                    <>
                        <Input
                            placeholder="Enter some text"
                            value={token}
                            onChange={handleInputChange}
                            style={{ width: 400, marginBottom: 10 }}
                        />
                        <Button type="primary" onClick={handleButtonClick}>Get Acces</Button>
                    </>
                }
            />
        </div>
    );
};

export default CallbackPage;
