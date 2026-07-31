export default function Footer() {
  return (
    <footer className="bg-soft-text text-white/60 py-10 pb-8 text-center">
      <div className="max-w-[600px] mx-auto px-6">
        <div className="font-display text-[1.2rem] text-white mb-1">
          Desbordar Afetos
        </div>
        <div className="text-[0.85rem] opacity-50 mb-4">
          psicologia e arte · ateliê-clínico
        </div>
        <div className="w-10 h-px bg-white/10 mx-auto my-4" />
        <div className="flex gap-5 justify-center mt-3">
          {["Instagram", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/30 no-underline text-[0.8rem] transition-colors duration-300 hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-[0.75rem] opacity-40 mt-4">
          &copy; 2026 · Desbordar Afetos · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
