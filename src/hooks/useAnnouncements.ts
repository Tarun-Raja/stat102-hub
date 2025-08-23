import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Announcement } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedAnnouncements = data.map(item => ({
        id: item.id,
        title: item.title,
        body: item.body,
        link: item.link || '',
        pinned: item.pinned,
        createdAt: item.created_at
      }));

      setAnnouncements(formattedAnnouncements);
    } catch (error: any) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "Error",
        description: "Failed to load announcements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .insert({
          title: announcement.title,
          body: announcement.body,
          link: announcement.link,
          pinned: announcement.pinned,
        });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'announcement',
          title: announcement.title,
          content: announcement.body
        }
      });

      toast({
        title: "Success",
        description: "Announcement posted and notifications sent!",
      });

      fetchAnnouncements(); // Refresh the list
    } catch (error: any) {
      console.error('Error adding announcement:', error);
      toast({
        title: "Error",
        description: "Failed to post announcement",
        variant: "destructive"
      });
    }
  };

  const togglePin = async (id: string) => {
    try {
      const announcement = announcements.find(a => a.id === id);
      if (!announcement) return;

      const { error } = await supabase
        .from('announcements')
        .update({ pinned: !announcement.pinned })
        .eq('id', id);

      if (error) throw error;

      fetchAnnouncements(); // Refresh the list
    } catch (error: any) {
      console.error('Error toggling pin:', error);
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive"
      });
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement deleted",
      });

      fetchAnnouncements(); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('announcements-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements'
        },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    announcements,
    loading,
    addAnnouncement,
    togglePin,
    deleteAnnouncement,
    refresh: fetchAnnouncements
  };
}