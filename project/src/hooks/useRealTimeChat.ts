import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../lib/supabase';

type Message = Database['public']['Tables']['messages']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export const useRealTimeChat = () => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Profile[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !profile) return;

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    // Get users from same college
    const fetchCollegeUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('college_name', profile.college_name)
        .neq('id', user.id);

      if (data && !error) {
        setOnlineUsers(data);
      }
    };

    fetchCollegeUsers();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [user, profile]);

  const sendMessage = async (receiverId: string, content: string) => {
    if (!user) return;

    const conversationId = [user.id, receiverId].sort().join('-');

    const { error } = await supabase
      .from('messages')
      .insert({
        content,
        sender_id: user.id,
        receiver_id: receiverId,
        conversation_id: conversationId,
      });

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const getConversation = async (userId: string) => {
    if (!user) return [];

    const conversationId = [user.id, userId].sort().join('-');

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching conversation:', error);
      return [];
    }

    return data || [];
  };

  return {
    messages,
    onlineUsers,
    conversations,
    sendMessage,
    getConversation,
  };
};