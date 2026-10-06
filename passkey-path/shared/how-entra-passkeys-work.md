---
layout: page
title: "How Entra Implements Passkeys"
description: "How Entra handles passkeys - Authenticator, FIDO2/platform passkeys, and Windows Hello for Business"
next_pages:
  - url: /passkey-path/shared/device-bound-vs-sync/
    title: "Device-Bound vs Syncable Passkeys"
    description: "Understanding which type fits which scenario"
  - url: /passkey-path/it-admin/entra-policy-setup/
    title: "Configuring Authentication Methods"
    description: "Enable and scope passkey methods in Entra"
crosslinks:
  - url: /passkey-path/end-user/setup-authenticator/
    title: "Setting Up a Passkey with Authenticator"
    role: "End User"
    description: "Step-by-step setup guide for end users"
  - url: /passkey-path/it-admin/device-compat/
    title: "Device and OS Compatibility"
    role: "IT Admin"
    description: "What hardware and OS versions support each method"
---

Microsoft Entra ID supports both device-bound and synced passkeys as generally available authentication methods. Entra supports passkeys through three methods, each configured differently.

## The three methods

### Microsoft Authenticator app

Passkeys stored in the Authenticator app on iOS or Android. The passkey is created in the phone's secure hardware (the Secure Enclave on iOS, secure hardware on Android) and stays in the Authenticator app on that phone. It is device-bound and does not sync. A new phone means registering a new passkey, usually with a [Temporary Access Pass](/passkey-path/helpdesk/tap-issuance/) or another passkey the user already has. Restoring Authenticator from a backup does not bring passkeys back.

Entra also supports passkeys synced through your phone's built-in credential manager (iCloud Keychain on iPhone, Google Password Manager on Android). These look similar to Authenticator passkeys because Authenticator registers with the phone as a passkey provider, so the same prompts appear for both. They register through the Passkey (FIDO2) method in Entra and follow the [syncable vs device-bound](/passkey-path/shared/device-bound-vs-sync/) trade-offs.

**Best for:** Most users in most organizations. Low friction, familiar app, no extra hardware.

### Passkeys (FIDO2)

This covers both hardware security keys (YubiKey, Feitian, Google Titan) and platform passkeys from third-party credential managers. Hardware keys store the private key on a physical chip that never leaves the device. Users plug in the key (USB) or tap it (NFC) and verify with a PIN or biometric on the key itself.

In Entra, FIDO2 passkeys are configured through passkey profiles under **Protection > Authentication methods > Passkey (FIDO2)**. A profile controls attestation, passkey type (device-bound or syncable), and AAGUID restrictions. You can create up to 3 profiles and assign each to different user groups.

**Microsoft Entra passkey on Windows** is also configured here, and it is separate from Windows Hello for Business. It stores a FIDO2 passkey in the PC's local Windows Hello container, so the device doesn't need to be Entra joined or registered. It's device-bound and doesn't sync. To allow it, create a passkey profile that targets the Windows Hello AAGUIDs. That profile can't enforce attestation. It doesn't replace Windows Hello for Business and doesn't provide device sign-in. See [Microsoft's guidance on Entra passkeys on Windows](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-entra-passkeys-on-windows).

**Best for:** Privileged accounts, shared workstations, high-security environments, users who work across multiple devices and platforms.

### Windows Hello for Business

Windows Hello uses the device's TPM to store the private key. Users authenticate with their fingerprint, face, or PIN. No extra app or hardware required, but the passkey is tied to that specific device.

Unlike the other two methods, Windows Hello for Business is **not** configured in the Authentication methods blade. It's configured through Intune device configuration profiles or Group Policy. In Entra, WHfB appears as a selectable method in [Conditional Access authentication strengths](/passkey-path/it-admin/conditional-access/) for policy enforcement.

**Best for:** Users on managed devices who primarily work from one computer. No extra hardware to carry.

## All three are phishing-resistant

The security model is the same across all three. The private key never crosses the network. WebAuthn binds each authentication to the specific website origin, so a phishing page on a lookalike domain can't intercept the credential. There's no password, no OTP, and no push notification to approve.

## How they work together

These aren't mutually exclusive. A typical Entra deployment looks like:

- **Standard users** get Authenticator passkeys as their primary method
- **Admins and privileged roles** get FIDO2 security keys with stricter Conditional Access policies
- **Users on managed Windows devices** also have Windows Hello as a convenient option

Each user can register multiple passkeys across different methods. If they lose one, they still have others - or your helpdesk can issue a [Temporary Access Pass](/passkey-path/helpdesk/tap-issuance/) for re-enrollment.

## Entra portal reference

Authenticator and Passkey (FIDO2) are managed in the Entra portal under **Protection > Authentication methods**, scoped to specific groups and targetable via Conditional Access. Windows Hello for Business is configured separately through Intune device configuration profiles or Group Policy, and is selectable as an authentication method in Conditional Access authentication strengths.

![Authentication methods overview showing Passkey (FIDO2), Microsoft Authenticator, and other methods with their enabled status and target groups](/assets/images/Authentication-Methods.png)

[View in Entra portal](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/~/AdminAuthMethods)

*Source: [Microsoft Entra passkey documentation](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2)*
