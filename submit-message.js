const { createClient } = require("@supabase/supabase-js");
exports.handler = async (event) => {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
  if (event.httpMethod === "OPTIONS") return {statusCode:204,headers};
  if (event.httpMethod !== "POST") return {statusCode:405,headers,body:JSON.stringify({error:"Method not allowed"})};
  try {
    const {to,from,message,song} = JSON.parse(event.body || "{}");
    if (!to || !message || !String(to).trim() || !String(message).trim()) return {statusCode:400,headers,body:JSON.stringify({error:"Kepada dan pesan wajib diisi."})};
    if (Array.from(String(message)).length > 160) return {statusCode:400,headers,body:JSON.stringify({error:"Pesan maksimal 160 karakter."})};
    const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(!url||!key) return {statusCode:500,headers,body:JSON.stringify({error:"Konfigurasi database belum lengkap di Netlify."})};
    const db=createClient(url,key);
    const {error}=await db.from("menfess_messages").insert([{to:String(to).trim(),from:String(from||"").trim(),message:String(message).trim(),song:String(song||"").trim()}]);
    if(error) throw error;
    return {statusCode:200,headers,body:JSON.stringify({ok:true})};
  } catch(e) { return {statusCode:500,headers,body:JSON.stringify({error:e.message||"Gagal menyimpan pesan."})}; }
};