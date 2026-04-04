---
layout: page
title: "Device and OS Compatibility"
description: "What hardware, operating systems, and browsers support passkey authentication with Entra"
next_pages:
  - url: /passkey-path/it-admin/legacy-coexistence/
    title: "Legacy Apps and Coexistence"
    description: "Handle apps that don't support modern auth"
  - url: /passkey-path/it-admin/rollout-planning/
    title: "Phased Rollout Strategy"
    description: "Plan your deployment with device readiness in mind"
crosslinks:
  - url: /passkey-path/end-user/setup-authenticator/
    title: "Setting Up a Passkey with Authenticator"
    role: "End User"
    description: "Setup steps vary by platform and OS version"
  - url: /passkey-path/end-user/setup-security-key/
    title: "Setting Up a FIDO2 Security Key"
    role: "End User"
    description: "Hardware key setup across different platforms"
---

Passkey support depends on the combination of operating system, browser, and authenticator type. Before expanding your rollout, audit your device fleet against these requirements.

## Platform passkey support

### Microsoft Authenticator passkeys

| Platform | Minimum Version | Notes |
|----------|----------------|-------|
| iOS | 16.0+ | Passkey syncs via iCloud Keychain |
| Android | 9.0+ | Passkey syncs via Google Password Manager |
| Authenticator app | 6.8.0+ | Required on both platforms |

### FIDO2 security keys

| Platform | Minimum Version | USB | NFC | Bluetooth |
|----------|----------------|-----|-----|-----------|
| Windows | 10 (1903+) | Yes | Limited | No |
| macOS | Ventura (13+) | Yes | No | No |
| iOS | 16.0+ | No | Yes | No |
| Android | 9.0+ | Yes (OTG) | Yes | No |
| ChromeOS | 89+ | Yes | No | No |
| Linux | Varies | Yes | No | No |

*NFC support on Windows requires specific reader hardware and can be inconsistent. USB is the most reliable cross-platform option.*

### Windows Hello for Business

| Requirement | Details |
|-------------|---------|
| Windows version | 10 (1903+) or 11 |
| Hardware | TPM 2.0 required |
| Biometric | Optional - PIN works as fallback |
| Management | Intune, Group Policy, or ConfigMgr |

## Browser support

All major browsers support WebAuthn, but with differences:

| Browser | Platform passkeys | FIDO2 keys | Cross-device auth |
|---------|------------------|------------|-------------------|
| Chrome 67+ | Yes | Yes | Yes (via QR/BLE) |
| Edge 79+ | Yes | Yes | Yes |
| Safari 14+ | Yes | Yes | Yes (Apple ecosystem) |
| Firefox 60+ | Partial | Yes | Limited |

**Cross-device authentication** is the flow where you scan a QR code on your phone to authenticate on a desktop browser. This works well in Chrome and Edge but has inconsistencies in Firefox.

## Known gaps and gotchas

### Apps using legacy authentication

Applications that use older authentication protocols (basic auth, legacy Exchange, IMAP/POP) cannot use passkeys. These need separate handling - see [Legacy Apps and Coexistence](/passkey-path/it-admin/legacy-coexistence/).

### Remote Desktop (RDP)

RDP supports passkey authentication when connecting to remote machines. However, local virtualization platforms (Hyper-V, Parallels) may have issues passing through passkey authentication to the guest OS. Test your specific virtualization setup before assuming it works.

### VPN clients

Most VPN clients authenticate via a web-based flow or SAML that supports passkeys. However, older VPN clients with custom login screens may not. Test your specific VPN setup before rolling out.

### Mobile app sign-in

Some mobile apps use embedded web views for authentication that may not support passkeys. Apps using the system browser for sign-in (via MSAL or broker-based auth) generally work. Test your critical mobile apps.

### Shared/kiosk devices

On shared devices where users don't have persistent profiles, Authenticator passkeys don't work well because the app is tied to the device owner. FIDO2 security keys are the right choice - each user carries their own key and signs in with their own account on the shared device.

## Auditing your fleet

Before expanding your rollout, answer these questions:

1. **What OS versions are deployed?** Pull a device inventory from Intune or your endpoint management tool. Flag devices below the minimum versions.
2. **What browsers are in use?** If you enforce a specific browser via policy, confirm it supports your passkey method.
3. **Which apps use legacy auth?** Check the Entra sign-in logs, filter on **Client app** for legacy authentication protocols.
4. **Do you have shared workstations?** Identify where FIDO2 keys are needed instead of Authenticator passkeys.
5. **What about remote workers?** Determine how they'll authenticate - especially if they use RDP or VPN.

Run this audit early. Finding a compatibility gap mid-rollout is a lot more painful than finding it during planning.
