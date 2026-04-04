---
layout: page
title: "What Is a Passkey?"
description: "The fundamentals - how passkeys replace passwords with cryptographic key pairs"
next_pages:
  - url: /passkey-path/shared/how-entra-passkeys-work/
    title: "How Entra Implements Passkeys"
    description: "The three passkey methods available in Microsoft Entra"
  - url: /passkey-path/shared/device-bound-vs-sync/
    title: "Device-Bound vs Syncable Passkeys"
    description: "Two types of passkeys with different security trade-offs"
---

A passkey replaces your password with a cryptographic key pair. When you register a passkey, your device creates two keys:

- A **private key** that stays with your device/platform and never leaves it
- A **public key** that gets stored with the service you're signing into

At sign-in, the service sends a challenge. Your device proves it holds the private key by signing the challenge - no password crosses the wire, no shared secret sits on a server, and there's nothing for an attacker to steal from a breach.

## The standard behind it

Passkeys are built on **FIDO2** and **WebAuthn** - open standards maintained by the [FIDO Alliance](https://fidoalliance.org/fido2/) and the W3C. Apple, Google, and Microsoft all back these standards, which is why passkey support is showing up across operating systems, browsers, and services.

FIDO2 is the umbrella. WebAuthn is the browser API that lets websites talk to authenticators. Together they define how passkeys are registered, stored, and used at sign-in.

## Why passkeys matter

Passwords fail in predictable ways:

- **Reuse** - people use the same password across multiple services, so one breach compromises many accounts
- **Phishing** - attackers trick users into entering passwords on fake login pages
- **Credential stuffing** - leaked password databases get tested against other services at scale
- **Helpdesk burden** - password resets are one of the most common IT support tickets

Passkeys eliminate all of these. The private key never leaves the device, so there's nothing to reuse, phish, or stuff. The cryptographic challenge-response is bound to the specific website origin, so even a convincing phishing page can't intercept it. And since there's no password to forget, reset tickets drop.

## How you actually use one

From the user's perspective, signing in with a passkey looks like unlocking your phone or computer:

- **Fingerprint** (Touch ID, Android fingerprint sensor)
- **Face scan** (Face ID, Windows Hello)
- **Device PIN** 

The biometric or PIN is local verification only - it unlocks access to the private key on your device. The biometric data itself never leaves your device and is never sent to the service.

This is also why passkeys count as multi-factor authentication in a single step. The device is "something you have" and the biometric or PIN is "something you are" or "something you know" - two factors, one action.

## What it looks like in practice

1. You visit a sign-in page and enter your username (or select your account)
2. The service sends a cryptographic challenge to your browser
3. Your browser asks your device's authenticator to sign the challenge
4. You verify with your fingerprint, face, or PIN
5. The signed challenge goes back to the service, which verifies it against your public key
6. You're in

The whole process takes a few seconds - typically faster than typing a password and waiting for an SMS code.

## Where passkeys work

Passkey support is broad and growing:

- **Browsers** - Chrome, Safari, Edge, Firefox all support WebAuthn
- **Operating systems** - Windows 10+, macOS Ventura+, iOS 16+, Android 9+
- **Services** - Microsoft, Google, Apple, GitHub, Amazon, PayPal, and hundreds more
- **Enterprise** - Microsoft Entra ID, Okta, Duo, and other identity providers support passkey authentication

For enterprise deployments, the specifics of how your identity provider implements passkeys matter. If you're using Microsoft Entra, the next page covers that in detail.
