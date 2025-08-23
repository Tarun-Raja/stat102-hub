import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Material } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedMaterials = data.map(item => ({
        id: item.id,
        title: item.title,
        desc: item.description,
        url: item.file_path,
        type: item.file_type,
        module: item.module,
        createdAt: item.created_at
      }));

      setMaterials(formattedMaterials);
    } catch (error: any) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Error",
        description: "Failed to load materials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async (material: Omit<Material, 'id' | 'createdAt'>, file?: File) => {
    try {
      let filePath = material.url;
      
      // If file is provided, upload it to Supabase Storage
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('course-materials')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('course-materials')
          .getPublicUrl(uploadData.path);
        
        filePath = publicUrl;
      }

      const { error } = await supabase
        .from('materials')
        .insert({
          title: material.title,
          description: material.desc,
          file_name: file?.name || material.title,
          file_path: filePath,
          file_size: file?.size || 0,
          file_type: material.type,
          module: material.module,
        });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'material',
          title: material.title,
          materialType: material.type
        }
      });

      toast({
        title: "Success",
        description: "Material uploaded and notifications sent!",
      });

      fetchMaterials(); // Refresh the list
    } catch (error: any) {
      console.error('Error adding material:', error);
      toast({
        title: "Error",
        description: "Failed to upload material",
        variant: "destructive"
      });
    }
  };

  const deleteMaterial = async (id: string) => {
    try {
      // Get the material to find the file path
      const material = materials.find(m => m.id === id);
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Delete from storage if it's a Supabase storage URL
      if (material?.url?.includes('supabase')) {
        const pathMatch = material.url.match(/course-materials\/(.+)$/);
        if (pathMatch) {
          await supabase.storage
            .from('course-materials')
            .remove([pathMatch[1]]);
        }
      }

      toast({
        title: "Success",
        description: "Material deleted",
      });

      fetchMaterials(); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting material:', error);
      toast({
        title: "Error",
        description: "Failed to delete material",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMaterials();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('materials-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'materials'
        },
        () => {
          fetchMaterials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    materials,
    loading,
    addMaterial,
    deleteMaterial,
    refresh: fetchMaterials
  };
}