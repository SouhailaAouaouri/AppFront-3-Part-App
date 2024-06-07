import React, {useEffect, useState} from 'react';
import { Button, Input, Result, notification } from 'antd';
import axios from 'axios';

type Props = {
    token: string | null | undefined;
};

const PublicInformation = ({ token }: Props) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleButtonClick = async () => {
        if (!name) {
            notification.error({
                message: 'Error',
                description: 'Please enter your name.',
                duration: 3,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/user/hello', {
                name
            });
            notification.success({
                message: 'Success',
                description: response.data.message,
                duration: 3,
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'API call failed.',
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                status="success"
                title="Public Information"
                subTitle="Please enter your name and click submit to Continue..."
            />
            <Input
                placeholder="Enter your name"
                value={name}
                onChange={handleInputChange}
                style={{ width: 300, marginBottom: 20 }}
            />
            <Button type="primary" onClick={handleButtonClick} loading={loading}>
                Submit
            </Button>
        </div>
    );
};

export default PublicInformation;
