import React, { useState } from 'react';
import {
  SnippetsOutlined,
  FundProjectionScreenOutlined,
  FundOutlined,
  AppstoreOutlined,
  DollarOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
  LogoutOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles/Navbars.css';

const menuItems = [
  { label: 'Informações', route: '/informacoes', icon: <SnippetsOutlined className="p-1" /> },
  { label: 'Modelagem', route: '/modelagem', icon: <FundProjectionScreenOutlined className="p-1" /> },
  { label: 'Estratégia', route: '/estrategia', icon: <FundOutlined className="p-1" /> },
  { label: 'Marketing', route: '/marketing', icon: <AppstoreOutlined className="p-1" /> },
  { label: 'Preço', route: '/preco', icon: <DollarOutlined className="p-1" /> },
  { label: 'Finanças', route: '/financas', icon: <BarChartOutlined className="p-1" /> },
  { label: 'Relatórios', route: '/relatorios', icon: <PieChartOutlined className="p-1" /> },
  { label: 'Dashboards', route: '/dashboards', icon: <DashboardOutlined className="p-1" /> },
  { label: 'Sumário', route: '/sumario', icon: <FileTextOutlined className="p-1" /> },
  { label: 'Instruções', route: '/instrucoes', icon: <ReadOutlined className="p-1" /> }
];

function Sidebar() {
  const [activeRoute, setActiveRoute] = useState('Informações');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} 
         style={{ width: '280px', height: '100vh', position: 'fixed' }}>
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-4 fw-bold">Planilhas</span>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.route}>
            <Link
              to={item.route}
              className={`nav-link ${darkMode ? 'text-white' : 'text-dark'} ${activeRoute === item.label ? 'active-route' : ''}`}
              onClick={() => setActiveRoute(item.label)}
            >
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-decoration-none" data-bs-toggle="dropdown">
          <UserOutlined className="me-2" />
          <strong>Usuário</strong>
        </a>
        <ul className={`dropdown-menu ${darkMode ? 'dropdown-menu-dark' : ''}`}>
          <li>
            <Link className="dropdown-item" to="/profile">
              Perfil
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={toggleDarkMode}>
              <BulbOutlined className="me-2" />
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link className="dropdown-item text-danger" to="/logout">
              <LogoutOutlined className="me-2" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <style>
        {`
          .nav-link:hover {
            background-color: ${darkMode ? '#0d6efd' : '#e9ecef'};
            color: ${darkMode ? 'white' : 'black'};
          }
          .active-route {
            background-color: ${darkMode ? '#202f50' : '#d1e7ff'};
            color: ${darkMode ? 'white' : 'black'} !important;
          }
          .dropdown-menu {
            position: absolute !important;
            bottom: 60px !important;
            left: 20px !important;
          }
        `}
      </style>
    </div>
  );
}

export default Sidebar;