# Dr. Vinícius Modesto Lima — Site Institucional

Site de apresentação do cirurgião-dentista **Dr. Vinícius Modesto Lima** (CRO/SE 4850), em Aracaju/SE.
Página única, estática, construída sem frameworks e com foco em performance, acessibilidade e fidelidade à identidade visual da marca.

## Sumário

- [Destaques](#destaques)
- [Stack](#stack)
- [Estrutura](#estrutura)
- [Rodando localmente](#rodando-localmente)
- [Deploy](#deploy)
- [Design system](#design-system)
- [Conteúdo a personalizar](#conteúdo-a-personalizar)
- [Assets](#assets)
- [Créditos](#créditos)

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

## Rodando localmente

O site é estático: basta abrir o `index.html`. Para que caminhos relativos e o mapa funcionem como em produção, prefira servir por HTTP:

```bash
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000>.

## Deploy

Qualquer hospedagem estática atende (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

**GitHub Pages:**

1. Envie o repositório para o GitHub.
2. Em *Settings → Pages*, selecione a branch `main` e a pasta `/root`.
3. O site fica disponível em `https://<usuario>.github.io/<repositorio>/`.

## Design system

Os tokens ficam centralizados em `assets/css/tokens.css`, divididos em duas camadas:

**1. Paleta** (fixa, retirada do manual da marca):

| Token | Valor | Uso |
| --- | --- | --- |
| `--teal-700` | `#2c5f5d` | Cor primária da marca |
| `--teal-500` | `#4fb3a9` | Turquesa da marca |
| `--mint-400` | `#85c7bf` | Cor secundária |
| `--slate-700` | `#3c4a4a` | Cinza-chumbo da marca |
| `--offwhite` | `#f4f8f8` | Off-white da marca |
| `--teal-950` | `#0d201f` | Preto da marca |

Os tons intermediários (`--teal-950`…`--mint-50`) são interpolações entre essas cores — nenhum valor foi inventado fora da rampa.

**2. Semântica** (troca conforme o tema, via `[data-theme]`):

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--paper` | `--offwhite` | `--teal-950` | Fundo geral |
| `--surface` | `#ffffff` | `--teal-900` | Cards |
| `--ink` | `--teal-950` | `--offwhite` | Texto principal |
| `--muted` | `#567673` | `--mint-400` | Texto secundário |
| `--accent` | `--teal-700` | `--mint-400` | Botões e ícones |
| `--on-accent` | `#ffffff` | `--teal-950` | Texto sobre o acento |

Nenhum arquivo de CSS usa cor literal fora dessas camadas (as exceções são a faixa de chamada e o rodapé, que têm fundo escuro nos dois temas). Para ajustar a identidade ou os temas, edite apenas o `tokens.css`.

## Conteúdo a personalizar

Alguns pontos foram deixados propositalmente de fora por dependerem de informação real do consultório. Antes de publicar:

- [ ] **Domínio** — atualize `canonical` e `og:image` no `<head>` do `index.html` para URLs absolutas (o `og:image` precisa ser absoluto para gerar preview em redes sociais e no WhatsApp).
- [ ] **Horários de atendimento** — não constam no site; se desejar exibi-los, vale adicionar também `openingHours` ao JSON-LD.
- [ ] **Convênios aceitos**, se houver.
- [ ] **Depoimentos de pacientes** — exigem consentimento e devem respeitar o [Código de Ética Odontológica do CFO](https://website.cfo.org.br/), que restringe promessas de resultado e divulgação de antes/depois.
- [ ] **Fotos do consultório**, que renderiam uma seção nova entre "Serviços" e a chamada final.

## Assets

- Marca e imagens: acervo do Dr. Vinícius Modesto Lima.
- Os logotipos web (`assets/img/brand/`) foram gerados a partir dos originais em `design/logo-png/`, com recorte de bordas, redimensionamento e compressão. A variante colorida vem do `PNG-01` e a off-white (usada no tema escuro e sobre painéis escuros) vem do `PNG-02`.
- O retrato original segue preservado em `design/retrato-original.png`, fora do site e fora do versionamento.

## Créditos

Desenvolvido por **João Victor Ralin**.

Conteúdo, marca e imagens são de propriedade do Dr. Vinícius Modesto Lima e não estão cobertos por licença de uso livre.
