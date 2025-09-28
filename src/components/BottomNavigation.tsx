import { Link, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

export function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { path: '/inicial', icon: '🏠', label: 'Início' },
    { path: '/plantas', icon: '🌱', label: 'Plantas' },
    { path: '/estufas', icon: '🏡', label: 'Estufas' },
    { path: '/perfil', icon: '👤', label: 'Perfil' },
    { path: '/sobre', icon: 'ℹ️', label: 'Sobre' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}