---
layout: page
title: "Setting Up a Passkey with Authenticator"
description: "Step-by-step guide to registering a passkey in the Microsoft Authenticator app"
next_pages:
  - url: /passkey-path/end-user/signing-in/
    title: "How Signing In Works Now"
    description: "What the day-to-day experience looks like"
  - url: /passkey-path/end-user/lost-device/
    title: "What to Do If You Lose Your Device"
    description: "Steps if your phone is lost or stolen"
crosslinks:
  - url: /passkey-path/it-admin/entra-policy-setup/
    title: "Configuring Authentication Methods"
    role: "IT Admin"
    description: "Admin-side setup that must be completed first"
---

This guide walks you through registering a passkey in the Microsoft Authenticator app on your phone. The process takes about 2 minutes.

## Before you start

Make sure you have:

- **Microsoft Authenticator** installed and updated to the latest version (6.2+)
  - [Download for iOS](https://apps.apple.com/app/microsoft-authenticator/id983156458)
  - [Download for Android](https://play.google.com/store/apps/details?id=com.azure.authenticator)
- Your phone's operating system is up to date (iOS 17+ or Android 14+)
- You're already signed in to your work account in Authenticator
- A computer with a browser open (the setup starts on the web)

## Step-by-step setup

### 1. Go to My Security Info

Open a browser on your computer and go to:

**[https://mysignins.microsoft.com/security-info](https://mysignins.microsoft.com/security-info)**

Sign in with your work account if prompted.

### 2. Add a new sign-in method

Click **"+ Add sign-in method"**

In the dropdown, select **"Passkey in Microsoft Authenticator"**

Click **Add**

### 3. Follow the prompts

The setup wizard will walk you through several steps:

1. **Confirm your identity** - you may need to verify with your current sign-in method (password + existing MFA) one more time
2. **Open Authenticator** - the wizard will prompt you to open the Authenticator app on your phone
3. **Scan the QR code** - if prompted, scan the QR code shown on screen with your phone's camera
4. **Verify with biometrics** - your phone will ask for your fingerprint or face to confirm
5. **Name your passkey** - give it a recognizable name like "Work iPhone" or "My Pixel"

### 4. Test it

After setup completes, try signing out and back in. At the sign-in page:

1. Enter your username
2. When prompted for authentication, choose "Sign in with a passkey"
3. Verify with your fingerprint or face on your phone
4. You're in

## Tips

- **Name your passkeys clearly** - if you set up multiple passkeys (phone + computer), give each a name you'll recognize
- **Keep Authenticator updated** - passkey features may improve with app updates
- **Don't delete the app** - if you remove Authenticator from your phone, your passkey goes with it (syncable passkeys may restore if you reinstall, but don't count on it)
- **Set up a second passkey** if possible - registering a passkey on both your phone and computer (via Windows Hello) means losing one device doesn't lock you out

## Troubleshooting

**"Passkey in Microsoft Authenticator" isn't in the dropdown**
Your IT team may not have enabled this method for your account yet. Check with them.

**The QR code won't scan**
Make sure your phone's camera has permission to scan QR codes. Try increasing screen brightness on your computer.

**Biometric verification fails**
Make sure your fingerprint or face is registered in your phone's settings (not just in Authenticator). You can also use your device PIN as a fallback.

**"Something went wrong" error**
Close the wizard, close Authenticator, and try again. If it persists, try a different browser or clear your browser cache. Contact your helpdesk if the issue continues.
