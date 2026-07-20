/**
 * Google Apps Script for Durashield Warranty Registration.
 * 
 * Instructions:
 * 1. Open Google Sheets under info@avillionnexgen.com.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any default code and paste this script.
 * 4. Save and click "Deploy > New deployment".
 * 5. Choose "Web App" as the type.
 * 6. Set Description: "Durashield Warranty Backend".
 * 7. Set "Execute as": "Me (info@avillionnexgen.com)".
 * 8. Set "Who has access": "Anyone".
 * 9. Click "Deploy", authorize the permissions, and copy the Web App URL.
 * 10. Paste this URL into your environment configuration (e.g. .env.local) as WARRANTY_APPSCRIPT_API.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Get or Create Google Drive folder for saving photos
    var folderName = "Durashield Warranty Photos";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    var photo1Url = "";
    if (data.photo1 && data.photo1.base64) {
      var blob1 = Utilities.newBlob(
        Utilities.base64Decode(data.photo1.base64), 
        "image/jpeg", 
        data.warrantyNumber + "_front_" + Date.now() + ".jpg"
      );
      var file1 = folder.createFile(blob1);
      file1.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      photo1Url = file1.getUrl();
    }
    
    var photo2Url = "";
    if (data.photo2 && data.photo2.base64) {
      var blob2 = Utilities.newBlob(
        Utilities.base64Decode(data.photo2.base64), 
        "image/jpeg", 
        data.warrantyNumber + "_rear_" + Date.now() + ".jpg"
      );
      var file2 = folder.createFile(blob2);
      file2.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      photo2Url = file2.getUrl();
    }
    
    // 2. Open spreadsheet and write row
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers if it's a blank sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission Date",
        "Customer Name",
        "Mobile Number",
        "Email Address",
        "Vehicle Number",
        "City",
        "Dealer Name",
        "Dealer Location",
        "Warranty Number",
        "Product Name",
        "Warranty Period",
        "Photo Front Link",
        "Photo Rear Link"
      ]);
    }
    
    var submissionDate = new Date();
    var formattedDate = Utilities.formatDate(submissionDate, Session.getScriptTimeZone() || "GMT+5:30", "yyyy-MM-dd HH:mm:ss");
    
    sheet.appendRow([
      formattedDate,
      data.customerName,
      data.phone,
      data.email,
      data.vehicleNumber,
      data.city,
      data.dealerName,
      data.dealerLocation,
      data.warrantyNumber,
      data.productName || "Not Specified",
      (data.warrantyYears || 5) + " Years",
      photo1Url,
      photo2Url
    ]);
    
    // 3. Calculate Warranty Validity Period (Dynamic based on product selection)
    var validityYears = data.warrantyYears || 5;
    var endDate = new Date(submissionDate.getTime());
    endDate.setFullYear(endDate.getFullYear() + validityYears);
    
    var formattedStartDate = Utilities.formatDate(submissionDate, Session.getScriptTimeZone() || "GMT+5:30", "dd-MM-yyyy");
    var formattedEndDate = Utilities.formatDate(endDate, Session.getScriptTimeZone() || "GMT+5:30", "dd-MM-yyyy");
    
    // 4. Send Confirmation Email
    var emailSubject = "Durashield PPF Warranty Registration Confirmed - " + data.warrantyNumber;
    
    var emailBodyHtml = 
      '<div style="font-family: \'Space Grotesk\', sans-serif; background-color: #0b1326; color: #dae2fd; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid rgba(255, 181, 153, 0.2);">' +
        '<div style="text-align: center; margin-bottom: 30px;">' +
          '<h2 style="color: #ffb599; font-size: 28px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">DURASHIELD</h2>' +
          '<p style="color: #e2bfb2; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Premium Paint Protection Film</p>' +
        '</div>' +
        '<hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 24px 0;" />' +
        '<h3 style="color: #ffffff; font-size: 20px; margin-top: 0; font-weight: 600;">Warranty Registration Confirmed</h3>' +
        '<p>Dear <strong>' + data.customerName + '</strong>,</p>' +
        '<p>Thank you for choosing Durashield Paint Protection Film. Your warranty registration has been successfully verified and completed. Please find your details below:</p>' +
        
        '<table style="width: 100%; border-collapse: collapse; margin: 24px 0; background-color: #171f33; border-radius: 12px; overflow: hidden;">' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold; width: 40%;">Warranty Number</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + data.warrantyNumber + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Vehicle Number</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + data.vehicleNumber + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Dealer Name</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + data.dealerName + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Dealer Location</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + data.dealerLocation + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Product</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + (data.productName || 'Not Specified') + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Warranty Period</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffb599; font-weight: bold;">' + validityYears + ' Years</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #e2bfb2; font-weight: bold;">Registration Date</td>' +
            '<td style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff;">' + formattedStartDate + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding: 14px 18px; color: #e2bfb2; font-weight: bold;">Validity Period</td>' +
            '<td style="padding: 14px 18px; color: #ffb599; font-weight: bold;">' + formattedStartDate + ' to ' + formattedEndDate + ' (' + validityYears + ' Years)</td>' +
          '</tr>' +
        '</table>' +
        
        '<p>Your Durashield Paint Protection Film is now registered for defense against chips, scratches, stains, and environmental damage. Keep this email for any future warranty claims.</p>' +
        
        '<div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #a7b6cc; text-align: center;">' +
          '<p style="margin: 0;">This is an automated verification email. Please do not reply directly to this mail.</p>' +
          '<p style="margin: 8px 0 0 0;">For inquiries, contact us at: <a href="mailto:info@avillionnexgen.com" style="color: #ffb599; text-decoration: none;">info@avillionnexgen.com</a></p>' +
        '</div>' +
      '</div>';
      
    MailApp.sendEmail({
      to: data.email,
      subject: emailSubject,
      htmlBody: emailBodyHtml,
      replyTo: "info@avillionnexgen.com"
    });
    
    return ContentService.createTextOutput(JSON.stringify({ "success": true, "message": "Warranty saved and email sent." }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
