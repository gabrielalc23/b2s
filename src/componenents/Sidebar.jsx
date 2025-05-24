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
  { label: 'Informações', route: '/informacoes', icon: <SnippetsOutlined /> },
  { label: 'Modelagem', route: '/modelagem', icon: <FundProjectionScreenOutlined /> },
  { label: 'Estratégia', route: '/estrategia', icon: <FundOutlined /> },
  { label: 'Marketing', route: '/marketing', icon: <AppstoreOutlined /> },
  { label: 'Preço', route: '/preco', icon: <DollarOutlined /> },
  { label: 'Finanças', route: '/financas', icon: <BarChartOutlined /> },
  { label: 'Relatórios', route: '/relatorios', icon: <PieChartOutlined /> },
  { label: 'Dashboards', route: '/dashboards', icon: <DashboardOutlined /> },
  { label: 'Sumário', route: '/sumario', icon: <FileTextOutlined /> },
  { label: 'Instruções', route: '/instrucoes', icon: <ReadOutlined /> }
];

function Sidebar() {
  const [activeRoute, setActiveRoute] = useState('Informações');
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Improved iPad detection
      const isAppleTablet = /iPad|Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document;
      const iPadMode = isAppleTablet && width >= 768 && width <= 1024;
      setIsIpad(iPadMode);

      // Adaptive behavior
      if (width >= 1024) {
        setSidebarOpen(true); // Desktop - always open
      } else if (iPadMode) {
        setSidebarOpen(width > 800); // iPad - open in landscape, closed in portrait
      } else if (width >= 768) {
        setSidebarOpen(true); // Other tablets
      } else {
        setSidebarOpen(false); // Mobile
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (windowWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024 && !isIpad;

  return (
    <>
      {/* Toggle Button - Adjusted for iPad */}
      {(isMobile || isIpad || isTablet) && (
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className={`mobile-toggle-btn ${darkMode ? 'dark' : 'light'}`}
          style={{
            position: 'fixed',
            top: isIpad ? '24px' : '16px',
            left: isIpad ? '24px' : '16px',
            zIndex: 1001,
            padding: '12px',
            borderRadius: '50%',
            border: 'none',
            background: darkMode ? '#333' : '#f8f9fa',
            color: darkMode ? 'white' : 'black',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          {sidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      )}

      {/* Sidebar with iPad adaptations */}
      <div 
        className={`sidebar ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: isIpad ? (windowWidth > 800 ? '280px' : '240px') : 
                 isMobile ? '85vw' : 
                 isTablet ? '280px' : '300px',
          maxWidth: '100%',
          height: '100vh',
          position: 'fixed',
          zIndex: 1000,
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: (isMobile || isIpad || isTablet) ? 
                    (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
          boxShadow: (isMobile || isIpad || isTablet) && sidebarOpen ? 
                    '4px 0 20px rgba(0, 0, 0, 0.3)' : 'none'
        }}
      >
        <div className="d-flex align-items-center justify-content-between p-3">
          <span className="fs-4 fw-bold">Planilhas</span>
          {(isMobile || isIpad) && (
            <button 
              onClick={toggleSidebar}
              aria-label="Close menu"
              className={`close-btn ${darkMode ? 'text-white' : 'text-dark'}`}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}
            >
              <CloseOutlined />
            </button>
          )}
        </div>
        
        <hr className={`my-1 ${darkMode ? 'bg-secondary' : ''}`} />
        
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 150px)' }}>
          <ul className="nav nav-pills flex-column">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.route}>
                <Link
                  to={item.route}
                  className={`nav-link ${darkMode ? 'text-white' : 'text-dark'} ${activeRoute === item.label ? 'active-route' : ''}`}
                  onClick={() => {
                    setActiveRoute(item.label);
                    closeSidebar();
                  }}
                  style={{
                    padding: isIpad ? '14px 20px' : '12px 16px',
                    margin: '4px 8px',
                    fontSize: isIpad ? '1.05rem' : '1rem'
                  }}
                >
                  <span 
                    className="sidebar-icon" 
                    style={{ 
                      fontSize: isIpad ? '20px' : '18px',
                      minWidth: isIpad ? '28px' : '24px'
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div 
          className="dropdown p-3" 
          style={{ 
            position: 'absolute', 
            bottom: 0,
            width: '100%',
            borderTop: darkMode ? '1px solid #444' : '1px solid #eee'
          }}
        >
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="d-flex align-items-center text-decoration-none border-0 bg-transparent w-100"
            style={{ 
              color: darkMode ? 'white' : 'black',
              padding: '12px 8px',
              fontSize: isIpad ? '1.05rem' : '1rem'
            }}
          >
            <UserOutlined style={{ 
              fontSize: isIpad ? '20px' : '18px',
              minWidth: isIpad ? '28px' : '24px'
            }} />
            <strong style={{ marginLeft: '12px' }}>Usuário</strong>
          </button>
          
          {dropdownOpen && (
            <ul 
              className={`dropdown-menu ${darkMode ? 'dropdown-menu-dark' : ''}`}
              style={{
                position: 'absolute',
                bottom: '70px',
                left: '16px',
                right: '16px',
                display: 'block'
              }}
            >
              <li>
                <Link 
                  className="dropdown-item" 
                  to="/profile"
                  onClick={() => {
                    setDropdownOpen(false);
                    closeSidebar();
                  }}
                  style={{ padding: '12px 16px' }}
                >
                  Perfil
                </Link>
              </li>
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={toggleDarkMode}
                  style={{ padding: '12px 16px' }}
                >
                  <BulbOutlined style={{ marginRight: '12px' }} />
                  {darkMode ? 'Light mode' : 'Dark mode'}
                </button>
              </li>
              <li><hr className="dropdown-divider my-1" /></li>
              <li>
                <Link 
                  className="dropdown-item text-danger" 
                  to="/logout"
                  onClick={() => {
                    setDropdownOpen(false);
                    closeSidebar();
                  }}
                  style={{ padding: '12px 16px' }}
                >
                  <LogoutOutlined style={{ marginRight: '12px' }} />
                  Sair
                </Link>
              </li>
            </ul>
          )}
        </div>
        
        <style jsx>{`
          .nav-link {
            display: flex;
            align-items: center;
            border-radius: 8px;
            transition: all 0.2s;
          }
          
          .nav-link:hover, .nav-link:focus {
            background-color: ${darkMode ? 'rgba(13, 110, 253, 0.7)' : 'rgba(233, 236, 239, 0.7)'};
            transform: translateX(4px);
          }
          
          .active-route {
            background-color: ${darkMode ? 'rgba(13, 110, 253, 0.9)' : 'rgba(209, 231, 255, 0.9)'} !important;
            font-weight: 500;
          }
          
          .dropdown-menu {
            border-radius: 8px;
            border: ${darkMode ? '1px solid #444' : '1px solid #ddd'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          
          /* iPad specific styles */
          @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
            .sidebar {
              box-shadow: ${sidebarOpen ? '2px 0 15px rgba(0, 0, 0, 0.15)' : 'none'};
            }
            
            .nav-link {
              padding: 14px 20px !important;
              font-size: 1.05rem !important;
            }
            
            .sidebar-icon {
              font-size: 20px !important;
              min-width: 26px !important;
            }
          }
          
          /* iPad portrait */
          @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
            .sidebar {
              width: 240px !important;
            }
          }
          
          /* iPad landscape */
          @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
            .sidebar {
              width: 280px !important;
            }
          }
          
          /* Mobile styles remain unchanged */
          @media (max-width: 767px) {
            .sidebar {
              width: 85vw !important;
              max-width: 300px;
            }
          }
        `}</style>
      </div>

      {/* Overlay with iPad adjustments */}
      {(isMobile || (isIpad && sidebarOpen) || (isTablet && sidebarOpen)) && (
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
            zIndex: 999,
            transition: 'opacity 0.3s ease',
            opacity: sidebarOpen ? (isIpad ? 0.3 : 0.5) : 0,
            pointerEvents: sidebarOpen ? 'auto' : 'none'
          }}
        />
      )}
    </>
  );
}

export default Sidebar;