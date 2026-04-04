---
layout: page
title: "Identity Verification Before Recovery"
description: "How to confirm a user's identity before issuing a TAP or granting account recovery"
next_pages:
  - url: /passkey-path/helpdesk/tap-issuance/
    title: "Issuing Temporary Access Passes"
    description: "Issue a TAP once identity is confirmed"
  - url: /passkey-path/helpdesk/escalation/
    title: "When to Escalate"
    description: "Red flags during verification that mean you should stop and escalate"
crosslinks:
  - url: /passkey-path/security/risk-assessment/
    title: "Passkey Risk Assessment"
    role: "Security Lead"
    description: "Why recovery process security matters in the overall risk model"
  - url: /passkey-path/security/downgrade-attacks/
    title: "Downgrade Attacks"
    role: "Security Lead"
    description: "Recovery exploitation is a form of credential bypass"
---

This is the hardest part of passkey support, and the part that matters most. When a user calls saying they lost their device and need a TAP, you need to confirm they are who they say they are.

If you issue a TAP to the wrong person, they register their own passkey on the account. The attacker now has phishing-resistant access to the victim's account. A passkey system getting compromised through the helpdesk has happened before.

## Why this is harder than password resets

With passwords, the risk of a bad reset is limited: the attacker gets temporary access until the real user notices and resets again. With passkeys, a bad recovery lets the attacker register a persistent credential. The stakes are higher.

## Verification tiers

Not every account needs the same verification rigor. Define tiers based on role sensitivity:

### Tier 1: Standard users

**Minimum verification - two of the following:**
- Confirm employee ID number
- Confirm manager's name
- Confirm recent activity that only the user would know (last project worked on, recent meeting attended)
- Callback to the user's registered phone number on file in HR systems (not the number they called from)

### Tier 2: Sensitive roles (finance, HR, legal)

**Tier 1 requirements plus one of:**
- Manager verbal approval (contact the manager directly, don't rely on the caller to transfer you)
- Video call with camera on - match to employee photo in HR system
- In-person verification at an office with photo ID

### Tier 3: Privileged accounts (admins, executives)

**Tier 2 requirements plus:**
- In-person verification required (no remote recovery for admin accounts)
- Security team notification before TAP issuance
- If remote: video call with photo ID verification AND manager/director approval

Your organization should define these tiers and publish them as a formal helpdesk procedure. The examples above are a starting point - adapt them to your environment.

## What to verify

### Good verification factors

These are hard for an attacker to obtain or fake:

- **Employee ID** - not public information, stored in HR systems
- **Manager callback** - you call the manager at their known number, not a number the caller provides
- **Recent work activity** - specific details about meetings, projects, or tickets that require insider knowledge
- **Video call with photo match** - compare the caller's face to their HR photo
- **In-person with photo ID** - the strongest verification, suitable for privileged accounts

### Weak verification factors (avoid relying on these alone)

- **Name, email, department** - easily found on LinkedIn or company websites
- **Phone number they're calling from** - can be spoofed
- **"I'm [name]'s assistant"** - social engineering tactic
- **Urgency** - "I need this right now, I'm about to present to the board" is a pressure technique attackers use
- **Knowledge of IT systems** - an attacker researching the target may know what tools you use

### What to never accept

- Another person calling on the user's behalf without prior arrangement
- An email from a personal address requesting a TAP for someone else
- Requests to send the TAP to a different email address or phone number than what's on file

## The verification conversation

Here's a practical script:

> "I understand you've lost your device and need to recover your account. Before I can help, I need to verify your identity. This is for your protection."
>
> "Can you confirm your employee ID number?"
>
> [Verify against HR system]
>
> "Who is your direct manager?"
>
> [Verify against org chart]
>
> "I'm going to ask you about some recent work activity. Can you tell me [specific question about recent meeting/project/ticket]?"
>
> [Verify against available records]

If at any point the caller can't answer or the answers don't match, do not proceed. See [When to Escalate](/passkey-path/helpdesk/escalation/).

## Documenting verification

For every recovery, record:
- Date and time
- How the user contacted you (phone, in-person, email)
- Verification method(s) used
- Whether verification passed or failed
- If failed: what happened and whether it was escalated
- If passed: what recovery action was taken (TAP issued, etc.)

This documentation protects you and the user. If an incident investigation happens later, there's a record of what verification you performed.

## Edge cases

### The user is brand new and has no history

New employees who haven't set up their passkey yet don't have work activity to verify against. For initial onboarding:
- TAP should be issued as part of the onboarding process, ideally in person on day one
- HR or the user's manager should be present during initial device setup
- Don't issue onboarding TAPs over the phone unless identity was verified during the hiring process

### The user is remote and can't come to an office

Use Tier 2 or 3 verification: video call with photo match and manager approval. If the user can't do video (camera broken, bandwidth issues), escalate to your security team for guidance.

### Multiple users report losses at the same time

This could be coincidence (a conference where bags were stolen) or the start of a social engineering campaign. If you see a cluster of recovery requests:
- Process each one individually with full verification
- Alert your security team immediately
- Check if the "lost" devices are still signing in (which would indicate the loss report is fraudulent)
