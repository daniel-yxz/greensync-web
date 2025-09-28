import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation } from '../components/BottomNavigation';
import './Configuracoes.css';

export function Configuracoes() {
  const [notificacoesPush, setNotificacoesPush] = useState(true);
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [dadosMoveis, setDadosMoveis] = useState(false);
  const [localizacao, setLocalizacao] = useState(false);
  const [backupAuto, setBackupAuto] = useState(true);

  const handleLimparCache = () => {
    if (window.confirm('Tem certeza que deseja limpar o cache?')) {
      alert('Cache limpo com sucesso!');
    }
  };

  return (
    <div className="configuracoes-container">
      <header className="configuracoes-header">
        <h1>Configurações</h1>
      </header>

      <div className="configuracoes-content">
        {/* Seção Usuário */}
        <section className="config-section">
          <h2>Usuário</h2>
          <div className="config-list">
            <Link to="/perfil/editar" className="config-item">
              <div className="config-info">
                <span className="config-icon">👤</span>
                <div>
                  <h3>Editar Perfil</h3>
                  <p>Altere suas informações pessoais</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </Link>

            <Link to="/alterar-senha" className="config-item">
              <div className="config-info">
                <span className="config-icon">🔒</span>
                <div>
                  <h3>Alterar Senha</h3>
                  <p>Atualize sua senha de acesso</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </Link>

            <button className="config-item">
              <div className="config-info">
                <span className="config-icon">📤</span>
                <div>
                  <h3>Exportar Dados</h3>
                  <p>Baixe seus dados em PDF</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </button>
          </div>
        </section>

        {/* Seção Notificações */}
        <section className="config-section">
          <h2>Notificações</h2>
          <div className="config-list">
            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">📱</span>
                <div>
                  <h3>Notificações Push</h3>
                  <p>Receba alertas importantes</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notificacoesPush}
                  onChange={(e) => setNotificacoesPush(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">📧</span>
                <div>
                  <h3>Notificações por E-mail</h3>
                  <p>Receba relatórios por e-mail</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notificacoesEmail}
                  onChange={(e) => setNotificacoesEmail(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Seção Preferências */}
        <section className="config-section">
          <h2>Preferências</h2>
          <div className="config-list">
            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">🌙</span>
                <div>
                  <h3>Modo Escuro</h3>
                  <p>Interface com tema escuro</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={modoEscuro}
                  onChange={(e) => setModoEscuro(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">📶</span>
                <div>
                  <h3>Usar Dados Móveis</h3>
                  <p>Sincronizar usando dados móveis</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={dadosMoveis}
                  onChange={(e) => setDadosMoveis(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">📍</span>
                <div>
                  <h3>Compartilhar Localização</h3>
                  <p>Para recomendações climáticas</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={localizacao}
                  onChange={(e) => setLocalizacao(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Seção Privacidade */}
        <section className="config-section">
          <h2>Privacidade e Segurança</h2>
          <div className="config-list">
            <div className="config-item toggle-item">
              <div className="config-info">
                <span className="config-icon">☁️</span>
                <div>
                  <h3>Backup Automático</h3>
                  <p>Salve seus dados na nuvem</p>
                </div>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={backupAuto}
                  onChange={(e) => setBackupAuto(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <button className="config-item" onClick={handleLimparCache}>
              <div className="config-info">
                <span className="config-icon">🧹</span>
                <div>
                  <h3>Limpar Cache</h3>
                  <p>Libere espaço no dispositivo</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </button>
          </div>
        </section>

        {/* Seção Ajuda */}
        <section className="config-section">
          <h2>Ajuda e Suporte</h2>
          <div className="config-list">
            <Link to="/ajuda" className="config-item">
              <div className="config-info">
                <span className="config-icon">❓</span>
                <div>
                  <h3>Ajuda & Suporte</h3>
                  <p>Tire suas dúvidas</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </Link>

            <Link to="/sobre" className="config-item">
              <div className="config-info">
                <span className="config-icon">ℹ️</span>
                <div>
                  <h3>Sobre o App</h3>
                  <p>Versão e informações</p>
                </div>
              </div>
              <span className="config-arrow">›</span>
            </Link>
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}