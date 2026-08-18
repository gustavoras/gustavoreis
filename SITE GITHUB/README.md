# Portfólio — Gustavo Reis

Site pessoal dark, tecnológico e responsivo para **Analista de Suporte · Infraestrutura · Redes · Segurança**.

Stack atual: **HTML + CSS + JavaScript** (vanilla), com estrutura simples o suficiente para migrar depois para **React + Vite**.

## Preview local

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Abra `http://localhost:8080`.

## Personalizar em 2 minutos

1. Abra `js/script.js` e edite o objeto `CONFIG`:

```js
const CONFIG = {
  github: "https://github.com/seu-usuario",
  linkedin: "https://www.linkedin.com/in/seu-usuario",
  email: "voce@email.com",
};
```

2. No `index.html`, busque `SEU-USUARIO` e `seu.email@exemplo.com` e troque os textos visíveis (os `href` já seguem o `CONFIG`).
3. Atualize a timeline em `#experiencia` com empresas e datas reais.
4. Em cada card de projeto, troque o link do GitHub e remova a classe `is-off` da Demo quando tiver URL.
5. Edite `scripts/gerar_curriculo.py` e rode:

```bash
python3 scripts/gerar_curriculo.py
```

O PDF vai para `assets/curriculo-gustavo-reis.pdf`.

## Estrutura

```
index.html
css/fonts.css
css/style.css
js/script.js
assets/fonts/          fontes self-hosted (Outfit, Inter, JetBrains Mono)
assets/images/         capas dos projetos
assets/icons/favicon.svg
assets/curriculo-gustavo-reis.pdf
scripts/gerar_curriculo.py
```

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `gustavoreis.github.io` ou `portfolio`).
2. Envie estes arquivos na raiz.
3. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.

Não precisa de build. Sem dependências de CDN — as fontes estão locais, então o site funciona offline e no preview sem rede.

## Visual

- Fundo quase preto, acentos ciano/menta
- Cards glass, grid e partículas em rede
- Painel **SYSTEM STATUS** no hero
- Layout mobile-first, animações com `prefers-reduced-motion`
