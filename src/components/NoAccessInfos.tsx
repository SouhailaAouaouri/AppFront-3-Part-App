import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, notification, Result, Spin } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from 'axios';

type Props = {
    token: string | null | undefined;
}

const NoAccessInformations = ({ token }: Props) => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleButtonClick = async () => {
        if (!id) {
            notification.error({
                message: 'Error',
                description: 'Please enter an ID.',
                duration: 3,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
            setError('');
            notification.success({
                message: 'Success',
                description: response.data.message,
                duration: 3,
            });
        } catch (error) {
            setError('API call failed.');
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
            {loading && <Spin />}
            {!loading && (
                <>
                    <Result
                        status="warning"
                        title="You Want to Delete a User?"
                        extra={
                           <div>
                               <Input
                                placeholder="Enter your ID"
                                value={id}
                                onChange={handleInputChange}
                                style={{ width: 300, marginBottom: 20 }}
                            />
                            <Button type="primary"  danger onClick={handleButtonClick} loading={loading}>
                        Delete
                    </Button>
                           </div>
                        }
                    />

                </>
            )}
            {error && !loading && (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />
            )}
            {data && (
                <h4 style={{ marginTop: 20 }}>
                    Deleted user with ID : {id}</h4>
            )}
        </div>
    );
};

export default NoAccessInformations;
