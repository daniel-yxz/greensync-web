// src/pages/Inicial.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { BottomNavigation } from '../components/BottomNavigation';
import './Inicial.css';

export function Inicial() {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState({
    totalPlantas: 0,
    totalEstufas: 0,
    taxaSucesso: 0
  });

  useEffect(() => {
    if (!user) return;

    const statsRef = ref(database, `users/${user.uid}/stats`);
    const unsubscribe = onValue(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        setStats(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="inicial-container">
      <header className="inicial-header">
        <div className="user-info">
          <h2>Olá, {userData?.name}!</h2>
          <p className="user-email">{user?.email}</p>
        </div>
        <div className="status-badge">
          <span className="status-active">● Conta Ativa</span>
        </div>
      </header>

      <section className="stats-section">
        <h3>Minhas Estatísticas</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🌱</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalPlantas}</span>
              <span className="stat-label">Plantas</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🏡</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalEstufas}</span>
              <span className="stat-label">Estufas</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <span className="stat-number">{stats.taxaSucesso}%</span>
              <span className="stat-label">Sucesso</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h3>Ações Rápidas</h3>
        <div className="actions-grid">
          <Link to="/plantas/nova" className="action-card">
            <div className="action-icon">➕</div>
            <span>Nova Planta</span>
          </Link>
          
          <Link to="/estufas/nova" className="action-card">
            <div className="action-icon">🏡</div>
            <span>Nova Estufa</span>
          </Link>
          
          <Link to="/perfil" className="action-card">
            <div className="action-icon">👤</div>
            <span>Meu Perfil</span>
          </Link>
          
          <Link to="/configuracoes" className="action-card">
            <div className="action-icon">⚙️</div>
            <span>Configurações</span>
          </Link>
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
}