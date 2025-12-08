# EmailJS Integration Guide

## ✅ Integration Complete!

Your DemoForm component is now integrated with EmailJS. Here's what has been set up:

### 📦 Installed Package
- `@emailjs/browser` - EmailJS library for sending emails from the browser

### 🔑 Your Configuration
```javascript
Service ID: service_ga9afwi
Template ID: template_ct9ro45
Public Key: A8wCGZaltsQEt48vh
```

---

## 📧 EmailJS Template Setup

To receive form submissions, you need to configure your EmailJS template with these variables:

### Required Template Variables

Your EmailJS template should include these variables to receive all form data:

```
{{from_name}}          - User's full name
{{institution_name}}   - College/Institution name
{{email}}             - User's email address
{{mobile}}            - User's mobile number
{{designation}}       - User's designation/role
{{location}}          - User's location (City, State)
{{to_email}}          - Your receiving email (optional)
```

### Sample Email Template

Here's a recommended template structure for your EmailJS dashboard:

```html
Subject: New Demo Request from {{from_name}}

Hello,

You have received a new demo request with the following details:

Name: {{from_name}}
Institution: {{institution_name}}
Email: {{email}}
Mobile: {{mobile}}
Designation: {{designation}}
Location: {{location}}

Please contact them as soon as possible.

Best regards,
Okrion Accreditation System
```

---

## 🎯 How to Set Up Your EmailJS Template

1. **Login to EmailJS Dashboard**
   - Go to: https://dashboard.emailjs.com/
   - Navigate to "Email Templates"

2. **Find Your Template**
   - Look for template ID: `template_ct9ro45`
   - Click "Edit"

3. **Configure Template Content**
   - Set the **Subject** (e.g., "New Demo Request from {{from_name}}")
   - Set the **To Email** (your email where you want to receive requests)
   - Use the template variables above in the **Content** section

4. **Example Template Structure**

   **Subject:**
   ```
   New Demo Request - {{institution_name}}
   ```

   **Content:**
   ```
   New Demo Request Received
   
   Contact Details:
   ─────────────────────
   Name: {{from_name}}
   Institution: {{institution_name}}
   Email: {{email}}
   Mobile: {{mobile}}
   Designation: {{designation}}
   Location: {{location}}
   
   Please reach out to them at the earliest convenience.
   
   This is an automated notification from your Okrion website.
   ```

5. **Test Your Template**
   - Click "Test it" in the EmailJS dashboard
   - Fill in sample values for all variables
   - Send a test email to verify

---

## ✨ Features Implemented

### 1. **Form Submission**
- All form fields are captured and sent via email
- Form validates all required fields before submission

### 2. **Loading State**
- Submit button shows "Submitting..." during email send
- All form fields are disabled during submission
- Button becomes non-interactive to prevent double submissions

### 3. **Success/Error Messages**
- ✅ **Success**: Green notification when email is sent successfully
- ❌ **Error**: Red notification if email fails to send
- Messages appear above the form with clear styling

### 4. **Auto-Reset**
- Form automatically resets after successful submission
- User can immediately submit another request

### 5. **Form Fields Sent**
- Name
- Institution Name
- Official Email Address
- Mobile Number
- Designation/Role
- Location (City, State format with autocomplete)

---

## 🧪 Testing Your Integration

### Step 1: Test the Form
1. Fill out all fields in the form
2. Click "Submit"
3. Watch for the success message

### Step 2: Check Your Email
- Check the email address configured in your EmailJS template
- You should receive an email with all the form details

### Step 3: Troubleshooting
If emails aren't arriving:

1. **Check EmailJS Dashboard**
   - Go to https://dashboard.emailjs.com/
   - Check your usage/quota
   - Verify your template is active

2. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for any error messages
   - Email send status will be logged

3. **Verify Template Variables**
   - Make sure all variables in your template match the ones listed above
   - Check for typos in variable names (they're case-sensitive)

4. **Test Template Directly**
   - Use EmailJS dashboard's test feature
   - This helps isolate template vs. code issues

---

## 🔒 Security Notes

✅ **Your Public Key is Safe**
- The public key (`A8wCGZaltsQEt48vh`) is designed to be used in frontend code
- It's safe to commit to version control

⚠️ **Keep Your Private Key Secret**
- Never expose your EmailJS private key
- Don't commit it to public repositories

---

## 📝 Additional Customization

### Change Receiving Email
Currently, the form sends to the email configured in your EmailJS template. To dynamically set it:

```javascript
// In DemoForm.jsx, line ~132
to_email: 'your-email@example.com' // Change this to your actual email
```

### Add More Fields
If you want to add more form fields:

1. Add the input field in the JSX with a `name` attribute
2. Add the field to the `formData` object in `handleSubmit`
3. Add the corresponding variable to your EmailJS template

### Custom Success Action
After successful submission, you can add custom behavior:

```javascript
// In DemoForm.jsx, after line ~144
// Add your custom code here, e.g.:
// - Redirect user
// - Show modal
// - Track analytics
```

---

## 📊 Current Form Fields Mapping

| Form Field | Variable Name | EmailJS Template Variable |
|-----------|---------------|---------------------------|
| Name | name | `{{from_name}}` |
| Institution | institution | `{{institution_name}}` |
| Email | email | `{{email}}` |
| Mobile | mobile | `{{mobile}}` |
| Designation | designation | `{{designation}}` |
| Location | location | `{{location}}` |

---

## 🎉 You're All Set!

Your form is now fully functional and will send emails through EmailJS. Make sure to:

1. ✅ Configure your EmailJS template with the variables listed above
2. ✅ Test the form to ensure emails are received
3. ✅ Update the receiving email address if needed

If you have any questions or need help, refer to:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Your EmailJS Dashboard: https://dashboard.emailjs.com/

---

**Need Help?**
- Check the browser console for detailed error messages
- Review your EmailJS quota and settings
- Verify all template variables are correctly set

