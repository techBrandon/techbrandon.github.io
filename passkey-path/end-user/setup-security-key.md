---
layout: page
title: "Setting Up a FIDO2 Security Key"
description: "Step-by-step guide to registering a YubiKey or other FIDO2 hardware security key"
next_pages:
  - url: /passkey-path/end-user/signing-in/
    title: "How Signing In Works Now"
    description: "What the day-to-day experience looks like with a security key"
  - url: /passkey-path/end-user/lost-device/
    title: "What to Do If You Lose Your Device"
    description: "Steps if your security key is lost or stolen"
crosslinks:
  - url: /passkey-path/it-admin/attestation-aaguids/
    title: "Attestation and AAGUIDs"
    role: "IT Admin"
    description: "How IT controls which security key models are allowed"
---

This guide walks you through registering a FIDO2 security key (like a YubiKey) as a passkey for your work account. The process takes about 3 minutes.

## Before you start

Make sure you have:

- **Your security key** - provided by your IT team or consumer purchased device (examples: YubiKey 5 series, Feitian, or Google Titan key)
- A **computer with a USB port** (or NFC support if your key is NFC-only)
- A **supported browser** - Chrome, Edge, or Safari (Firefox has limited support)
- Your key's **PIN** - if your key has been used before, you may have set a PIN. If it's brand new, you'll create one during setup.

## Step-by-step setup

### 1. Go to My Security Info

Open a browser on your computer and go to:

**[https://mysignins.microsoft.com/security-info](https://mysignins.microsoft.com/security-info)**

Sign in with your work account if prompted.

### 2. Add a new sign-in method

Click **"+ Add sign-in method"**

In the dropdown, select **"Passkey"**

### 3. Insert and set up your key

1. **Insert your security key** into a USB port on your computer
2. **Create or enter your PIN** - if the key is new, you'll set a PIN. If you've used it before, enter your existing PIN. This PIN is specific to the security key, not your work account.
3. **Touch the key** - the key will blink or flash. Touch the metal contact or button to confirm you're physically present.
4. **Name your key** - give it a recognizable name like "Blue YubiKey" or "Work Security Key"

### 5. Test it

Sign out and back in:

1. Enter your username at the sign-in page
2. When prompted, choose "Sign in with a security key" or "Use a passkey"
3. Insert your security key
4. Enter your PIN
5. Touch the key when it blinks
6. You're in

## About your security key PIN

The PIN you set on your security key is **not** your work password. It's a short code (minimum 4 characters) that protects the key from unauthorized use if someone finds it.

- **You choose the PIN** during first-time setup
- **The PIN stays on the key** - it's not stored anywhere else
- **You'll enter it each time** you use the key to sign in
- **If you forget it**, the key needs to be reset (which erases all passkeys on it) - contact your helpdesk

Some keys also support biometrics (like the YubiKey Bio). If your key has a fingerprint reader, you can use your fingerprint instead of a PIN after initial enrollment.

## Tips

- **Keep your key accessible** - attach it to your keychain, badge lanyard, or keep it in a consistent spot. You'll use it every day.
- **Don't share your key** - your security key is like a physical key to your account. Don't lend it to colleagues.
- **Register a backup** - if your IT team allows it, register a second security key or set up Authenticator as a backup. If you lose your only key, you'll need helpdesk assistance to recover.
- **Remove the key when done** - don't leave it plugged into a shared or public computer.

## Troubleshooting

**"Passkey" isn't in the dropdown**
Your IT team may not have enabled FIDO2 security keys for your account. Check with them.

**"This security key is not allowed"**
Your organization restricts which key models can be registered. You need to use a key that's on the approved list. Contact your IT team for an approved key.

**The key doesn't respond when touched**
Make sure you're touching the correct spot - on most YubiKeys it's the gold circle or the "Y" logo. The key should flash when it's ready for a touch.

**"PIN is incorrect"**
If you've forgotten your PIN, you'll need to reset the key. This erases all passkeys stored on it. Contact your helpdesk for guidance. On a YubiKey, you typically get 8 PIN attempts before lockout.

**Browser says "device not recognized"**
Try a different USB port. If using a USB-C key with an adapter, try a direct USB-C or USB-A port instead. Some USB hubs don't reliably pass through security key communication.
