/**
 * ═══════════════════════════════════════════════════════════════════
 * SCROLL PROGRESS - BARRA DE PROGRESSO DE SCROLL
 * ═══════════════════════════════════════════════════════════════════
 *
 * Componente que mostra uma barra colorida no topo da página
 * indicando quanto o usuário já scrollou.
 *
 * FUNCIONAMENTO:
 * - Quando o usuário está no topo: barra tem largura 0%
 * - Conforme scrolla: barra vai crescendo
 * - Quando chega no final: barra tem largura 100%
 *
 * VISUAL:
 * - Barra fixa no topo da página (position: fixed)
 * - Altura de 1px (bem fininha)
 * - Gradiente roxo-azul (cores da marca ONDA PRO)
 * - Animação suave tipo "mola" (spring physics)
 *
 * PARA PROGRAMADORES JÚNIOR:
 * Este componente usa hooks avançados do Framer Motion:
 * - useScroll: pega informações sobre o scroll da página
 * - useSpring: adiciona física de mola na animação
 */

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * COMPONENTE SCROLL PROGRESS
 * ──────────────────────────────────────
 */
const ScrollProgress = () => {
  /**
   * HOOK useScroll - DETECTA POSIÇÃO DO SCROLL
   * ───────────────────────────────────────────
   *
   * Retorna um objeto com informações sobre o scroll.
   * scrollYProgress é o mais útil aqui.
   *
   * scrollYProgress:
   * - É um MotionValue (valor especial do Framer Motion)
   * - Vai de 0 a 1 (0% a 100%)
   * - 0 = topo da página
   * - 0.5 = metade da página
   * - 1 = final da página
   *
   * IMPORTANTE:
   * MotionValues são "reativos" - quando mudam, os componentes
   * que os usam se atualizam automaticamente!
   */
  const { scrollYProgress } = useScroll();

  /**
   * HOOK useSpring - ADICIONA FÍSICA DE MOLA
   * ─────────────────────────────────────────
   *
   * Pega o scrollYProgress e adiciona animação suave tipo "mola".
   * Ao invés da barra seguir o scroll instantaneamente,
   * ela "puxa" suavemente como uma mola esticando.
   *
   * CONFIGURAÇÕES:
   * - stiffness: 100 = rigidez da mola
   *   (maior = mais rápida, menor = mais lenta)
   * - damping: 30 = amortecimento
   *   (maior = para mais rápido, menor = oscila mais)
   * - restDelta: 0.001 = quando considerar que parou
   *   (quanto menor, mais preciso)
   *
   * PARA ENTENDER:
   * Imagine uma mola presa em uma parede:
   * - stiffness = quão "dura" é a mola
   * - damping = quão rápido ela para de balançar
   */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,   // Mola meio rígida
    damping: 30,      // Amortecimento médio
    restDelta: 0.001  // Precisão alta
  });

  /**
   * RENDERIZAÇÃO
   * ────────────
   *
   * motion.div é um <div> animável do Framer Motion.
   * Usamos CSS + style dinâmico para criar a barra.
   */
  return (
    <motion.div
      /**
       * CLASSES CSS
       * ───────────
       * - fixed: Fica fixo na tela (não scrolla)
       * - top-0 left-0 right-0: Gruda no topo ocupando toda largura
       * - h-1: Altura de 4px (0.25rem = 4px)
       * - bg-gradient-to-r: Gradiente da esquerda pra direita
       * - from-[#6c256f] via-[#8c4091] to-[#009bac]: Cores da marca
       * - origin-left: Ponto de origem da transformação é à esquerda
       *   (importante pro scaleX funcionar corretamente!)
       * - z-[100]: Z-index alto pra ficar acima de tudo
       */
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] origin-left z-[100]"

      /**
       * STYLE DINÂMICO
       * ──────────────
       * scaleX controla a largura da barra usando transform.
       *
       * COMO FUNCIONA:
       * - scaleX: 0 = largura 0% (invisível)
       * - scaleX: 0.5 = largura 50%
       * - scaleX: 1 = largura 100%
       *
       * Como origin-left está ativo, a barra cresce da esquerda
       * pra direita, mantendo a esquerda sempre no mesmo lugar.
       *
       * POR QUE USAR SCALEX E NÃO WIDTH?
       * - scaleX usa GPU (Graphics Processing Unit)
       * - É muito mais performático que animar width
       * - Cria animações super suaves sem travamentos
       * - É uma técnica profissional de otimização!
       */
      style={{ scaleX }}
    />
  );
};

/**
 * EXPORT DEFAULT
 * ──────────────
 * Exporta para ser usado no App.tsx
 */
export default ScrollProgress;
