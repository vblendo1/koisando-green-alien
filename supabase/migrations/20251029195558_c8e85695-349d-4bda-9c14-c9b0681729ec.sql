-- Inserir perfis para usuários existentes
INSERT INTO public.profiles (id, name)
VALUES 
  ('fce404c7-85a2-4230-839a-4f4bb8d7e0fb', 'Admin'),
  ('9c1f2dbc-4ff0-468c-82cf-e49462ec7528', 'Victor Blendo')
ON CONFLICT (id) DO NOTHING;

-- Adicionar role admin para blendo@admin.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('fce404c7-85a2-4230-839a-4f4bb8d7e0fb', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Criar produto de exemplo
INSERT INTO public.products (name, slug, description, cover_image)
VALUES (
  'Programa de Emagrecimento 12 Semanas',
  'emagrecimento-12-semanas',
  'Transforme seu corpo em 12 semanas com treinos personalizados, plano alimentar e suporte contínuo.',
  NULL
)
ON CONFLICT DO NOTHING;

-- Dar acesso ao produto para os usuários
INSERT INTO public.user_products (user_id, product_id)
SELECT 
  u.id,
  p.id
FROM (VALUES 
  ('fce404c7-85a2-4230-839a-4f4bb8d7e0fb'::uuid),
  ('9c1f2dbc-4ff0-468c-82cf-e49462ec7528'::uuid)
) AS u(id)
CROSS JOIN products p
WHERE p.slug = 'emagrecimento-12-semanas'
ON CONFLICT DO NOTHING;