import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface HeroProps {
  onCTAClick: () => void;
}

const Hero = ({ onCTAClick }: HeroProps) => {
  const title = "Importadora de Materiais Escolares e de Escritório"
  const subtitle = {
    regular: "Venda hoje. Pague depois. ",
    gradient: "Até 60 dias pra lucrar antes de investir",
  }
  const description = "Produtos com até 200% de margem, frete grátis para todo Brasil e atendimento exclusivo. Transforme seu estoque em lucro com condições que cabem no seu bolso."
  const ctaText = "Quero meu Catálogo Exclusivo"

  return (
    <div className="relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute top-0 z-[0] h-screen w-screen bg-gradient-to-br from-purple-950/10 via-blue-950/10 to-purple-950/10" />
      
      {/* Blobs animados */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <section id="hero" className="relative max-w-full mx-auto z-1">
        <div className="max-w-screen-xl z-10 mx-auto px-4 pt-40 pb-20 gap-12 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-gray-600 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent border-[2px] border-black/5 rounded-3xl w-fit"
            >
              {title}
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl tracking-tighter font-bold mx-auto md:text-6xl"
            >
              <span className="bg-clip-text text-transparent bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)]">
                {subtitle.regular}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] animate-shimmer">
                {subtitle.gradient}
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-gray-600"
            >
              {description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
            >
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9e61a4_0%,#6c256f_50%,#009bac_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white text-xs font-medium backdrop-blur-3xl">
                  <motion.button
                    onClick={onCTAClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-[#9e61a4]/20 via-[#4dbdc6]/30 to-transparent text-gray-900 border-input border-[1px] hover:bg-gradient-to-tr hover:from-[#9e61a4]/30 hover:via-[#4dbdc6]/40 hover:to-transparent transition-all sm:w-auto py-4 px-10"
                  >
                    {ctaText}
                  </motion.button>
                </div>
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
