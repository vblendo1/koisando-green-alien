<?php
/**
 * Template para Posts Individuais (Blog)
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="single-post-wrapper py-16 md:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <?php
        while (have_posts()) :
            the_post();
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class('post-content'); ?>>
                <header class="post-header mb-8">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="featured-image mb-8 rounded-2xl overflow-hidden shadow-2xl">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-auto')); ?>
                        </div>
                    <?php endif; ?>

                    <div class="post-meta mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <?php echo get_the_date(); ?>
                        </span>

                        <span class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <?php the_author(); ?>
                        </span>

                        <?php if (has_category()) : ?>
                            <span class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                <?php the_category(', '); ?>
                            </span>
                        <?php endif; ?>
                    </div>

                    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        <?php the_title(); ?>
                    </h1>
                </header>

                <div class="prose prose-lg max-w-none">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Páginas:', 'ondapro'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>

                <?php if (has_tag()) : ?>
                    <footer class="post-footer mt-12 pt-8 border-t border-gray-200">
                        <div class="flex flex-wrap gap-2">
                            <?php
                            $tags = get_the_tags();
                            if ($tags) {
                                foreach ($tags as $tag) {
                                    echo '<a href="' . get_tag_link($tag->term_id) . '" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 hover:from-purple-200 hover:to-blue-200 transition-colors">#' . $tag->name . '</a>';
                                }
                            }
                            ?>
                        </div>
                    </footer>
                <?php endif; ?>
            </article>

            <div class="post-navigation mt-12 pt-8 border-t border-gray-200">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <?php
                    $prev_post = get_previous_post();
                    if ($prev_post) :
                        ?>
                        <a href="<?php echo get_permalink($prev_post); ?>" class="group flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all">
                            <div class="flex-shrink-0">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Anterior</p>
                                <h3 class="font-bold text-gray-900 group-hover:text-purple-600 transition-colors"><?php echo get_the_title($prev_post); ?></h3>
                            </div>
                        </a>
                    <?php endif; ?>

                    <?php
                    $next_post = get_next_post();
                    if ($next_post) :
                        ?>
                        <a href="<?php echo get_permalink($next_post); ?>" class="group flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all text-right md:ml-auto">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Próximo</p>
                                <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors"><?php echo get_the_title($next_post); ?></h3>
                            </div>
                            <div class="flex-shrink-0">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </a>
                    <?php endif; ?>
                </div>
            </div>

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
