<?php
/**
 * Front Page Template (Página Inicial)
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div id="landing-page-root" class="landing-page-container">
    <!--
    IMPORTANTE: Todo o conteúdo da landing page será renderizado pelo React

    A estrutura será:
    - Hero Section com banner carousel
    - Seção Sobre a Empresa
    - Diferenciais
    - Catálogo de Produtos
    - Depoimentos (StaggerTestimonials)
    - Blog
    - FAQ
    - Formulário de Contato
    - Footer

    Cada seção será um componente React separado.
    -->

    <div class="loading-placeholder min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4"
                 style="border-top-color: #6c256f; border-bottom-color: #009bac;"></div>
            <p class="text-gray-600 font-semibold">Carregando Onda Pro...</p>
        </div>
    </div>
</div>

<?php
get_footer();
