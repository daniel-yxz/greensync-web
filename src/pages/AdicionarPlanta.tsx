import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { BottomNavigation } from '../components/BottomNavigation';
import './AdicionarPlanta.css';

export function AdicionarPlanta() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    descricao: '',
    temperatura: '20-25°C',
    luminosidade: 'Média',
    rega: '2 vezes por semana',
    dificuldade: 'Fácil'
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
      const novaPlanta = {
        nome: formData.nome,
        tipo: formData.tipo,
        descricao: formData.descricao,
        temperatura: formData.temperatura,
        luminosidade: formData.luminosidade,
        rega: formData.rega,
        dificuldade: formData.dificuldade,
        dataCriacao: new Date().toISOString()
      };

      // Salva no Firebase
      const plantasRef = ref(database, `plantas/${user.uid}`);
      await push(plantasRef, novaPlanta);

      alert('Planta criada com sucesso!');
      navigate('/plantas');
    } catch (error) {
      console.error('Erro ao criar planta:', error);
      alert('Erro ao criar planta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate('/plantas');
  };

  return (
    <div className="adicionar-planta-container">
      <div className="adicionar-planta-content">
        <button onClick={handleVoltar} className="back-button">
          ← Voltar
        </button>
        
        <header className="form-header">
          <h1>Nova Planta</h1>
          <p>Preencha os dados da sua nova planta</p>
        </header>

        <form onSubmit={handleSubmit} className="planta-form">
          <div className="form-group">
            <label htmlFor="nome">Nome da Planta *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Suculenta, Orquídea, Tomate..."
              maxLength={50}
            />
            <small>Máximo 50 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Planta *</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="Suculenta">Suculenta</option>
              <option value="Orquídea">Orquídea</option>
              <option value="Tomate">Tomate</option>
              <option value="Alface">Alface</option>
              <option value="Manjericão">Manjericão</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição (Opcional)</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              placeholder="Descreva sua planta, características, etc..."
              maxLength={200}
            />
            <small>{formData.descricao.length}/200 caracteres</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="temperatura">Temperatura Ideal</label>
              <select
                id="temperatura"
                name="temperatura"
                value={formData.temperatura}
                onChange={handleChange}
              >
                <option value="15-20°C">15-20°C</option>
                <option value="20-25°C">20-25°C</option>
                <option value="25-30°C">25-30°C</option>
                <option value="Acima de 30°C">Acima de 30°C</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="luminosidade">Luminosidade</label>
              <select
                id="luminosidade"
                name="luminosidade"
                value={formData.luminosidade}
                onChange={handleChange}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rega">Frequência de Rega</label>
              <select
                id="rega"
                name="rega"
                value={formData.rega}
                onChange={handleChange}
              >
                <option value="Diariamente">Diariamente</option>
                <option value="2 vezes por semana">2 vezes por semana</option>
                <option value="Semanalmente">Semanalmente</option>
                <option value="Quinzenalmente">Quinzenalmente</option>
                <option value="Mensalmente">Mensalmente</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dificuldade">Dificuldade de Cultivo</label>
              <select
                id="dificuldade"
                name="dificuldade"
                value={formData.dificuldade}
                onChange={handleChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleVoltar} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" disabled={loading || !formData.nome || !formData.tipo} className="submit-button">
              {loading ? 'Criando...' : 'Criar Planta'}
            </button>
          </div>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}