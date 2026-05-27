export interface NavigationLink {
    label: string;
    href: string;
}

export interface FooterSection{
    title: string;
    links: NavigationLink[];
}

export const HEADER_LINKS: NavigationLink[] = [
    { label: 'Home', href: '#'},
    { label: 'Produtos', href: '#'},
    { label: 'Contato', href: '#'},
];

export const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'Categorias',
        links: [
            { label: 'Hardware', href: '#'},
            { label: 'Periféricos', href: '#'},
            { label: 'Monitores', href: '#'},
            { label: 'Cadeiras Gamer', href: '#'},
        ]
    },
    {
        title: 'Suporte',
        links: [
            { label: 'Fale Conosco', href: '#'},
            { label: 'Políticas de Troca', href: '#'},
            { label: 'Envio e Entregas', href: '#'},
            { label: 'Minha Conta', href: '#'},
        ]
    }
];

export const FOOTER_CONTENT = {
  brandName: 'TECHSTORE',
  description: 'Sua loja de hardware e periféricos de alta performance. O melhor para o seu setup está aqui.',
  payment: {
    title: 'Pagamento',
    description: 'Aceitamos Pix, Boleto e Cartões de Crédito.',
    methods: ['PIX', 'VISA', 'MASTER', 'ELO'] // Adicionei ELO aqui para testar a facilidade de alteração!
  }
};