
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ujiafldurotwmnjrdynz.supabase.co";

const supabaseKey = "sb_publishable_gbiw0K4WPUvgj9l_9Vkciw_QJqEJY5x";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
