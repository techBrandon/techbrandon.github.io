---
layout: post
title: "Installing GOAD on VMware ESXi with Kali Linux"
date: 2025-07-15
categories: [GOAD, VMware, Kali, Lab Setup, Pentesting]
---

## Overview

This post reflects on the step-by-step setup of deploying **GOAD (Green AD)** Active Directory lab environment on my **VMware ESXi** server. This includes basic VM provisioning, configuring network interfaces, installing dependencies like Vagrant and Ansible, preparing the system, and all the tricky bug-fixes along the way. I'm not a professional at this whatsoever but hopefully this saves you some Googlin'.

---

## 🖥️ Kali VM Configuration on ESXi

I decided to deploy a brand new Kali image for the purpose of lab creation and maintenance. This doesn't need to be Kali. A lightweight Ubuntu image would probably work well.

- **Disk**: 200GB (I'm not even consuming half of this space.) 
- **Memory**: 24GB (100% overkill, barely touched 10% of this during install)  
- **vCPUs**: 4 (CPU was maxed during install, I would increase this if possible)  
- **NICs**: 2  
  - **NIC 1**: External network (VM Network)  
  - **NIC 2**: Private network (Private)

### Configure Network Interfaces

In ESXi, make note of what your port groups are called and create a new one specifically for GOAD if needed. I used a new vSwitch with no uplinks (ie: Private) then attached the port group to use that. Note your MAC addresses on the Kali VM once you've got both network adapters configured and connected.

Set the external NIC to use **DHCP** and configure the private NIC manually:

```bash
IP Address: 192.168.56.X
Subnet Mask: 255.255.255.0 (/24)
Gateway: 192.168.56.1
```
> Choose an IP where X is above 30 to prevent conflict with lab defined IPs. Review GOAD documentation to confirm default IPs.

Reboot Kali to apply NIC settings.

Then verify IP assignments:

```bash
ifconfig
```

eth0 and eth1 should now have IPs.

## 🔐 (Optional) Enable SSH Access

For convenience, enable SSH for remote access to Kali instead of using the VMware Remote Console:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

---

## 📦 Install Required Packages

```bash
sudo apt install vagrant
sudo apt install ansible
```

### Install Python Package

Kali protects it's virtual environments so pip will throw errors. Workaround:

```bash
pip3 install pywinrm --break-system-packages
```

---

## 🔌 Install Vagrant Plugins

```bash
vagrant plugin install vagrant-vmware-esxi
vagrant plugin install vagrant-reload
vagrant plugin install vagrant-vmware-desktop
vagrant plugin install winrm
vagrant plugin install winrm-fs
vagrant plugin install winrm-elevated
vagrant plugin install vagrant-env
```

---

## 📁 Install OVF Tool

1. Download the [OVF Tool for Linux](https://developer.broadcom.com/tools/open-virtualization-format-ovf-tool/latest) (version 5.0.0 ZIP).
2. Unzip it and add to your temporary PATH:

```bash
export PATH="$PATH:/home/kali/Downloads/ovftool"
```

> To make this permanent, add the line above to your `.bashrc`.

---

## 🛠️ Setup vagrant-vmware-utility

1. Download `vagrant-vmware-utility_1.0.24-1_amd64.deb` from the below link.
2. Manually create the required folders:
   ```
   sudo mkdir -p /opt/vagrant-vmware-desktop/bin
   ```
3. Extract and move the `vagrant-vmware-utility` file into `/opt/vagrant-vmware-desktop/bin/`:
   ```
   mv ~/Downloads/vagrant-vmware-utility_1.0.24-1_amd64/opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility /opt/vagrant-vmware-desktop/bin/
   ```
4. Follow the remaining [official install instructions](https://developer.hashicorp.com/vagrant/docs/providers/vmware/vagrant-vmware-utility) to generate the certs and install the service.
   ```
   sudo /opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility certificate generate
   sudo /opt/vagrant-vmware-desktop/bin/vagrant-vmware-utility service install
   ```

### Fix Ruby Dependency Issue

Fix a problem with the `dotenv` gem used by the `vagrant-env` plugin. This command is from the known [HashiCorp issue](https://github.com/hashicorp/vagrant/issues/13550):

```bash
sudo sed -i -e 's/exists?/exist?/g' /root/.vagrant.d/gems/3.3.8/gems/dotenv-0.11.1/lib/dotenv.rb
```
> Confirm your gem number in the above path. Initial instructions listed 3.3.6 but mine was 3.3.8.
---

## 🔧 Prepare the ESXi Host

- Enable **SSH** on the ESXi host  
  _Navigation_: **Host > Manage > Services**

---

## 🧪 Deploy GOAD

### Clone the Repository

```bash
git clone https://github.com/Orange-Cyberdefense/GOAD
cd GOAD
```

### Launch Installer

This initializes vagrant, the first time it is run. Once you lanch GOAD, you'll see the prompt as: `GOAD/vmware_exsi/local/192.168.56.X >`

```bash
./goad.sh -p vmware_esxi
```

### Check Prerequisites

```bash
GOAD/vmware_esxi/local/192.168.56.X > check
```

> You may need to address any errors or install missing plugins based on the check output.

### Edit the GOAD Configuration

This is where you will modify the configuration for your specific ESXi installation. Exit GOAD to modify this.

```bash
nano ~/.goad/goad.ini
```
![GOAD ini contents](/assets/images/goad_nano.png)

Save the script and restart GOAD to apply your custom config changes. Verify the changes:

```bash
GOAD/vmware_esxi/local/192.168.56.X > config
```
![GOAD Config](/assets/images/goad_config.png)

### Launch GOAD

This will kickoff all steps required to create and configure the lab. This will take several minutes to complete.

```bash
GOAD/vmware_esxi/local/192.168.56.X > install
```

![GOAD Install](/assets/images/goad_install.png)

Errors may occur that require manual intervention. I will update as I find any common bugs with my process.

![GOAD Errors](/assets/images/goad_error.png)

---

## 🔗 References

- [GOAD Official Docs – VMware ESXi](https://orange-cyberdefense.github.io/GOAD/providers/vmware_esxi/)
- [NetSecFocus: Installing GOAD or GOAD-Light](https://www.netsecfocus.com/infosec/walkthrough/2024/08/21/Setting_up_and_Installing_GOAD_or_GOAD-Light_on_VMware_ESXI.html)
- [HashiCorp Docs – Vagrant VMware Utility](https://developer.hashicorp.com/vagrant/docs/providers/vmware/vagrant-vmware-utility)
- [Vagrant Plugin Ruby Bug](https://github.com/hashicorp/vagrant/issues/13550)
