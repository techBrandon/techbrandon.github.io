---
layout: page
title: "What to Do If You Lose Your Device"
description: "Steps to take if your phone or security key is lost or stolen"
next_pages:
  - url: /passkey-path/end-user/setup-authenticator/
    title: "Set Up with Authenticator"
    description: "Re-register a passkey after recovery"
  - url: /passkey-path/end-user/setup-security-key/
    title: "Set Up a Security Key"
    description: "Register a replacement security key"
crosslinks:
  - url: /passkey-path/helpdesk/device-loss/
    title: "Device Loss Recovery Playbook"
    role: "Helpdesk"
    description: "The support-side view of the recovery process"
---

Losing a phone or security key doesn't lock you out of your work account. There's a recovery process.

## Step 1: Don't panic

Your passkey is protected. Even if someone finds your device:

- **Phone passkeys** require your fingerprint, face, or device PIN to use. Someone can't use your passkey without unlocking your phone first.
- **Security keys** require a PIN (and optionally a fingerprint). Without the PIN, the key is useless after a few failed attempts.
- **Windows Hello** requires your biometric or PIN. A stolen laptop that's locked can't be used to sign in.

Your account is not immediately compromised.

## Step 2: Sign in from another device (if you can)

If you registered passkeys on more than one device - for example, both your phone and your laptop - use the other device to sign in. This is the fastest way to stay productive.

## Step 3: Contact your helpdesk

If you can't sign in at all, contact your IT helpdesk:

- **By phone** - call the number your organization provides (check your employee handbook, intranet, or ask a colleague)
- **In person** - visit the IT support desk if you're in the office
- **By email from a personal device** - if your org allows it, email the helpdesk from a personal email address

Tell them:
- Your name and employee ID
- What you lost (phone, security key, laptop)
- Whether you have any other sign-in methods available

## Step 4: Verify your identity

Your helpdesk will verify that you are who you say you are before granting access. This might involve:

- Confirming information only you would know (employee ID, manager name, recent activity)
- Manager or supervisor approval
- A video call if you're remote
- In-person verification with a photo ID

This step exists to protect you. If someone stole your phone and called the helpdesk pretending to be you, this is what stops them.

## Step 5: Get a Temporary Access Pass

Once your identity is verified, your helpdesk will issue a **Temporary Access Pass (TAP)** - a one-time code with a limited time window (typically a few hours). You'll use this to:

1. Sign in to your account from a browser
2. Go to [My Security Info](https://mysignins.microsoft.com/security-info)
3. Register a new passkey on your replacement device or a different device

The TAP expires after use or after the time window closes, whichever comes first.

## Step 6: Remove the old passkey

Once you've set up a new passkey and confirmed it works:

1. Go to [My Security Info](https://mysignins.microsoft.com/security-info)
2. Find the old passkey in your registered methods (it will still be listed)
3. Click **Delete** to remove it

If you can't remove it yourself, ask your helpdesk to remove the old credential from your account.

## Step 7: Secure the lost device

Depending on what you lost:

- **Phone** - use your platform's remote wipe or "Find My" feature (Find My iPhone, Google Find My Device) to lock or erase the device
- **Security key** - report it to your IT team so they know it's compromised. The key's PIN protects it, but it should still be revoked.
- **Laptop** - report it to IT immediately. They can remotely wipe a managed device through Intune.

## Prevention tips

- **Register multiple passkeys** - set up on both your phone and your computer. Losing one doesn't lock you out.
- **Keep your security key on a lanyard or keychain** - treat it like a physical key
- **Know your helpdesk contact info** before you need it - save the number in your personal phone
- **Enable Find My Device** on your phone and laptop so you can locate or wipe them remotely

## Timeline

| Step | Typical time |
|------|-------------|
| Contact helpdesk | Immediate |
| Identity verification | 5-30 minutes (depends on process) |
| Receive TAP | Minutes after verification |
| Register new passkey | 2-3 minutes |
| Remove old passkey | 1 minute |
| **Total recovery** | **Under 1 hour in most cases** |

The longest part is usually identity verification, especially if you're remote and can't verify in person.
