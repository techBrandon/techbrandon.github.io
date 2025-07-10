---
layout: post
title: "Modern Detection of Reversible Encryption"
date: 2025-07-10
categories: [Active Directory, Security, PowerShell]
---

![Reverse Uno Card Image](/assets/images/rev_uno.png)

*It's more than just a checkbox*

Reversible encryption isn't something that comes up very often in today's penetration tests or security reviews, but it's far from extinct as many might think. Just like the rediscovery of extinct species, it's possible we just aren't looking in the right places.

Common methods to detect the use of reversibly encrypted passwords allow for a false sense of security due to poor documentation combined with idiosyncratic application methods. This article explains where reversible encryption might be hiding in your environment and how you might better detect this elusive species.

## What is Reversible Encryption?

Reversible encryption is an artifact from the earliest days of Active Directory (AD). It continues to exist today in order to provide backwards compatibility with legacy authentication protocols such as [CHAP and Digest Authentication](https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/store-passwords-using-reversible-encryption).

Typically, AD stores passwords as a **hash**. Hashing algorithms transform a password via non-reversible, one-way processes to create a secure representation of a password. If presented the hash of a password, it's very unlikely that you could determine the original password value without performing a brute-force attack. In contrast, a reversibly encrypted password is transformed using a **symmetric key**, meaning the password can be converted to its cleartext version with little effort.

Reversible encryption is most commonly mentioned when discussing the **Account** tab on an AD user object.

![Account Tab on an AD User Object](/assets/images/rev_user.png)

> **Note:** Checking `Store password using reversible encryption` sets the `USER_ENCRYPTED_TEXT_PWD_ALLOWED` bit in the `userAccountControl` attribute. This is visible in human-readable form as `True` for the `AllowReversiblePasswordEncryption` constructed attribute.

![User Attributes via PowerShell](/assets/images/rev_powershell.png)

Most articles reference these user settings as the only place to configure a reversibly encrypted password. Unfortunately, this is incorrect.

While the user object is the most common location to configure reversible encryption, the setting also appears in the **Default Domain Password Policy (DDPP)** and in **Fine-Grained Password Policies (FGPP)**.

![DDPP Configurations](/assets/images/rev_ddpp.png)

![FGPP Configurations](/assets/images/rev_fgpp.png)

The misleading information doesn't stop there. Many previously written articles on the topic identify the `userParameters` attribute as storing the reversibly encrypted password.

However, reversibly encrypted passwords have not been stored in the `userParameters` attribute since Windows Server 2003. Nowadays, they are stored in the [supplementalCredentials](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-samr/0705f888-62e1-4a4c-bac0-b4d427f396f8) AD attribute. More specifically, the password is stored in the [Primary:CLEARTEXT](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-samr/e348e08f-1c19-42bb-b1a9-687843059414) property as a UTF-16 encoded string. 

Given such misinformation, it's completely understandable that most defenders uncheck the `Store password using reversible encryption` checkbox and consider their passwords securely stored.

However, Microsoft threw yet another twist at us. Unlike other password policy settings, reversible encryption applies in a unique way.

## Configuring Accounts to Use Reverse Encryption

In 2023, [Jake Hildreth](https://jakehildreth.com/) and I disclosed what we believed to be a faulty application of reversible encryption. Microsoft reviewed the case and ultimately deemed the following behavior to be expected.

Unchecking, disabling, or setting the `Store password using reversible encryption` to `False` in a policy or on user object does not apply according to standard AD logic. 
Unlike the other settings, disabling reversible encryption in an FGPP does not supersede the reversible encryption configuration in the DDPP. Similarly, disabling reversible encryption on a user object does not take precedence over reversible encryption configured in either an FGPP or the DDPP.

If **any** of the following apply, passwords **will be** stored using reversible encryption:

1. The setting is enabled on the user object (`Store password using reversible encryption`).
2. A *GPP applied to a user or group of users enables it.
3. The DDPP enables it on every AD user regardless of FGPP or user configuration.

| DDPP | FGPP | User Setting | Result |
|------|------|--------------|--------|
| Yes  | No   | No           | All Users |
| Yes  | Yes  | No           | All Users |
| Yes  | No   | Yes          | All Users |
| Yes  | Yes  | Yes          | All Users |
| No   | Yes  | No           | Users affected by FGPP |
| No   | No   | Yes          | Only users with the setting enabled |
| No   | Yes  | Yes          | FGPP users + user setting |
| No   | No   | No           | None |

Much of the confusion regarding the reversible encryption setting stems from its configuration in both user settings and password policies. Viewing the resultant set of policies for a user object does not necessarily show the same configuration as the user setting. The simplest example of this is when a user has an FGPP applied that enables reversible encryption; in this case, the user account properties are not updated to reflect this.

Another important note is that the reversible encryption configurations are only evaluated at the time a password is changed. If a password was last changed 5 years ago, today's configurations mean nothing. More specifically, if a user account was configured to use reversible encryption 5 years ago then had this configuration changed 4 years ago, its password will still be stored in `cleartext` until the password is changed again.

The inverse is also true. An account currently configured to allow reversible encryption is only storing a `cleartext` password if reversible encryption was allowed at the time of its last password change. 

This goes to prove that the [common guidance](https://attack.mitre.org/techniques/T1556/005/) for detecting accounts using reversible encryption is incomplete.

> **Important:** Reversible encryption configurations are only evaluated at **password change time**. Changing the setting later won't remove existing `cleartext` passwords.

## Truly Detecting Reversible Encryption

The standard documented guidance for detecting user accounts with reversible-encrypted passwords is to report the list of users with `Store password using reversible encryption` configured. 

This detection method only provides accounts with the reversible encryption setting directly applied to the user object. Users impacted by FGPP or DDPP settings are not detected in this manner. Even when considering policy configuration, detection is imperfect because the password policy at the time of the last password change matters, not the current policy. 

In short, there is no way to conclusively identify the presence of a reversibly encrypted password in the environment solely based on its current configuration.

> The **only definitive method** for detection is to inspect the `supplementalCredentials` attribute directly on each user account.

### PowerShell Script

To solve these issues, a PowerShell script has been developed:  
➡️ [Check-RevEncrypt on GitHub](https://github.com/techBrandon/Check-RevEncrypt)

It evaluates:

- DDPP & FGPP current configurations & modified dates
- User object configurations & `passwordLastSet` dates
- Whether the password is currently affected by reversible encryption

The script uses the [DSInternals](https://github.com/MichaelGrafnetter/DSInternals) module to extract password data.

> ⚠️ **Disclaimer:** DSInternals requires **Domain Admin** rights and reveals `cleartext` passwords. The provided script obfuscates these by default, unless `-Verbose` is specified. The [README](https://github.com/techBrandon/Check-RevEncrypt) file explains this in greater detail.

## Conclusion

Reversible encryption, found alive and well on the island of AD, may never go extinct. It's a complicated and misunderstood beast. Nonetheless, it must be hunted carefully.

As with many things in AD, historical artifacts such as reversible encryption are difficult to detect and remediate, especially in old environments. Running the included PowerShell script will pinpoint dangerous configurations and users in the domain. It offers a specific resolution for each use case as well as how to permanently and truly disable reverse encryption.

Unfortunately, traditional methods for detection fall short and the only absolute method to identify accounts with cleartext passwords is to hunt them for yourself.

![Elmer Fud Image](/assets/images/rev_elmerfud.png)