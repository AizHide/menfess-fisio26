MENFESS NGL — S1 FISIOTERAPI 26
================================

FILE WEBSITE: index.html
DEPLOY: upload the whole ZIP folder/project to Netlify (not just index.html).
The ZIP includes Netlify Functions and database schema. Online messaging/admin will work only after setup.

1) SUPABASE
- Create a project at https://supabase.com
- Open SQL Editor, paste schema.sql, and run it.
- In Project Settings / API, copy Project URL and service_role key. Keep the service_role key private.

2) NETLIFY
- Deploy this project as a folder/repository containing index.html, netlify.toml, package.json and netlify/functions.
- In Site configuration > Environment variables, add:
  SUPABASE_URL = Project URL from Supabase
  SUPABASE_SERVICE_ROLE_KEY = Supabase service_role key
  ADMIN_PASSWORD = adminmenfesfisio (or choose a different strong password)
  JWT_SECRET = a long random secret (at least 32 random characters)
- Trigger a new deploy after setting environment variables.

3) TEST
- Send a test message; only after database insert succeeds will the “Terima kasih sudah mengirim pesan!” screen appear.
- Login with one of: Daffa, Asna, Celo, Shelo, Jonathan
- Password is exactly the ADMIN_PASSWORD value you set in Netlify.
- If a message fails to save, the form displays an error instead of falsely showing success.

IMPORTANT
- This ZIP cannot configure your personal Netlify/Supabase account automatically; setup above is required.
- Keep SUPABASE_SERVICE_ROLE_KEY and JWT_SECRET private. Do not share them in chat.
- Messages are stored online in Supabase and can be viewed by all five admins after login.
