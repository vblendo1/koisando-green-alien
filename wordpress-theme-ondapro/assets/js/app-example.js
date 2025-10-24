/**
 * Exemplo de Integração React com WordPress
 *
 * IMPORTANTE: Este é apenas um exemplo de estrutura.
 * Você deve compilar sua aplicação React atual e colocar o bundle aqui.
 *
 * @package OndaPro
 */

// Este arquivo mostra como você pode estruturar a integração
// Após compilar com Vite, coloque o bundle gerado aqui

/*
Exemplo de como seu código React compilado pode acessar dados do WordPress:

// Verificar se dados WordPress estão disponíveis
if (typeof ondaproData !== 'undefined') {
    console.log('WordPress Ajax URL:', ondaproData.ajaxUrl);
    console.log('Nonce:', ondaproData.nonce);
    console.log('Site URL:', ondaproData.siteUrl);
}

// Exemplo de função para enviar formulário via AJAX
async function submitContactForm(formData) {
    try {
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
            console.log('✅ Sucesso:', result.data.message);
            return { success: true, message: result.data.message };
        } else {
            console.error('❌ Erro:', result.data.message);
            return { success: false, message: result.data.message };
        }
    } catch (error) {
        console.error('❌ Erro na requisição:', error);
        return { success: false, message: 'Erro ao processar requisição.' };
    }
}

// Exemplo de como montar componentes React nos pontos de montagem
document.addEventListener('DOMContentLoaded', function() {

    // Verificar se React e ReactDOM estão disponíveis
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        console.error('React ou ReactDOM não foram carregados!');
        return;
    }

    // Montar Navbar
    const navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) {
        // ReactDOM.createRoot(navbarRoot).render(React.createElement(Navbar));
        console.log('Navbar montada');
    }

    // Montar Landing Page Principal
    const landingRoot = document.getElementById('landing-page-root');
    if (landingRoot) {
        // ReactDOM.createRoot(landingRoot).render(React.createElement(App));
        console.log('Landing page montada');
    }

    // Montar Footer
    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) {
        // ReactDOM.createRoot(footerRoot).render(React.createElement(Footer));
        console.log('Footer montado');
    }
});

// Exportar funções úteis para uso global
window.OndaProTheme = {
    submitContactForm: submitContactForm,
    // Adicione outras funções úteis aqui
};

*/

console.log('Onda Pro Theme - App Example loaded');
console.log('Este é um arquivo de exemplo. Substitua pelo seu bundle React compilado.');
