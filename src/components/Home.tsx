import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import PublicInformations from "./PublicInfos";
import PrivateInformations from "./PrivateInfos";
import NoAccessInformations from "./NoAccessInfos";
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/lib/layout/layout";

const Home = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('code');
    console.log( 'token',token)
    const [currentSection, setCurrentSection] = useState('public');

    const handleMenuClick = (e:any) => {
        setCurrentSection(e.key);
    };
    const renderContent = () => {
        switch (currentSection) {
            case 'public':
                return <PublicInformations token={token}/>;
            case 'private':
                return <PrivateInformations token={token}/>;
            case 'no-access':
                return <NoAccessInformations token={token}/>;
            default:
                return <PublicInformations token={token}/>;
        }
    };

    return (
       <div>
           <Layout style={{ minHeight: '100vh' }}>
               <Header style={{ backgroundColor: '#001529', padding: 0 }}>
                   <Menu
                       theme="dark"
                       mode="horizontal"
                       defaultSelectedKeys={['public']}
                       onClick={handleMenuClick}
                   >
                       <Menu.Item key="public">Public Information</Menu.Item>
                       <Menu.Item key="private">Private Information</Menu.Item>
                       <Menu.Item key="no-access">No Access Information</Menu.Item>
                   </Menu>
               </Header>
               <Content style={{ padding: '0 50px', marginTop: 64 }}>
                   <div style={{ padding: 24, background: '#fff', minHeight: 380 }}>
                       {renderContent()}
                   </div>
               </Content>
           </Layout>

       </div>
    );
};

export default Home;
