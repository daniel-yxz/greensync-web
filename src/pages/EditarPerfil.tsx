import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';
import { ref, get, update } from 'firebase/database';
import './EditarPerfil.css';

export function EditarPerfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    biografia: '',
    imagem: ''
  });

  // Carrega os dados atuais do usuário
  useEffect(() => {
    const carregarPerfil = async () => {
      if (user) {
        try {
          const userRef = ref(database, `usuarios/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setFormData({
              nome: userData.nome || '',
              email: userData.email || user.email || '',
              biografia: userData.biografia || '',
              imagem: userData.imagem || ''
            });
          } else {
            // Se não existir no Realtime Database, usa os dados do Auth
            setFormData(prev => ({
              ...prev,
              nome: user.displayName || '',
              email: user.email || '',
              imagem: user.photoURL || ''
            }));
          }
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
        }
      }
    };

    carregarPerfil();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Atualiza o Realtime Database
      const userRef = ref(database, `usuarios/${user.uid}`);
      await update(userRef, {
        nome: formData.nome,
        biografia: formData.biografia,
        imagem: formData.imagem
        // Note: o email não atualizamos aqui porque é gerido pelo Auth
      });

      // Se o usuário quiser atualizar o email no Auth, teríamos que usar updateEmail
      // Mas isso requer reautenticação, então vamos deixar só o nome e a foto?
      // Vamos atualizar o displayName e photoURL no Auth também?
      // await updateProfile(user, {
      //   displayName: formData.nome,
      //   photoURL: formData.imagem
      // });

      alert('Perfil atualizado com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="editar-perfil-container">
      <div className="editar-perfil-content">
        <button onClick={handleVoltar} className="back-button">
          ← Voltar
        </button>
        
        <h1>Editar Perfil</h1>
        
        <form onSubmit={handleSubmit} className="perfil-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              title="O e-mail não pode ser alterado"
            />
            <small>O e-mail não pode ser alterado</small>
          </div>

          <div className="form-group">
            <label htmlFor="biografia">Biografia</label>
            <textarea
              id="biografia"
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagem">URL da Imagem de Perfil</label>
            <input
              type="url"
              id="imagem"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}