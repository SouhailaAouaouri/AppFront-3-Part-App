import React, { useState } from 'react';
import {Button, List, notification, Result, Spin, Table, TableProps} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

type Props = {
    token: string | null | undefined;
};

const PrivateInformations = ({ token }: Props) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    interface DataType {
        key: string;
        _id: string;
        lastname: string;
        firstname: number;

    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        }
        ,{
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firsname',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        },
    ];
    const callProtectedApi = async () => {
        if (!token) {
            notification.error({
                message: 'Error',
                description: 'No token provided.',
                duration: 3,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
            notification.success({
                message: 'Success',
                description: 'Protected API call was successful.',
                duration: 3,
            });
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Protected API call failed.',
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                icon={<SmileOutlined />}
                title="Great, we have done all the operations!"
                extra={[
                    <Button type="primary" onClick={callProtectedApi} loading={loading}>
                        Call Protected API : get list users
                    </Button>
                ]}
            />
            {loading && <Spin />}
            {!loading && users.length > 0 && (
                <Table columns={columns} dataSource={users} />
            )}
        </div>
    );
};

export default PrivateInformations;
