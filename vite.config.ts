/**
 * ═══════════════════════════════════════════════════════════════════
 * CONFIGURAÇÃO DO VITE - PROJETO ONDA PRO
 * ═══════════════════════════════════════════════════════════════════
 *
 * VITE é o bundler (empacotador) do projeto.
 * Ele pega todos os arquivos TypeScript, React, CSS e transforma
 * em código JavaScript otimizado que o navegador entende.
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Vite é tipo um "tradutor inteligente" que:
 * 1. Converte TypeScript → JavaScript
 * 2. Compila React (JSX) → JavaScript puro
 * 3. Processa CSS e otimiza imagens
 * 4. Cria um servidor de desenvolvimento super rápido
 * 5. Faz "Hot Module Replacement" (atualiza código sem recarregar página)
 *
 * COMPARAÇÃO:
 * - Vite = Ferramenta moderna, super rápida
 * - Webpack = Ferramenta antiga, mais lenta mas mais usada
 * - Vite usa ES Modules nativos do navegador = mais velocidade!
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

/**
 * defineConfig é uma função helper que dá autocomplete (IntelliSense)
 * enquanto você escreve as configurações. Muito útil!
 *
 * Documentação oficial: https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => ({
  /**
   * ═══════════════════════════════════════════════════════════════
   * PLUGINS - FUNCIONALIDADES EXTRAS
   * ═══════════════════════════════════════════════════════════════
   *
   * Plugins adicionam superpoderes ao Vite.
   * Cada plugin tem uma responsabilidade específica.
   */
  plugins: [
    /**
     * @vitejs/plugin-react
     * ────────────────────
     * Plugin oficial para React que:
     * - Compila JSX (aquele HTML dentro do JavaScript)
     * - Habilita Fast Refresh (atualiza componentes sem perder estado)
     * - Otimiza imports do React
     *
     * EXEMPLO DO QUE ELE FAZ:
     * Você escreve: <div>Olá</div>
     * Ele converte: React.createElement('div', null, 'Olá')
     */
    react(),
    /**
     * lovable-tagger (development only)
     * ────────────────────────────────
     * Enables Visual Edits feature in Lovable
     */
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  /**
   * ═══════════════════════════════════════════════════════════════
   * RESOLVE - COMO ENCONTRAR ARQUIVOS
   * ═══════════════════════════════════════════════════════════════
   *
   * Configurações de como o Vite resolve (encontra) módulos/arquivos
   */
  resolve: {
    /**
     * ALIAS - ATALHOS PARA IMPORTS
     * ────────────────────────────
     * Cria "apelidos" para caminhos longos.
     * Facilita MUITO os imports!
     *
     * SEM ALIAS (ruim):
     * import Button from '../../../components/ui/Button'
     *
     * COM ALIAS (bom):
     * import Button from '@/components/ui/Button'
     *
     * O '@' é mapeado para './src', então qualquer import com @
     * vai começar da pasta src automaticamente!
     *
     * COMO FUNCIONA:
     * path.resolve(__dirname, './src')
     * - __dirname = diretório atual (raiz do projeto)
     * - './src' = pasta src relativa ao diretório atual
     * - path.resolve = junta os dois e cria caminho absoluto
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  /**
   * ═══════════════════════════════════════════════════════════════
   * OPTIMIZE DEPS - OTIMIZAÇÃO DE DEPENDÊNCIAS
   * ═══════════════════════════════════════════════════════════════
   *
   * Controla como o Vite otimiza as bibliotecas do node_modules
   */
  optimizeDeps: {
    /**
     * EXCLUDE - NÃO OTIMIZAR ESTAS BIBLIOTECAS
     * ────────────────────────────────────────
     * Algumas bibliotecas já vêm otimizadas ou causam problemas
     * quando o Vite tenta otimizá-las.
     *
     * LUCIDE-REACT:
     * É uma biblioteca de ícones que já vem em formato ES Module.
     * Se o Vite tentar otimizar, pode causar problemas de build.
     * Por isso excluímos ela da otimização.
     *
     * QUANDO EXCLUIR UMA LIB:
     * - Quando já é ES Module nativo
     * - Quando causa erros de build
     * - Quando tem side effects importantes
     */
    exclude: ['lucide-react'],
  },

  /**
   * ═══════════════════════════════════════════════════════════════
   * SERVER - CONFIGURAÇÃO DO SERVIDOR DE DESENVOLVIMENTO
   * ═══════════════════════════════════════════════════════════════
   */
  server: {
    host: "::",
    /**
     * PORT - PORTA DO SERVIDOR
     * ────────────────────────
     * Define a porta 8080 para o servidor de desenvolvimento.
     * Necessário para integração com Lovable.
     */
    port: 8080,
  },

  /**
   * ═══════════════════════════════════════════════════════════════
   * OUTRAS CONFIGURAÇÕES POSSÍVEIS (não usadas aqui)
   * ═══════════════════════════════════════════════════════════════
   *
   * server: {
   *   port: 3000,           // Mudar porta do dev server
   *   open: true,           // Abrir navegador automaticamente
   * },
   *
   * build: {
   *   outDir: 'dist',       // Pasta de saída do build
   *   sourcemap: true,      // Gerar sourcemaps para debug
   * },
   *
   * base: '/meu-site/',     // Se hospedar em subpasta
   */
}));
