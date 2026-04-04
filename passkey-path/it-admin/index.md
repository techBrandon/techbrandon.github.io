---
layout: hub
title: "IT Admin Path"
description: "Configure Entra passkeys, plan your rollout, manage policies and attestation"
role: "IT Admin"
role_color: "#58a6ff"
role_hub: "/passkey-path/it-admin/"
foundation_pages:
  - url: /passkey-path/shared/what-is-a-passkey/
    title: "What Is a Passkey?"
    description: "The fundamentals - how passkeys replace passwords"
  - url: /passkey-path/shared/how-entra-passkeys-work/
    title: "How Entra Implements Passkeys"
    description: "Authenticator, FIDO2 keys, and platform passkeys"
  - url: /passkey-path/shared/device-bound-vs-sync/
    title: "Device-Bound vs Syncable Passkeys"
    description: "Which type fits which scenario"
track_pages:
  - url: /passkey-path/it-admin/entra-policy-setup/
    title: "Configuring Authentication Methods"
    description: "Enable passkeys in Entra and scope your rollout"
  - url: /passkey-path/it-admin/rollout-planning/
    title: "Phased Rollout Strategy"
    description: "Pilot to production - a step-by-step plan"
  - url: /passkey-path/it-admin/attestation-aaguids/
    title: "Attestation and AAGUID Allowlists"
    description: "Control which authenticators can register"
  - url: /passkey-path/it-admin/conditional-access/
    title: "Conditional Access for Passkeys"
    description: "Enforce phishing-resistant methods with authentication strengths"
  - url: /passkey-path/it-admin/device-compat/
    title: "Device and OS Compatibility"
    description: "What works, what doesn't, and known gaps"
  - url: /passkey-path/it-admin/legacy-coexistence/
    title: "Legacy Apps and Coexistence"
    description: "Handling applications that don't support modern auth"
---

Evaluating how to deploy passkeys in a Microsoft Entra environment? This track covers the admin work - enabling the authentication methods, planning a phased rollout, and handling the edge cases that trip up real deployments.

If you're new to passkeys, start with the shared foundations below. Even if you have a working understanding, the Entra-specific implementation details are worth reviewing.

Each page ends with links to the next logical topics. Follow them in order or jump to whatever applies to your current project.

Your rollout will touch other teams. The [Helpdesk track](/passkey-path/helpdesk/) covers the recovery workflows your support team needs. The [Security Lead track](/passkey-path/security/) covers the risk and compliance framing your CISO will ask about. You don't need to read those tracks end-to-end, but the cross-links on each page will point you to the relevant pieces when they come up.
