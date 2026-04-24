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

Passwords are the primary downgrade target. While a usable password exists on an account, an attacker can use it - regardless of what other methods are available.

**How to disable in Entra:**
- **Conditional Access first.** Create a CA policy that requires phishing-resistant MFA (or a custom authentication strength that excludes password-based combinations). Passwords aren't literally removable from an Entra account, so CA is the enforcement mechanism that makes them unusable for covered resources.
- **Randomize the password** via admin action or Microsoft Graph once CA enforcement is in place. The account still has a password, but nobody - including the user - knows what it is. This is as close as Entra gets to "no password." Use the [Reset-MgUserPassword](https://learn.microsoft.com/en-us/graph/api/user-update) Graph API or reset from the Entra admin center with a generated value, and do not communicate the value to the user.
- **Monitor sign-in logs** for password usage before randomizing - make sure the user isn't relying on it for any workflow.

**Blocker:** Legacy applications that require passwords. See [Legacy Apps and Coexistence](/passkey-path/it-admin/legacy-coexistence/).

### 2. SMS and voice MFA

SMS-based MFA is vulnerable to SIM swapping, SS7 interception, and social engineering of carrier staff. Voice calls have similar risks.

**How to remove in Entra:**
- Go to **Protection > Authentication methods > SMS** and exclude users who have passkeys
- Remove phone numbers from user authentication methods: **Users > [user] > Authentication methods**

**Blocker:** Self-service password reset (SSPR) flows may rely on SMS as a verification factor. Update the SSPR policy to use passkey-compatible factors before removing SMS, or users will lose the ability to reset their own passwords.

### 3. Authenticator push notifications

Traditional Authenticator push (approve/deny) is vulnerable to MFA fatigue attacks. Once a user has a passkey in Authenticator, the push-based approval is redundant.

**How to retire:**
- Enforce phishing-resistant MFA via Conditional Access for the groups that have completed passkey enrollment. Push notifications do not satisfy the phishing-resistant strength, so covered sign-ins will route to the passkey in Authenticator instead. See [Overview of Conditional Access authentication strengths](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths) for the built-in strength definitions.
- In **Protection > Authentication methods > Microsoft Authenticator**, narrow the targeted groups so push notifications are only offered to users who haven't yet enrolled a passkey. As enrollment completes, shrink the scope until no one has push available.

**Blocker:** Users who haven't enrolled a passkey yet will lose push MFA if the scope is narrowed too aggressively. Only shrink the scope as each group confirms enrollment.

### 4. App passwords

App passwords are a legacy feature: static credentials issued for pre-modern-auth clients (Office 2010 and earlier, Apple Mail before iOS 11) that don't understand the MFA prompt. They bypass MFA entirely. Most organizations have already blocked legacy authentication via Conditional Access, which makes app passwords nonfunctional in practice - but the stored credentials remain on user accounts unless you clean them up. See [App passwords for Microsoft Entra multifactor authentication](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-app-passwords) for the current Microsoft guidance.

**How to remove:**
- If your tenant still allows users to create app passwords, disable that first (per the Microsoft doc above). This also blocks new creations.
- Block legacy authentication via Conditional Access - this neutralizes any app passwords that are still on accounts. See [Legacy Apps and Coexistence](/passkey-path/it-admin/legacy-coexistence/).
- Clean up stored app passwords: **Users > [user] > Authentication methods > App passwords > Delete**.

**Blocker:** Any remaining legacy application that users still need and that still requires an app password. Migration off legacy auth is the prerequisite for full cleanup.

### 5. TOTP (third-party authenticator apps)

Software TOTP tokens (Google Authenticator, Authy, etc.) are phishable via AiTM proxies - an attacker's relay page can prompt for and immediately replay the six-digit code. If users registered these as MFA methods, retire them after passkey enrollment.

**How to remove in Entra:**
- Go to **Protection > Authentication methods > Third-party software OATH tokens** and exclude users who have passkeys enrolled
- For users with registered TOTP tokens: **Users > [user] > Authentication methods** and delete the OATH entry
- Hardware OATH tokens follow the same path under **Hardware OATH tokens (Preview)**

**Blocker:** Users who rely on TOTP for a specific application that doesn't yet support passkeys. Identify the applications first and retire the TOTP tokens alongside the application migration.

**Monitoring:** Entra sign-in logs surface the authentication method used. Filter on `authenticationDetails` for OATH-based sign-ins during the retirement window and investigate any that appear after passkey enrollment was expected to be complete.

## Retirement timeline

Here's a practical timeline tied to passkey enrollment phases:

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
- Users whose passwords haven't been used in 30/60/90 days. Surface via Entra sign-in logs (`signInActivity`) or the [Get-MgAuditLogSignIn](https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.reports/get-mgauditlogsignin) PowerShell cmdlet filtering on authentication method.
- These are candidates for immediate password randomization.

**Password-based sign-ins by application**
- Which specific applications are still driving password sign-ins for passkey-enrolled users
- Each app on this list is either a misconfiguration (CA policy gap) or a legacy app that's blocking full retirement
- Prioritize fixes by sign-in volume

## The conversation with leadership

Credential retirement is where security teams often face pushback. "Users might need their password as a fallback" is the most common objection.

Counter-arguments:
- **"Keeping the password as a fallback keeps the attack surface open"** - the whole point of passkeys is removing the password. A fallback password is an attacker's primary target.
- **"TAP exists for emergency access"** - if a user can't use their passkey, the helpdesk issues a TAP. This is more secure than a persistent password because it's time-limited, single-use, and logged.
- **"We can enforce via CA"** - true, but CA enforcement has gaps (uncovered apps, legacy protocols). Removing the credential is more complete than policy enforcement alone.
- **"Other organizations are doing this"** - Microsoft, Google, and others are actively moving toward passwordless. This isn't experimental.

Nobody is saying remove credentials recklessly. The point is having a plan with dates, metrics, and accountability. Six months with milestones beats an indefinite "we'll get to it."
