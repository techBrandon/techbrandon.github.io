---
layout: page
title: "Credential Lifecycle and Hygiene"
description: "Planning the retirement of legacy credentials after passkey deployment"
next_pages:
  - url: /passkey-path/security/downgrade-attacks/
    title: "Downgrade Attacks"
    description: "Why credential retirement is urgent"
  - url: /passkey-path/security/risk-assessment/
    title: "Risk Assessment Framework"
    description: "Evaluate residual risk after credential cleanup"
crosslinks:
  - url: /passkey-path/it-admin/rollout-planning/
    title: "Phased Rollout Strategy"
    role: "IT Admin"
    description: "Credential retirement is the final rollout phase"
  - url: /passkey-path/it-admin/legacy-coexistence/
    title: "Legacy Apps and Coexistence"
    role: "IT Admin"
    description: "Legacy apps that block password removal"
---

Deploying passkeys is the starting line. Removing legacy credentials is what actually changes your security posture. Until passwords and weak MFA methods are gone, the [downgrade attack](/passkey-path/security/downgrade-attacks/) surface stays open.

## What needs to be retired

In order of security impact:

### 1. Passwords

Passwords are the primary downgrade target. While a password exists on an account, an attacker can use it - regardless of what other methods are available.

**How to disable in Entra:**
- Per-user: set the account to "passwordless" once the user has a passkey registered and verified
- At scale: use Entra's passwordless authentication configuration combined with CA policies that reject password-based sign-ins
- Monitor sign-in logs for password usage before disabling - make sure the user isn't relying on it for any workflow

**Blocker:** Legacy applications that require passwords. See [Legacy Apps and Coexistence](/passkey-path/it-admin/legacy-coexistence/).

### 2. SMS and voice MFA

SMS-based MFA is vulnerable to SIM swapping, SS7 interception, and social engineering of carrier staff. Voice calls have similar risks.

**How to remove in Entra:**
- Go to **Protection > Authentication methods > SMS** and scope it away from users who have passkeys
- Remove phone numbers from user authentication methods: **Users > [user] > Authentication methods**
- Be aware that some self-service password reset (SSPR) flows may rely on SMS - update SSPR policy first

### 3. Authenticator push notifications

Traditional Authenticator push (approve/deny) is vulnerable to MFA fatigue attacks. Once a user has a passkey in Authenticator, the push-based approval is redundant.

**How to migrate:**
- In Authenticator authentication method policy, set the mode to "Passwordless" instead of "Any"
- This disables the push notification flow while preserving the passkey capability
- Users who haven't enrolled a passkey yet will lose push MFA - only do this after enrollment is confirmed

### 4. App passwords

App passwords are static credentials issued for legacy applications that don't support modern auth. They bypass MFA entirely.

**How to remove:**
- Identify users with app passwords: use the Entra admin center or PowerShell
- Revoke app passwords: **Users > [user] > Authentication methods > App passwords > Delete**
- Migrate the underlying applications off legacy auth (see [Legacy Apps](/passkey-path/it-admin/legacy-coexistence/))

### 5. TOTP (third-party authenticator apps)

Software TOTP tokens (Google Authenticator, Authy, etc.) are phishable via AiTM proxies. If users registered these as MFA methods, remove them after passkey enrollment.

## Retirement timeline

Here's a practical timeline pegged to passkey enrollment phases:

| Phase | Timing | Action |
|-------|--------|--------|
| Enrollment | Day 0-30 | Users register passkeys. No credentials removed yet. |
| Enforcement | Day 30-60 | CA policy requires phishing-resistant MFA. Passwords still exist but can't satisfy policy for covered apps. |
| Monitoring | Day 60-90 | Review sign-in logs. Identify users still using passwords for any workflow. Investigate and remediate. |
| SMS/voice removal | Day 60-90 | Remove SMS and voice MFA for passkey-enrolled users. |
| Push migration | Day 90-120 | Switch Authenticator to passwordless-only mode for enrolled users. |
| Password disable | Day 90-180 | Disable passwords for users with no legacy app dependencies. |
| App password revocation | Ongoing | Revoke as legacy apps are migrated. |
| Full cleanup | Day 180+ | All standard users passwordless. Privileged accounts on hardware keys only. |

Adjust dates based on your organization's size, legacy app situation, and risk tolerance. The point is having a timeline. "We'll do it eventually" means it never happens.

## Measuring progress

Track these metrics to demonstrate progress and identify blockers:

**Enrollment rate**
- % of users with at least one passkey registered
- Target: 100% for covered populations

**Legacy method prevalence**
- Number of users with passwords still active
- Number of users with SMS MFA still registered
- Number of active app passwords

**Sign-in method distribution**
- % of sign-ins using passkeys vs password vs other methods
- Trend over time (should shift heavily toward passkeys)

**Stale passwords**
- Users whose passwords haven't been used in 30/60/90 days
- These are candidates for immediate password disable

**Legacy auth sign-ins**
- Sign-ins using legacy authentication protocols
- Each one represents a workflow blocking full credential retirement

## The conversation with leadership

Credential retirement is where security teams often face pushback. "Users might need their password as a fallback" is the most common objection.

Counter-arguments:
- **"Keeping the password as a fallback keeps the attack surface open"** - the whole point of passkeys is removing the password. A fallback password is an attacker's primary target.
- **"TAP exists for emergency access"** - if a user can't use their passkey, the helpdesk issues a TAP. This is more secure than a persistent password because it's time-limited, single-use, and logged.
- **"We can enforce via CA"** - true, but CA enforcement has gaps (uncovered apps, legacy protocols). Removing the credential is more complete than policy enforcement alone.
- **"Other organizations are doing this"** - Microsoft, Google, and others are actively moving toward passwordless. This isn't experimental.

Nobody is saying remove credentials recklessly. The point is having a plan with dates, metrics, and accountability. Six months with milestones beats an indefinite "we'll get to it."
