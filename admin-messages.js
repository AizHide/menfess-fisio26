const crypto=require("crypto");
const {createClient}=require("@supabase/supabase-js");
function valid(token){try{const [p,s]=String(token||"").split(".");if(!p||!s||!process.env.JWT_SECRET)return false;const exp=crypto.createHmac("sha256",process.env.JWT_SECRET).update(p).digest("base64url");if(exp!==s)return false;const o=JSON.parse(Buffer.from(p,"base64url").toString());return o.exp>Date.now()}catch{return false}}
exports.handler=async(event)=>{
 const headers={"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
 if(event.httpMethod!=="GET")return{statusCode:405,headers,body:JSON.stringify({error:"Method not allowed"})};
 const token=(event.headers.authorization||event.headers.Authorization||"").replace(/^Bearer\s+/i,"");
 if(!valid(token))return{statusCode:401,headers,body:JSON.stringify({error:"Sesi login tidak valid. Silakan login lagi."})};
 try{if(!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)throw new Error("Konfigurasi database belum lengkap di Netlify.");
 const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
 const {data,error}=await db.from("menfess_messages").select("id,to,from,message,song,created_at").order("created_at",{ascending:false}).limit(500);
 if(error)throw error;return{statusCode:200,headers,body:JSON.stringify({messages:data||[]})}
 }catch(e){return{statusCode:500,headers,body:JSON.stringify({error:e.message||"Gagal mengambil pesan."})}}
};