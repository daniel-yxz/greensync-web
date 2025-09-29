import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import './ALterarSenha.css';

export function AlterarSenha() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Usuário não autenticado.');
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.novaSenha.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(user.email!, formData.senhaAtual);
      await reauthenticateWithCredential(user, credential);

      // Atualizar a senha
      await updatePassword(user, formData.novaSenha);

      alert('Senha alterada com sucesso!');
      navigate(-1);
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      if (error.code === 'auth/wrong-password') {
        setError('Senha atual incorreta.');
      } else if (error.code === 'auth/requires-recent-login') {
        setError('Esta operação requer que você faça login recentemente. Por favor, faça login novamente.');
      } else {
        setError('Erro ao alterar senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="alterar-senha-container">
      <div className="alterar-senha-content">
        <button onClick={handleVoltar} className="back-button">
          ← Voltar
        </button>
        
        <h1>Alterar Senha</h1>
        
        <form onSubmit={handleSubmit} className="senha-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="senhaAtual">Senha Atual</label>
            <input
              type="password"
              id="senhaAtual"
              name="senhaAtual"
              value={formData.senhaAtual}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="novaSenha">Nova Senha</label>
            <input
              type="password"
              id="novaSenha"
              name="novaSenha"
              value={formData.novaSenha}
              onChange={handleChange}
              required
            />
            <small>A senha deve ter pelo menos 6 caracteres.</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>
      </div>
    </div>
  );
}