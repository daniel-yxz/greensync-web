import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { BottomNavigation } from '../components/BottomNavigation';
import './Estufas.css';

interface Estufa {
  id: string;
  nome: string;
  localizacao: string;
  descricao?: string;
  imagem?: string;
  plantas: number;
  temperatura: number;
  umidade: number;
  sensores: {
    temperatura: { status: string; valor: number };
    umidadeAr: { status: string; valor: number };
    umidadeSolo: { status: string; valor: number };
    iluminacao: { status: string; valor: boolean };
  };
}

export function Estufas() {
  const { user } = useAuth();
  const [estufas, setEstufas] = useState<Estufa[]>([]);

  useEffect(() => {
    if (!user) return;

    const estufasRef = ref(database, `estufas/${user.uid}`);
    const unsubscribe = onValue(estufasRef, (snapshot) => {
      if (snapshot.exists()) {
        const estufasData = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...(data as any)
        }));
        setEstufas(estufasData);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return '#4caf50';
      case 'Atenção': return '#ff9800';
      case 'Crítico': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="estufas-container">
      <header className="estufas-header">
        <h1>Minhas Estufas</h1>
        <p>Gerencie suas estufas cadastradas</p>
        <Link to="/estufas/nova" className="btn-primary">
          + Nova Estufa
        </Link>
      </header>

      <div className="estufas-info">
        <span>{estufas.length} estufas cadastradas</span>
      </div>

      <div className="estufas-list">
        {estufas.map((estufa, index) => (
          <div key={estufa.id} className="estufa-card">
            <div className="estufa-header">
              <div className="estufa-number">{index + 1}</div>
              <div className="estufa-titulo">
                <h3>{estufa.nome}</h3>
                <span className="estufa-localizacao">📍 {estufa.localizacao}</span>
              </div>
              <div className="estufa-plants">
                {estufa.plantas} plantas
              </div>
            </div>

            <div className="estufa-stats">
              <div className="estufa-stat">
                <span className="stat-value">{estufa.temperatura}°C</span>
                <span className="stat-label">Temperatura</span>
              </div>
              <div className="estufa-stat">
                <span className="stat-value">{estufa.umidade}%</span>
                <span className="stat-label">Umidade</span>
              </div>
            </div>

            <div className="sensores-grid">
              <div className="sensor-item">
                <span className="sensor-label">Temperatura</span>
                <span 
                  className="sensor-status"
                  style={{ color: getStatusColor(estufa.sensores.temperatura.status) }}
                >
                  ● {estufa.sensores.temperatura.status}
                </span>
              </div>
              <div className="sensor-item">
                <span className="sensor-label">Umidade do Ar</span>
                <span 
                  className="sensor-status"
                  style={{ color: getStatusColor(estufa.sensores.umidadeAr.status) }}
                >
                  ● {estufa.sensores.umidadeAr.status}
                </span>
              </div>
              <div className="sensor-item">
                <span className="sensor-label">Umidade do Solo</span>
                <span 
                  className="sensor-status"
                  style={{ color: getStatusColor(estufa.sensores.umidadeSolo.status) }}
                >
                  ● {estufa.sensores.umidadeSolo.status}
                </span>
              </div>
              <div className="sensor-item">
                <span className="sensor-label">Iluminação</span>
                <span 
                  className="sensor-status"
                  style={{ color: estufa.sensores.iluminacao.valor ? '#4caf50' : '#666' }}
                >
                  ● {estufa.sensores.iluminacao.valor ? 'Ligada' : 'Desligada'}
                </span>
              </div>
            </div>

            {estufa.descricao && (
              <p className="estufa-descricao">{estufa.descricao}</p>
            )}

            <Link to={`/estufas/${estufa.id}`} className="btn-secondary">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>

      {estufas.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏡</div>
          <h3>Nenhuma estufa cadastrada</h3>
          <p>Comece criando sua primeira estufa</p>
          <Link to="/estufas/nova" className="btn-primary">
            Criar Primeira Estufa
          </Link>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}