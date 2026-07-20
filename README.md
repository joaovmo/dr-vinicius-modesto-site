# Dr. Vinícius Modesto Lima — Site Institucional

Site de apresentação do cirurgião-dentista **Dr. Vinícius Modesto Lima** (CRO/SE 4850), em Aracaju/SE.
Página única, estática, construída sem frameworks e com foco em performance, acessibilidade e fidelidade à identidade visual da marca.

## Destaques

- **Zero dependências de runtime** — sem Bootstrap, jQuery ou bibliotecas de animação. Apenas HTML, CSS e JavaScript nativo.
- **Paleta restrita à marca** — todos os tokens de cor derivam do manual em `design/marca-vinicius-modesto.pdf`. Nenhuma cor fora da identidade, incluindo os botões de WhatsApp, que usam o verde-petróleo da marca no lugar do verde institucional do app.
- **Tema claro e escuro** — segue a preferência do sistema, com toggle manual persistido em `localStorage`. O logotipo troca para a versão branca e o mapa recebe filtro escuro. Sem flash branco ao carregar (o tema é aplicado por um script inline no `<head>`, antes da primeira pintura).
- **Contraste AA** — todos os pares de texto/fundo verificados contra a WCAG 2.1 em ambos os temas.
- **Imagens otimizadas** — logotipos redimensionados e comprimidos a partir dos originais de 8000 px; o site inteiro pesa cerca de 340 KB.
- **Acessibilidade** — navegação por teclado, `skip link`, foco visível, rótulos ARIA no menu e respeito a `prefers-reduced-motion`.
- **SEO local** — meta tags Open Graph, `canonical` e dados estruturados JSON-LD do tipo [`Dentist`](https://schema.org/Dentist).
- **Animações discretas** — revelação por `IntersectionObserver`, sem travar o scroll.

## Stack

| Camada | Escolha |
| --- | --- |
| Marcação | HTML5 semântico |
| Estilo | CSS moderno (custom properties, grid, `clamp()`) |
| Script | JavaScript ES2020, sem build |
| Tipografia | [Nunito](https://fonts.google.com/specimen/Nunito) (títulos) + [Manrope](https://fonts.google.com/specimen/Manrope) (texto) |
| Ícones | SVG inline, desenhados à mão em um `<symbol>` sprite |

## Estrutura

```
.
├── index.html                  Página única
├── assets/
│   ├── css/
│   │   ├── tokens.css          Design tokens (cores, tipografia, espaçamento)
│   │   ├── base.css            Reset, elementos base, utilitários
│   │   ├── components.css      Botões, cards, chips, steps, mapa
│   │   └── sections.css        Header, hero, sobre, serviços, CTA, footer
│   ├── js/
│   │   └── main.js             Menu, scrollspy, reveal, header sticky
│   └── img/
│       ├── brand/              Logotipos e favicons otimizados para web
│       └── og-card.jpg         Imagem de preview para redes sociais (1200×630)
├── design/                     Arquivos-fonte da marca (fora do versionamento)
├── .editorconfig
├── .gitignore
└── README.md
```

A pasta `design/` guarda os arquivos-fonte da identidade visual (`.ai`, o manual em PDF, os PNGs em resolução original e o retrato). Nada ali é usado em tempo de execução, e por serem acervo do cliente estão no `.gitignore` — existem apenas na cópia local de quem trabalha no projeto.

