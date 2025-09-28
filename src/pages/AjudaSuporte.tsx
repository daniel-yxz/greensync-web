import { Link } from 'react-router-dom';
import { BottomNavigation } from '../components/BottomNavigation';
import './AjudaSuporte.css';

export function AjudaSuporte() {
  const faqItems = [
    {
      pergunta: "Como adicionar uma nova planta?",
      resposta: "Vá para a página 'Plantas' e clique no botão '+ Nova Planta'."
    },
    {
      pergunta: "Como configurar uma nova estufa?",
      resposta: "Acesse a página 'Estufas' e clique em '+ Nova Estufa'."
    },
    {
      pergunta: "O aplicativo funciona offline?",
      resposta: "Sim, você pode visualizar dados básicos, mas algumas funcionalidades necessitam de conexão."
    },
    {
      pergunta: "Como alterar minha senha?",
      resposta: "Vá em 'Configurações' > 'Alterar Senha'."
    },
    {
      pergunta: "Posso exportar meus dados?",
      resposta: "Sim, em 'Configurações' você encontra a opção 'Exportar Dados'."
    }
  ];

  return (
    <div className="ajuda-container">
      <header className="ajuda-header">
        <h1>Ajuda & Suporte</h1>
        <p>Estamos aqui para ajudar você!</p>
      </header>

      <div className="ajuda-content">
        {/* Canais de Contato */}
        <section className="ajuda-section">
          <h2>Canais de Contato</h2>
          <div className="contato-grid">
            <div className="contato-item">
              <span className="contato-icon">📞</span>
              <h3>Telefone</h3>
              <p>(11) 99999-9999</p>
            </div>
            <div className="contato-item">
              <span className="contato-icon">📧</span>
              <h3>E-mail</h3>
              <p>suporte@greensync.com</p>
            </div>
            <div className="contato-item">
              <span className="contato-icon">💬</span>
              <h3>WhatsApp</h3>
              <p>Chat em tempo real</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ajuda-section">
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-pergunta">
                  {item.pergunta}
                </summary>
                <div className="faq-resposta">
                  <p>{item.resposta}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Recursos de Ajuda */}
        <section className="ajuda-section">
          <h2>Recursos de Ajuda</h2>
          <div className="recursos-grid">
            <Link to="/manual" className="recurso-item">
              <span className="recurso-icon">📖</span>
              <h3>Manual do Usuário</h3>
              <p>Guia completo de uso</p>
            </Link>
            <Link to="/tutoriais" className="recurso-item">
              <span className="recurso-icon">🎥</span>
              <h3>Tutoriais em Vídeo</h3>
              <p>Aprenda visualmente</p>
            </Link>
          </div>
        </section>

        {/* Feedback */}
        <section className="ajuda-section">
          <h2>Feedback</h2>
          <div className="feedback-grid">
            <button className="feedback-item">
              <span className="feedback-icon">🐛</span>
              <div>
                <h3>Reportar Problema</h3>
                <p>Encontrou um bug? Nos avise!</p>
              </div>
            </button>
            <button className="feedback-item">
              <span className="feedback-icon">💡</span>
              <div>
                <h3>Sugerir Melhoria</h3>
                <p>Tem uma ideia para melhorar o app?</p>
              </div>
            </button>
          </div>
        </section>

        {/* Informações de Atendimento */}
        <section className="ajuda-section">
          <h2>Informações de Atendimento</h2>
          <div className="atendimento-info">
            <div className="atendimento-item">
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 8h às 18h</p>
              <p>Sábados: 9h às 13h</p>
            </div>
            <div className="atendimento-item">
              <h3>Tempo de Resposta</h3>
              <p>E-mail: até 24 horas</p>
              <p>WhatsApp: até 2 horas</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="ajuda-footer">
        <p>GreenSync Suporte v1.0.0</p>
        <p>© 2024 GreenSync. Todos os direitos reservados.</p>
      </footer>

      <BottomNavigation />
    </div>
  );
}