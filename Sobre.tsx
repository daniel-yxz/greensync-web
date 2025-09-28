import { Link } from 'react-router-dom';
import { BottomNavigation } from '../components/BottomNavigation';
import './Sobre.css';

export function Sobre() {
  const teamMembers = [
    {
      nome: "Gustavo Souza",
      cargo: "Desenvolvedor Front-end",
      avatar: "👨‍💻"
    },
    {
      nome: "Carlos Daniel",
      cargo: "Desenvolvedor Back-end",
      avatar: "👨‍💻"
    },
    {
      nome: "Livia Beatriz",
      cargo: "Designer UI/UX",
      avatar: "👩‍🎨"
    },
    {
      nome: "Gabriel Domingos",
      cargo: "Especialista em Agricultura",
      avatar: "👨‍🌾"
    }
  ];

  const tecnologias = [
    { nome: "React Native", icone: "⚛️" },
    { nome: "TypeScript", icone: "📘" },
    { nome: "Firebase", icone: "🔥" },
    { nome: "GitHub", icone: "🐙" }
  ];

  const redesSociais = [
    { nome: "Website", icone: "🌐", url: "#" },
    { nome: "LinkedIn", icone: "💼", url: "#" },
    { nome: "Instagram", icone: "📷", url: "#" }
  ];

  return (
    <div className="sobre-container">
      <header className="sobre-header">
        <h1>Sobre o GreenSync</h1>
        <h2>Sincronizando sua paixão por plantas</h2>
      </header>

      <div className="sobre-content">
        {/* Descrição */}
        <section className="sobre-section">
          <p className="sobre-descricao">
            O GreenSync é um aplicativo inovador desenvolvido para entusiastas da agricultura urbana 
            e cultivadores domésticos. Nossa missão é simplificar o gerenciamento de plantas e estufas, 
            proporcionando uma experiência intuitiva e completa.
          </p>
          
          <div className="info-grid">
            <div className="info-item">
              <strong>Versão:</strong> 1.0.0
            </div>
            <div className="info-item">
              <strong>Lançamento:</strong> Novembro 2024
            </div>
            <div className="info-item">
              <strong>Compatível:</strong> Web, iOS e Android
            </div>
          </div>
        </section>

        {/* Recursos Principais */}
        <section className="sobre-section">
          <h3>Recursos Principais</h3>
          <div className="recursos-list">
            <div className="recurso-item">
              <span className="recurso-icone">🌱</span>
              <div>
                <h4>Gestão de Plantas</h4>
                <p>Cadastre, monitore e gerencie todas as suas plantas em um só lugar</p>
              </div>
            </div>
            
            <div className="recurso-item">
              <span className="recurso-icone">🏡</span>
              <div>
                <h4>Controle de Estufas</h4>
                <p>Acompanhe as condições das suas estufas e otimize o cultivo</p>
              </div>
            </div>
            
            <div className="recurso-item">
              <span className="recurso-icone">📊</span>
              <div>
                <h4>Dashboard Inteligente</h4>
                <p>Visualize métricas e insights sobre seu cultivo</p>
              </div>
            </div>
            
            <div className="recurso-item">
              <span className="recurso-icone">🔔</span>
              <div>
                <h4>Alertas Automáticos</h4>
                <p>Receba notificações sobre condições importantes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologias */}
        <section className="sobre-section">
          <h3>Tecnologias Utilizadas</h3>
          <div className="tecnologias-grid">
            {tecnologias.map((tech, index) => (
              <div key={index} className="tecnologia-item">
                <span className="tecnologia-icone">{tech.icone}</span>
                <span className="tecnologia-nome">{tech.nome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="sobre-section">
          <h3>Nossa Equipe</h3>
          <p>Conheça o time por trás do GreenSync</p>
          
          <div className="equipe-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="membro-item">
                <div className="membro-avatar">{member.avatar}</div>
                <div className="membro-info">
                  <h4>{member.nome}</h4>
                  <p>{member.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conecte-se */}
        <section className="sobre-section">
          <h3>Conecte-se Conosco</h3>
          <div className="redes-grid">
            {redesSociais.map((rede, index) => (
              <a key={index} href={rede.url} className="rede-item">
                <span className="rede-icone">{rede.icone}</span>
                <span>{rede.nome}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Ações */}
        <section className="sobre-section">
          <h3>Ações</h3>
          <div className="acoes-grid">
            <button className="acao-item">
              <span className="acao-icone">📤</span>
              <span>Enviar Feedback</span>
            </button>
            <button className="acao-item">
              <span className="acao-icone">⭐</span>
              <span>Avaliar App</span>
            </button>
          </div>
        </section>

        {/* Informações Legais */}
        <section className="sobre-section">
          <h3>Informações Legais</h3>
          <div className="legal-links">
            <a href="#" className="legal-link">Termos de Uso</a>
            <a href="#" className="legal-link">Política de Privacidade</a>
            <a href="#" className="legal-link">Licenças</a>
          </div>
        </section>
      </div>

      <footer className="sobre-footer">
        <p>GreenSync v1.0.0</p>
        <p>© 2024 GreenSync. Todos os direitos reservados.</p>
      </footer>

      <BottomNavigation />
    </div>
  );
}