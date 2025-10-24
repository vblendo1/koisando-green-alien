/**
 * ═══════════════════════════════════════════════════════════════════
 * CONFIGURAÇÃO DO TAILWIND CSS - PROJETO ONDA PRO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Este arquivo é o coração da estilização visual do projeto.
 * Aqui definimos:
 * - Cores da marca (roxo e azul)
 * - Animações personalizadas
 * - Keyframes para efeitos especiais
 * - Configurações de blur e timing
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Tailwind CSS é um framework que permite estilizar componentes
 * usando classes direto no HTML/JSX, sem escrever CSS separado.
 * Ex: <div className="bg-onda-purple-400 animate-float">
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  /**
   * CONTENT - Onde o Tailwind procura classes CSS
   * ────────────────────────────────────────────
   * O Tailwind escaneia estes arquivos para ver quais classes você usa.
   * Ele só inclui no CSS final as classes que realmente estão sendo usadas.
   * Isso mantém o arquivo CSS pequeno e rápido! (técnica chamada "tree-shaking")
   */
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    /**
     * ═══════════════════════════════════════════════════════════════
     * BREAKPOINTS CUSTOMIZADOS - RESPONSIVIDADE
     * ═══════════════════════════════════════════════════════════════
     *
     * Breakpoints seguindo especificações Elementor/WordPress
     * para garantir experiência mobile-first perfeita.
     *
     * ORDEM DE PRIORIDADE (mobile-first):
     * 1. Mobile: até 767px (PRIORIDADE MÁXIMA)
     * 2. Tablet: 768px - 1024px
     * 3. Notebook: 1025px - 1366px
     * 4. Desktop: 1367px - 2399px
     * 5. Widescreen: 2400px+
     *
     * COMO USAR:
     * - Escreva estilos mobile PRIMEIRO (padrão)
     * - Use md: para tablet e acima
     * - Use lg: para desktop e acima
     * - Use xl: para notebook grande
     * - Use 2xl: para widescreen
     *
     * EXEMPLO:
     * <div className="text-sm md:text-base lg:text-lg">
     *   Mobile: 14px, Tablet+: 16px, Desktop+: 18px
     * </div>
     */
    screens: {
      // Mobile: até 767px (estilo padrão, sem prefixo)
      'sm': '640px',   // Small devices
      'md': '768px',   // Tablet portrait (768px+)
      'lg': '1025px',  // Tablet landscape / Desktop (1025px+)
      'xl': '1367px',  // Notebook large (1367px+)
      '2xl': '2400px', // Widescreen (2400px+)
    },

    extend: {
      /**
       * ═══════════════════════════════════════════════════════════════
       * CORES PERSONALIZADAS DA MARCA ONDA PRO
       * ═══════════════════════════════════════════════════════════════
       *
       * Definimos duas paletas principais seguindo a identidade visual:
       *
       * 1. ONDA-PURPLE (Roxo) - Cor primária da marca
       *    - 50: Roxo muito claro (para backgrounds sutis)
       *    - 100: Roxo claro (hover states, borders suaves)
       *    - 200: Roxo médio
       *    - 300: Roxo médio-escuro
       *    - 400: Roxo escuro (COR PRINCIPAL #6c256f)
       *
       * 2. ONDA-BLUE (Azul/Ciano) - Cor secundária
       *    - 50: Azul muito claro
       *    - 100: Azul claro
       *    - 200: Azul médio
       *    - 300: Azul médio-escuro
       *    - 400: Azul escuro (COR SECUNDÁRIA #009bac)
       *
       * COMO USAR:
       * - Texto: text-onda-purple-400
       * - Background: bg-onda-blue-300
       * - Border: border-onda-purple-200
       * - Gradiente: from-onda-purple-400 to-onda-blue-400
       */
      colors: {
        'onda-purple': {
          50: '#f5ebf7',   // Lilás suave
          100: '#dbbfdd',  // Lavanda
          200: '#9e61a4',  // Roxo médio
          300: '#8c4091',  // Roxo intenso
          400: '#6c256f',  // Roxo escuro da marca
        },
        'onda-blue': {
          50: '#e6f7f9',   // Azul céu
          100: '#96d3dd',  // Azul suave
          200: '#77c8d2',  // Turquesa claro
          300: '#4dbdc6',  // Ciano
          400: '#009bac',  // Azul petróleo da marca
        },
      },

      /**
       * ═══════════════════════════════════════════════════════════════
       * ANIMAÇÕES PERSONALIZADAS
       * ═══════════════════════════════════════════════════════════════
       *
       * Criamos animações customizadas para dar vida ao site.
       * Cada animação tem um nome e referencia um keyframe definido abaixo.
       *
       * COMO USAR:
       * <div className="animate-float"> - elemento vai flutuar
       * <div className="animate-shimmer"> - efeito de brilho
       *
       * EXPLICAÇÃO DOS PARÂMETROS:
       * - Primeiro valor: nome do keyframe (definido mais abaixo)
       * - Segundo: duração (3s = 3 segundos)
       * - Terceiro: timing (linear = velocidade constante, ease-in-out = suave)
       * - Quarto: infinite = repete infinitamente
       */
      animation: {
        // Rotações em velocidades diferentes
        'spin-slow': 'spin 3s linear infinite',      // Gira devagar
        'spin-slower': 'spin 8s linear infinite',    // Gira muito devagar

        // Flutuações (efeito de levitação)
        'float': 'float 6s ease-in-out infinite',           // Flutua normalmente
        'float-delayed': 'float 6s ease-in-out 3s infinite', // Flutua com delay de 3s

        // Pulsos e brilhos
        'pulse-slow': 'pulse 3s ease-in-out infinite',   // Pulsa devagar
        'shimmer': 'shimmer 2s linear infinite',         // Efeito de brilho
        'glow': 'glow 2s ease-in-out infinite alternate', // Brilho alternado

        // Deslizamentos (para carrosséis de logos)
        'slide-left': 'slideLeft 30s linear infinite',   // Desliza para esquerda
        'slide-right': 'slideRight 30s linear infinite', // Desliza para direita

        // Movimentos sutis
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite', // Pula suavemente
        'scale-pulse': 'scalePulse 3s ease-in-out infinite',     // Aumenta e diminui
      },

      /**
       * ═══════════════════════════════════════════════════════════════
       * KEYFRAMES - DEFINIÇÃO DAS ANIMAÇÕES
       * ═══════════════════════════════════════════════════════════════
       *
       * Aqui definimos COMO cada animação se comporta, quadro a quadro.
       * Keyframes são como os "passos" da animação.
       *
       * ANATOMIA DE UM KEYFRAME:
       * - '0%' ou '0%, 100%': Estado inicial (e final)
       * - '50%': Estado no meio da animação
       * - transform: Como o elemento se move/transforma
       * - boxShadow: Como a sombra muda
       *
       * PARA ENTENDER TRANSFORM:
       * - translateY(-20px): Move 20px para cima
       * - translateX(-50%): Move 50% da largura para esquerda
       * - scale(1.05): Aumenta 5% o tamanho
       */
      keyframes: {
        /**
         * FLOAT - Efeito de flutuação/levitação
         * Faz o elemento subir e descer suavemente
         */
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },   // Posição normal
          '50%': { transform: 'translateY(-20px)' },      // Sobe 20px
        },

        /**
         * SHIMMER - Efeito de brilho deslizante
         * Uma luz passa da esquerda para direita no elemento
         * Muito usado em botões para chamar atenção
         */
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },   // Começa fora à esquerda
          '100%': { transform: 'translateX(100%)' },  // Termina fora à direita
        },

        /**
         * SLIDE LEFT/RIGHT - Deslizamento infinito
         * Usado para carrosséis de logos que nunca param
         * O truque é duplicar o conteúdo para parecer infinito
         */
        slideLeft: {
          '0%': { transform: 'translateX(0)' },      // Posição inicial
          '100%': { transform: 'translateX(-50%)' }, // Move metade para esquerda
        },
        slideRight: {
          '0%': { transform: 'translateX(-50%)' },   // Começa no meio
          '100%': { transform: 'translateX(0)' },    // Volta ao início
        },

        /**
         * GLOW - Efeito de brilho pulsante
         * A sombra do elemento aumenta e diminui criando efeito de "respiração"
         * Usa as cores da marca (roxo e azul)
         */
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(108, 37, 111, 0.5), 0 0 10px rgba(0, 155, 172, 0.3)'
          },
          '100%': {
            boxShadow: '0 0 20px rgba(108, 37, 111, 0.8), 0 0 30px rgba(0, 155, 172, 0.6)'
          },
        },

        /**
         * BOUNCE SUBTLE - Pulo suave
         * Elemento sobe um pouco e volta (como um pulo leve)
         * Mais sutil que o bounce padrão do Tailwind
         */
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },    // Posição normal
          '50%': { transform: 'translateY(-10px)' },     // Sobe 10px
        },

        /**
         * SCALE PULSE - Pulso de escala
         * Elemento aumenta e diminui ligeiramente
         * Cria efeito de "respiração" ou "batida"
         */
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },      // Tamanho normal
          '50%': { transform: 'scale(1.05)' },        // 5% maior
        },
      },

      /**
       * ═══════════════════════════════════════════════════════════════
       * BACKDROP BLUR - EFEITOS DE DESFOQUE DE FUNDO
       * ═══════════════════════════════════════════════════════════════
       *
       * Adiciona variações extras de blur (desfoque).
       * Usado em overlays, modais e elementos com efeito "glass"
       *
       * COMO USAR:
       * backdrop-blur-xs = desfoque muito sutil (2px)
       */
      backdropBlur: {
        xs: '2px',  // Blur extra pequeno
      },

      /**
       * ═══════════════════════════════════════════════════════════════
       * TRANSITION TIMING FUNCTIONS - CURVAS DE ANIMAÇÃO
       * ═══════════════════════════════════════════════════════════════
       *
       * Define como as transições aceleram/desaceleram.
       * São curvas de Bézier que controlam a "sensação" da animação.
       *
       * BOUNCE-IN: Animação com "quique" no final
       *   - Vai rápido e ultrapassa um pouco o destino, depois volta
       *   - Perfeito para botões e elementos que "aparecem"
       *
       * SMOOTH: Transição suave e natural
       *   - Material Design usa essa curva
       *   - Começa devagar, acelera, desacelera no final
       *
       * COMO USAR:
       * transition ease-bounce-in duration-300
       * transition ease-smooth duration-500
       */
      transitionTimingFunction: {
        // Cubic-bezier define 4 pontos que criam a curva da animação
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce elástico
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',              // Suave Material Design
      },

      /**
       * ═══════════════════════════════════════════════════════════════
       * SPACING RESPONSIVO - PADDINGS E MARGENS OTIMIZADOS
       * ═══════════════════════════════════════════════════════════════
       *
       * Espaçamentos customizados para diferentes tamanhos de tela.
       * Seguindo padrão Elementor/WordPress.
       *
       * SEÇÕES:
       * - section-mobile: 60px (mobile)
       * - section-tablet: 80px (tablet)
       * - section-desktop: 100px (desktop)
       *
       * COMO USAR:
       * <section className="py-section-mobile md:py-section-tablet lg:py-section-desktop">
       */
      spacing: {
        'section-mobile': '60px',   // Padding vertical seções mobile
        'section-tablet': '80px',   // Padding vertical seções tablet
        'section-desktop': '100px', // Padding vertical seções desktop
      },
    },
  },

  /**
   * ═══════════════════════════════════════════════════════════════
   * PLUGINS
   * ═══════════════════════════════════════════════════════════════
   *
   * Aqui você pode adicionar plugins do Tailwind para funcionalidades extras.
   * Exemplos comuns:
   * - @tailwindcss/forms: Estilos bonitos para formulários
   * - @tailwindcss/typography: Textos formatados
   * - @tailwindcss/aspect-ratio: Proporções de imagem
   *
   * Por enquanto não usamos nenhum plugin adicional.
   */
  plugins: [],
};
