import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Apple, Dumbbell, Droplet, Smile } from 'lucide-react';

interface DailyLog {
  id: string;
  log_date: string;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
  snacks: string | null;
  water_intake_liters: number | null;
  workout_type: string | null;
  workout_duration_minutes: number | null;
  workout_intensity: string | null;
  workout_notes: string | null;
  notes: string | null;
  mood: string | null;
}

export const DailyDiary = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: '',
    water_intake_liters: '',
    workout_type: '',
    workout_duration_minutes: '',
    workout_intensity: 'moderada',
    workout_notes: '',
    notes: '',
    mood: 'feliz',
  });

  useEffect(() => {
    fetchDailyLog();
  }, [selectedDate, user]);

  const fetchDailyLog = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('daily_log')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', selectedDate)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setDailyLog(data);
        setFormData({
          breakfast: data.breakfast || '',
          lunch: data.lunch || '',
          dinner: data.dinner || '',
          snacks: data.snacks || '',
          water_intake_liters: data.water_intake_liters?.toString() || '',
          workout_type: data.workout_type || '',
          workout_duration_minutes: data.workout_duration_minutes?.toString() || '',
          workout_intensity: data.workout_intensity || 'moderada',
          workout_notes: data.workout_notes || '',
          notes: data.notes || '',
          mood: data.mood || 'feliz',
        });
      } else {
        setDailyLog(null);
        setFormData({
          breakfast: '',
          lunch: '',
          dinner: '',
          snacks: '',
          water_intake_liters: '',
          workout_type: '',
          workout_duration_minutes: '',
          workout_intensity: 'moderada',
          workout_notes: '',
          notes: '',
          mood: 'feliz',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar diário:', error);
      toast.error('Erro ao carregar diário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const dataToSave = {
        user_id: user.id,
        log_date: selectedDate,
        breakfast: formData.breakfast || null,
        lunch: formData.lunch || null,
        dinner: formData.dinner || null,
        snacks: formData.snacks || null,
        water_intake_liters: formData.water_intake_liters ? parseFloat(formData.water_intake_liters) : null,
        workout_type: formData.workout_type || null,
        workout_duration_minutes: formData.workout_duration_minutes ? parseInt(formData.workout_duration_minutes) : null,
        workout_intensity: formData.workout_intensity || null,
        workout_notes: formData.workout_notes || null,
        notes: formData.notes || null,
        mood: formData.mood || null,
      };

      if (dailyLog) {
        const { error } = await supabase
          .from('daily_log')
          .update(dataToSave)
          .eq('id', dailyLog.id);

        if (error) throw error;
        toast.success('Diário atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('daily_log')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Diário registrado com sucesso!');
      }

      fetchDailyLog();
    } catch (error) {
      console.error('Erro ao salvar diário:', error);
      toast.error('Erro ao salvar diário');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smile className="h-5 w-5 text-primary" />
          Diário Diário
        </CardTitle>
        <CardDescription>
          Registre suas refeições, treinos e como você se sentiu
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Data</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={format(new Date(), 'yyyy-MM-dd')}
          />
          <p className="text-xs text-muted-foreground">
            {format(new Date(selectedDate), 'EEEE, dd MMMM yyyy', { locale: ptBR })}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Carregando diário...
          </div>
        ) : (
          <Tabs defaultValue="food" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="food" className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                <span className="hidden sm:inline">Alimentação</span>
              </TabsTrigger>
              <TabsTrigger value="workout" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span className="hidden sm:inline">Treino</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <Smile className="h-4 w-4" />
                <span className="hidden sm:inline">Notas</span>
              </TabsTrigger>
            </TabsList>

            {/* Food Tab */}
            <TabsContent value="food" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Café da Manhã</label>
                <Textarea
                  placeholder="O que você comeu no café da manhã?"
                  value={formData.breakfast}
                  onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Almoço</label>
                <Textarea
                  placeholder="O que você comeu no almoço?"
                  value={formData.lunch}
                  onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Jantar</label>
                <Textarea
                  placeholder="O que você comeu na janta?"
                  value={formData.dinner}
                  onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Lanches</label>
                <Textarea
                  placeholder="Lanches ou frutas que você comeu"
                  value={formData.snacks}
                  onChange={(e) => setFormData({ ...formData, snacks: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  Ingestão de Água (litros)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  placeholder="Ex: 2.5"
                  value={formData.water_intake_liters}
                  onChange={(e) => setFormData({ ...formData, water_intake_liters: e.target.value })}
                />
              </div>
            </TabsContent>

            {/* Workout Tab */}
            <TabsContent value="workout" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de Treino</label>
                <Input
                  placeholder="Ex: Musculação, Cardio, Yoga, Pilates"
                  value={formData.workout_type}
                  onChange={(e) => setFormData({ ...formData, workout_type: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Duração (minutos)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 60"
                    value={formData.workout_duration_minutes}
                    onChange={(e) => setFormData({ ...formData, workout_duration_minutes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Intensidade</label>
                  <select
                    value={formData.workout_intensity}
                    onChange={(e) => setFormData({ ...formData, workout_intensity: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="leve">Leve</option>
                    <option value="moderada">Moderada</option>
                    <option value="intensa">Intensa</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Notas do Treino</label>
                <Textarea
                  placeholder="Como você se sentiu? Alguma dificuldade?"
                  value={formData.workout_notes}
                  onChange={(e) => setFormData({ ...formData, workout_notes: e.target.value })}
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Como você se sentiu?</label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                >
                  <option value="muito-feliz">😄 Muito Feliz</option>
                  <option value="feliz">😊 Feliz</option>
                  <option value="neutro">😐 Neutro</option>
                  <option value="triste">😔 Triste</option>
                  <option value="muito-triste">😢 Muito Triste</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Notas Gerais</label>
                <Textarea
                  placeholder="Adicione qualquer observação sobre seu dia..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? 'Salvando...' : 'Salvar Diário'}
        </Button>
      </CardContent>
    </Card>
  );
};
