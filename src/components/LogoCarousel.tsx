const LogoCarousel = () => {
  // Array de logos de parceiros fictícios
  const logos = [
    { name: 'Parceiro 1', text: 'PAPELARIA+' },
    { name: 'Parceiro 2', text: 'ESCOLA PRO' },
    { name: 'Parceiro 3', text: 'ESCRITÓRIO PLUS' },
    { name: 'Parceiro 4', text: 'CRIATIVA' },
    { name: 'Parceiro 5', text: 'ARTE & CIA' },
    { name: 'Parceiro 6', text: 'PAPEL & LUZ' },
    { name: 'Parceiro 7', text: 'NOVA ERA' },
    { name: 'Parceiro 8', text: 'DESIGN SHOP' }
  ];

  // Duplicar logos para efeito infinito seamless
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative py-12 bg-gradient-to-r from-white via-gray-50 to-white overflow-hidden">
      {/* Fade nas bordas */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="mb-8">
        <p className="text-center text-sm font-semibold text-gray-500 tracking-wide uppercase">
          Confiado por centenas de lojistas em todo Brasil
        </p>
      </div>

      {/* Carrossel infinito */}
      <div className="relative">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 px-6 py-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-xl font-bold bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent whitespace-nowrap">
                {logo.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
