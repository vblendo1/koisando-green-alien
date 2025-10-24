/**
 * ═══════════════════════════════════════════════════════════════════
 * MAIN.TSX - PONTO DE ENTRADA DA APLICAÇÃO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Este é o PRIMEIRO arquivo que roda quando o site abre.
 * É aqui que a aplicação React "nasce" e é inserida no HTML.
 *
 * FLUXO:
 * 1. Navegador carrega index.html
 * 2. index.html chama este arquivo (main.tsx)
 * 3. Este arquivo "monta" o React no elemento #root
 * 4. O componente App é renderizado dentro do #root
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Pense neste arquivo como a "ignição" do carro.
 * Sem ele, nada acontece!
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * CRIANDO A RAIZ DA APLICAÇÃO REACT
 * ────────────────────────────────────
 *
 * 1. document.getElementById('root')
 *    Busca no HTML o elemento com id="root"
 *    Esse elemento está no arquivo index.html
 *
 * 2. createRoot(...)
 *    Cria uma "raiz" React 18 (nova API)
 *    A raiz é onde o React vai "viver" na página
 *
 * 3. .render(...)
 *    Renderiza (desenha) nossos componentes React
 *
 * O '!' após getElementById significa:
 *    "Eu tenho certeza que esse elemento existe!"
 *    É uma feature do TypeScript para evitar erros de null
 */
createRoot(document.getElementById('root')!).render(
  /**
   * STRICT MODE - MODO ESTRITO
   * ──────────────────────────
   * StrictMode é um componente do React que:
   * - Detecta problemas no código durante desenvolvimento
   * - Avisa sobre práticas ruins ou deprecated
   * - Roda alguns efeitos 2x para encontrar bugs
   *
   * IMPORTANTE:
   * - Só funciona em desenvolvimento (modo dev)
   * - Não aparece na build de produção
   * - Não quebra nada, só ajuda a escrever código melhor
   */
  <StrictMode>
    {/*
      Componente principal da aplicação.
      Todo o site está dentro dele!
    */}
    <App />
  </StrictMode>
);
