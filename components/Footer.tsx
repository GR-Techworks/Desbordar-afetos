export default function Footer() {
  return (
    <footer className="bg-soft-text text-white/60 py-10 pb-8 text-center">
      <div className="max-w-[600px] mx-auto px-6">
        <div className="font-display text-[1.2rem] text-white mb-1">
          Ana Clara Reis
        </div>
        <div className="text-[0.85rem] opacity-50 mb-4">
          psicóloga, artista & pesquisadora · ateliê-clínico Desbordar Afetos
        </div>
        <div className="w-10 h-px bg-white/10 mx-auto my-4" />

        <div className="flex gap-3 justify-center align-center mt-3">
          <a
            href="mailto:desbordarafetos@gmail.com"
            className="text-white/30 no-underline text-[0.8rem] transition-colors duration-300 hover:text-white"
          >
            E-mail
          </a>
          <span className="text-white/30 text-[0.8rem]">·</span>
          <a
            href="https://www.instagram.com/desbordar_afetos/"
            className="text-white/30 no-underline text-[0.8rem] transition-colors duration-300 hover:text-white"
          >
            Instagram
          </a>
        </div>

        <div className="text-[0.75rem] opacity-40 mt-4">
          &copy; 2026 · Desbordar Afetos · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
