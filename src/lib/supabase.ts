import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://yhrriccchchhjwozptzb.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlocnJpY2NjaGNoaGp3b3pwdHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1Mjk2MTcsImV4cCI6MjA4NjEwNTYxN30.Zhcm4WCQdpq1stZXJ1_GHCLidyBDbkzvbp1DlY12RRc';

let supabase: SupabaseClient | null = null;
if (supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_snippet: string | null;
  category: string;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const SITE_ID = '4b168687-1228-4e34-b5a9-657ff8902618';

export async function getArticles(limit = 100): Promise<Article[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('calculator_articles')
    .select('*')
    .eq('site_id', SITE_ID)
    .eq('status', 'publish')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('calculator_articles')
    .select('*')
    .eq('site_id', SITE_ID)
    .eq('slug', slug)
    .eq('status', 'publish')
    .single();

  if (error) return null;
  return data;
}

export async function getArticlesByCategory(category: string, limit = 50): Promise<Article[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('calculator_articles')
    .select('*')
    .eq('site_id', SITE_ID)
    .eq('category', category)
    .eq('status', 'publish')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}
