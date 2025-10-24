<?php
/**
 * Footer do Tema
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

    </main>

    <footer id="colophon" class="site-footer">
        <!-- O conteúdo do footer será renderizado pelo React -->
        <div id="footer-root"></div>

        <div class="site-info bg-gray-900 text-white py-6">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <p class="text-sm">
                    <?php
                    printf(
                        esc_html__('© %1$s %2$s. Todos os direitos reservados.', 'ondapro'),
                        date('Y'),
                        get_bloginfo('name')
                    );
                    ?>
                </p>
            </div>
        </div>
    </footer>
</div>

<?php wp_footer(); ?>

<!-- Script para inicializar componentes React -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Aqui você pode adicionar a inicialização dos componentes React
    console.log('Onda Pro Landing Page carregada!');

    // Exemplo de como passar dados do WordPress para React
    if (typeof ondaproData !== 'undefined') {
        console.log('Dados WordPress disponíveis:', ondaproData);
    }
});
</script>

</body>
</html>
