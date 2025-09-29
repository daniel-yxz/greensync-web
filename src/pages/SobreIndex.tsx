import { Link } from 'react-router-dom';
import './SobreIndex.css';

export function SobreIndex() {
  return (
    <div className="sobre-index-container">
      <div className="sobre-index-content">
        
        {/* Cabeçalho */}
        <header className="sobre-index-header">
          <Link to="/" className="back-button">← Voltar</Link>
          <h1>Sobre o GreenSync</h1>
        </header>

        {/* Conteúdo Principal */}
        <div className="sobre-index-main">
          <div className="app-info">
            <h2>GreenSync</h2>
            <p className="app-tagline">Sincronizando sua paixão por plantas</p>
            <p className="app-description">
              O GreenSync é um aplicativo inovador desenvolvido para entusiastas da agricultura urbana 
              e cultivadores domésticos. Nossa missão é simplificar o gerenciamento de plantas e estufas, 
              proporcionando uma experiência intuitiva e completa.
            </p>
          </div>

          {/* Recursos */}
          <div className="recursos-section">
            <h3>Recursos Principais</h3>
            
            <div className="recurso-item">
              <div className="recurso-icon">📊</div>
              <div className="recurso-content">
                <h4>Monitoramento em Tempo Real</h4>
                <p>Acompanhe as condições das suas plantas e estufas em tempo real</p>
              </div>
            </div>

            <div className="recurso-item">
              <div className="recurso-icon">🏡</div>
              <div className="recurso-content">
                <h4>Controle de Estufas</h4>
                <p>Gerencie múltiplas estufas e otimize o ambiente de cultivo</p>
              </div>
            </div>

            <div className="recurso-item">
              <div className="recurso-icon">🌱</div>
              <div className="recurso-content">
                <h4>Gestão de Plantas</h4>
                <p>Cadastre, monitore e gerencie todas as suas plantas em um só lugar</p>
              </div>
            </div>

            <div className="recurso-item">
              <div className="recurso-icon">🔔</div>
              <div className="recurso-content">
                <h4>Alertas Inteligentes</h4>
                <p>Receba notificações sobre condições importantes do seu cultivo</p>
              </div>
            </div>
          </div>

          {/* Informações Técnicas */}
          <div className="info-section">
            <h3>Informações do App</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Versão:</strong> 1.0.0
              </div>
              <div className="info-item">
                <strong>Lançamento:</strong> Novembro 2024
              </div>
              <div className="info-item">
                <strong>Plataformas:</strong> Web, iOS e Android
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="sobre-index-footer">
          <Link to="/login" className="start-button">
            Começar a Usar
          </Link>
          <p>GreenSync v1.0.0 © 2024</p>
        </footer>

      </div>
    </div>
  );
}