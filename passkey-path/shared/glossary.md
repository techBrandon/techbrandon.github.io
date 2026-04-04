---
layout: page
title: "Glossary"
description: "Key terms and acronyms used throughout the Passkey Path guide"
---

**AAGUID** (Authenticator Attestation Globally Unique Identifier)
A unique identifier assigned to each authenticator model. In Entra, you can configure AAGUID allowlists to restrict which hardware models can register FIDO2 security keys. For example, a YubiKey 5 NFC has a different AAGUID than a Feitian BioPass - you can allow one and block the other.

**Attestation**
A mechanism where an authenticator cryptographically proves its identity (make, model, firmware version) during registration. Entra uses attestation to enforce AAGUID allowlists, ensuring only approved hardware can enroll. See [Attestation and AAGUIDs](/passkey-path/it-admin/attestation-aaguids/).

**Authentication strength**
An Entra Conditional Access feature that lets you define which authentication methods satisfy a policy. The built-in "Phishing-resistant MFA" strength requires passkeys, FIDO2 keys, or certificate-based auth - blocking weaker methods like SMS or push. See [Conditional Access for Passkeys](/passkey-path/it-admin/conditional-access/).

**Conditional Access (CA)**
Entra's policy engine for controlling how and when users authenticate. CA policies can require specific authentication strengths, restrict access by location or device compliance, and enforce phishing-resistant MFA.

**Downgrade attack**
An attack where an adversary bypasses a strong authentication method (like a passkey) by targeting a weaker method still enrolled on the same account (like a password + SMS). The fix is removing legacy credentials after passkey rollout. See [Downgrade Attacks](/passkey-path/security/downgrade-attacks/).

**FIDO2**
An open authentication standard developed by the [FIDO Alliance](https://fidoalliance.org/fido2/). FIDO2 consists of WebAuthn (the browser API) and CTAP (the protocol between browser and authenticator). Passkeys are built on FIDO2.

**FIDO Alliance**
The industry consortium that develops FIDO2 and related authentication standards. Members include Apple, Google, Microsoft, Yubico, and hundreds of other organizations.

**MFA** (Multi-Factor Authentication)
Authentication requiring two or more factors - typically something you know (password), something you have (device), or something you are (biometric). Passkeys combine possession (device) and inherence (biometric) or knowledge (PIN) in a single step.

**Passkey**
A FIDO2-based credential that replaces passwords with a cryptographic key pair. The private key stays on your device; the public key is stored with the service. See [What Is a Passkey?](/passkey-path/shared/what-is-a-passkey/).

**Phishing-resistant MFA**
Authentication methods that cannot be intercepted by phishing attacks. Passkeys, FIDO2 security keys, and certificate-based authentication are phishing-resistant because the cryptographic challenge is bound to the website origin - a fake domain cannot complete the handshake.

**Private key**
The secret half of a passkey's key pair. It stays on your device (or in a platform credential manager for syncable passkeys) and is used to sign authentication challenges. It is never sent to the service you're signing into.

**Public key**
The non-secret half of a passkey's key pair. It's stored by the service during registration and used to verify that authentication challenges were signed by the matching private key.

**Device-bound passkey**
A passkey whose private key is stored in hardware and cannot be exported or synced. FIDO2 security keys and Windows Hello TPM-backed credentials are device-bound. See [Device-Bound vs Syncable Passkeys](/passkey-path/shared/device-bound-vs-sync/).

**Syncable passkey**
A passkey whose private key is backed up and synced via a platform credential manager (iCloud Keychain, Google Password Manager, Microsoft Authenticator). Survives device loss but the key can leave the originating hardware. See [Device-Bound vs Syncable Passkeys](/passkey-path/shared/device-bound-vs-sync/).

**TAP** (Temporary Access Pass)
An Entra feature that issues a time-limited passcode for account recovery or initial setup. When a user loses their passkey, helpdesk issues a TAP so they can sign in and register a new credential. See [Issuing Temporary Access Passes](/passkey-path/helpdesk/tap-issuance/).

**TPM** (Trusted Platform Module)
A hardware security chip built into most modern computers. It stores cryptographic keys in a way that prevents extraction. Windows Hello for Business uses the TPM to store device-bound passkeys.

**WebAuthn** (Web Authentication)
A W3C standard that defines the browser API for creating and using passkeys. When you register or sign in with a passkey, your browser uses the WebAuthn API to communicate with your authenticator.
