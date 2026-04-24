---
layout: page
title: "Setting Up Windows Hello"
description: "Use your fingerprint, face, or PIN on your Windows PC to sign in with a passkey"
next_pages:
  - url: /passkey-path/end-user/signing-in/
    title: "How Signing In Works Now"
    description: "What the day-to-day experience looks like"
  - url: /passkey-path/end-user/lost-device/
    title: "What to Do If You Lose Your Device"
    description: "Steps if you lose access to your PC"
---

If you use a Windows PC for work, Windows Hello lets you sign in with your fingerprint, face, or a PIN - no extra app or hardware needed. Your IT team may have already set this up on your device.

## Before you start

Make sure you have:

- **Windows 10 version 1903 or later, or Windows 11** for Entra-joined devices. Hybrid-joined devices need Windows 10 version 2004 or later.
- A device managed by your organization (enrolled in Intune or joined to your work domain)
- **For fingerprint:** a fingerprint reader (built-in on most modern laptops)
- **For face recognition:** a Windows Hello-compatible camera (the IR cameras on Surface devices and most business laptops)
- **For PIN only:** no special hardware needed

## Check if Windows Hello is already set up

If you already use your fingerprint or face to unlock your Windows PC, Windows Hello may already be configured for your work account. Try signing into a work website - if it offers "Windows Hello or security key" as an option, you're set.

If not, follow the steps below.

## Step-by-step setup

### 1. Open Windows Settings

Press **Windows key + I** to open Settings, then go to:

- **Windows 11:** Settings > Accounts > Sign-in options
- **Windows 10:** Settings > Accounts > Sign-in options

### 2. Set up your verification method

Under **Ways to sign in**, you'll see options for:

- **Facial recognition (Windows Hello)** - click Set up and follow the prompts to scan your face
- **Fingerprint recognition (Windows Hello)** - click Set up and scan your fingerprint (you can add multiple fingers)
- **PIN (Windows Hello)** - click Set up and create a PIN (minimum 6 digits recommended, can include letters)

Set up at least one biometric method plus a PIN as fallback.

### 3. Register as a passkey for your work account

If your IT team has enabled Windows Hello for Business, the credential is typically provisioned automatically when you sign in to your Entra-joined device. In that case there's nothing to do - Windows Hello will already be offered as a sign-in option at work websites.

If it wasn't provisioned automatically, you can register a passkey backed by Windows Hello through Security info:

1. Go to **[https://mysignins.microsoft.com/security-info](https://mysignins.microsoft.com/security-info)**
2. Click **"+ Add sign-in method"**
3. Select **"Passkey"** (or "Security key" in some tenants - Windows Hello registers through the same flow)
4. Follow the prompts - your browser will ask you to verify with your Windows Hello fingerprint, face, or PIN
5. Name the passkey (e.g., "Work Laptop")

If "Passkey" isn't available in the dropdown, your IT team may not have enabled self-service passkey registration yet. Contact your helpdesk.

### 4. Test it

Sign out of a work website and back in:

1. Enter your username
2. When prompted for authentication, your browser should offer Windows Hello
3. Verify with your fingerprint, face, or PIN
4. You're in

## How it works

Windows Hello stores your passkey in your PC's **TPM** (Trusted Platform Module) - a security chip built into your computer. The passkey never leaves this chip. When you use your fingerprint or face, you're proving to the TPM that you're the right person, and the TPM then signs the authentication challenge.

Your biometric data (fingerprint template, face map) is also stored only in the TPM. It's never sent to Microsoft, your employer, or any website.

## Tips

- **Windows Hello is device-specific** - a passkey registered with Windows Hello on your laptop doesn't transfer to a different PC. If you use multiple computers, register on each one.
- **Add multiple fingers** - register 2-3 fingerprints in case one finger is wet, bandaged, or otherwise unreadable.
- **Your PIN is not your password** - the Windows Hello PIN is a local unlock method, separate from your work password. It only works on this device.
- **Register a backup method** - set up a passkey in Authenticator on your phone too. If your laptop breaks, you'll still be able to sign in from another device.

## Troubleshooting

**"Windows Hello isn't available on this device"**
Your device may not have a TPM 2.0 chip, or it may not be enabled in BIOS. Contact your IT team - they can check your hardware.

**Fingerprint reader isn't recognized**
Check that the fingerprint driver is installed: Settings > Windows Update > Check for updates. Some readers also need a manufacturer driver.

**"Your organization requires Windows Hello for Business"**
This means your IT team is managing the setup through Intune or Group Policy. The registration may happen automatically at your next sign-in, or your IT team will provide specific instructions.

**Face recognition fails in certain lighting**
Windows Hello IR cameras work best in consistent indoor lighting. Extreme backlighting (sitting in front of a bright window) can cause issues. Adjust your position or switch to fingerprint/PIN.

*Source: [Microsoft Entra passkey (FIDO2) documentation](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2)*
