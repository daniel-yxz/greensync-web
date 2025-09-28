export interface Usuario {
  uid: string;
  nome: string;
  email: string;
  dataCriacao: string;
  ultimoLogin: string;
  imagem?: string;
  biografia?: string;
}

export interface Planta {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  imagem?: string;
  temperatura: string;
  luminosidade: string;
  rega: string;
  dificuldade: string;
  estufaId?: string;
  usuarioId: string;
  dataCriacao: string;
}

export interface Estufa {
  id: string;
  nome: string;
  localizacao: string;
  descricao?: string;
  imagem?: string;
  plantas: number;
  temperatura: number;
  umidade: number;
  usuarioId: string;
  dataCriacao: string;
  sensores: {
    temperatura: { status: string; valor: number };
    umidadeAr: { status: string; valor: number };
    umidadeSolo: { status: string; valor: number };
    iluminacao: { status: string; valor: boolean };
  };
}

export interface Estatisticas {
  totalPlantas: number;
  totalEstufas: number;
  taxaSucesso: number;
  plantasPorTipo: { [key: string]: number };
}