import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { BottomNavigation } from '../components/BottomNavigation';
import './Plantas.css';

interface Planta {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  imagem?: string;
  temperatura: string;
  luminosidade: string;
  rega: string;
  dificuldade: string;
}

export function Plantas() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const plantasRef = ref(database, `plantas/${user.uid}`);
    const unsubscribe = onValue(plantasRef, (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        const plantasData = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...(data as Omit<Planta, 'id'>)
        }));
        setPlantas(plantasData);
      } else {
        setPlantas([]);
      }
    }, (error) => {
      console.error('Erro ao carregar plantas:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const plantasFiltradas = plantas.filter(planta =>
    planta.nome.toLowerCase().includes(busca.toLowerCase()) ||
    planta.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNovaPlanta = () => {
    navigate('/plantas/nova');
  };

  const handleVerDetalhes = (plantaId: string) => {
    alert(`Detalhes da planta ${plantaId} - Funcionalidade em desenvolvimento`);
  };

  if (loading) {
    return (
      <div className="plantas-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando plantas...</p>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="plantas-container">
      <header className="plantas-header">
        <h1>Minhas Plantas</h1>
        <p>Gerencie suas plantas cadastradas</p>
        <button onClick={handleNovaPlanta} className="btn-primary">
          + Nova Planta
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar planta..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="plantas-info">
        <span>{plantasFiltradas.length} planta{plantasFiltradas.length !== 1 ? 's' : ''} encontrada{plantasFiltradas.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="plantas-grid">
        {plantasFiltradas.map((planta) => (
          <div key={planta.id} className="planta-card">
            <div className="planta-image">
              {planta.imagem ? (
                <img src={planta.imagem} alt={planta.nome} />
              ) : (
                <div className="planta-placeholder">🌱</div>
              )}
            </div>
            <div className="planta-info">
              <h3>{planta.nome}</h3>
              <span className="planta-tipo">{planta.tipo}</span>
              <p className="planta-descricao">{planta.descricao}</p>
              <div className="planta-detalhes">
                <span>🌡️ {planta.temperatura}</span>
                <span>💡 {planta.luminosidade}</span>
                <span>💧 {planta.rega}</span>
              </div>
              <button 
                onClick={() => handleVerDetalhes(planta.id)} 
                className="btn-secondary"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {plantasFiltradas.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🌱</div>
          <h3>Nenhuma planta encontrada</h3>
          <p>Comece adicionando sua primeira planta</p>
          <button onClick={handleNovaPlanta} className="btn-primary">
            Adicionar Primeira Planta
          </button>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}