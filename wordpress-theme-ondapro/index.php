<?php
/**
 * Index Template
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
    <!-- Todo o conteúdo da landing page será renderizado pelo React aqui -->
    <div class="loading-placeholder min-h-screen flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Carregando...</p>
        </div>
    </div>
</div>

<?php
get_footer();
