# **jeddit**
📕 The minimal and reddit like forum

## Install
```bash
git clone https://github.com/kyro95/jeddit.git
cd reddit
npm install
npx prisma db push
```

## Setup
1. Create a **.env** file on root directory
```env
DATABASE_URL=YOURDATABASE_URL
GITHUB_CLIENT_ID=YOURAPPLICATION_CLIENT_ID
GITHUB_CLIENT_SECRET=YOURAPPLICATION_CLIENT_SECRET
```
2. Run this query on jeddit database
```sql
INSERT INTO category (name) VALUES ("home");
```

#### Credits
**[Next.js](https://nextjs.org/)**, **[TailwindCSS](https://tailwindcss.com/)**, **[daisyui](https://daisyui.com/)**
