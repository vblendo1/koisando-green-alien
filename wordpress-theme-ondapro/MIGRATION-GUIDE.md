# Guia de Migração - React para WordPress

Este guia explica passo a passo como migrar sua landing page React/Vite atual para o tema WordPress.

## 📋 Pré-requisitos

- Site WordPress instalado e funcionando
- Acesso FTP ou ao painel de hospedagem
- Acesso ao WordPress Admin
- Node.js e npm instalados localmente

## 🔄 Processo de Migração

### Etapa 1: Preparar o Build da Aplicação React

#### 1.1 Atualizar vite.config.ts

No seu projeto React atual, atualize o `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Configurações otimizadas para WordPress
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Nomes de arquivo consistentes para facilitar cópia
        entryFileNames: 'assets/app-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
```

#### 1.2 Criar Script de Deploy

Crie o arquivo `scripts/deploy-to-wp.js` no seu projeto React:

```javascript
const fs = require('fs-extra');
const path = require('path');

// CONFIGURE AQUI O CAMINHO DO SEU TEMA WORDPRESS
const WP_THEME_PATH = path.join(__dirname, '../../wordpress-theme-ondapro');

const distDir = path.join(__dirname, '../dist');

console.log('🚀 Iniciando deploy para WordPress...\n');

// 1. Criar estrutura de pastas se não existir
fs.ensureDirSync(path.join(WP_THEME_PATH, 'assets/js'));
fs.ensureDirSync(path.join(WP_THEME_PATH, 'assets/css'));
fs.ensureDirSync(path.join(WP_THEME_PATH, 'assets/images'));

// 2. Copiar JavaScript
console.log('📦 Copiando arquivos JavaScript...');
const jsFiles = fs.readdirSync(path.join(distDir, 'assets'))
  .filter(file => file.startsWith('app-') && file.endsWith('.js'));

if (jsFiles.length > 0) {
  const mainJs = jsFiles[0];
  fs.copySync(
    path.join(distDir, 'assets', mainJs),
    path.join(WP_THEME_PATH, 'assets/js/app.js')
  );
  console.log(`✅ JavaScript copiado: ${mainJs} → app.js`);
} else {
  console.error('❌ Nenhum arquivo JavaScript encontrado!');
}

// 3. Copiar CSS
console.log('\n🎨 Copiando arquivos CSS...');
const cssFiles = fs.readdirSync(path.join(distDir, 'assets'))
  .filter(file => file.endsWith('.css'));

if (cssFiles.length > 0) {
  cssFiles.forEach(cssFile => {
    fs.copySync(
      path.join(distDir, 'assets', cssFile),
      path.join(WP_THEME_PATH, 'assets/css', cssFile)
    );
    console.log(`✅ CSS copiado: ${cssFile}`);
  });
} else {
  console.warn('⚠️  Nenhum arquivo CSS encontrado');
}

// 4. Copiar imagens
console.log('\n🖼️  Copiando imagens...');
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];

try {
  const files = fs.readdirSync(distDir);
  let imageCount = 0;

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      fs.copySync(
        path.join(distDir, file),
        path.join(WP_THEME_PATH, 'assets/images', file)
      );
      imageCount++;
    }
  });

  console.log(`✅ ${imageCount} imagens copiadas`);
} catch (error) {
  console.error('❌ Erro ao copiar imagens:', error.message);
}

// 5. Copiar index.html como referência
console.log('\n📄 Salvando referência do index.html...');
fs.copySync(
  path.join(distDir, 'index.html'),
  path.join(WP_THEME_PATH, 'assets/index-reference.html')
);
console.log('✅ Referência HTML salva');

console.log('\n✨ Deploy concluído com sucesso!\n');
console.log('📍 Próximos passos:');
console.log('1. Compacte a pasta wordpress-theme-ondapro em .zip');
console.log('2. Faça upload no WordPress Admin > Aparência > Temas');
console.log('3. Ative o tema');
console.log('4. Configure as opções no Personalizador\n');
```

#### 1.3 Adicionar Scripts ao package.json

Adicione no seu `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "build:wp": "vite build && node scripts/deploy-to-wp.js",
    "deploy": "npm run build:wp"
  }
}
```

#### 1.4 Instalar Dependência

```bash
npm install fs-extra --save-dev
```

### Etapa 2: Adaptar Componentes React

#### 2.1 Atualizar App.tsx

Modifique seu `src/App.tsx` para ser compatível com WordPress:

```typescript
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Differentials from './components/Differentials';
import ProductCatalog from './components/ProductCatalog';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Tipo para dados WordPress
declare global {
  interface Window {
    ondaproData?: {
      ajaxUrl: string;
      nonce: string;
      siteUrl: string;
    };
  }
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar onCTAClick={handleCTAClick} />
      <Hero onCTAClick={handleCTAClick} />
      <About />
      <Differentials />
      <ProductCatalog onCTAClick={handleCTAClick} />
      <Testimonials onCTAClick={handleCTAClick} />
      <Blog />
      <FAQ />
      <ContactForm />
      <Footer />

      {isModalOpen && (
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
```

#### 2.2 Atualizar ContactForm.tsx

Adapte o formulário para usar AJAX do WordPress:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Usar AJAX do WordPress se disponível
    const ajaxUrl = window.ondaproData?.ajaxUrl || '/wp-admin/admin-ajax.php';
    const nonce = window.ondaproData?.nonce || '';

    const response = await fetch(ajaxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'submit_contact_form',
        nonce: nonce,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        empresa: formData.empresa,
        mensagem: formData.mensagem,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setSuccessMessage('Mensagem enviada com sucesso!');
      setFormData({ nome: '', email: '', telefone: '', empresa: '', mensagem: '' });
    } else {
      setError(result.data?.message || 'Erro ao enviar mensagem');
    }
  } catch (error) {
    setError('Erro ao enviar mensagem. Tente novamente.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Etapa 3: Build e Deploy

#### 3.1 Fazer Build

```bash
npm run build:wp
```

Isso irá:
- Compilar a aplicação React
- Copiar todos os arquivos para a pasta do tema WordPress

#### 3.2 Verificar Arquivos

Confirme que os seguintes arquivos foram criados:
- `wordpress-theme-ondapro/assets/js/app.js`
- `wordpress-theme-ondapro/assets/css/*.css`
- `wordpress-theme-ondapro/assets/images/*`

### Etapa 4: Upload para WordPress

#### 4.1 Compactar Tema

```bash
cd ..
zip -r ondapro-theme.zip wordpress-theme-ondapro/
```

#### 4.2 Instalar no WordPress

1. Acesse WordPress Admin
2. Vá em **Aparência > Temas**
3. Clique em **Adicionar Novo > Enviar Tema**
4. Selecione o arquivo `ondapro-theme.zip`
5. Clique em **Instalar Agora**
6. Clique em **Ativar**

### Etapa 5: Configurações WordPress

#### 5.1 Configurar Página Inicial

1. Crie uma nova página chamada "Home"
2. Vá em **Configurações > Leitura**
3. Selecione "Uma página estática"
4. Escolha "Home" como página inicial
5. Salve

#### 5.2 Configurar Permalinks

1. Vá em **Configurações > Links Permanentes**
2. Selecione "Nome do post"
3. Salve

#### 5.3 Adicionar Logo

1. Vá em **Aparência > Personalizar > Identidade do Site**
2. Faça upload do logo da Onda Pro
3. Publique

#### 5.4 Configurar Informações de Contato

1. Vá em **Aparência > Personalizar > Informações de Contato**
2. Adicione Telefone, WhatsApp e E-mail
3. Publique

### Etapa 6: Testar

Verifique se:
- [ ] Landing page carrega corretamente
- [ ] Todas as seções aparecem
- [ ] Navegação smooth scroll funciona
- [ ] Formulário de contato envia
- [ ] Leads são salvos no Admin
- [ ] E-mail de notificação chega
- [ ] Responsivo funciona em mobile
- [ ] Imagens carregam corretamente

## 🔧 Troubleshooting

### Problema: Scripts não carregam

**Solução:**
1. Verifique se `app.js` existe em `assets/js/`
2. Limpe cache do navegador (Ctrl+Shift+R)
3. Verifique console do navegador para erros

### Problema: Estilos não aplicados

**Solução:**
1. Verifique se arquivos CSS foram copiados
2. Adicione enfileiramento manual no `functions.php`:

```php
wp_enqueue_style('ondapro-compiled', get_template_directory_uri() . '/assets/css/app.css', array(), '1.0.0');
```

### Problema: Formulário não envia

**Solução:**
1. Verifique se `ondaproData` está disponível no console
2. Ative WP_DEBUG no `wp-config.php`
3. Verifique logs em `wp-content/debug.log`

### Problema: Imagens não aparecem

**Solução:**
1. Use caminhos absolutos para imagens:

```javascript
const imageUrl = `${window.ondaproData?.siteUrl}/wp-content/themes/ondapro/assets/images/logo.png`;
```

2. Ou use import do Vite (preferível):

```javascript
import logo from '@/assets/images/logo.png';
```

## 📝 Checklist Final

- [ ] Build da aplicação React concluído
- [ ] Arquivos copiados para tema WordPress
- [ ] Tema compactado em .zip
- [ ] Tema instalado e ativado no WordPress
- [ ] Página inicial configurada
- [ ] Logo adicionado
- [ ] Informações de contato configuradas
- [ ] Formulário testado e funcionando
- [ ] Leads sendo salvos no Admin
- [ ] E-mails de notificação chegando
- [ ] Responsividade testada
- [ ] Performance otimizada

## 🚀 Próximos Passos

Após a migração, considere:

1. **SEO:** Instalar Yoast SEO ou Rank Math
2. **Cache:** Configurar WP Rocket ou W3 Total Cache
3. **Analytics:** Adicionar Google Analytics e Facebook Pixel
4. **SSL:** Garantir que o site usa HTTPS
5. **Backup:** Configurar backups automáticos
6. **CDN:** Considerar usar Cloudflare ou similar

## 📞 Suporte

Se encontrar problemas durante a migração, verifique:
- Logs do PHP em `wp-content/debug.log`
- Console do navegador para erros JavaScript
- Network tab para requisições falhadas

---

**Boa sorte com a migração!** 🎉
