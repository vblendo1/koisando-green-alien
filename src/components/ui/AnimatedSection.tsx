/**
 * ═══════════════════════════════════════════════════════════════════
 * ANIMATED SECTION - COMPONENTE REUTILIZÁVEL DE ANIMAÇÃO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Este componente é usado em TODA a aplicação para criar animações
 * suaves quando elementos aparecem na tela conforme o usuário scrolla.
 *
 * É um "wrapper" (embrulho) que você coloca ao redor de qualquer conteúdo
 * para fazer ele aparecer com animação.
 *
 * EXEMPLO DE USO:
 * <AnimatedSection>
 *   <h1>Este título vai aparecer animado!</h1>
 * </AnimatedSection>
 *
 * PARA PROGRAMADORES JÚNIOR:
 * - Este é um "componente de composição"
 * - Ele não tem visual próprio, só adiciona comportamento (animação)
 * - Usa o padrão "children" do React para envolver outro conteúdo
 * - Detecta quando entra na viewport (área visível da tela)
 */

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

/**
 * INTERFACE DE PROPS (TypeScript)
 * ────────────────────────────────
 *
 * Define quais props este componente aceita e seus tipos.
 * É como um "contrato" que diz o que pode ser passado.
 *
 * PROPS DISPONÍVEIS:
 * - children: O conteúdo que vai ser animado (obrigatório)
 * - className: Classes CSS extras (opcional)
 * - delay: Atraso antes da animação começar em segundos (opcional, padrão: 0)
 * - direction: Direção da animação (opcional, padrão: 'up')
 * - duration: Duração da animação em segundos (opcional, padrão: 0.6)
 */
interface AnimatedSectionProps {
  children: ReactNode;     // Qualquer coisa que o React pode renderizar
  className?: string;      // ? = opcional
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';  // Só aceita esses 4 valores
  duration?: number;
}

/**
 * COMPONENTE ANIMATED SECTION
 * ────────────────────────────────────────
 *
 * Recebe as props e aplica animação no children.
 *
 * COMO FUNCIONA:
 * 1. Observa quando o elemento entra na viewport
 * 2. Quando entrar, muda de "invisível" para "visível"
 * 3. Aplica animação de movimento suave
 */
const AnimatedSection = ({
  children,
  className = '',      // Valor padrão = string vazia
  delay = 0,           // Valor padrão = sem atraso
  direction = 'up',    // Valor padrão = vem de baixo pra cima
  duration = 0.6       // Valor padrão = 0.6 segundos
}: AnimatedSectionProps) => {
  /**
   * HOOK useInView - DETECÇÃO DE VISIBILIDADE
   * ──────────────────────────────────────────
   *
   * Hook da biblioteca 'react-intersection-observer'.
   * Detecta quando o elemento está visível na tela.
   *
   * RETORNA:
   * - ref: Referência que você coloca no elemento (como um "marcador")
   * - inView: true = elemento está visível | false = elemento não está visível
   *
   * CONFIGURAÇÕES:
   * - triggerOnce: true = anima só 1 vez (não anima toda vez que scrollar)
   * - threshold: 0.1 = considera visível quando 10% do elemento aparecer
   *
   * PARA ENTENDER:
   * É tipo um "sensor de movimento" que detecta quando o elemento
   * entra na "zona de visão" do navegador.
   */
  const [ref, inView] = useInView({
    triggerOnce: true,   // Anima apenas uma vez
    threshold: 0.1,      // 10% visível já dispara
  });

  /**
   * MAPEAMENTO DE DIREÇÕES
   * ──────────────────────
   *
   * Traduz a direção escolhida em valores de transform.
   * Define de onde o elemento "vem" antes de aparecer.
   *
   * EXPLICAÇÃO:
   * - up: vem de baixo (y: 40 = 40px pra baixo)
   * - down: vem de cima (y: -40 = 40px pra cima)
   * - left: vem da direita (x: 40 = 40px pra direita)
   * - right: vem da esquerda (x: -40 = 40px pra esquerda)
   *
   * Parece invertido? É porque estamos definindo ONDE ESTAVA,
   * não pra onde vai!
   */
  const directionOffset = {
    up: { y: 40, x: 0 },      // Estava 40px abaixo
    down: { y: -40, x: 0 },   // Estava 40px acima
    left: { x: 40, y: 0 },    // Estava 40px à direita
    right: { x: -40, y: 0 },  // Estava 40px à esquerda
  };

  /**
   * RENDERIZAÇÃO COM FRAMER MOTION
   * ───────────────────────────────
   *
   * motion.div é um <div> especial do Framer Motion
   * que pode ser animado facilmente.
   */
  return (
    <motion.div
      /**
       * REF - MARCADOR PARA DETECÇÃO
       * Conecta este elemento ao useInView
       * para saber quando está visível
       */
      ref={ref}

      /**
       * INITIAL - ESTADO INICIAL
       * Como o elemento começa (antes de entrar na tela)
       * - opacity: 0 = invisível
       * - ...directionOffset[direction] = posição deslocada
       *   (spread operator ... para adicionar x ou y)
       */
      initial={{
        opacity: 0,
        ...directionOffset[direction]
      }}

      /**
       * ANIMATE - ESTADO FINAL
       * Como o elemento fica quando visível
       *
       * CONDICIONAL:
       * inView ? { estado_visivel } : {}
       * Se inView = true → anima
       * Se inView = false → não faz nada
       */
      animate={inView ? {
        opacity: 1,  // Fica visível
        x: 0,        // Volta pra posição X original
        y: 0         // Volta pra posição Y original
      } : {}}

      /**
       * TRANSITION - CONFIGURAÇÃO DA ANIMAÇÃO
       * Como a animação acontece (timing e curva)
       *
       * - duration: quanto tempo leva (em segundos)
       * - delay: espera antes de começar (em segundos)
       * - ease: curva de aceleração
       *   [0.4, 0, 0.2, 1] = curva cubic-bezier suave
       *   (Material Design usa essa curva)
       */
      transition={{
        duration,                    // Usa a prop duration
        delay,                       // Usa a prop delay
        ease: [0.4, 0, 0.2, 1]      // Curva suave padrão
      }}

      /**
       * CLASSNAME - ESTILOS ADICIONAIS
       * Classes CSS que vêm de fora via props
       */
      className={className}
    >
      {/*
        CHILDREN - CONTEÚDO INTERNO
        ───────────────────────────
        Renderiza tudo que foi passado dentro do componente.

        EXEMPLO:
        <AnimatedSection>
          <h1>Oi</h1>  ← Este h1 é o children
        </AnimatedSection>
      */}
      {children}
    </motion.div>
  );
};

/**
 * EXPORT DEFAULT
 * ──────────────
 * Exporta para ser usado em outros componentes
 */
export default AnimatedSection;
