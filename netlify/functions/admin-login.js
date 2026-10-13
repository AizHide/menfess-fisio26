const crypto=require("crypto");
function b64(o){return Buffer.from(JSON.stringify(o)).toString("base64url")}
exports.handler=async(event)=>{
 const headers={"Content-Type":"application/json","Access-Control-Allow-Origin":"*"};
 if(event.httpMethod!=="POST")return{statusCode:405,headers,body:JSON.stringify({error:"Method not allowed"})};
 try{
  const {name,password}=JSON.parse(event.body||"{}");
  const names=["Daffa","Asna","Celo","Shelo","Jonathan"];
  if(!names.includes(name))return{statusCode:401,headers,body:JSON.stringify({error:"Nama admin tidak dikenal."})};
  if(!process.env.ADMIN_PASSWORD||!process.env.JWT_SECRET)return{statusCode:500,headers,body:JSON.stringify({error:"Admin belum dikonfigurasi. Atur ADMIN_PASSWORD dan JWT_SECRET di Netlify."})};
  if(password!==process.env.ADMIN_PASSWORD)return{statusCode:401,headers,body:JSON.stringify({error:"Sandi salah. Gunakan sandi ADMIN_PASSWORD yang disetel di Netlify."})};
  const payload=b64({name,exp:Date.now()+8*60*60*1000});
  const sig=crypto.createHmac("sha256",process.env.JWT_SECRET).update(payload).digest("base64url");
  return{statusCode:200,headers,body:JSON.stringify({token:payload+"."+sig})};
 }catch(e){return{statusCode:400,headers,body:JSON.stringify({error:"Permintaan login tidak valid."})}}
};
