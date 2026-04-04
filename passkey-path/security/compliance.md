---
layout: page
title: "Compliance and Regulatory Alignment"
description: "Mapping passkey deployment to NIST 800-63, Zero Trust, cyber insurance, and other frameworks"
next_pages:
  - url: /passkey-path/security/credential-lifecycle/
    title: "Credential Lifecycle and Hygiene"
    description: "Credential retirement that compliance timelines may require"
  - url: /passkey-path/security/risk-assessment/
    title: "Risk Assessment Framework"
    description: "Broader risk evaluation for deployment decisions"
crosslinks:
  - url: /passkey-path/it-admin/attestation-aaguids/
    title: "Attestation and AAGUIDs"
    role: "IT Admin"
    description: "Hardware attestation for compliance-driven authenticator restrictions"
---

Passkey deployment often intersects with compliance requirements. This page maps passkeys to the frameworks your organization is most likely dealing with.

## NIST 800-63: Digital Identity Guidelines

NIST 800-63 revision 4 (2024) defines authenticator assurance levels (AALs) that directly apply to passkeys:

### AAL1 (Single-factor)
- Requires at least one authentication factor
- Password alone satisfies this level
- **Passkeys exceed AAL1** by providing two factors in a single step

### AAL2 (Multi-factor)
- Requires two distinct factors
- Password + SMS OTP satisfies this level (just barely)
- **Passkeys satisfy AAL2** - the device is "something you have" and the biometric or PIN is "something you are" or "something you know." Two factors in a single action.
- Both syncable and device-bound passkeys meet AAL2

### AAL3 (Hardware-based multi-factor)
- Requires a hardware-bound authenticator with verifiable attestation
- **Device-bound passkeys** (FIDO2 security keys with attestation) satisfy AAL3
- **Syncable passkeys do not** - the key can leave the originating hardware
- This is the level that matters for privileged access in high-assurance environments

### Practical implication

If your organization cites NIST 800-63:
- Syncable passkeys meet AAL2 - appropriate for standard user access
- FIDO2 security keys with attestation meet AAL3 - required for privileged or sensitive access
- Configure [AAGUID allowlists](/passkey-path/it-admin/attestation-aaguids/) to enforce hardware-bound authenticators where AAL3 is needed

## Zero Trust alignment

Passkeys fit directly into Zero Trust architecture principles. The key mappings:

**"Verify explicitly"** - passkeys provide cryptographic proof of identity at every sign-in, bound to the specific service origin. No cached credentials, no replayable tokens.

**"Use least privilege access"** - passkeys themselves don't implement least privilege, but they enable it. Strong authentication is the foundation for Conditional Access policies that enforce least privilege based on role, device, and context.

**"Assume breach"** - passkeys limit the blast radius of a breach. A compromised password database doesn't expose passkey credentials. A phishing campaign can't harvest passkeys. The credential itself is resistant to the lateral movement that "assume breach" anticipates.

If your Zero Trust strategy references CISA's [Zero Trust Maturity Model](https://www.cisa.gov/zero-trust-maturity-model), passkeys move the Identity pillar from "Traditional" or "Initial" toward "Advanced" or "Optimal" maturity.

## Cyber insurance requirements

Cyber insurance underwriters increasingly require or incentivize MFA. The trend is moving beyond "do you have MFA?" toward "what kind of MFA?"

Common insurance questionnaire requirements:

| Requirement | Passkey compliance |
|-------------|-------------------|
| "MFA for all remote access" | Passkeys satisfy this (and exceed it) |
| "MFA for email access" | Passkeys satisfy this |
| "MFA for privileged accounts" | Passkeys satisfy this - FIDO2 keys for strongest posture |
| "Phishing-resistant MFA" | Passkeys directly satisfy this (newer questionnaires) |
| "MFA for all users" | Requires org-wide passkey deployment |

Some insurers are beginning to differentiate premiums based on MFA strength. Moving from SMS-based MFA to phishing-resistant passkeys may improve your coverage terms or reduce premiums. Ask your broker.

## Executive Order 14028 (US Federal)

If your organization is a US federal agency or contractor, [EO 14028](https://www.cisa.gov/executive-order-improving-nations-cybersecurity) and subsequent OMB guidance (M-22-09) require phishing-resistant MFA. Passkeys and FIDO2 security keys directly satisfy this requirement.

Key points:
- Federal agencies must implement phishing-resistant MFA for all staff
- FIDO2/WebAuthn is explicitly cited as an acceptable technology
- Contractors handling federal data may face similar requirements through contract language

## PCI DSS 4.0

PCI DSS 4.0 (effective March 2025) strengthens MFA requirements for access to cardholder data environments:

- MFA is required for all access to the CDE (not just remote access)
- The standard doesn't explicitly require phishing-resistant MFA, but the spirit of the requirement favors it
- Using passkeys for CDE access positions you ahead of likely future PCI guidance

## SOC 2

SOC 2 doesn't prescribe specific authentication technologies, but auditors evaluate the strength of your authentication controls. Having phishing-resistant MFA deployed demonstrates:

- **CC6.1** - Logical access security: strong authentication controls in place
- **CC6.3** - Access to systems: MFA that resists common attack techniques
- Auditors will notice phishing-resistant MFA over weaker alternatives

## Building the compliance case

When presenting to compliance stakeholders:

1. **Map each framework requirement** to a specific passkey capability (use the tables above)
2. **Distinguish AAL2 vs AAL3** - be clear about which user populations need device-bound keys
3. **Document the transition timeline** - compliance often cares about when you'll be fully deployed, not just that you started
4. **Show enforcement** - enrollment alone isn't compliance. Conditional Access enforcement is what makes it real.
5. **Address exceptions** - document any legacy applications or user populations that can't use passkeys yet, with remediation plans
