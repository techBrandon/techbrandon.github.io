---
layout: page
title: "When to Escalate"
description: "Red flags during support interactions that indicate social engineering or compromise"
next_pages:
  - url: /passkey-path/helpdesk/identity-verify/
    title: "Identity Verification"
    description: "The verification process that catches these red flags"
  - url: /passkey-path/helpdesk/device-loss/
    title: "Device Loss Recovery"
    description: "The standard recovery process when escalation isn't needed"
crosslinks:
  - url: /passkey-path/security/downgrade-attacks/
    title: "Downgrade Attacks"
    role: "Security Lead"
    description: "Social engineering of helpdesk is a form of credential bypass"
  - url: /passkey-path/security/risk-assessment/
    title: "Risk Assessment"
    role: "Security Lead"
    description: "Recovery exploitation in the broader threat model"
---

Not every support request is legitimate. Attackers target helpdesk staff because if passkeys are phishing-resistant, the helpdesk is the easier path.

Your judgment is a security control. This page covers what to watch for.

## Red flags - stop and escalate

If you encounter any of these, **do not issue a TAP or make account changes.** Tell the caller you need to verify additional information and will call them back through official channels. Then escalate to your security team.

### Identity verification failures

- **Caller can't confirm employee ID** - claims they "don't remember" or "never received one"
- **Wrong manager name** - gives a name that doesn't match org chart
- **Can't answer activity questions** - vague or incorrect answers about recent work
- **Refuses video call** - for Tier 2/3 accounts where video is required

### Pressure and urgency

- **"I need this right now, I'm about to present to the CEO"** - urgency is the most common social engineering tactic. A legitimate user can wait 15 minutes for verification.
- **"Just this once, can you skip the verification?"** - no. Never.
- **"My manager already approved it, just ask them"** - verify with the manager yourself, at their known contact. Don't trust a number or email the caller provides.
- **Name-dropping executives** - "The CTO told me to call you directly" is a pressure play
- **Threats** - "I'll report you to your manager if you don't help me" - escalate immediately

### Suspicious circumstances

- **The "lost" device is still signing in** - check sign-in logs. If the device the user claims to have lost is still generating sign-in activity, the loss report may be fraudulent.
- **Multiple recovery requests for the same user** - a user who loses devices repeatedly may be legitimate (it happens), but it could also indicate account targeting. Flag for security review.
- **Recovery request immediately after a phishing campaign** - if your security team recently flagged a phishing wave targeting your org, treat all recovery requests with extra scrutiny.
- **Caller ID doesn't match** - the number doesn't match any number on file for the user
- **Third-party calling on behalf** - "I'm calling for [user], they're too busy to call themselves"
- **Request to send TAP to a different email/phone** - "Can you send it to my personal email instead?" This could be an attacker's email.

### Technical anomalies

- **Sign-in logs show impossible travel** - the user signed in from New York 10 minutes ago and is now supposedly in London
- **Recent authentication method changes** they didn't make - a new passkey or MFA method was registered that the user doesn't recognize
- **Account was already compromised** - if there's an active incident on the account, don't issue a TAP without security team involvement

## The escalation process

When you decide to escalate:

1. **Don't tell the caller you suspect fraud.** Say: "I need to complete some additional verification steps. I'll call you back at the number we have on file within [timeframe]."
2. **Document everything** - what the caller said, what didn't match, what red flags you observed
3. **Contact your security team** immediately:
   - Provide the user account in question
   - Describe the red flags
   - Include the sign-in logs if you accessed them
4. **Do not make any account changes** until security clears it
5. **If the caller calls back or gets impatient**, repeat that the process is still in progress. Don't be pressured into rushing.

## What the security team will do

Depending on the situation, the security team may:

- Investigate sign-in logs for unauthorized access
- Place a temporary hold on the account
- Contact the real user through a verified channel
- Initiate an incident response if compromise is confirmed
- Clear the request if investigation shows it's legitimate

## The cost of getting it wrong

Why this matters:

- **If you issue a TAP to an attacker**, they register their own passkey and have persistent access to the victim's account. All the security benefits of passkeys are bypassed.
- **If you delay a legitimate user**, they're inconvenienced for 30-60 minutes while verification completes. That's a manageable cost.

The asymmetry is clear: the cost of a false negative (missing an attack) vastly outweighs the cost of a false positive (extra verification for a real user). When in doubt, escalate.

## Building your instinct

Over time, you'll develop a feel for what's normal and what's off. Some things that help:

- **Know your repeat callers** - regular users have patterns. A call from someone you've never heard of for a VP account is worth extra scrutiny.
- **Listen to tone** - legitimate users are usually frustrated but cooperative. Attackers often oscillate between charm and pressure.
- **Trust the process** - the verification procedure exists for a reason. Following it protects you as much as the user.
- **Debrief after incidents** - if your security team identifies a social engineering attempt you caught (or missed), learn from it. Share anonymized examples with the team.

The best helpdesk security is a team that understands *why* the checklist exists and applies judgment when something doesn't fit.
