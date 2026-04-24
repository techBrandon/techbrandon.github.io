---
layout: page
title: "Building a Phishing-Resistant MFA Strategy"
description: "An end-to-end strategy for phishing-resistant authentication that goes beyond deploying passkeys"
next_pages:
  - url: /passkey-path/security/compliance/
    title: "Compliance and Regulatory Alignment"
    description: "Map this strategy to frameworks your organization follows"
  - url: /passkey-path/security/credential-lifecycle/
    title: "Credential Lifecycle and Hygiene"
    description: "Retiring the credentials that undermine phishing resistance"
crosslinks:
  - url: /passkey-path/it-admin/conditional-access/
    title: "Conditional Access for Passkeys"
    role: "IT Admin"
    description: "The CA policies that enforce phishing-resistant methods"
  - url: /passkey-path/it-admin/rollout-planning/
    title: "Phased Rollout Strategy"
    role: "IT Admin"
    description: "The deployment plan that makes this strategy operational"
---

Deploying passkeys is one piece of a phishing-resistant MFA strategy. A complete approach also covers enforcement, recovery, and retiring the weaker methods that attackers will target instead.

## What "phishing-resistant" actually means

An authentication method is phishing-resistant when it cannot be intercepted by an attacker controlling a fake login page. Specifically:

- **No shared secrets cross the network** - no password, no OTP, no TOTP code
- **Origin binding** - the cryptographic challenge is bound to the legitimate website's domain. A phishing page on a lookalike domain can't complete the handshake.
- **No user-transferable tokens** - there's nothing the user can read off a screen and type into a fake site

Methods that meet this bar in Entra:
- Passkeys (FIDO2 security keys, Authenticator passkeys, platform passkeys)
- Windows Hello for Business
- Certificate-based authentication (smart cards, virtual smart cards)

*Source: Microsoft's built-in [Phishing-resistant MFA authentication strength](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths) lists FIDO2 security key, Windows Hello for Business (or platform credential), and Entra certificate-based authentication (multifactor) as the phishing-resistant combinations.*

Methods that **don't** meet this bar:
- Password + SMS code
- Password + Authenticator push notification
- Password + TOTP code (Google Authenticator, etc.)
- Email-based OTP

Push notifications are commonly considered "strong MFA" but they're vulnerable to fatigue attacks and AiTM proxies. They are **not** phishing-resistant.

## The four layers

### Layer 1: Deploy phishing-resistant credentials

This is the passkey rollout itself - covered in detail across the [IT Admin track](/passkey-path/it-admin/). The goal is getting a phishing-resistant method registered for every user.

Key decisions:
- Syncable vs device-bound passkeys per user population
- Which methods to enable (Authenticator, FIDO2, Windows Hello)
- Phased rollout sequence

### Layer 2: Enforce phishing-resistant authentication

Deploying passkeys gives users the *option* to use them. Enforcement ensures they *must* use them. This is the [Conditional Access authentication strength](/passkey-path/it-admin/conditional-access/) layer:

- Require phishing-resistant MFA for all cloud apps
- Start in report-only, move to enforced per rollout phase
- Custom authentication strengths for privileged accounts (hardware keys only)

Without enforcement, users may continue using their password, and attackers will target the password.

### Layer 3: Secure the recovery process

The recovery process is the new attack surface. When a user loses their device, the [identity verification](/passkey-path/helpdesk/identity-verify/) and [TAP issuance](/passkey-path/helpdesk/tap-issuance/) process becomes the authentication mechanism. If this process is weak, it undermines the entire strategy.

Requirements for a phishing-resistant recovery process:
- Multi-step identity verification (not just "confirm your employee ID")
- Manager approval or in-person verification for high-risk accounts
- TAP scoped to minimum necessary duration and usage count
- Logging and alerting on all TAP issuances
- Clear escalation criteria for suspicious requests

### Layer 4: Retire legacy credentials

This is the step most organizations defer and the one that determines whether your strategy actually works. As long as passwords exist, [downgrade attacks](/passkey-path/security/downgrade-attacks/) remain viable.

The [credential lifecycle](/passkey-path/security/credential-lifecycle/) plan should define:
- When passwords become disabled per user population
- When SMS and push MFA methods are removed
- How to handle legacy applications that still require passwords
- The timeline from passkey enrollment to full legacy credential removal

## Strategy document template

If you need to present this to leadership or a security review board:

**1. Objective**
Eliminate phishing as a viable attack vector against organizational authentication by deploying and enforcing phishing-resistant MFA for all users and applications.

**2. Current state**

Include the following environment-specific details:
- Authentication methods in use today
- Phishing incident frequency and impact
- MFA bypass incidents (fatigue, AiTM, SIM swap)

**3. Target state**
- All users authenticated via passkeys, Windows Hello for Business, or certificate-based auth
- Conditional Access enforcing phishing-resistant MFA for all cloud apps
- Legacy credentials (passwords, SMS, push) removed
- Recovery process secured with verified identity checks

**4. Milestones**

| Milestone | Target date | Owner |
|-----------|------------|-------|
| Pilot group enrolled in passkeys | | IT Admin |
| CA policy in report-only mode | | IT Admin |
| Org-wide passkey enrollment complete | | IT Admin |
| CA policy enforced for all users | | IT Admin |
| Identify applications that can't use modern auth | | App owners + IT Admin |
| Legacy MFA methods removed | | IT Admin + Security |
| Passwords disabled for standard users | | IT Admin + Security |
| Legacy applications migrated off basic auth | | App owners |

**5. Risk during transition**
- [Downgrade attack surface](/passkey-path/security/downgrade-attacks/) exists while legacy methods remain
- Mitigation: CA authentication strengths + monitoring
- Acceptable transition window: [define per org]

**6. Success metrics**
- % of users with phishing-resistant method enrolled
- % of sign-ins using phishing-resistant methods (vs legacy)
- Phishing simulation click-to-compromise rate
- Password reset ticket volume (should approach zero)
- Time from passkey enrollment to legacy credential removal

## The CISA alignment

CISA's [fact sheet on implementing phishing-resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) recommends phishing-resistant MFA as a priority action. If your organization follows CISA guidance (common in government, critical infrastructure, and federal contractors), passkey deployment directly addresses this recommendation.

The takeaway from CISA: standard MFA (push, SMS, TOTP) is better than nothing, but it doesn't hold up against sophisticated threats. Phishing-resistant MFA is where you need to be.
