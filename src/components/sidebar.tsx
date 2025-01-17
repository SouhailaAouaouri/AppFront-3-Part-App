import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Typography from "@mui/material/Typography";

const { Header, Sider, Content } = Layout;

const sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
<Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Typography variant="h5" sx={{color: '#1976D2',marginRight:2 }} >
            Console Admin
        </Typography>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'nav 1',
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'nav 2',
                },
                {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'nav 3',
                },
            ]}
        />
    </Sider>
    <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
        </Header>
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            Content
        </Content>
    </Layout>
</Layout>
    );
};

export default sidebar;
