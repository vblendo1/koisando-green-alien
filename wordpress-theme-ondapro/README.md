# Tema WordPress - Onda Pro Landing Page

Tema customizado para landing page de alta conversão da Onda Pro - Importadora B2B de materiais escolares e de escritório.

## 📋 Descrição

Este tema foi desenvolvido para criar uma landing page one-page moderna e otimizada para captura de leads B2B. Utiliza React para componentes dinâmicos e Tailwind CSS para estilização.

## 🚀 Instalação

### 1. Fazer Upload do Tema

1. Compacte a pasta `wordpress-theme-ondapro` em um arquivo `.zip`
2. Acesse o WordPress Admin > Aparência > Temas
3. Clique em "Adicionar Novo" > "Enviar Tema"
4. Faça upload do arquivo `.zip` e clique em "Instalar Agora"
5. Ative o tema após a instalação

### 2. Criar Estrutura de Pastas para Assets

Dentro da pasta do tema, crie a seguinte estrutura:

```
wordpress-theme-ondapro/
├── assets/
│   ├── js/
│   │   └── app.js (seu bundle React compilado)
│   ├── css/
│   │   └── custom.css (estilos adicionais)
│   └── images/
│       └── (suas imagens)
├── inc/
│   └── (arquivos auxiliares opcionais)
└── (arquivos já criados)
```

### 3. Compilar Aplicação React

**IMPORTANTE:** O tema espera que você compile sua aplicação React atual e coloque o bundle em `assets/js/app.js`.

#### Opção A: Build Manual

1. Na pasta do seu projeto React/Vite atual, rode:
```bash
npm run build
```

2. Copie os arquivos gerados em `dist/` para:
   - `dist/assets/index-*.js` → `wordpress-theme-ondapro/assets/js/app.js`
   - `dist/assets/index-*.css` → `wordpress-theme-ondapro/assets/css/custom.css`
   - Imagens da pasta `dist/` → `wordpress-theme-ondapro/assets/images/`

#### Opção B: Integração Automática (Recomendado)

Adicione um script no `package.json` do seu projeto React:

```json
{
  "scripts": {
    "build:wp": "vite build && node scripts/copy-to-wp.js"
  }
}
```

Crie o arquivo `scripts/copy-to-wp.js`:

```javascript
const fs = require('fs-extra');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const themeDir = path.join(__dirname, '../../wordpress-theme-ondapro');

// Copiar JS
const jsFiles = fs.readdirSync(path.join(distDir, 'assets'))
  .filter(file => file.startsWith('index-') && file.endsWith('.js'));

if (jsFiles.length > 0) {
  fs.copySync(
    path.join(distDir, 'assets', jsFiles[0]),
    path.join(themeDir, 'assets/js/app.js')
  );
}

// Copiar CSS
const cssFiles = fs.readdirSync(path.join(distDir, 'assets'))
  .filter(file => file.startsWith('index-') && file.endsWith('.css'));

if (cssFiles.length > 0) {
  fs.copySync(
    path.join(distDir, 'assets', cssFiles[0]),
    path.join(themeDir, 'assets/css/custom.css')
  );
}

// Copiar imagens
fs.copySync(
  path.join(distDir),
  path.join(themeDir, 'assets/images'),
  {
    filter: (src) => {
      return src.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i);
    }
  }
);

console.log('✅ Arquivos copiados para o tema WordPress!');
```

## 📦 Funcionalidades

### 1. Custom Post Type - Leads

O tema cria automaticamente um CPT "Leads" para gerenciar os contatos capturados.

**Para visualizar leads:**
- Acesse WordPress Admin > Leads
- Você verá uma lista com: Nome, E-mail, Telefone, Empresa e Data

### 2. Formulário de Contato AJAX

O tema inclui um handler AJAX para processar formulários de contato.

**Exemplo de uso no React:**

```javascript
const handleSubmit = async (formData) => {
  const response = await fetch(ondaproData.ajaxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      action: 'submit_contact_form',
      nonce: ondaproData.nonce,
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      empresa: formData.empresa,
      mensagem: formData.mensagem,
    }),
  });

  const result = await response.json();

  if (result.success) {
    console.log('✅ Lead capturado!');
  } else {
    console.error('❌ Erro:', result.data.message);
  }
};
```

### 3. Customizer - Opções do Tema

**Acessar:** WordPress Admin > Aparência > Personalizar > Informações de Contato

Você pode configurar:
- Telefone
- WhatsApp
- E-mail

**Acessar no React:**

```javascript
// Os dados estarão disponíveis globalmente em ondaproData
console.log(ondaproData);
```

### 4. Áreas de Widget (Sidebars)

O tema registra 3 áreas de widget no rodapé:
- Rodapé 1
- Rodapé 2
- Rodapé 3

**Gerenciar:** WordPress Admin > Aparência > Widgets

## 🎨 Integração com React

### Dados WordPress Disponíveis no JavaScript

O tema expõe a variável global `ondaproData` com:

```javascript
{
  ajaxUrl: 'https://seusite.com/wp-admin/admin-ajax.php',
  nonce: 'token_segurança',
  siteUrl: 'https://seusite.com'
}
```

### Pontos de Montagem React

O tema define os seguintes pontos de montagem:

1. **Navbar:** `<div id="navbar-root"></div>` (no header.php)
2. **Landing Page:** `<div id="landing-page-root"></div>` (no front-page.php)
3. **Footer:** `<div id="footer-root"></div>` (no footer.php)

**Exemplo de inicialização no seu app.js:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Montar Navbar
const navbarRoot = document.getElementById('navbar-root');
if (navbarRoot) {
  ReactDOM.createRoot(navbarRoot).render(<Navbar />);
}

// Montar Landing Page
const landingRoot = document.getElementById('landing-page-root');
if (landingRoot) {
  ReactDOM.createRoot(landingRoot).render(<App />);
}

// Montar Footer
const footerRoot = document.getElementById('footer-root');
if (footerRoot) {
  ReactDOM.createRoot(footerRoot).render(<Footer />);
}
```

## 📱 Configurações Recomendadas

### 1. Definir Página Inicial

1. Acesse WordPress Admin > Configurações > Leitura
2. Selecione "Uma página estática"
3. Escolha uma página para "Página inicial"
4. Salve as alterações

### 2. Configurar Permalinks

1. Acesse WordPress Admin > Configurações > Links Permanentes
2. Selecione "Nome do post" ou uma estrutura personalizada
3. Salve as alterações

### 3. Upload de Logo

1. Acesse WordPress Admin > Aparência > Personalizar > Identidade do Site
2. Faça upload do logo da Onda Pro
3. Publique as alterações

## 🔧 Desenvolvimento

### Estrutura de Arquivos

```
wordpress-theme-ondapro/
├── style.css          # Metadados do tema + estilos WordPress core
├── functions.php      # Funcionalidades do tema
├── header.php         # Header do site
├── footer.php         # Footer do site
├── index.php          # Template padrão
├── front-page.php     # Template da página inicial
├── page.php           # Template de páginas
├── single.php         # Template de posts
└── README.md          # Este arquivo
```

### Enfileirando Scripts Adicionais

Adicione no `functions.php`:

```php
function ondapro_custom_scripts() {
    wp_enqueue_script(
        'custom-script',
        get_template_directory_uri() . '/assets/js/custom.js',
        array('ondapro-app'),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'ondapro_custom_scripts');
```

### Adicionando Estilos Customizados

Adicione no `functions.php`:

```php
function ondapro_custom_styles() {
    wp_enqueue_style(
        'custom-css',
        get_template_directory_uri() . '/assets/css/custom.css',
        array('ondapro-style'),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'ondapro_custom_styles');
```

## 🔒 Segurança

- Todos os inputs são sanitizados com funções do WordPress
- AJAX usa nonce para validação
- Formulários validam dados no servidor
- Custom Post Type "Leads" não é público

## 📧 Notificações de E-mail

Por padrão, quando um lead é capturado:
1. Um e-mail é enviado para o administrador do site
2. O lead é salvo no banco de dados (CPT "Leads")

**Customizar e-mail:** Edite a função `ondapro_submit_contact_form()` no `functions.php`

## 🎯 Otimizações Recomendadas

### 1. Produção

- Minifique o JavaScript e CSS
- Otimize imagens (WebP, compressão)
- Use um plugin de cache (WP Rocket, W3 Total Cache)
- Configure CDN para assets estáticos

### 2. SEO

- Instale Yoast SEO ou Rank Math
- Configure meta tags e Open Graph
- Adicione structured data (JSON-LD)
- Otimize velocidade de carregamento

### 3. Conversão

- Configure Google Analytics
- Adicione Facebook Pixel
- Implemente Google Tag Manager
- Configure hotjar ou similar para heatmaps

## 🐛 Troubleshooting

### "White Screen of Death"

1. Verifique erros PHP no `wp-content/debug.log`
2. Ative o modo debug no `wp-config.php`:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

### Scripts não carregam

1. Verifique se o arquivo existe em `assets/js/app.js`
2. Limpe o cache do navegador e do WordPress
3. Verifique console do navegador para erros

### Formulário não envia

1. Verifique se `ondaproData` está disponível no console
2. Confirme que o nonce está sendo passado
3. Verifique logs de erro do PHP

## 📄 Licença

GNU General Public License v2 or later

## 👥 Suporte

Para questões relacionadas ao tema, entre em contato com o desenvolvedor.

---

**Desenvolvido para Onda Pro** | Versão 1.0.0
