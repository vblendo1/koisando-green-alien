<?php
/**
 * Onda Pro Landing Page - Functions
 *
 * @package OndaPro
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Setup do Tema
 */
function ondapro_setup() {
    // Adicionar suporte a título dinâmico
    add_theme_support('title-tag');

    // Adicionar suporte a imagens destacadas
    add_theme_support('post-thumbnails');

    // Adicionar suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Adicionar suporte a logo customizado
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Registrar menu de navegação
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'ondapro'),
    ));
}
add_action('after_setup_theme', 'ondapro_setup');

/**
 * Enfileirar Scripts e Estilos
 */
function ondapro_scripts() {
    // Desabilitar jQuery padrão do WordPress
    wp_deregister_script('jquery');

    // Registrar Tailwind CSS via CDN (para desenvolvimento - use build em produção)
    wp_enqueue_style('tailwindcss', 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css', array(), '3.4.1');

    // Estilo principal do tema
    wp_enqueue_style('ondapro-style', get_stylesheet_uri(), array('tailwindcss'), '1.0.0');

    // React e ReactDOM
    wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.3.1', true);
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.3.1', true);

    // Framer Motion
    wp_enqueue_script('framer-motion', 'https://unpkg.com/framer-motion@11/dist/framer-motion.js', array('react'), '11.0.0', true);

    // Script principal do tema (aqui você compilaria seu React app)
    wp_enqueue_script('ondapro-app', get_template_directory_uri() . '/assets/js/app.js', array('react', 'react-dom', 'framer-motion'), '1.0.0', true);

    // Passar dados PHP para JavaScript
    wp_localize_script('ondapro-app', 'ondaproData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('ondapro_nonce'),
        'siteUrl' => get_site_url(),
    ));
}
add_action('wp_enqueue_scripts', 'ondapro_scripts');

/**
 * Registrar Widget Areas
 */
function ondapro_widgets_init() {
    register_sidebar(array(
        'name'          => __('Rodapé 1', 'ondapro'),
        'id'            => 'footer-1',
        'description'   => __('Primeira coluna do rodapé', 'ondapro'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Rodapé 2', 'ondapro'),
        'id'            => 'footer-2',
        'description'   => __('Segunda coluna do rodapé', 'ondapro'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Rodapé 3', 'ondapro'),
        'id'            => 'footer-3',
        'description'   => __('Terceira coluna do rodapé', 'ondapro'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'ondapro_widgets_init');

/**
 * Handler AJAX para envio de formulário de contato
 */
function ondapro_submit_contact_form() {
    check_ajax_referer('ondapro_nonce', 'nonce');

    $nome = sanitize_text_field($_POST['nome']);
    $email = sanitize_email($_POST['email']);
    $telefone = sanitize_text_field($_POST['telefone']);
    $empresa = sanitize_text_field($_POST['empresa']);
    $mensagem = sanitize_textarea_field($_POST['mensagem']);

    // Validação básica
    if (empty($nome) || empty($email) || empty($telefone)) {
        wp_send_json_error(array('message' => 'Por favor, preencha todos os campos obrigatórios.'));
    }

    if (!is_email($email)) {
        wp_send_json_error(array('message' => 'E-mail inválido.'));
    }

    // E-mail do administrador
    $admin_email = get_option('admin_email');
    $subject = 'Novo lead capturado - Onda Pro';

    $body = "Novo contato recebido:\n\n";
    $body .= "Nome: $nome\n";
    $body .= "E-mail: $email\n";
    $body .= "Telefone: $telefone\n";
    $body .= "Empresa: $empresa\n";
    $body .= "Mensagem: $mensagem\n";

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    $sent = wp_mail($admin_email, $subject, $body, $headers);

    if ($sent) {
        // Opcional: Salvar lead no banco de dados
        $lead_data = array(
            'post_title'    => $nome,
            'post_content'  => $mensagem,
            'post_status'   => 'publish',
            'post_type'     => 'lead',
            'meta_input'    => array(
                'email' => $email,
                'telefone' => $telefone,
                'empresa' => $empresa,
            ),
        );

        wp_insert_post($lead_data);

        wp_send_json_success(array('message' => 'Mensagem enviada com sucesso!'));
    } else {
        wp_send_json_error(array('message' => 'Erro ao enviar mensagem. Tente novamente.'));
    }
}
add_action('wp_ajax_submit_contact_form', 'ondapro_submit_contact_form');
add_action('wp_ajax_nopriv_submit_contact_form', 'ondapro_submit_contact_form');

/**
 * Registrar Custom Post Type para Leads
 */
function ondapro_register_lead_cpt() {
    $labels = array(
        'name'               => 'Leads',
        'singular_name'      => 'Lead',
        'menu_name'          => 'Leads',
        'add_new'            => 'Adicionar Novo',
        'add_new_item'       => 'Adicionar Novo Lead',
        'edit_item'          => 'Editar Lead',
        'new_item'           => 'Novo Lead',
        'view_item'          => 'Ver Lead',
        'search_items'       => 'Buscar Leads',
        'not_found'          => 'Nenhum lead encontrado',
        'not_found_in_trash' => 'Nenhum lead na lixeira',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-groups',
        'supports'            => array('title', 'editor'),
    );

    register_post_type('lead', $args);
}
add_action('init', 'ondapro_register_lead_cpt');

/**
 * Adicionar colunas personalizadas na lista de leads
 */
function ondapro_lead_columns($columns) {
    $columns = array(
        'cb' => '<input type="checkbox" />',
        'title' => 'Nome',
        'email' => 'E-mail',
        'telefone' => 'Telefone',
        'empresa' => 'Empresa',
        'date' => 'Data',
    );
    return $columns;
}
add_filter('manage_lead_posts_columns', 'ondapro_lead_columns');

function ondapro_lead_column_content($column, $post_id) {
    switch ($column) {
        case 'email':
            echo get_post_meta($post_id, 'email', true);
            break;
        case 'telefone':
            echo get_post_meta($post_id, 'telefone', true);
            break;
        case 'empresa':
            echo get_post_meta($post_id, 'empresa', true);
            break;
    }
}
add_action('manage_lead_posts_custom_column', 'ondapro_lead_column_content', 10, 2);

/**
 * Customizer - Opções do Tema
 */
function ondapro_customize_register($wp_customize) {
    // Seção de Contato
    $wp_customize->add_section('ondapro_contact', array(
        'title'    => __('Informações de Contato', 'ondapro'),
        'priority' => 30,
    ));

    // Telefone
    $wp_customize->add_setting('ondapro_phone', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('ondapro_phone', array(
        'label'    => __('Telefone', 'ondapro'),
        'section'  => 'ondapro_contact',
        'type'     => 'text',
    ));

    // WhatsApp
    $wp_customize->add_setting('ondapro_whatsapp', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('ondapro_whatsapp', array(
        'label'    => __('WhatsApp', 'ondapro'),
        'section'  => 'ondapro_contact',
        'type'     => 'text',
    ));

    // E-mail
    $wp_customize->add_setting('ondapro_email', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('ondapro_email', array(
        'label'    => __('E-mail', 'ondapro'),
        'section'  => 'ondapro_contact',
        'type'     => 'email',
    ));
}
add_action('customize_register', 'ondapro_customize_register');
