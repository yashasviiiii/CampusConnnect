// src/utils/updateProfile.ts
import { supabase } from '../lib/supabase';

export const updateProfile = async (
  userId: string,
  name: string,
  college_id: string
): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ name, college_id })
    .eq('id', userId);

  if (error) throw error;
};




