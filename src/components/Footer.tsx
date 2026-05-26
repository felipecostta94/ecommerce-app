import { FOOTER_SECTIONS, FOOTER_CONTENT } from '../constants/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sobre a Loja */}
          <div className="space-y-4">
            <h3 className="text-md font-bold tracking-wider text-zinc-900 uppercase">
              {FOOTER_CONTENT.brandName}
            </h3>
            <p className="text-sm text-zinc-500">
              {FOOTER_CONTENT.description}
            </p>
          </div>

          {/* Colunas de Links Dinâmicas */}
          {FOOTER_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-md font-bold tracking-wider text-zinc-900 uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-emerald-500 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Formas de Pagamento Dinâmicas baseadas nas constantes */}
          <div>
            <h3 className="text-md font-bold tracking-wider text-zinc-900 uppercase mb-4">
              {FOOTER_CONTENT.payment.title}
            </h3>
            <p className="text-sm text-zinc-500 mb-2">
              {FOOTER_CONTENT.payment.description}
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-500">
              {FOOTER_CONTENT.payment.methods.map((method, methodIndex) => (
                <span 
                  key={methodIndex} 
                  className="border border-zinc-300 rounded px-2 py-1 bg-white uppercase"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-400">
          <p>&copy; {currentYear} {FOOTER_CONTENT.brandName}. Todos os direitos reservados. Desenvolvido em React + TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}