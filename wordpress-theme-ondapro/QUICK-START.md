# Quick Start - Tema WordPress Onda Pro

Guia rápido para começar a usar o tema em 5 minutos.

## 📦 O que você tem

Uma pasta `wordpress-theme-ondapro/` com todos os arquivos necessários para criar um tema WordPress customizado para a landing page da Onda Pro.

## 🚀 Instalação Rápida

### Passo 1: Compactar o Tema

```bash
# No diretório onde está a pasta wordpress-theme-ondapro
zip -r ondapro-theme.zip wordpress-theme-ondapro/
```

Ou no Windows: Clique com botão direito na pasta > Enviar para > Pasta compactada

### Passo 2: Instalar no WordPress

1. Acesse seu WordPress Admin
2. Vá em **Aparência > Temas**
3. Clique em **Adicionar Novo**
4. Clique em **Enviar Tema**
5. Selecione o arquivo `ondapro-theme.zip`
6. Clique em **Instalar Agora**
7. Clique em **Ativar**

### Passo 3: Compilar e Adicionar sua Aplicação React

**IMPORTANTE:** O tema está pronto, mas você precisa adicionar o bundle compilado da sua aplicação React.

#### Opção A: Manual

1. No seu projeto React atual, rode:
```bash
npm run build
```

2. Copie os arquivos:
   - `dist/assets/index-*.js` → `wordpress-theme-ondapro/assets/js/app.js`
   - `dist/assets/index-*.css` → `wordpress-theme-ondapro/assets/css/app.css`
   - Imagens → `wordpress-theme-ondapro/assets/images/`

3. Re-compacte e re-instale o tema

#### Opção B: Automatizada (Recomendado)

Use o script de deploy descrito no `MIGRATION-GUIDE.md`

### Passo 4: Configurações Básicas

1. **Definir Página Inicial:**
   - Criar página "Home"
   - Ir em Configurações > Leitura
   - Selecionar "Uma página estática" e escolher "Home"

2. **Adicionar Logo:**
   - Ir em Aparência > Personalizar > Identidade do Site
   - Fazer upload do logo

3. **Configurar Contatos:**
   - Ir em Aparência > Personalizar > Informações de Contato
   - Adicionar telefone, WhatsApp e e-mail

## 📁 Estrutura de Arquivos

```
wordpress-theme-ondapro/
├── style.css              # Metadados do tema
├── functions.php          # Funcionalidades (AJAX, CPT, etc)
├── header.php            # Header do site
├── footer.php            # Footer do site
├── index.php             # Template padrão
├── front-page.php        # Template da home (landing page)
├── page.php              # Template de páginas
├── single.php            # Template de posts
├── screenshot.png        # Preview do tema (substitua por imagem real)
├── README.md             # Documentação completa
├── MIGRATION-GUIDE.md    # Guia de migração detalhado
└── assets/
    ├── js/
    │   ├── app.js        # Seu bundle React (você adiciona)
    │   └── app-example.js # Exemplo de estrutura
    ├── css/
    │   └── app.css       # CSS compilado (você adiciona)
    └── images/
        └── (suas imagens)
```

## ✅ Funcionalidades Incluídas

### 1. Custom Post Type "Leads"
- Captura e gerencia leads automaticamente
- Acessível em: WordPress Admin > Leads
- Campos: Nome, E-mail, Telefone, Empresa, Mensagem, Data

### 2. AJAX Form Handler
- Processa formulários de contato
- Envia e-mail para administrador
- Salva lead no banco de dados
- Validação de dados no servidor

### 3. WordPress Customizer
- Configurações de contato (telefone, WhatsApp, e-mail)
- Logo customizado
- Totalmente integrado com tema

### 4. Dados WordPress para React
- Variável global `ondaproData` disponível no JavaScript
- Contém: `ajaxUrl`, `nonce`, `siteUrl`
- Use para fazer requisições AJAX

## 🔌 Integração React

### Dados Disponíveis

```javascript
// Acessível globalmente após carregamento do tema
window.ondaproData = {
  ajaxUrl: 'https://seusite.com/wp-admin/admin-ajax.php',
  nonce: 'token_seguranca',
  siteUrl: 'https://seusite.com'
}
```

### Enviar Formulário

```javascript
const response = await fetch(ondaproData.ajaxUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    action: 'submit_contact_form',
    nonce: ondaproData.nonce,
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '11999999999',
    empresa: 'Papelaria ABC',
    mensagem: 'Quero conhecer os produtos'
  }),
});

const result = await response.json();
console.log(result); // { success: true, data: { message: '...' } }
```

## 🎯 Pontos de Montagem React

O tema define 3 divs onde você pode montar componentes React:

1. **Navbar:** `<div id="navbar-root"></div>`
2. **Landing Page:** `<div id="landing-page-root"></div>`
3. **Footer:** `<div id="footer-root"></div>`

## 🐛 Problemas Comuns

### "Página em branco"
- Ative WP_DEBUG no wp-config.php
- Verifique wp-content/debug.log

### "Scripts não carregam"
- Confirme que app.js existe em assets/js/
- Limpe cache do navegador (Ctrl+Shift+R)

### "Formulário não envia"
- Verifique se ondaproData está no console
- Teste nonce no console: `console.log(ondaproData.nonce)`

## 📚 Documentação Completa

- **README.md** - Documentação completa do tema
- **MIGRATION-GUIDE.md** - Guia detalhado de migração React → WordPress
- **functions.php** - Código comentado com todas as funcionalidades

## 🎨 Personalização

### Adicionar novo campo no formulário

1. Adicione o campo no componente React
2. Atualize a função `ondapro_submit_contact_form()` em `functions.php`
3. Adicione o campo no CPT "Leads"

### Alterar e-mail de notificação

Edite em `functions.php`:

```php
$admin_email = get_option('admin_email'); // Trocar por e-mail fixo se necessário
```

### Adicionar nova funcionalidade

Crie um novo handler AJAX em `functions.php`:

```php
function ondapro_custom_action() {
    check_ajax_referer('ondapro_nonce', 'nonce');

    // Seu código aqui

    wp_send_json_success(array('message' => 'Sucesso!'));
}
add_action('wp_ajax_custom_action', 'ondapro_custom_action');
add_action('wp_ajax_nopriv_custom_action', 'ondapro_custom_action');
```

## 🚀 Deploy em Produção

Antes de colocar em produção:

1. [ ] Minificar JavaScript e CSS
2. [ ] Otimizar imagens (WebP, compressão)
3. [ ] Configurar plugin de cache
4. [ ] Configurar CDN
5. [ ] Testar em diferentes dispositivos
6. [ ] Configurar SSL (HTTPS)
7. [ ] Adicionar Google Analytics
8. [ ] Configurar backups automáticos

## 📧 Contato

Para dúvidas sobre o tema, consulte a documentação completa ou entre em contato com o desenvolvedor.

---

**Versão:** 1.0.0
**Compatível com:** WordPress 5.0+
**Licença:** GPL v2 or later
