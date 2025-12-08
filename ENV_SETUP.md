# Environment Variables Setup Guide

## 🔐 Security Configuration

Your EmailJS credentials are now stored securely in environment variables.

---

## 📁 Files Created

### 1. `.env` (Private - Not committed to Git)
Contains your actual EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=service_ga9afwi
VITE_EMAILJS_TEMPLATE_ID=template_ct9ro45
VITE_EMAILJS_PUBLIC_KEY=A8wCGZaltsQEt48vh
```

### 2. `.env.example` (Public - Template for other developers)
Contains placeholder values:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. `.gitignore` (Updated)
Now includes environment files to prevent committing sensitive data:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

---

## 🚀 Setup Instructions

### For the First Time:

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your EmailJS credentials:**
   - Open `.env` file
   - Replace placeholder values with your actual credentials
   - Get credentials from: https://dashboard.emailjs.com/

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

### For Other Developers:

If someone clones this repository:

1. Copy `.env.example` to `.env`
2. Request EmailJS credentials from the project owner
3. Add credentials to their local `.env` file
4. The `.env` file will NOT be committed to version control

---

## ⚠️ Important Notes

### ✅ DO:
- Keep `.env` file private and never commit it
- Use `.env.example` to document required environment variables
- Share credentials securely (not via email or public channels)
- Restart dev server after changing environment variables

### ❌ DON'T:
- Never commit `.env` to version control
- Don't share `.env` file publicly
- Don't hardcode credentials in source code
- Don't push `.env` to GitHub/GitLab

---

## 🔧 How It Works

### Vite Environment Variables

Vite uses `import.meta.env` to access environment variables:

```javascript
// In your React components:
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
```

### Variable Naming Convention

- **Must start with `VITE_`** - Vite only exposes variables with this prefix
- Example: `VITE_EMAILJS_SERVICE_ID` ✅
- Example: `EMAILJS_SERVICE_ID` ❌ (won't work)

---

## 🧪 Verify Setup

To check if environment variables are loaded correctly:

1. Open browser console (F12)
2. Type:
   ```javascript
   console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
   ```
3. You should see your service ID (not `undefined`)

---

## 🔄 Deployment

When deploying to production (Vercel, Netlify, etc.):

### Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Redeploy your application

### Netlify:
1. Go to Site Settings → Build & deploy → Environment
2. Add each variable with its value
3. Trigger a new deployment

### Other Platforms:
Check your platform's documentation for setting environment variables.

---

## 📝 Current Variables

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service ID | ✅ Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Template ID | ✅ Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Public Key | ✅ Yes |

---

## 🐛 Troubleshooting

### Problem: Environment variables showing as `undefined`

**Solutions:**
1. Make sure variable names start with `VITE_`
2. Restart your development server
3. Check `.env` file is in the project root
4. Verify no typos in variable names

### Problem: Changes to `.env` not reflecting

**Solution:**
- Always restart the development server after changing `.env`:
  ```bash
  # Stop the server (Ctrl+C)
  # Then restart
  npm run dev
  ```

### Problem: Works locally but not in production

**Solution:**
- Make sure environment variables are set in your hosting platform
- Check deployment logs for errors
- Verify variable names match exactly (case-sensitive)

---

## 📚 Additional Resources

- [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-mode.html)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

---

## ✅ Checklist

Before committing code:
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is updated with new variables
- [ ] No hardcoded credentials in source code
- [ ] Environment variables tested locally
- [ ] Production environment variables configured

---

**Note:** The `.env` file is already created with your credentials. You don't need to do anything unless you want to change them!

