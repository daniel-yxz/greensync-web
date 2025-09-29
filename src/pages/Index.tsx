import { Link } from 'react-router-dom';
import './Index.css';
import logo from '../assets/logoFundo2.png'; // Ajuste o caminho se necessário

export function Index() {
  return (
    <div className="index-container">
      <div className="index-content">
        
        {/* Nome e Logo */}
        <div className="logo-section">
          <h1 className="project-name">GreenSync</h1>
          <img src={logo} alt="GreenSync Logo" className="logo-image" />
        </div>

        {/* Descrição do Projeto */}
        <div className="description-section">
          <p className="project-tagline">
            Sincronizando sua paixão por plantas
          </p>
        </div>

        {/* Botões Principais */}
        <div className="buttons-section">
          <Link to="/sobre-index" className="sobre-button">
            Sobre
          </Link>
          
          <Link to="/login" className="cta-button">
            Começar Agora
          </Link>
        </div>

        {/* Rodapé */}
        <footer className="index-footer">
          <p>GreenSync v1.0.0</p>
          <p>© 2024 GreenSync. Todos os direitos reservados.</p>
        </footer>

      </div>
    </div>
  );
}