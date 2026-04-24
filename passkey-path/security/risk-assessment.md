---
layout: page
title: "Passkey Risk Assessment Framework"
description: "A structured approach to evaluating passkey deployment risk against the password status quo"
next_pages:
  - url: /passkey-path/security/downgrade-attacks/
    title: "Downgrade Attacks"
    description: "The primary risk during the transition period"
  - url: /passkey-path/security/phishing-resistant/
    title: "Building a Phishing-Resistant MFA Strategy"
    description: "The broader strategy passkeys fit into"
crosslinks:
  - url: /passkey-path/it-admin/rollout-planning/
    title: "Phased Rollout Strategy"
    role: "IT Admin"
    description: "How phased deployment mitigates rollout risk"
  - url: /passkey-path/helpdesk/identity-verify/
    title: "Identity Verification Before Recovery"
    role: "Helpdesk"
    description: "The verification process that determines recovery security"
---

Every authentication change introduces risk. The question is whether passkeys are better than what you have now, and whether the transition risks are manageable.

## The baseline: password risk

Before evaluating passkey risk, document your current exposure. Most organizations running passwords + traditional MFA face:

**Credential theft**
- Password spray attacks against cloud endpoints
- Credential stuffing from breach databases
- Keyloggers and infostealers on compromised endpoints

**Phishing**
- Adversary-in-the-middle (AiTM) attacks that capture both passwords and MFA tokens in real time
- OAuth consent phishing that tricks users into granting app access
- QR code phishing (quishing) targeting MFA flows

**MFA bypass**
- MFA fatigue/push bombing - repeatedly sending push notifications until the user approves
- SIM swapping for SMS-based MFA
- Social engineering helpdesk staff for password resets

**Operational cost**
- Password reset ticket volume
- Account lockout incidents
- Breach response costs when credentials are compromised

Quantify these where you can. Helpdesk ticket costs, breach frequency, and phishing click rates from simulations all make the baseline concrete rather than theoretical.

## Passkey risk profile

Passkeys eliminate several of the above categories entirely and reduce others. But they introduce their own risk surface:

### Risks that passkeys eliminate

| Risk | Why it's eliminated |
|------|-------------------|
| Password phishing | No password exists to phish |
| Credential stuffing | No shared secret to stuff |
| Password spray | No password to spray |
| MFA fatigue | No push notification to bomb |
| AiTM token theft | WebAuthn origin binding prevents proxy interception |
| Breach-exposed credentials | Private key never leaves the device/platform |

### Risks that passkeys reduce

| Risk | How it's reduced |
|------|-----------------|
| Helpdesk social engineering | Fewer password resets, but device recovery creates a new social engineering surface |
| Account takeover | Significantly harder, but not impossible if recovery processes are weak |

### Risks that passkeys introduce

| Risk | Description | Mitigation |
|------|-------------|------------|
| Recovery process exploitation | Attackers target the TAP issuance process instead of the credential itself | Strong [identity verification](/passkey-path/helpdesk/identity-verify/) before TAP issuance |
| Syncable key compromise | If a user's platform account (Apple ID, Google account) is compromised, synced passkeys could be exposed | Use device-bound keys for privileged accounts; enforce platform account MFA |
| Downgrade attacks | During transition, attackers target legacy methods still enrolled alongside passkeys | [Remove legacy credentials](/passkey-path/security/credential-lifecycle/) on a defined timeline |
| Device loss/theft | Physical loss of the authenticator device | Remote wipe, PIN/biometric protection, multiple registered passkeys, revoke the lost passkey and active sessions via the [Device Loss Recovery Playbook](/passkey-path/helpdesk/device-loss/). Conditional Access enforcement for privileged scenarios mitigates this as well. |
| Vendor lock-in | Passkey portability across platforms is still maturing | Register on multiple platforms; FIDO2 keys are platform-independent |

### Risks that remain unchanged

| Risk | Why passkeys don't help |
|------|----------------------|
| Compromised endpoints | Malware on the device can hijack sessions after authentication |
| OAuth/consent phishing | App-level consent attacks don't target the authentication flow |
| Insider threats | Legitimate users with legitimate passkeys can still misuse access |
| Token theft (post-auth) | Session tokens can be stolen after passkey auth succeeds |

## Making the comparison

For most organizations, the risk trade-off is strongly favorable:

- **Eliminated risks** (phishing, credential stuffing, spray, MFA fatigue) represent the highest-volume, lowest-skill attacks your org faces today
- **Introduced risks** (recovery exploitation, downgrade attacks) are lower-volume and mitigable through process design
- **Unchanged risks** (endpoint compromise, post-auth token theft) need to be addressed regardless of authentication method - they're not a reason to avoid passkeys

The framing for leadership: passkeys don't solve everything, but they eliminate the attack categories behind most identity-related incidents. Don't let perfect security get in the way of good progress - the attack categories passkeys eliminate are the ones driving the majority of identity incidents today.

## Assessment template

Use this to structure your evaluation:

**1. Current state inventory**
- What MFA methods are deployed today?
- What's the phishing simulation click rate?
- How many password reset tickets per month?
- Any credential-related incidents in the past 12 months?

**2. Passkey deployment scope**
- Which user populations first?
- Syncable vs device-bound - which for whom?
- What's the fallback during transition?

**3. Transition risk window**
- How long will users have both passwords and passkeys?
- What Conditional Access policies reduce downgrade attack risk during this period?
- When will legacy credentials be retired?

**4. Recovery security**
- What identity verification process will govern TAP issuance?
- Who can issue TAPs and under what conditions?
- How will you detect social engineering attempts against the recovery process?

**5. Residual risk acceptance**
- What risks remain after deployment?
- Are they accepted, transferred (insurance), or need additional controls?
