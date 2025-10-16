export interface Buraco {
  id: string;
  autor: string;
  descricao: string;
  localizacao: string;
  latitude?: number;
  longitude?: number;
  foto?: string;
  timestamp: Date;
  likes: number;
}
