import React, { useState, useEffect } from 'react';
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
  BulbOutlined,
  MenuOutlined,
  CloseOutlined
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Se a tela ficar maior que mobile, abre a sidebar automaticamente
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className={`mobile-toggle-btn ${darkMode ? 'dark' : 'light'}`}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1001,
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            background: darkMode ? '#333' : '#f8f9fa',
            color: darkMode ? 'white' : 'black'
          }}
        >
          {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`sidebar ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: isMobile ? '250px' : '280px',
          height: '100vh',
          position: isMobile ? 'fixed' : 'fixed',
          zIndex: 1000,
          transition: 'transform 0.3s ease',
          transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none'
        }}
      >
        <div className="d-flex align-items-center justify-content-between mb-3 mb-md-0 me-md-auto p-3">
          <span className="fs-4 fw-bold">Planilhas</span>
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className={`close-btn ${darkMode ? 'text-white' : 'text-dark'}`}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.2rem'
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.route}>
              <Link
                to={item.route}
                className={`nav-link ${darkMode ? 'text-white' : 'text-dark'} ${activeRoute === item.label ? 'active-route' : ''}`}
                onClick={() => {
                  setActiveRoute(item.label);
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="dropdown p-3">
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
              bottom: ${isMobile ? '80px' : '60px'} !important;
              left: 20px !important;
            }
            @media (max-width: 767.98px) {
              .sidebar {
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
              }
            }
          `}
        </style>
      </div>

      {/* Overlay para mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}
    </>
  );
}

export default Sidebar;