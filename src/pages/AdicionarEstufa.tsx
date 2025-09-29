import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { BottomNavigation } from '../components/BottomNavigation';
import './AdicionarEstufa.css';

export function AdicionarEstufa() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    localizacao: '',
    descricao: '',
    temperatura: '25',
    umidade: '60'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const novaEstufa = {
        nome: formData.nome,
        localizacao: formData.localizacao,
        descricao: formData.descricao || '',
        plantas: 0,
        temperatura: parseInt(formData.temperatura),
        umidade: parseInt(formData.umidade),
        sensores: {
          temperatura: { 
            status: 'Normal', 
            valor: parseInt(formData.temperatura) 
          },
          umidadeAr: { 
            status: 'Normal', 
            valor: parseInt(formData.umidade) 
          },
          umidadeSolo: { 
            status: 'Normal', 
            valor: 45 
          },
          iluminacao: { 
            status: 'Normal', 
            valor: true 
          }
        },
        dataCriacao: new Date().toISOString()
      };

      // Salva no Firebase
      const estufasRef = ref(database, `estufas/${user.uid}`);
      await push(estufasRef, novaEstufa);

      alert('Estufa criada com sucesso!');
      navigate('/estufas');
    } catch (error) {
      console.error('Erro ao criar estufa:', error);
      alert('Erro ao criar estufa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate('/estufas');
  };

  return (
    <div className="adicionar-estufa-container">
      <div className="adicionar-estufa-content">
        <button onClick={handleVoltar} className="back-button">
          ← Voltar
        </button>
        
        <header className="form-header">
          <h1>Nova Estufa</h1>
          <p>Preencha os dados da sua nova estufa</p>
        </header>

        <form onSubmit={handleSubmit} className="estufa-form">
          <div className="form-group">
            <label htmlFor="nome">Nome da Estufa *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Estufa Principal, Horta Indoor..."
              maxLength={50}
            />
            <small>Máximo 50 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="localizacao">Localização *</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              required
              placeholder="Ex: Jardim, Varanda, Sala..."
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição (Opcional)</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              placeholder="Descreva sua estufa, tipos de plantas que pretende cultivar..."
              maxLength={200}
            />
            <small>{formData.descricao.length}/200 caracteres</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="temperatura">Temperatura Inicial (°C)</label>
              <select
                id="temperatura"
                name="temperatura"
                value={formData.temperatura}
                onChange={handleChange}
              >
                <option value="20">20°C</option>
                <option value="22">22°C</option>
                <option value="24">24°C</option>
                <option value="25">25°C</option>
                <option value="26">26°C</option>
                <option value="28">28°C</option>
                <option value="30">30°C</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="umidade">Umidade Inicial (%)</label>
              <select
                id="umidade"
                name="umidade"
                value={formData.umidade}
                onChange={handleChange}
              >
                <option value="40">40%</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="80">80%</option>
              </select>
            </div>
          </div>

          <div className="config-preview">
            <h3>Configuração Inicial</h3>
            <div className="preview-grid">
              <div className="preview-item">
                <span className="preview-label">Temperatura:</span>
                <span className="preview-value">{formData.temperatura}°C</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Umidade:</span>
                <span className="preview-value">{formData.umidade}%</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Plantas:</span>
                <span className="preview-value">0</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Status:</span>
                <span className="preview-value status-normal">Normal</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleVoltar} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" disabled={loading || !formData.nome || !formData.localizacao} className="submit-button">
              {loading ? 'Criando...' : 'Criar Estufa'}
            </button>
          </div>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}