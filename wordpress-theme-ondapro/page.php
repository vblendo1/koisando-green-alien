<?php
/**
 * Template para Páginas Internas
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="page-wrapper py-16 md:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <?php
        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class('prose prose-lg max-w-none'); ?>>
                <header class="page-header mb-8">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        <?php the_title(); ?>
                    </h1>

                    <?php if (has_post_thumbnail()) : ?>
                        <div class="featured-image mb-8 rounded-2xl overflow-hidden shadow-xl">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-auto')); ?>
                        </div>
                    <?php endif; ?>
                </header>

                <div class="page-content">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Páginas:', 'ondapro'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </article>

            <?php
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>

        <?php
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
