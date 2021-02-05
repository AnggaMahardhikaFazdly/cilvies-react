import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import './MainApp.scss';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, BackTop } from 'antd';
import {
  DashboardOutlined,
  TableOutlined,
  UserOutlined,
  IdcardOutlined,
  FileSearchOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';
import { Dashboard, DvdList, CreateDvd, DvdEdit, DvdCard } from '../../Pages';
import { CilviesLogo } from '../../Assets';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const style = {
  height: 45,
  width: 45,
  lineHeight: '35px',
  borderRadius: 10,
  backgroundColor: '#3a3b3a',
  color: '#ffffff',
  textAlign: 'center',
  fontSize: 18,
};

const MainApp = () => {

  const [collapsed, setCollapsed] = useState(true)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  const history = useHistory();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link onClick={() => history.push('/dashboard')} >View Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={() => history.push('/dashboard')} >Setting</Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={() => history.push('/login')} >Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}>
          <img src={CilviesLogo} alt="Logo" style={{ width: '5vw', height: '10vh', marginLeft: '0.5vw' }} />
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item key="dashboard" type="dashboard" icon={<DashboardOutlined />}>
              <Link to={"/"}>Dashboard</Link>
            </Menu.Item>
            <SubMenu key="items" icon={<FileSearchOutlined />} title="Files">
              <Menu.Item key="dvds" type="dvd" icon={<TableOutlined />}>
                <Link to={"/dvds"}>DVD</Link>
              </Menu.Item>
              <Menu.Item key="cards" type="card" icon={<IdcardOutlined />}>
                <Link to={"/dvds-card"}>DVD Card</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="item-header">
              <h1 style={{ display: 'inline', marginLeft: '3vw', marginTop: '1vh', fontFamily: 'ZCOOL KuaiLe', fontSize: '40px' }}>Cilvies</h1>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar style={{ backgroundColor: '#40A9FF', marginRight: '3vw', marginTop: '2.5vh' }} size={38} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '0 16px', minHeight: '100vh', minWidth: '70vw' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 15 }}>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/dvds' component={DvdList} />
                <Route exact path='/dvds/add' component={CreateDvd} />
                <Route exact path='/dvds/:id' component={DvdEdit} />
                <Route exact path='/dvds-card' component={DvdCard} />
              </Switch>
            </div>
          </Content>
          <Footer className="footer">Cilvies ©2021 Created by AMF</Footer>
        </Layout>
        <BackTop>
          <div style={style}><ArrowUpOutlined /></div>
        </BackTop>
      </Layout >
    </Router>
  )
}

export default MainApp;

