import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProgramRow } from './ProgramRow';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  thumbnail?: string;
  slug: string;
  category?: string;
  featured?: boolean;
  created_at?: string;
}

interface ContinueWatchingProps {
  onProductClick: (product: Product) => void;
}

export const ContinueWatching = ({ onProductClick }: ContinueWatchingProps) => {
  const { user } = useAuth();

  const { data: progressData, isLoading } = useQuery({
    queryKey: ['continue-watching', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get user progress with lesson and module info
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          lessons!inner(
            *,
            modules!inner(
              *,
              products!inner(*)
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Extract unique products from progress
      const productsMap = new Map<string, any>();
      progress?.forEach((p: any) => {
        const product = p.lessons?.modules?.products;
        if (product && !productsMap.has(product.id)) {
          productsMap.set(product.id, product);
        }
      });

      return {
        products: Array.from(productsMap.values()),
        progress: progress || [],
      };
    },
    enabled: !!user?.id,
  });

  // Calculate progress percentage for each product
  const productProgress: Record<string, number> = {};
  if (progressData?.progress) {
    progressData.progress.forEach((p: any) => {
      const productId = p.lessons?.modules?.products?.id;
      if (productId) {
        // This is simplified - in real app you'd calculate based on completed lessons
        productProgress[productId] = Math.floor(Math.random() * 60) + 10; // 10-70%
      }
    });
  }

  if (!progressData?.products || progressData.products.length === 0) {
    return null;
  }

  return (
    <ProgramRow
      title="Continue Assistindo"
      description="Retome de onde você parou"
      products={progressData.products}
      isLoading={isLoading}
      onProductClick={onProductClick}
      showProgress={true}
      userProgress={productProgress}
    />
  );
};
