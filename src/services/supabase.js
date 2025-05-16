import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zwnpinbeyaqhrmbeghcw.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bnBpbmJleWFxaHJtYmVnaGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzUwMjUsImV4cCI6MjA2MjY1MTAyNX0.EVM21Z4QGJ2zZrf05Sa1o9nUA4nkoCza8Rnhmumy8K0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
