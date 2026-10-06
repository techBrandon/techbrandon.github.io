---
layout: page
title: "Common Passkey Issues and Fixes"
description: "Troubleshooting the most frequent passkey problems users report"
next_pages:
  - url: /passkey-path/helpdesk/escalation/
    title: "When to Escalate"
    description: "Issues that go beyond standard troubleshooting"
  - url: /passkey-path/helpdesk/device-loss/
    title: "Device Loss Recovery"
    description: "When troubleshooting reveals a lost or broken device"
crosslinks:
  - url: /passkey-path/it-admin/device-compat/
    title: "Device and OS Compatibility"
    role: "IT Admin"
    description: "Compatibility matrix for diagnosing platform-specific issues"
---

Most passkey support requests fall into a handful of categories. This page covers the common issues and their fixes.

## "I can't register a passkey"

### Passkey option not available in My Security Info

**Likely cause:** The authentication method isn't enabled for the user's group in Entra.

**Check:**
1. Ask which method they're trying to register (Authenticator, security key, Windows Hello)
2. Verify in Entra portal that the method is enabled and the user is in a targeted group
3. If the method is enabled, check for Exclude groups that might override

**Fix:** Add the user to the correct group, or contact the IT admin to enable the method.

### "This security key is not allowed"

**Likely cause:** The user's key model isn't on the approved AAGUID allowlist.

**Check:** Get the key model from the user (brand and model number, usually printed on the key). Compare against the approved list.

**Fix:** Provide the user with an approved key, or contact IT admin to add the AAGUID if the key should be allowed.

### Registration fails with a generic error

**Check (in order):**
1. Browser - is it Chrome, Edge, or Safari? Firefox has limited passkey support.
2. Browser version - is it up to date?
3. OS version - meets minimum requirements? (Authenticator passkeys: iOS 17+, Android 14+; Windows 10 1903+)
4. Authenticator app version - updated to the latest version?
5. Private/incognito mode - some browsers limit WebAuthn in private windows

**Fix:** Update browser/OS/app, switch to a supported browser, or try in a regular (non-private) window.

### User gets an unexpected passkey registration prompt

**Context:** Expected behavior. Microsoft is making passkeys the default in Entra ID, and users enabled for SMS or voice are prompted to register a passkey when they complete MFA. If the user can't skip the prompt, SMS or voice is likely their only MFA method, and they must register a passkey to keep signing in. See [Microsoft's passkeys by default guidance](https://aka.ms/passkeybydefault) for current details.

**Fix:** Walk the user through [Setting Up a Passkey with Authenticator](/passkey-path/end-user/setup-authenticator/) or the [security key](/passkey-path/end-user/setup-security-key/) guide. Escalate to the IT admin for questions about registration campaign settings.

## "My passkey isn't working at sign-in"

### Passkey prompt doesn't appear

**Likely cause:** The browser isn't offering the passkey option, or the user is clicking the wrong sign-in flow.

**Check:**
1. Is the user entering their username correctly?
2. At the authentication prompt, are they looking at the passkey option (the exact label varies - it may read as "Use a passkey", "Sign in with a passkey", "Face, fingerprint, PIN, or security key", or "Windows Hello or security key" depending on the device, browser, and whether Entra has rolled out a UX update)? If unsure, guide the user to "Other ways to sign in" / "Sign in another way" to see the full method list.
3. Is the passkey registered on the device they're currently using? A passkey on their phone won't automatically appear on a different computer unless they use the cross-device (QR code) flow.

**Fix:** Guide the user to the passkey option. If they're on a different device, have them pick the cross-device or "passkey on another device" option to trigger the QR code flow. The Entra sign-in UX changes regularly - if a label you see here doesn't match the screen in front of you, verify against Microsoft's current [passkey (FIDO2) compatibility](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-fido2-compatibility) doc.

### "Something went wrong" after biometric verification

**Likely cause:** Browser or OS communication issue with the authenticator.

**Quick fixes to try:**
1. Close the browser tab and try again
2. Try a different browser (Edge if they're using Chrome, or vice versa)
3. Clear the browser cache and cookies for microsoftonline.com
4. Restart the browser
5. Restart the device

If the issue persists across browsers and restarts, the passkey registration may be corrupted. Remove the passkey from My Security Info and re-register.

### Security key not recognized when inserted

**Check:**
1. Is the key plugged in fully? (USB-A keys sometimes don't seat properly)
2. Try a different USB port (avoid USB hubs if possible)
3. Is the key blinking/flashing? If not, the OS may not be detecting it
4. Try the key on a different computer to rule out a hardware issue

**Fix:** If the key works on another computer, the original computer may have a driver issue. Check Windows Update for driver updates. If the key doesn't work anywhere, it may be defective - replace it.

### PIN locked on security key

**Cause:** Too many failed PIN attempts (typically 8 on YubiKeys).

**Fix:** The key must be factory reset, which erases all stored passkeys. This is effectively a device loss - follow the [Device Loss Recovery Playbook](/passkey-path/helpdesk/device-loss/). After reset, the user re-registers the key with a new PIN.

## "I can't sign in on a new/different device"

### Cross-device (QR code) flow doesn't work

**Check:**
1. Is Bluetooth enabled on both the phone and the computer, and do both have an internet connection? Cross-device auth uses BLE.
2. Are the phone and computer in physical proximity? (BLE range is limited)
3. Did the user scan the QR code with the phone's camera app? On iPhone, the camera inside Authenticator can't read the sign-in QR code.
4. Is the browser on the computer offering the QR code option?

**Fix:** Enable Bluetooth on both devices. If Bluetooth isn't available on the computer, the cross-device flow won't work - the user needs to sign in with a passkey registered on that device, or use a security key.

### Synced passkey doesn't appear on a new phone

**Context:** Synced passkeys (iCloud Keychain, Google Password Manager) should sync when a user sets up a new phone with the same Apple ID or Google account. This does not apply to passkeys stored in Microsoft Authenticator - see the next section.

**Check:**
1. Is the new phone signed into the same Apple ID / Google account?
2. Is iCloud Keychain enabled (iOS) or Google Password Manager sync enabled (Android)?

**Fix:** Ensure platform account and sync settings are correct. If the passkey still doesn't appear, the user may need to re-register - issue a TAP for recovery.

### Authenticator passkey missing on a new phone

**Context:** Expected behavior. Passkeys in Microsoft Authenticator are device-bound, and Authenticator's account backup doesn't include them.

**Fix:** Issue a TAP, then have the user go to Security info, select **Add sign-in method**, and choose **Passkey in Microsoft Authenticator** on the new phone.

## "The app won't accept my passkey"

### Specific app doesn't support passkeys

**Likely cause:** The app uses legacy authentication or an embedded web view that doesn't support WebAuthn.

**Check:** Does the app have a "Sign in with Microsoft" button that opens the system browser? If it uses its own login screen, it may not support passkeys.

**Fix:** This is an application issue, not a user issue. Escalate to IT admin to evaluate the app. In the meantime, the user may need to sign in via a browser-based version of the app, or the app may need to be added to a CA exception (see [Legacy Apps](/passkey-path/it-admin/legacy-coexistence/)).

## Quick reference table

| Symptom | First check | Likely fix |
|---------|------------|------------|
| Can't register passkey | Method enabled for user's group? | Add to correct group |
| "Key not allowed" | AAGUID on allowlist? | Provide approved key |
| Registration error | Browser/OS/app version? | Update or switch browser |
| Passkey prompt missing | Correct sign-in option selected? | Guide to correct flow |
| Error after biometric | Browser cache/state? | Clear cache, try other browser |
| Key not detected | USB connection solid? | Try different port |
| PIN locked | Number of attempts exceeded | Factory reset + re-enroll |
| QR flow fails | Bluetooth enabled? | Enable BLE on both devices |
| Synced passkey missing | Platform account + sync on? | Check settings, re-register if needed |
| Authenticator passkey gone on new phone | Expected (device-bound) | TAP + re-register |
| Unexpected passkey prompt | Only SMS/voice MFA enrolled? | Expected - guide through setup |
| App won't accept passkey | Modern auth supported? | Escalate to IT admin |
