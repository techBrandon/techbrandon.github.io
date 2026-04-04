---
layout: page
title: "Device-Bound vs Syncable Passkeys"
description: "Two types of passkeys with different security and usability trade-offs"
next_pages:
  - url: /passkey-path/it-admin/entra-policy-setup/
    title: "Configuring Authentication Methods"
    description: "Enable and scope passkey methods in Entra"
  - url: /passkey-path/it-admin/attestation-aaguids/
    title: "Attestation and AAGUIDs"
    description: "Control which authenticators can register"
crosslinks:
  - url: /passkey-path/security/risk-assessment/
    title: "Passkey Risk Assessment Framework"
    role: "Security Lead"
    description: "Evaluating passkey deployment risk including credential portability"
  - url: /passkey-path/helpdesk/device-loss/
    title: "Device Loss Recovery Playbook"
    role: "Helpdesk"
    description: "Recovery processes differ based on passkey type"
---

Not all passkeys work the same way. The distinction between device-bound and syncable passkeys matters when you're writing policy, choosing hardware, and planning recovery workflows.

## Syncable passkeys

Syncable passkeys live in a platform's credential manager:

- **iCloud Keychain** (Apple devices)
- **Google Password Manager** (Android and Chrome)
- **Microsoft Authenticator** (iOS and Android)

When a user creates a syncable passkey, the private key gets encrypted and backed up to their platform account. If they get a new phone, the passkey restores automatically - no re-enrollment, no helpdesk ticket.

### The trade-off

The private key *can* leave the originating hardware. It's encrypted in transit and at rest within the platform's credential manager, but it's no longer confined to a single physical device. For most organizations, this is an acceptable trade-off. The platforms protect these keys with their own security models (end-to-end encryption, device attestation, account protection).

But in **high-assurance environments** - government, financial services, or anywhere regulatory frameworks mandate hardware-bound credentials - this portability may be a compliance concern.

### When to use them

Syncable passkeys are the right default for most users because:

- **Lower helpdesk burden** - device replacement doesn't mean credential re-enrollment
- **Better user experience** - passkeys "just appear" on new devices
- **Reduced lockout risk** - losing one device doesn't mean losing access

## Device-bound passkeys

Device-bound passkeys stay on the physical hardware they were created on. The private key is generated inside a secure element (a TPM, secure enclave, or hardware security module) and cannot be exported.

The most common examples:

- **FIDO2 security keys** - YubiKey, Feitian, Google Titan. The private key lives on the key's chip.
- **Windows Hello for Business** - private key stored in the device's TPM
- **Platform authenticators** with export disabled

### The trade-off

If the device is lost, the passkey is gone. There's no backup, no sync, no recovery - only re-enrollment. This means your helpdesk needs a robust identity verification and [Temporary Access Pass](/passkey-path/helpdesk/tap-issuance/) process.

### When to use them

Device-bound passkeys belong in your privileged access tier:

- **Admin accounts** - global admins, other highly privileged admin accounts, and break-glass adjacent roles
- **Shared workstations** - kiosks, factory floors, clinical stations where personal devices aren't practical
- **Compliance-driven environments** - where regulations require hardware-bound credentials
- **High-value targets** - executives, finance, anyone with elevated access to sensitive data

## Side-by-side comparison

| Factor | Syncable | Device-bound |
|--------|----------|--------------|
| Private key location | Platform credential manager (cloud-backed) | Hardware secure element only |
| Survives device loss | Yes - restores on new device | No - must re-enroll |
| Helpdesk recovery burden | Low | Higher |
| Portability | Cross-device within platform | Single device only |
| Compliance fit | Standard users, most environments | High-assurance, privileged access |
| Examples | Authenticator app, iCloud Keychain, Google Password Manager | YubiKey, Windows Hello TPM |

## The practical recommendation

For most organizations, the right approach is both:

- **Syncable passkeys via Authenticator** as the default for standard users
- **Device-bound passkeys via FIDO2 security keys** for privileged accounts and high-security scenarios

Sync handles the majority. Hardware keys cover the accounts that can't afford the portability risk. You can enforce this split using Entra's [Conditional Access authentication strengths](/passkey-path/it-admin/conditional-access/) and [AAGUID allowlists](/passkey-path/it-admin/attestation-aaguids/).
