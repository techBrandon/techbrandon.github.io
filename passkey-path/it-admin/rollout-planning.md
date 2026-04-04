---
layout: page
title: "Phased Rollout Strategy"
description: "Plan your passkey deployment from pilot to production with clear milestones"
next_pages:
  - url: /passkey-path/it-admin/conditional-access/
    title: "Conditional Access for Passkeys"
    description: "Enforce phishing-resistant methods once users are enrolled"
  - url: /passkey-path/it-admin/device-compat/
    title: "Device and OS Compatibility"
    description: "Audit your fleet before expanding"
crosslinks:
  - url: /passkey-path/end-user/what-changes/
    title: "What Changes for You"
    role: "End User"
    description: "The user-facing explanation of what's changing and why"
  - url: /passkey-path/security/credential-lifecycle/
    title: "Credential Lifecycle and Hygiene"
    role: "Security Lead"
    description: "Planning the retirement of legacy credentials"
---

A passkey rollout has more moving parts than flipping a switch in the portal. A phased approach lets you catch issues early without putting the whole organization at risk.

## Phase 0: Prerequisites

Before you start enrolling anyone, confirm these are in place:

- **Authentication methods enabled** for your pilot group (see [Configuring Authentication Methods](/passkey-path/it-admin/entra-policy-setup/))
- **Temporary Access Pass enabled** with appropriate duration and usage settings (see [TAP Issuance](/passkey-path/helpdesk/tap-issuance/))
- **Helpdesk identity verification process** defined and documented (see [Identity Verification](/passkey-path/helpdesk/identity-verify/))
- **Device compatibility audit** completed - you know which users have supported hardware and OS versions
- **Conditional Access** in report-only mode for phishing-resistant MFA (don't enforce yet)
- **User communication template** drafted - what passkeys are, why you're rolling them out, and what users need to do

## Phase 1: IT pilot (Week 1-2)

**Who:** 5-10 members of IT staff

**Goal:** Validate the technical setup, registration flow, and day-to-day sign-in experience.

**Steps:**
1. Pilot users register passkeys via My Security Info
2. Test all three methods if applicable (Authenticator, FIDO2, Windows Hello)
3. Test sign-in across common scenarios: web apps, desktop apps, VPN, mobile
4. Simulate device loss - issue a TAP and re-enroll
5. Check sign-in logs for any unexpected failures
6. Document issues and gaps

**Exit criteria:** All pilot users can sign in reliably, recovery process works, no blocking issues.

## Phase 2: Early adopters (Week 3-4)

**Who:** 20-50 users across 2-3 departments, selected for willingness and device readiness

**Goal:** Validate at broader scale, stress-test helpdesk processes, and refine user communications.

**Steps:**
1. Send user communication explaining passkeys and linking to setup instructions
2. Enable authentication methods for early adopter group
3. Provide drop-in support sessions (virtual or in-person) for first-time registration
4. Monitor sign-in logs and helpdesk ticket volume
5. Refine the communication template based on questions users actually ask
6. Run a tabletop exercise with helpdesk: "A user calls saying they lost their phone and need a TAP"

**Exit criteria:** 80%+ of early adopters enrolled, helpdesk handled at least 2-3 recovery scenarios, user communications are finalized.

## Phase 3: Department-wide expansion (Week 5-8)

**Who:** One or more full departments (100+ users)

**Goal:** Scale deployment and begin enforcing passkey-compatible policies.

**Steps:**
1. Enable authentication methods for department groups
2. Send department-wide communication
3. Move Conditional Access policy from report-only to enforced for the department - require phishing-resistant MFA
4. Monitor for users blocked by the CA policy and assist with enrollment
5. Track enrollment rate and set a target (e.g., 90% within 2 weeks)
6. Identify holdouts and determine if they have legitimate blockers (unsupported devices, accessibility needs)

**Exit criteria:** 90%+ department enrollment, CA policy enforced without significant disruption, helpdesk volume is manageable.

## Phase 4: Organization-wide (Week 9+)

**Who:** All users

**Goal:** Complete the rollout and begin planning legacy credential retirement.

**Steps:**
1. Enable authentication methods for all users
2. Send org-wide communication (by now you'll have a polished template)
3. Expand Conditional Access enforcement to all users
4. Begin tracking which users still have passwords and legacy MFA methods enrolled
5. Plan the [credential lifecycle](/passkey-path/security/credential-lifecycle/) timeline for removing legacy methods
6. Set a date for when password-only authentication will no longer satisfy policy

## Communication template

A starting point for your user-facing message. Adapt the tone to your organization:

> **Subject: {{Corporation Name}} is upgrading how you sign in - here's what to expect**
>
> We're rolling out passkeys - a faster, more secure way to sign in that replaces your password. On your own device, it works like unlocking your phone or computer - fingerprint, face, or PIN. On a shared or different computer, you'll scan a QR code with your phone first.
>
> **What you need to do:**
> 1. Go to [My Security Info](https://mysignins.microsoft.com/security-info)
> 2. Click "Add sign-in method" and select "Passkey in Microsoft Authenticator" (or "Security key" if you received a hardware key)
> 3. Follow the on-screen steps - it takes about 2 minutes
>
> **What changes:**
> - Sign-in gets faster - no more typing passwords
> - No more SMS codes or push notifications to approve
> - If you lose your device, contact {{Helpdesk Contact}} for a temporary pass to re-enroll
>
> **Questions?** {{FAQ Link or Support Channel}}

## Rollback plan

If you hit a blocking issue during any phase:

1. Switch the Conditional Access policy back to report-only (don't delete it)
2. Do not remove users' registered passkeys - they can continue using them alongside other methods
3. Investigate the issue and determine if it's environmental (specific app, device type, network) or systemic
4. Communicate transparently with affected users

The point of phased rollout is that rollback affects a limited group, not the whole organization.
