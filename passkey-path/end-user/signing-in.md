---
layout: page
title: "How Signing In Works Now"
description: "What the day-to-day sign-in experience looks like with a passkey"
next_pages:
  - url: /passkey-path/end-user/lost-device/
    title: "What to Do If You Lose Your Device"
    description: "Steps if your phone or security key is lost or stolen"
---

Once your passkey is set up, signing in changes. This page shows you what to expect across different scenarios.

## Signing in on your computer (browser)

When you go to a work website (Outlook, SharePoint, Teams web, etc.):

1. **Enter your email address** at the Microsoft sign-in page
2. **Choose your passkey method** - the browser will show options based on what you've registered:
   - "Use your fingerprint or face" (Windows Hello)
   - "Use a passkey" (Authenticator or security key)
   - "Sign in with a security key"
3. **Verify** - tap your fingerprint, look at the camera, enter your PIN, or touch your security key
4. **Done** - you're signed in

The whole process takes a few seconds. No password to type, no notification to wait for.

## Signing in on your phone

When signing into mobile apps (Outlook, Teams, OneDrive):

1. Open the app and enter your email if prompted
2. The app will prompt for authentication
3. If you have a passkey in Authenticator, it will offer to use it directly
4. Verify with your fingerprint or face
5. Done

## Signing in on a different computer

If you're using a computer that doesn't have your passkey (a conference room PC, a colleague's machine, etc.), you can sign in using your phone:

1. Enter your email at the sign-in page
2. Choose **"Sign in with a passkey on another device"** (or similar wording)
3. A **QR code** appears on screen
4. **Scan the QR code** with your phone's camera
5. **Verify** with your fingerprint or face in Authenticator
6. The browser signs you in

This is called "cross-device authentication." It works because your phone proves your identity to the browser over a secure Bluetooth connection. The computer you're signing into doesn't need any special setup.

## What the sign-in page looks like

Microsoft's sign-in page adapts based on your registered methods. You may see:

- **"Sign in with Windows Hello or a security key"** - click this to use a passkey registered on the current device or a plugged-in security key
- **"Sign in with a passkey"** - click this to use Authenticator on your phone
- **"Sign in another way"** - shows all available methods including any legacy methods still enabled

If you've used a passkey recently on the same browser, it may automatically prompt for your passkey without showing the password field at all.

## Choosing between multiple passkeys

If you've registered passkeys on both your phone and your computer, the browser will typically offer the most convenient option first:

- On your work laptop: Windows Hello (fingerprint/face) is offered first
- On a different computer: Authenticator (phone) via QR code is offered
- Security key: always available if plugged in, regardless of which computer you're on

You can always click "Use a different method" to switch.

## Apps vs browsers

Most Microsoft 365 apps (Outlook, Teams, Word, Excel) handle authentication through the system browser or an authentication broker. Once you sign in with a passkey in one app, other apps on the same device usually pick up the session without asking again.

Some third-party apps may still show a traditional password field. If that happens:
- Check if the app has an update that supports modern auth
- Look for a "Sign in with Microsoft" button (this routes through the passkey-capable sign-in flow)
- If neither works, the app may use legacy authentication - check with your IT team

## How often will I need to sign in?

This depends on your organization's Conditional Access policies, but typically:

- **Same device, same browser:** you stay signed in for days or weeks (token refresh handles it)
- **New device or new browser:** you'll need to authenticate with your passkey
- **After a policy change:** your IT team may require re-authentication
- **Sensitive apps:** some applications (admin portals, financial systems) may require re-authentication even within an active session
