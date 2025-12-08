# 📊 Google Sheets Integration Guide

## Overview

This guide will help you automatically save form submissions to Google Sheets.

**What happens when a user submits the form:**
1. ✅ Email is sent via EmailJS
2. ✅ Data is saved to Google Sheets automatically
3. ✅ User sees success message

---

## 🚀 Quick Setup (Step-by-Step)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Demo Form Submissions"** (or any name you prefer)
4. Create column headers in Row 1:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| **Timestamp** | **Name** | **Institution** | **Email** | **Mobile** | **Designation** | **Location** |

---

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. **Copy and paste this code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    var timestamp = new Date();
    
    // Append the data as a new row
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.institution || '',
      data.email || '',
      data.mobile || '',
      data.designation || '',
      data.location || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'message': 'Data saved successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'message': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      'result': 'success', 
      'message': 'API is working' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (💾 icon) and name it "Form Submission Handler"

---

### Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description:** "Demo Form Submission API"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone" (Important!)
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Form Submission Handler (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/AKfyc...`)

⚠️ **IMPORTANT:** Save this URL! You'll need it in the next step.

---

### Step 4: Add URL to Environment Variables

1. Open your `.env` file
2. Add this line (replace with your actual URL):

```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

3. Update `.env.example` as well:

```env
VITE_GOOGLE_SHEETS_URL=your_google_apps_script_url
```

---

### Step 5: Test the Integration

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Submit a test form:**
   - Fill out all fields
   - Click Submit
   - Check for success message

3. **Verify in Google Sheets:**
   - Open your Google Sheet
   - You should see a new row with the submission data

---

## 📋 Google Sheet Column Structure

Your sheet should have these columns (in order):

| Column | Header | Data Type | Example |
|--------|--------|-----------|---------|
| A | Timestamp | Date/Time | 12/8/2025 10:30:45 |
| B | Name | Text | John Doe |
| C | Institution | Text | ABC University |
| D | Email | Text | john@university.edu |
| E | Mobile | Text | +91 9876543210 |
| F | Designation | Text | Principal/HOD/Administrator |
| G | Location | Text | Coimbatore, Tamil Nadu |

---

## 🎨 Optional: Format Your Google Sheet

### 1. Freeze Header Row
1. Click on Row 1
2. Go to **View** → **Freeze** → **1 row**

### 2. Auto-resize Columns
1. Select all columns (click the square between A and 1)
2. Right-click any column header
3. Click **Resize columns A-G**
4. Choose **Fit to data**

### 3. Format Timestamp Column
1. Select Column A
2. Click **Format** → **Number** → **Date time**

### 4. Apply Colors (Optional)
1. Select Row 1 (header row)
2. Click the fill color icon
3. Choose a color (e.g., light blue)
4. Make text bold

---

## 🔧 Troubleshooting

### Problem: "Failed to save to Google Sheets"

**Solutions:**
1. Check if your Google Apps Script URL is correct in `.env`
2. Make sure "Who has access" is set to "Anyone"
3. Verify you authorized the script
4. Check the Google Sheet isn't deleted

### Problem: "Data not appearing in sheet"

**Solutions:**
1. Check if you're looking at the correct Google Sheet
2. Verify column headers are in Row 1
3. Open Apps Script and check **Executions** for errors
4. Make sure the sheet isn't protected

### Problem: "Permission denied"

**Solutions:**
1. Re-deploy the script
2. Make sure "Execute as" is set to "Me"
3. Reauthorize the script
4. Check "Who has access" is "Anyone"

### Problem: "Script is taking too long"

**Solutions:**
1. Check your internet connection
2. Try submitting again
3. The email might still work even if sheets fails

---

## 📊 View Script Logs

To debug issues:

1. Open your Google Apps Script
2. Click **Executions** (clock icon on left)
3. See all recent executions and any errors
4. Click on any execution to see details

---

## 🔒 Security Notes

### Is this secure?

✅ **YES** - Here's why:
- The script only accepts POST requests with data
- No one can read your sheet data through the URL
- The URL only allows writing data, not reading
- Only you have access to view the Google Sheet

### Making it more secure (Optional):

Add a secret key validation in your script:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Verify secret key
    var SECRET_KEY = "your-secret-key-here";
    if (data.secretKey !== SECRET_KEY) {
      throw new Error("Unauthorized");
    }
    
    // ... rest of your code
  } catch (error) {
    // ... error handling
  }
}
```

Then add it to your `.env`:
```env
VITE_GOOGLE_SHEETS_SECRET=your-secret-key-here
```

---

## 📈 Advanced Features (Optional)

### 1. Add Data Validation

In your Google Sheet:
1. Select a column (e.g., Email)
2. **Data** → **Data validation**
3. Set criteria (e.g., "Text contains @")

### 2. Add Conditional Formatting

Highlight new submissions:
1. Select data range
2. **Format** → **Conditional formatting**
3. Set rule (e.g., "Date is today")
4. Choose formatting style

### 3. Create a Dashboard

1. Create a new sheet tab called "Dashboard"
2. Add charts and summaries
3. Use formulas like:
   - `=COUNTA(A2:A)` - Total submissions
   - `=COUNTIF(F2:F,"Principal/HOD/Administrator")` - Count by designation

### 4. Set Up Email Notifications

Get notified when someone submits:

```javascript
function doPost(e) {
  // ... existing code to save data ...
  
  // Send notification email
  var emailAddress = "your-email@example.com";
  var subject = "New Form Submission";
  var message = "A new demo request from " + data.name;
  MailApp.sendEmail(emailAddress, subject, message);
  
  return ContentService.createTextOutput(/* ... */);
}
```

---

## 🔄 Updating the Script

If you need to modify the script:

1. Make changes in Apps Script editor
2. Click **Save**
3. Click **Deploy** → **Manage deployments**
4. Click the pencil icon ✏️ to edit
5. Change **Version** to "New version"
6. Add description of changes
7. Click **Deploy**

**Note:** The URL stays the same, no need to update `.env`

---

## 📱 Accessing Your Data

### On Desktop:
- Open Google Sheets in your browser
- All data syncs automatically

### On Mobile:
- Install Google Sheets app
- Access your sheet on the go
- View submissions in real-time

### Export Data:
- **File** → **Download** → Choose format
- Options: Excel, CSV, PDF, etc.

---

## ✅ Setup Checklist

Before considering setup complete:

- [ ] Google Sheet created with correct columns
- [ ] Apps Script code pasted and saved
- [ ] Script deployed as Web App
- [ ] "Who has access" set to "Anyone"
- [ ] Script authorized (permissions granted)
- [ ] Web App URL copied
- [ ] URL added to `.env` file
- [ ] Development server restarted
- [ ] Test submission successful
- [ ] Data appears in Google Sheet

---

## 🆘 Need Help?

1. **Check Executions Log** - See errors in Apps Script
2. **Test the URL** - Open it in browser (should show "API is working")
3. **Verify Permissions** - Make sure script is authorized
4. **Check Console** - Browser console shows any errors
5. **Review Deployment** - Ensure "Anyone" has access

---

## 📚 Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)

---

**Next:** Update your `.env` file with the Google Sheets URL and restart your server!

