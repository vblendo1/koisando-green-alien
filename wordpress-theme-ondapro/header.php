<?php
/**
 * Header do Tema
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-white text-gray-900'); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Pular para o conteúdo', 'ondapro'); ?></a>

    <header id="masthead" class="site-header">
        <!-- O conteúdo do header será renderizado pelo React -->
        <div id="navbar-root"></div>
    </header>

    <main id="primary" class="site-main">
