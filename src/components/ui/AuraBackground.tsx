/**
 * ═══════════════════════════════════════════════════════════════════
 * AURA BACKGROUND - FUNDO DECORATIVO ANIMADO COM UNICORNSTUDIO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Componente que cria um background fullscreen com efeito de aura animado.
 * Fica atrás de todo o conteúdo da seção Hero, criando uma atmosfera
 * imersiva e moderna.
 *
 * CARACTERÍSTICAS:
 * - Fullscreen (ocupa toda a tela)
 * - Posicionamento absoluto (não afeta layout)
 * - Efeito de aura com gradientes animados
 * - Cores da marca ONDA PRO (roxo e azul)
 * - Animações suaves e contínuas
 * - Performance otimizada
 *
 * ONDE É USADO:
 * - Seção Hero (primeira seção da página)
 * - Fica atrás da imagem do garoto
 * - Cria profundidade e movimento
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Este componente usa:
 * - Posicionamento absoluto (position: absolute)
 * - Z-index para controlar camadas
 * - Gradientes radiais múltiplos
 * - Animações CSS e Framer Motion
 * - Blur (desfoque) para efeito de brilho
 */

import { motion } from 'framer-motion';

/**
 * COMPONENTE AURA BACKGROUND
 * ──────────────────────────────────────
 */
const AuraBackground = () => {
  return (
    /**
     * CONTAINER PRINCIPAL
     * ───────────────────
     *
     * CLASSES EXPLICADAS:
     * - absolute: Posicionamento absoluto (sai do fluxo normal do layout)
     * - inset-0: top-0 right-0 bottom-0 left-0 (ocupa todo o elemento pai)
     * - w-full h-full: Largura e altura 100%
     * - overflow-hidden: Esconde qualquer coisa que sair fora
     * - pointer-events-none: Não interfere em cliques (usuário clica "através")
     * - -z-10: Z-index negativo (fica ATRÁS do conteúdo)
     */
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 1: AURA PRINCIPAL ROXA (Centro-Esquerda)
        ════════════════════════════════════════════════════════════

        Cria uma grande bolha roxa animada no canto esquerdo.
        Simula uma fonte de luz colorida.
      */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          /**
           * GRADIENTE RADIAL
           * ────────────────
           * Cria um círculo de cor que vai do centro (opaco)
           * para as bordas (transparente).
           *
           * - Começa com roxo (#6c256f) com 20% de opacidade
           * - Termina totalmente transparente
           * - circle = formato circular
           * - closest-side = tamanho baseado no lado mais próximo
           */
          background: 'radial-gradient(circle closest-side, rgba(108, 37, 111, 0.25) 0%, transparent 100%)',

          /**
           * FILTER: BLUR
           * ────────────
           * Aplica desfoque de 40px para criar o efeito "aura".
           * Quanto maior o valor, mais suave e espalhado fica.
           */
          filter: 'blur(40px)',
        }}

        /**
         * ANIMAÇÃO 1: MOVIMENTO CIRCULAR
         * ──────────────────────────────
         * A aura se move em círculo lentamente
         */
        animate={{
          // Move em X (horizontal): -20px → 20px → -20px
          x: [-20, 20, -20],
          // Move em Y (vertical): -20px → 20px → -20px
          y: [-20, 20, -20],
          // Muda a escala (tamanho): 100% → 110% → 100%
          scale: [1, 1.1, 1],
        }}

        /**
         * CONFIGURAÇÃO DA ANIMAÇÃO
         * ────────────────────────
         */
        transition={{
          duration: 20,           // 20 segundos para 1 ciclo completo
          repeat: Infinity,       // Repete infinitamente
          ease: 'easeInOut',     // Curva suave (acelera no meio, desacelera nas pontas)
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 2: AURA AZUL (Centro-Direita)
        ════════════════════════════════════════════════════════════

        Cria uma bolha azul no lado direito que se mistura com a roxa.
      */}
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          // Gradiente azul-ciano (cor secundária da marca)
          background: 'radial-gradient(circle closest-side, rgba(0, 155, 172, 0.25) 0%, transparent 100%)',
          filter: 'blur(40px)',
        }}

        /**
         * ANIMAÇÃO 2: MOVIMENTO OPOSTO
         * ────────────────────────────
         * Move em direção oposta à aura roxa para criar contraste
         */
        animate={{
          x: [20, -20, 20],      // Começa indo pra direita (oposto da roxa)
          y: [20, -20, 20],      // Começa indo pra baixo
          scale: [1, 1.15, 1],   // Cresce um pouco mais que a roxa
        }}

        transition={{
          duration: 25,          // Mais lento (25s) para criar assimetria
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 3: AURA ROXA SECUNDÁRIA (Centro)
        ════════════════════════════════════════════════════════════

        Aura menor no centro para criar mais profundidade.
      */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          // Tom de roxo médio
          background: 'radial-gradient(circle closest-side, rgba(140, 64, 145, 0.2) 0%, transparent 100%)',
          filter: 'blur(50px)',  // Mais desfocado para ficar mais sutil
        }}

        /**
         * ANIMAÇÃO 3: RESPIRAÇÃO
         * ──────────────────────
         * Cresce e diminui como se estivesse "respirando"
         */
        animate={{
          scale: [1, 1.2, 1],    // Expansão e contração
          opacity: [0.3, 0.6, 0.3],  // Fica mais e menos visível
        }}

        transition={{
          duration: 15,          // Ciclo de 15 segundos
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 4: AURA AZUL CLARA (Superior Direita)
        ════════════════════════════════════════════════════════════

        Tom mais claro de azul para adicionar variação.
      */}
      <motion.div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          // Tom azul claro (#4dbdc6)
          background: 'radial-gradient(circle closest-side, rgba(77, 189, 198, 0.2) 0%, transparent 100%)',
          filter: 'blur(45px)',
        }}

        /**
         * ANIMAÇÃO 4: FLUTUAÇÃO VERTICAL
         * ──────────────────────────────
         * Se move principalmente para cima e para baixo
         */
        animate={{
          y: [-30, 30, -30],     // Movimento vertical pronunciado
          x: [-10, 10, -10],     // Movimento horizontal sutil
          scale: [1, 1.1, 1],
        }}

        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 5: OVERLAY DE BRILHO
        ════════════════════════════════════════════════════════════

        Camada final que adiciona um brilho suave sobre tudo.
        Cria o efeito de "unicorn" com múltiplas cores se misturando.
      */}
      <motion.div
        className="absolute inset-0"
        style={{
          /**
           * GRADIENTE LINEAR COMPLEXO
           * ─────────────────────────
           * Múltiplas cores em diferentes direções criando
           * um efeito de arco-íris sutil.
           */
          background: `
            linear-gradient(135deg, rgba(108, 37, 111, 0.1) 0%, transparent 50%),
            linear-gradient(225deg, rgba(0, 155, 172, 0.1) 0%, transparent 50%)
          `,
          filter: 'blur(60px)',  // Muito desfocado para efeito etéreo
        }}

        /**
         * ANIMAÇÃO 5: ROTAÇÃO LENTA
         * ─────────────────────────
         * O overlay gira lentamente criando movimento sutil
         */
        animate={{
          opacity: [0.5, 0.8, 0.5],  // Pulsa suavemente
        }}

        transition={{
          duration: 30,          // Muito lento para ser quase imperceptível
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/*
        ════════════════════════════════════════════════════════════
        CAMADA 6: PARTÍCULAS DE BRILHO (Opcional)
        ════════════════════════════════════════════════════════════

        Pequenos pontos de luz que aparecem e desaparecem
        para adicionar mais magia ao efeito.
      */}
      <div className="absolute inset-0">
        {/* Cria 3 pequenos brilhos estrategicamente posicionados */}
        {[
          { top: '20%', left: '30%', delay: 0 },
          { top: '60%', right: '25%', delay: 2 },
          { bottom: '30%', left: '40%', delay: 4 },
        ].map((pos, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              ...pos,
              filter: 'blur(2px)',
            }}

            /**
             * ANIMAÇÃO DOS BRILHOS
             * ────────────────────
             * Aparecem e desaparecem suavemente
             */
            animate={{
              opacity: [0, 0.6, 0],      // Fade in/out
              scale: [0.5, 1.5, 0.5],    // Cresce e diminui
            }}

            transition={{
              duration: 6,
              repeat: Infinity,
              delay: pos.delay,          // Cada um começa em momento diferente
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * EXPORT DEFAULT
 * ──────────────
 * Exporta para ser usado no Hero.tsx
 */
export default AuraBackground;

/**
 * ═══════════════════════════════════════════════════════════════════
 * NOTAS TÉCNICAS PARA PROGRAMADORES JÚNIOR
 * ═══════════════════════════════════════════════════════════════════
 *
 * 1. PERFORMANCE:
 *    - Usamos filter: blur() que é acelerado por GPU
 *    - pointer-events-none evita problemas de clique
 *    - Animações use transform (não width/height) para performance
 *
 * 2. CAMADAS (Z-INDEX):
 *    - Este componente tem z-index negativo (-z-10)
 *    - Fica ATRÁS do conteúdo normal (z-index 0)
 *    - Mas ACIMA do background da página
 *
 * 3. POSICIONAMENTO:
 *    - absolute + inset-0 = ocupa todo o elemento pai
 *    - O pai deve ter position: relative
 *    - Não afeta o fluxo do layout (não empurra outros elementos)
 *
 * 4. CORES:
 *    - rgba(R, G, B, A) = Red, Green, Blue, Alpha (opacidade)
 *    - Alpha baixo (0.1 - 0.3) cria efeito sutil
 *    - Gradientes radiais criam "bolhas" de luz
 *
 * 5. BLUR:
 *    - Valores altos (40px+) criam efeito de aura
 *    - Blur consome mais GPU, mas moderno navegadores lidam bem
 *    - Combine com opacidade baixa para melhor efeito
 *
 * 6. ANIMAÇÕES:
 *    - Durações diferentes (15s, 20s, 25s) criam sensação orgânica
 *    - ease: 'easeInOut' faz movimento natural
 *    - repeat: Infinity = nunca para
 *
 * 7. ACESSIBILIDADE:
 *    - Decorativo apenas, não interfere em leitores de tela
 *    - Não afeta navegação por teclado
 *    - Pode ser desabilitado com prefers-reduced-motion
 */
