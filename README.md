# 🎮 Portfólio Xibas | Thumbmaker de Games

Site de portfólio moderno, ultra-rápido e responsivo, desenvolvido especialmente para thumbmakers focados em canais de games. Criado com foco em **conversão, alto CTR e visualização de impacto**, 100% pronto para publicação gratuita no **GitHub Pages**.

---

## 🚀 Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura limpa e otimizada para SEO e compartilhamento social (OpenGraph para Discord, X e WhatsApp).
- **CSS3 Moderno:** Paleta *Red & White Gamer* (fundo obsidian, vermelho escarlate e branco puro), efeitos de *glassmorphism*, iluminação neon dinâmica e responsividade para todos os dispositivos.
- **Vanilla JavaScript:** Sem dependências ou frameworks pesados — galeria com filtros interativos, visualizador *Lightbox modal*, cópia de Discord em um clique e animações fluidas.

---

## 📁 Estrutura de Arquivos

```
c:/Programação/
├── index.html               # Página principal do portfólio
├── css/
│   └── style.css            # Folha de estilos completa (Dark Gamer Theme)
├── js/
│   └── main.js              # Lógica de interações, modal e clipboard
├── assets/
│   └── images/              # Thumbnails em alta resolução (16:9)
│       ├── thumb_fps_valorant.png
│       ├── thumb_battle_royale.png
│       ├── thumb_minecraft_hardcore.png
│       ├── thumb_horror_game.png
│       ├── thumb_cs2_tactical.png
│       └── thumb_gta_roleplay.png
└── README.md                # Guia de uso e deploy no GitHub Pages
```

---

## 🛠️ Como Testar Localmente

Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Brave).

Ou, se você utiliza o **Visual Studio Code**, pode usar a extensão **Live Server** clicando com o botão direito no `index.html` e escolhendo *"Open with Live Server"*.

---

## 🎨 Como Personalizar Seus Dados

### 1. Seus Links e Contatos
No arquivo `index.html`, procure pela seção `<section class="contact-section" id="contato">`:
- **Discord:** Altere o atributo `data-copy="seu_usuario"` no botão e o texto do usuário no card.
- **X (Twitter):** Troque o link `href="https://twitter.com/..."` pelo seu perfil oficial.
- **Instagram:** Troque o link `href="https://instagram.com/..."` pelo seu perfil oficial.

### 2. Adicionar Novas Thumbnails
1. Salve sua nova imagem na pasta `assets/images/sua_thumb.png` (de preferência no formato 16:9, ex: 1920x1080).
2. No `index.html`, dentro de `<div class="portfolio-grid" id="portfolioGrid">`, duplique um dos blocos `<div class="thumb-card">` e atualize:
   - `data-category`: categoria (`fps`, `battleroyale`, `minecraft`, `horror`, etc.)
   - `src`: caminho da sua imagem
   - Título, descrição e badge de CTR.

---

## 🌐 Como Publicar no GitHub Pages (Passo a Passo)

### Passo 1: Criar o Repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login na sua conta.
2. Clique no botão verde **"New"** (ou acesse `https://github.com/new`).
3. Dê um nome ao repositório (por exemplo: `portfolio-xibas` ou `xibas-thumbs`).
4. Deixe o repositório como **Public** (Público).
5. Não precisa marcar para criar README ou .gitignore (já temos tudo aqui).
6. Clique em **"Create repository"**.

### Passo 2: Subir os Arquivos via Terminal (Git)
No terminal (PowerShell ou Git Bash), na pasta `c:\Programação`, execute:

```bash
# 1. Inicializar o Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "feat: portfolio inicial completo do thumbmaker xibas"

# 4. Renomear o branch para main
git branch -M main

# 5. Conectar com o seu repositório do GitHub (troque pelo link do seu repositório)
git remote add origin https://github.com/SEU_USUARIO/portfolio-xibas.git

# 6. Enviar os arquivos
git push -u origin main
```

*(Caso prefira sem terminal, você também pode usar o aplicativo **GitHub Desktop** ou arrastar os arquivos diretamente pelo navegador na página do seu repositório).*

### Passo 3: Ativar o GitHub Pages
1. No seu repositório no GitHub, clique na aba **"Settings"** (Configurações).
2. No menu lateral esquerdo, clique em **"Pages"**.
3. Em **"Build and deployment" > "Branch"**, selecione a branch `main` e a pasta `/(root)`.
4. Clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. O GitHub exibirá uma barra verde com o link público do seu site:
   `https://SEU_USUARIO.github.io/portfolio-xibas/`

---

## 🌟 Dica de Ouro para Thumbmakers
Coloque o link do seu portfólio:
1. Na bio do seu **Instagram** e do seu **X (Twitter)**;
2. Na descrição do seu perfil do **Discord**;
3. No final de propostas de orçamento que você enviar para YouTubers e streamers.
