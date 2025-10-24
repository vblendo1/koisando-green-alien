/**
 * ═══════════════════════════════════════════════════════════════════
 * FLOATING PARTICLES - PARTÍCULAS FLUTUANTES DECORATIVAS
 * ═══════════════════════════════════════════════════════════════════
 *
 * Componente que cria bolinhas coloridas flutuando no fundo da página.
 * É puramente decorativo para adicionar movimento e vida à interface.
 *
 * FUNCIONAMENTO:
 * - Cria 20 partículas circulares
 * - Cada uma com posição, tamanho e timing aleatórios
 * - Flutuam para cima e para baixo infinitamente
 * - Cores roxo e azul (marca ONDA PRO)
 * - Semi-transparentes para não atrapalhar conteúdo
 *
 * ONDE É USADO:
 * - Na seção Hero (primeira seção da página)
 * - Como fundo sutil para dar sensação de movimento
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Este componente usa:
 * - Geração procedural (criar coisas aleatórias com código)
 * - Array.from() para criar múltiplos elementos
 * - Math.random() para valores aleatórios
 * - Framer Motion para animação infinita
 */

import { motion } from 'framer-motion';

/**
 * COMPONENTE FLOATING PARTICLES
 * ──────────────────────────────────────
 */
const FloatingParticles = () => {
  /**
   * CRIANDO ARRAY DE PARTÍCULAS
   * ────────────────────────────
   *
   * Array.from({ length: 20 }) cria um array com 20 posições.
   *
   * É o mesmo que:
   * const particles = [undefined, undefined, ..., undefined] // 20 vezes
   *
   * Usamos isso para fazer um .map() e criar 20 <div>s,
   * um para cada partícula.
   *
   * TÉCNICA:
   * Em vez de escrever 20x o mesmo código, usamos programação!
   * É chamado de "geração procedural" - deixar o código criar as coisas.
   */
  const particles = Array.from({ length: 20 });

  /**
   * RENDERIZAÇÃO
   * ────────────
   *
   * Container absoluto que não interfere no layout (pointer-events-none)
   */
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/*
        CLASSES DO CONTAINER:
        - absolute: Posicionamento absoluto (sai do fluxo normal)
        - inset-0: top, right, bottom, left = 0 (ocupa todo o pai)
        - overflow-hidden: Esconde partículas que saem fora
        - pointer-events-none: Não interfere em cliques/hover
          (usuário clica "através" das partículas)
      */}

      {/*
        MAPEAMENTO DE PARTÍCULAS
        ────────────────────────
        Para cada item do array particles, cria uma bolinha animada.
        O _ (underscore) significa "não vou usar esse valor".
      */}
      {particles.map((_, index) => {
        /**
         * VALORES ALEATÓRIOS PARA CADA PARTÍCULA
         * ───────────────────────────────────────
         *
         * Calculados DENTRO do .map() para serem diferentes
         * para cada partícula.
         *
         * IMPORTANTE:
         * Esses valores são calculados UMA VEZ quando o componente
         * é montado, e depois não mudam mais.
         */

        // Tamanho aleatório entre 2px e 8px
        // Math.random() retorna número entre 0 e 1
        // Math.random() * 6 = entre 0 e 6
        // Math.random() * 6 + 2 = entre 2 e 8
        const size = Math.random() * 6 + 2;

        // Duração da animação entre 10s e 30s
        const duration = Math.random() * 20 + 10;

        // Delay inicial entre 0s e 5s
        // Faz as partículas não começarem todas juntas
        const delay = Math.random() * 5;

        // Posição horizontal inicial (0% a 100% da largura)
        const initialX = Math.random() * 100;

        // Posição vertical inicial (0% a 100% da altura)
        const initialY = Math.random() * 100;

        /**
         * RENDERIZAÇÃO DE CADA PARTÍCULA
         * ───────────────────────────────
         */
        return (
          <motion.div
            /**
             * KEY - IDENTIFICADOR ÚNICO
             * React precisa de uma key única para cada item
             * em um .map() para saber qual é qual.
             */
            key={index}

            /**
             * CLASSE E ESTILO FIXO
             * ────────────────────
             * - absolute: Posicionamento absoluto
             * - rounded-full: Borda 100% arredondada = círculo perfeito
             */
            className="absolute rounded-full"

            /**
             * STYLE - ESTILOS DINÂMICOS
             * ──────────────────────────
             * Valores únicos para cada partícula
             */
            style={{
              // Tamanho da partícula (width e height iguais = círculo)
              width: size,
              height: size,

              // Posição inicial na tela (em porcentagem)
              left: `${initialX}%`,
              top: `${initialY}%`,

              /**
               * COR DA PARTÍCULA
               * ────────────────
               * Alterna entre roxo e azul usando index
               * index % 2 === 0 significa "número par"
               *
               * CORES:
               * - rgba(108, 37, 111, 0.4) = roxo com 40% opacidade
               * - rgba(0, 155, 172, 0.4) = azul com 40% opacidade
               *
               * Por que opacidade baixa?
               * Para as partículas serem sutis e não chamarem
               * muita atenção do conteúdo principal.
               */
              background: index % 2 === 0
                ? 'rgba(108, 37, 111, 0.4)'  // Partícula PAR = roxo
                : 'rgba(0, 155, 172, 0.4)',  // Partícula ÍMPAR = azul

              /**
               * BLUR - DESFOQUE
               * ───────────────
               * Deixa as bolinhas levemente desfocadas
               * para parecerem mais etéreas/sonhadoras
               */
              filter: 'blur(1px)',
            }}

            /**
             * ANIMATE - ANIMAÇÃO INFINITA
             * ───────────────────────────
             * Define como a partícula se move
             */
            animate={{
              /**
               * MOVIMENTO VERTICAL (Y)
               * Sobe 30px e volta
               * [0, -30, 0] = posição inicial → sobe 30px → volta
               */
              y: [0, -30, 0],

              /**
               * MOVIMENTO HORIZONTAL (X)
               * Se move um pouco pra esquerda/direita
               * Math.random() * 20 - 10 = entre -10 e 10
               */
              x: [0, Math.random() * 20 - 10, 0],

              /**
               * OPACIDADE
               * Fica mais e menos visível (efeito de "piscar" suave)
               * [0.3, 0.8, 0.3] = meio transparente → opaco → transparente
               */
              opacity: [0.3, 0.8, 0.3],

              /**
               * ESCALA (TAMANHO)
               * Cresce e diminui levemente
               * [1, 1.2, 1] = tamanho normal → 20% maior → normal
               */
              scale: [1, 1.2, 1],
            }}

            /**
             * TRANSITION - CONFIGURAÇÃO DA ANIMAÇÃO
             * ─────────────────────────────────────
             * Como a animação acontece
             */
            transition={{
              // Duração total de 1 ciclo completo (valor aleatório)
              duration,

              // Delay antes de começar (valor aleatório)
              // Evita que todas comecem juntas
              delay,

              // Repete infinitamente
              repeat: Infinity,

              // Curva suave (aceleração)
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * EXPORT DEFAULT
 * ──────────────
 * Exporta para ser usado no Hero.tsx
 */
export default FloatingParticles;
