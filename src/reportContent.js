export const reportContent = {
  index: {
    eyebrow: 'Master Report',
    heroTitle: 'DHCP Failover Project Workflow',
    heroText:
      'A React-based infrastructure report for Summit Care Medical Clinic focused on Windows Server 2022 DHCP, Cisco edge failover, Proxmox virtualization, DNS dependency planning, and recovery operations.',
    heroMeta: [
      'Dell PowerEdge R740xd',
      'Proxmox Type 1 Hypervisor',
      'Windows Server 2022 DHCP',
      'Cisco Backup DHCP',
    ],
    stats: [
      { value: '10.40.10.10', label: 'Domain controller health-check IP' },
      { value: '10.40.10.100-199', label: 'Primary Windows DHCP pool' },
      { value: '10.40.10.210-230', label: 'Cisco emergency DHCP pool' },
      { value: '24/7', label: 'Service continuity goal' },
    ],
    cards: [
      {
        title: 'Overview & Strategy',
        text: 'Frame the business problem, the service objective, and the core platform choices behind the failover design.',
        href: '/objectives',
      },
      {
        title: 'Architecture & Configuration',
        text: 'Combine platform roles, scope design, DNS behavior, topology, and the actual Windows and Cisco DHCP build.',
        href: '/deploy',
      },
      {
        title: 'Operations & Recovery',
        text: 'Show the trigger logic, failover sequence, testing flow, and how the environment returns to normal service.',
        href: '/voip',
      },
      {
        title: 'Risk & Conclusion',
        text: 'Condense the drawbacks, security considerations, governance notes, and final engineering takeaway.',
        href: '/hippa',
      },
    ],
    sections: [
      {
        kicker: 'Purpose & Goal',
        title: 'Project Purpose, Goal & Operational Intent',
        lead:
          'The purpose of this project is to strengthen office infrastructure uptime, redundancy, and business continuity by making sure Summit Care Medical Clinic can keep critical wired operations running even if the primary Windows DHCP service fails. The goal is to keep the internal office environment as operational as possible during failure conditions, reduce service disruption for staff, and provide a cleaner engineering workflow for failover, recovery, and ongoing administration.',
      },
      {
        kicker: 'Executive Focus',
        title: 'What This Project Is Designed To Prove',
        lead:
          'This report presents Summit Care Medical Clinic as a realistic healthcare infrastructure scenario focused on one high-value objective: keep internal office devices receiving valid IP configuration even if the primary Windows DHCP service becomes unavailable, so the office can remain as operational as possible during outage conditions.',
        kind: 'cards',
        items: [
          {
            title: 'Primary Service Model',
            body:
              'Summit Care uses a Windows Server 2022 virtual machine on Proxmox as the normal DHCP and DNS authority for the internal office LAN. This keeps lease administration, DNS behavior, reservations, and support workflow centralized.',
          },
          {
            title: 'Emergency Continuity Model',
            body:
              'If the domain controller at 10.40.10.10 stops responding, the Cisco edge device enables an emergency DHCP pool so wired devices can still obtain an address, default gateway, and basic external connectivity while IT restores the primary server.',
          },
          {
            title: 'Failback Discipline',
            body:
              'When the Windows server comes back online and health checks stabilize, the Cisco backup pool is turned off again so the clinic returns to the primary service model. This avoids long-term split administration and keeps Windows Server as the authoritative DHCP platform.',
          },
        ],
        callout:
          'Important design note: this is not presented as native Microsoft DHCP failover between two Windows servers. It is a layered continuity design that uses a Cisco backup service for outage coverage while preserving Windows as the primary DHCP authority.',
      },
      {
        kicker: 'Service Goals',
        title: 'Target Outcomes',
        kind: 'split',
        items: [
          {
            title: 'Operational Objectives',
            points: [
              'Reduce the chance that a single Windows DHCP outage stops new devices from joining the LAN.',
              'Support near-continuous address availability for front-desk, nursing, office, and wired workstation users.',
              'Preserve administrative clarity by automatically falling back to Windows DHCP after recovery.',
              'Document the process in a way that employers and technical reviewers can evaluate quickly.',
              'Support a more resilient office infrastructure posture built around uptime, redundancy, and cleaner failover recovery.',
            ],
          },
          {
            title: 'Resilience Snapshot',
            metrics: [
              { label: 'Primary DHCP availability target', value: 96 },
              { label: 'Fallback service coverage', value: 82 },
              { label: 'Administrative visibility during failover', value: 74 },
              { label: 'Internet continuity for wired devices', value: 88 },
            ],
          },
        ],
      },
      {
        kicker: 'Summit Care Blueprint',
        title: 'Summit Care Blueprint Snapshot',
        kind: 'table',
        columns: ['Component', 'Role', 'Value to the Design'],
        rows: [
          ['Dell PowerEdge R740xd', 'Physical compute host', 'Stable enterprise hardware base for critical infrastructure VMs'],
          ['Proxmox VE', 'Type 1 hypervisor', 'Supports better recovery posture, snapshots, and host-level organization'],
          ['Windows Server 2022', 'Primary DHCP and DNS', 'Provides full administrative depth and domain-aware integration'],
          ['Cisco edge firewall/router', 'Emergency DHCP backup', 'Supplies temporary lease continuity when the primary server is unavailable'],
        ],
      },
    ],
  },
  objectives: {
    eyebrow: 'Section 1',
    heroTitle: 'Overview, Purpose & Platform Strategy',
    heroText:
      'This section frames the DHCP outage problem, explains the business objective, and summarizes the core platform strategy behind the failover design.',
    sections: [
      {
        title: 'Purpose',
        lead:
          'The clinic needs a way to keep issuing valid IP addresses to internal office devices even if the primary Windows DHCP service goes offline. The design goal is continuity without giving up the Windows-centered administration model.',
        kind: 'list',
        items: [
          'Keep wired office clients able to obtain an IP address during primary server outage.',
          'Keep Windows Server 2022 as the preferred long-term DHCP authority.',
          'Use the Cisco edge service only as a controlled emergency fallback.',
          'Return DHCP authority back to Windows automatically after recovery.',
        ],
      },
      {
        title: 'Operational Drivers',
        kind: 'split',
        items: [
          {
            title: 'Clinic Continuity',
            body:
              'Front desk systems, office desktops, printers, and replacement endpoints should not all stall just because the main DHCP server VM is unavailable.',
          },
          {
            title: 'Supportability',
            body:
              'The design needs to be easy to explain, easy to test, and easy to hand off to another systems or network engineer without relying on undocumented memory.',
          },
        ],
      },
      {
        title: 'Platform Summary',
        kind: 'table',
        columns: ['Asset', 'Role', 'Why It Was Chosen'],
        rows: [
          ['Dell PowerEdge R740xd', 'Primary host server', 'Stable enterprise hardware base for infrastructure workloads'],
          ['Proxmox VE', 'Type 1 hypervisor', 'Adds recoverability, snapshots, and cleaner service management'],
          ['Windows Server 2022 at 10.40.10.10', 'Primary DHCP and DNS', 'Keeps address management and internal DNS centralized'],
          ['Cisco edge firewall/router', 'Emergency DHCP fallback', 'Provides continuity when the Windows server is unavailable'],
          ['UPS', 'Power continuity layer', 'Reduces avoidable failover caused by brief utility instability'],
        ],
      },
      {
        title: 'Success Criteria',
        kind: 'table',
        columns: ['Metric', 'Desired Result', 'Meaning'],
        rows: [
          ['Lease continuity', 'Clients still obtain IP addresses during outage', 'The edge device can temporarily sustain the LAN'],
          ['Failover trigger quality', 'Cisco only activates when the server is genuinely down', 'Reduces dual-service confusion'],
          ['Failback quality', 'Windows resumes normal authority after recovery', 'Prevents long-term split DHCP administration'],
          ['Documentation quality', 'Another engineer can understand the design quickly', 'Improves professionalism and support readiness'],
        ],
      },
    ],
  },
  assets: {
    eyebrow: 'Section 2',
    heroTitle: 'Platform Inventory & Service Roles',
    heroText:
      'The failover design depends on clean role separation across host hardware, virtualization, server services, power protection, and the Cisco edge.',
    sections: [
      {
        title: 'Infrastructure Stack',
        kind: 'table',
        columns: ['Asset', 'Example Role', 'Reason It Matters'],
        rows: [
          ['Dell PowerEdge R740xd', 'Primary host server', 'Carries the critical infrastructure workload on stable enterprise hardware'],
          ['Proxmox VE', 'Hypervisor platform', 'Improves recoverability, organization, and service portability'],
          ['SC-DC01 at 10.40.10.10', 'Windows Server 2022 DHCP/DNS', 'Acts as the main address-management and name-resolution authority'],
          ['Cisco ASA / Cisco edge router', 'Backup DHCP provider', 'Maintains emergency address assignment when the Windows server is unreachable'],
          ['UPS', 'Power continuity layer', 'Helps avoid unnecessary failover during short utility disturbances'],
        ],
      },
      {
        title: 'Role Separation Strategy',
        kind: 'cards',
        items: [
          {
            title: 'Windows Owns Normal Operations',
            body:
              'DHCP Manager, reservations, exclusions, DNS integration, and day-to-day lease visibility all stay anchored in Windows.',
          },
          {
            title: 'Cisco Owns Outage Coverage',
            body:
              'The edge device is intentionally limited to emergency continuity so it does not become a second permanent source of truth.',
          },
          {
            title: 'UPS and Proxmox Reduce Unnecessary Failover',
            body:
              'The stronger the primary host posture is, the less frequently the backup path should ever need to activate.',
          },
        ],
      },
    ],
  },
  deploy: {
    eyebrow: 'Section 2',
    heroTitle: 'Platform, Scope & Configuration Architecture',
    heroText:
      'This section condenses the technical architecture into one place: platform roles, address design, topology logic, DNS behavior, and the actual Windows and Cisco DHCP configuration.',
    sections: [
      {
        title: 'Platform Role Separation',
        kind: 'cards',
        items: [
          {
            title: 'Windows Owns Normal DHCP',
            body:
              'DHCP Manager, exclusions, reservations, DNS integration, and day-to-day lease administration remain centered in Windows Server 2022.',
          },
          {
            title: 'Cisco Owns Emergency Continuity',
            body:
              'The edge device stays quiet during normal operation and only becomes active when the primary DHCP service is considered unavailable.',
          },
          {
            title: 'Proxmox and UPS Protect The Primary Path',
            body:
              'The stronger the underlying host and power posture, the less frequently the emergency DHCP path should need to activate.',
          },
        ],
      },
      {
        title: 'Primary Windows Scope',
        lead:
          'The normal DHCP service is created in DHCP Manager on Windows Server 2022. The office LAN uses 10.40.10.0/24, with infrastructure addresses carved out before the lease pool begins.',
        kind: 'table',
        columns: ['Setting', 'Example Value', 'Purpose'],
        rows: [
          ['Network', '10.40.10.0/24', 'Internal office LAN'],
          ['Windows primary range', '10.40.10.100 - 10.40.10.199', 'Main dynamic pool for desktops and office devices'],
          ['Infrastructure exclusion', '10.40.10.1 - 10.40.10.99', 'Preserves room for statics, printers, switches, and servers'],
          ['Default gateway option', '10.40.10.1', 'Routes internal traffic through the Cisco edge'],
          ['DNS option', '10.40.10.10', 'Supports internal resolution and domain-aware behavior'],
        ],
      },
      {
        title: 'Cisco Emergency Scope',
        lead:
          'The Cisco edge pool is intentionally non-overlapping and only exists for outage mode. That separation makes it easier to identify emergency leases and reduces collision risk during recovery.',
        kind: 'cards',
        items: [
          {
            title: 'Emergency Pool Range',
            body:
              '10.40.10.210 through 10.40.10.230 is reserved strictly for backup DHCP activation.',
          },
          {
            title: 'Gateway Behavior',
            body:
              'The default gateway remains 10.40.10.1 so traffic still exits through the same edge path during failover.',
          },
          {
            title: 'DNS Tradeoff',
            body:
              'The backup service can hand out public DNS values for basic internet access, but it does not fully replace the Windows-integrated DNS experience.',
          },
        ],
      },
      {
        title: 'Addressing & DNS Summary',
        kind: 'table',
        columns: ['Range / Setting', 'Use', 'Notes'],
        rows: [
          ['10.40.10.1 - 10.40.10.99', 'Infrastructure / static space', 'Reserved for gateway, server, printers, switches, and fixed devices'],
          ['10.40.10.100 - 10.40.10.199', 'Windows primary DHCP pool', 'Normal lease range for office clients'],
          ['10.40.10.210 - 10.40.10.230', 'Cisco emergency DHCP pool', 'Emergency-only range for outage coverage'],
          ['DNS option: 10.40.10.10', 'Normal internal name resolution', 'Supports domain-aware office behavior'],
          ['Gateway: 10.40.10.1', 'Consistent traffic exit path', 'Remains the edge gateway in both normal and outage states'],
        ],
      },
      {
        title: 'Topology & Evidence Story',
        kind: 'split',
        items: [
          {
            title: 'Normal Path',
            body:
              'Clients on the internal LAN request leases from Windows Server 2022, which also supplies the internal DNS path for domain-aware operation.',
          },
          {
            title: 'Failover Path',
            body:
              'If the Cisco edge cannot reach 10.40.10.10, the emergency pool activates so renewing or rebooted wired clients can still join the network.',
          },
        ],
      },
      {
        title: 'Windows Server DHCP Manager Implementation',
        lead:
          'The primary scope is built first on Windows Server 2022 so the clinic keeps a centralized DHCP authority with better visibility, reservation handling, and domain-aware support workflow.',
        kind: 'timeline',
        items: [
          'Build the Windows Server 2022 VM on Proxmox, assign 10.40.10.10 as a static address, and confirm the server is stable on the internal LAN.',
          'Install the DHCP Server role from Server Manager, complete the post-install wizard, and authorize the DHCP service in Active Directory.',
          'Open DHCP Manager, create the IPv4 office scope for 10.40.10.0/24, and define the primary lease range as 10.40.10.100 through 10.40.10.199.',
          'Add exclusions for infrastructure space such as 10.40.10.1 through 10.40.10.99 so statics, printers, switches, and server roles do not collide with client leases.',
          'Set core DHCP options including router 10.40.10.1, DNS server 10.40.10.10, the local domain name, lease timing, and any important reservations for managed devices.',
          'Activate the scope and verify from DHCP Manager that a test client receives a lease from Windows before the backup design is introduced.',
        ],
      },
      {
        title: 'Cisco ASA Backup DHCP & Health-Based Activation',
        lead:
          'After the primary Windows scope is working, the Cisco ASA is staged as an emergency-only DHCP provider with a separate address range and controlled activation logic so it only responds during outage conditions.',
        kind: 'timeline',
        items: [
          'Create a small non-overlapping emergency pool on the Cisco ASA, such as 10.40.10.210 through 10.40.10.230, and bind it to the inside network used by the office LAN.',
          'Set backup DHCP values for the emergency state, including the inside gateway path, lease timing, and temporary DNS behavior that can preserve basic internet connectivity during server loss.',
          'Keep the ASA DHCP service disabled or staged for conditional use during normal operation so Windows remains the only active DHCP authority while healthy.',
          'Use health-based activation logic that tests the Windows server at 10.40.10.10 and only enables the ASA emergency pool after consistent failure rather than a single missed reply.',
          'When the ASA detects the Windows DHCP path is unavailable, it enables the emergency scope so renewing or newly connected wired clients can still obtain valid IP configuration.',
          'After Windows becomes stable again, disable the ASA emergency pool, confirm Windows resumes lease delivery, and document any cleanup or verification steps needed after failback.',
        ],
      },
    ],
  },
  diagrams: {
    eyebrow: 'Section 4',
    heroTitle: 'Topology, Workflow & Evidence Layout',
    heroText:
      'This page turns the technical story into a cleaner visual narrative that is easier to review during interviews, portfolio walkthroughs, or internal project discussion.',
    sections: [
      {
        title: 'Logical Story',
        kind: 'split',
        items: [
          {
            title: 'Normal Path',
            body:
              'Clients on the internal LAN broadcast DHCP requests and Windows Server 2022 answers from the primary scope while also supplying internal DNS behavior.',
          },
          {
            title: 'Failover Path',
            body:
              'If the Cisco edge can no longer reach 10.40.10.10, it activates the emergency pool so renewing or rebooted clients still receive basic network configuration.',
          },
        ],
      },
      {
        title: 'Suggested Evidence Slots',
        kind: 'cards',
        items: [
          { title: 'Windows DHCP Manager Overview', body: 'Capture the main scope, exclusions, and active lease list.' },
          { title: 'Proxmox VM Summary', body: 'Show the SC-DC01 guest, its resources, and overall host layout.' },
          { title: 'Cisco Edge Failover State', body: 'Show the backup pool or health-tracking state during a controlled test.' },
          { title: 'Before / After Recovery Validation', body: 'Show reachability and lease behavior before failover and after failback.' },
        ],
      },
      {
        title: 'Flow Summary',
        kind: 'timeline',
        items: [
          'Client requests a lease on the internal office LAN.',
          'Windows answers while the domain controller is healthy.',
          'Cisco continuously tests 10.40.10.10 for reachability.',
          'After threshold failure, Cisco enables the emergency DHCP pool.',
          'Clients renewing during outage receive fallback leases.',
          'Once the server is healthy again, Cisco disables emergency DHCP and Windows resumes primary service.',
        ],
      },
    ],
  },
  segmentation: {
    eyebrow: 'Section 5',
    heroTitle: 'Scopes, VLANs, DNS & Address Design',
    heroText:
      'Failover only works cleanly when address planning, gateway continuity, and DNS behavior are all documented up front.',
    sections: [
      {
        title: 'Addressing Summary',
        kind: 'table',
        columns: ['Range', 'Use', 'Notes'],
        rows: [
          ['10.40.10.1 - 10.40.10.99', 'Infrastructure / static allocation', 'Gateway, server, printers, switches, and fixed devices'],
          ['10.40.10.100 - 10.40.10.199', 'Windows primary DHCP pool', 'Normal dynamic range for office devices'],
          ['10.40.10.210 - 10.40.10.230', 'Cisco emergency DHCP pool', 'Used only during outage coverage'],
        ],
      },
      {
        title: 'DNS and DHCP Interaction',
        kind: 'cards',
        items: [
          {
            title: 'Normal State',
            body:
              'Windows DHCP and DNS work together, which supports internal lookups, domain behavior, and a more complete administrative model.',
          },
          {
            title: 'Outage State',
            body:
              'Cisco can keep handing out IP configuration, but internal DNS-dependent workflows may be reduced until Windows DNS is restored.',
          },
        ],
      },
      {
        title: 'Why This Is Not True Load-Balanced DHCP',
        lead:
          'The goal is not to make two unlike DHCP platforms actively share the office network all the time. The goal is controlled continuity. Windows remains the primary source of truth; Cisco is the emergency fallback path.',
      },
    ],
  },
  cloud: {
    eyebrow: 'Section 6',
    heroTitle: 'Proxmox, UPS & Infrastructure Resilience',
    heroText:
      'The best failover event is the one that rarely needs to happen. This section focuses on how the host platform and power layer reduce unnecessary DHCP outages.',
    sections: [
      {
        title: 'Primary Stability Controls',
        kind: 'cards',
        items: [
          {
            title: 'Proxmox Recovery Flexibility',
            body:
              'Snapshots, backups, and cleaner VM administration make the Windows DHCP service easier to restore than an undocumented standalone host build.',
          },
          {
            title: 'UPS Protection',
            body:
              'Battery-backed runtime can bridge short utility events and protect the host from abrupt shutdowns that would otherwise trigger avoidable failover.',
          },
          {
            title: 'Monitoring Expectations',
            body:
              'Host health, VM availability, DHCP service state, storage condition, and edge reachability should all be part of normal monitoring.',
          },
        ],
      },
      {
        title: 'Future Improvements',
        kind: 'list',
        items: [
          'Add a second Windows DHCP server and native Microsoft DHCP failover for richer synchronization.',
          'Separate the domain controller and DHCP roles further for cleaner fault isolation.',
          'Improve host replication or recovery automation around the VM layer.',
          'Add more granular alerting for scope exhaustion, service crash, and abnormal lease behavior.',
        ],
      },
    ],
  },
  programming: {
    eyebrow: 'Section 7',
    heroTitle: 'Automation, Health Checks & Trigger Logic',
    heroText:
      'The Cisco side should not blindly hand out addresses all the time. It should react to the health of the primary server in a controlled way.',
    sections: [
      {
        title: 'Automation Model',
        lead:
          'For Cisco IOS XE style design, the common building blocks are IP SLA, object tracking, and Embedded Event Manager. Together they can test whether 10.40.10.10 is alive and respond when its state changes.',
      },
      {
        title: 'Outage and Recovery Logic',
        kind: 'timeline',
        items: [
          'Cisco repeatedly probes 10.40.10.10.',
          'If the threshold fails for the defined interval, object tracking changes to down.',
          'The DHCP emergency configuration is enabled for the internal LAN.',
          'Users renewing during the outage receive leases from the fallback pool.',
          'When 10.40.10.10 becomes stable again, the tracked state returns to up.',
          'The emergency pool is disabled and Windows resumes authority.',
        ],
      },
      {
        title: 'Practical Note',
        lead:
          'ASA and IOS XE do not behave identically, so the exact syntax depends on the Cisco platform. The important architectural point is that the backup pool is health-triggered and temporary, not a permanent second DHCP authority.',
      },
    ],
  },
  cybersecurity: {
    eyebrow: 'Section 8',
    heroTitle: 'Risk Analysis, Security Controls & Limitations',
    heroText:
      'A backup DHCP service improves continuity, but it does not reproduce every Windows-integrated feature. This section keeps the tradeoffs honest.',
    sections: [
      {
        title: 'Risk Review',
        kind: 'table',
        columns: ['Risk', 'Impact', 'Mitigation'],
        rows: [
          ['Primary DHCP server outage', 'Renewing or new clients may lose addressing', 'Cisco emergency pool keeps leases flowing during the outage'],
          ['False failover activation', 'Potential confusion if both systems appear active', 'Threshold-based health checks and separate address ranges reduce the blast radius'],
          ['Internal DNS loss', 'Users may keep internet access but lose internal resolution', 'Restore Windows quickly and document reduced outage-mode capability'],
          ['Operational drift', 'Backup configuration becomes messy over time', 'Keep Cisco emergency-only and fail back to Windows automatically'],
        ],
      },
      {
        title: 'What Cisco DHCP Does Less Well',
        kind: 'cards',
        items: [
          {
            title: 'Reduced Administrative Depth',
            body:
              'It is not as comfortable as DHCP Manager for day-to-day lease review, reservation management, or Windows-integrated support workflow.',
          },
          {
            title: 'Reduced Domain Awareness',
            body:
              'Emergency DHCP can preserve connectivity, but it does not fully preserve the richer Windows DNS and domain behavior that normal office operations rely on.',
          },
        ],
      },
      {
        title: 'Security Controls to Keep',
        kind: 'list',
        items: [
          'Restrict who can modify Windows DHCP and Cisco emergency DHCP settings.',
          'Log failover events and configuration changes for auditability.',
          'Use switch protections and rogue DHCP prevention where available.',
          'Treat backup DHCP as a tested continuity measure, not a casual always-on convenience.',
        ],
      },
    ],
  },
  voip: {
    eyebrow: 'Section 3',
    heroTitle: 'Automation, Failover Operations & Recovery',
    heroText:
      'This section combines the trigger logic, outage response workflow, testing process, and failback routine into one operational runbook.',
    sections: [
      {
        title: 'Windows Server DHCP Manager Workflow',
        lead:
          'On the Windows Server 2022 side, the primary scope is built and managed in DHCP Manager. That keeps the normal office environment centralized, visible, and easier to support than trying to run the whole LAN from the firewall full time.',
        kind: 'timeline',
        items: [
          'Open Server Manager, add the DHCP Server role, complete post-install configuration, and authorize the server in Active Directory.',
          'Open DHCP Manager, expand IPv4, and create a new scope for the internal office LAN such as 10.40.10.0/24.',
          'Define the primary lease range as 10.40.10.100 through 10.40.10.199 and exclude 10.40.10.1 through 10.40.10.99 for infrastructure devices.',
          'Set the default gateway option to 10.40.10.1, set DNS to 10.40.10.10, and apply the local domain name used by the office.',
          'Add reservations, exclusions, lease duration, and any DHCP options needed for printers, phones, or other managed devices.',
          'Activate the scope and verify lease issuance from DHCP Manager before testing any failover behavior.',
        ],
      },
      {
        title: 'Sample Cisco ASA Emergency DHCP Configuration',
        lead:
          'For the backup path, the Cisco ASA is not being used as a full Windows-style failover partner. Instead, it is staged as an emergency DHCP responder on the inside interface. A realistic sample platform for this report is a Cisco ASA 5516-X or a Firepower 1010 running ASA software.',
        kind: 'table',
        columns: ['Sample ASA Step', 'Example Configuration Intent', 'Why It Matters'],
        rows: [
          ['Define the inside scope', 'Use an emergency-only range such as 10.40.10.210 through 10.40.10.230 on the inside interface', 'Keeps the fallback leases separate from the main Windows range'],
          ['Set lease parameters', 'Apply DNS, domain name, and lease timing appropriate for outage mode', 'Lets clients receive usable basic configuration during a server outage'],
          ['Preserve the gateway path', 'The inside gateway remains 10.40.10.1 on the ASA or connected edge path', 'Maintains a consistent default route for the LAN'],
          ['Keep DHCP disabled during normal operation', 'The ASA backup pool should not stay active while Windows is healthy', 'Prevents split administration and overlapping lease behavior'],
          ['Enable only during outage mode', 'Turn on the inside DHCP service when the Windows server path is confirmed down', 'Makes the ASA a continuity tool rather than a permanent second authority'],
        ],
      },
      {
        title: 'Example Cisco ASA Backup DHCP Workflow',
        lead:
          'A simplified ASA-side workflow looks like this: pre-stage the emergency scope, keep it off during normal operations, and only enable it when the primary Windows DHCP service is unavailable.',
        kind: 'timeline',
        items: [
          'Set the inside interface and reserve the emergency DHCP range for the office LAN, for example 10.40.10.210 through 10.40.10.230.',
          'Configure outage-mode DNS values and confirm the inside interface still represents the gateway path for the office network.',
          'Keep the backup DHCP service disabled while Windows Server 2022 is serving the normal scope.',
          'When health checks against 10.40.10.10 fail consistently, enable DHCP on the ASA inside interface so renewing clients can receive emergency leases.',
          'Once the Windows server is restored and stable again, disable the ASA DHCP service and return full lease authority to Windows DHCP Manager.',
        ],
      },
      {
        title: 'Automation Model',
        lead:
          'The health-check side of the design watches whether the domain controller at 10.40.10.10 is reachable. In environments built around Cisco IOS XE, IP SLA, object tracking, and EEM are common building blocks. In an ASA-centered design, teams often pre-stage the DHCP scope on the firewall and use management automation, monitored procedures, or adjacent Cisco routing logic to control when the ASA backup service is enabled or disabled.',
      },
      {
        title: 'Trigger Logic',
        kind: 'timeline',
        items: [
          'Cisco repeatedly probes 10.40.10.10.',
          'If the threshold fails long enough, tracking changes state and the emergency DHCP path is enabled.',
          'Clients renewing during the outage receive fallback leases from the Cisco pool.',
          'Once 10.40.10.10 becomes stable again, the backup pool is disabled and Windows resumes authority.',
        ],
      },
      {
        title: 'Runbook Flow',
        kind: 'timeline',
        items: [
          'Receive alert or user report indicating the DHCP server path is unavailable.',
          'Confirm 10.40.10.10 is no longer reachable from the Cisco edge.',
          'Verify the Cisco emergency DHCP pool is active.',
          'Test a wired client for lease issuance, gateway reachability, and outside internet access.',
          'Restore the Windows VM or DHCP service and confirm stable response.',
          'Verify Cisco emergency DHCP disables itself and Windows retakes the primary role.',
        ],
      },
      {
        title: 'Testing Checklist',
        kind: 'split',
        items: [
          {
            title: 'Outage Validation',
            body:
              'Simulate DHCP service stop, simulate full VM outage, confirm edge activation, and verify client lease behavior from the emergency pool.',
          },
          {
            title: 'Recovery Validation',
            body:
              'Restore the server, verify stable reachability, check that failback occurs, and review leases or DNS cleanup needs after the event.',
          },
        ],
      },
      {
        title: 'Operational Truth About ASA Failover DHCP',
        lead:
          'The most important point is honesty in the design: Cisco ASA DHCP is good for emergency continuity, but it is not the same as native Microsoft DHCP failover between two Windows servers. The ASA gives the office a practical outage bridge by serving a smaller backup pool on the inside network, while Windows remains the normal long-term source of truth for scopes, reservations, and day-to-day administration.',
      },
    ],
  },
  hippa: {
    eyebrow: 'Section 4',
    heroTitle: 'Risk, Governance & Conclusion',
    heroText:
      'This closing section condenses the drawbacks, security considerations, governance expectations, and final engineering conclusion.',
    sections: [
      {
        title: 'Risk Review',
        kind: 'table',
        columns: ['Risk', 'Impact', 'Mitigation'],
        rows: [
          ['Primary DHCP server outage', 'Renewing or new clients may lose addressing', 'Cisco emergency pool keeps leases flowing during the outage'],
          ['False failover activation', 'Potential confusion if both systems appear active', 'Threshold-based health checks and separate ranges reduce the blast radius'],
          ['Internal DNS loss', 'Users may keep internet access but lose internal resolution', 'Restore Windows quickly and document reduced outage-mode capability'],
          ['Operational drift', 'Backup configuration becomes messy over time', 'Keep Cisco emergency-only and fail back to Windows automatically'],
        ],
      },
      {
        title: 'What Cisco DHCP Does Less Well',
        kind: 'cards',
        items: [
          {
            title: 'Reduced Administrative Depth',
            body:
              'It is not as comfortable as DHCP Manager for day-to-day lease review, reservation management, or Windows-integrated support workflow.',
          },
          {
            title: 'Reduced Domain Awareness',
            body:
              'Emergency DHCP can preserve connectivity, but it does not fully preserve the richer Windows DNS and domain behavior that normal office operations rely on.',
          },
        ],
      },
      {
        title: 'Documentation Standards',
        kind: 'list',
        items: [
          'Record the static IP of the domain controller and the exact Windows and Cisco lease ranges.',
          'Document the trigger thresholds used for failover and failback.',
          'Store screenshots or exported configs for Windows DHCP, the Cisco edge, Proxmox, and UPS settings.',
          'Maintain a recovery checklist so another engineer can operate the design without guessing.',
        ],
      },
      {
        title: 'Healthcare Operations Context',
        lead:
          'Even though DHCP itself is not where patient data lives, its availability still supports the systems staff need to reach scheduling tools, portals, and day-to-day business applications. That makes DHCP resilience part of a broader healthcare reliability posture.',
      },
      {
        title: 'Security Controls to Keep',
        kind: 'list',
        items: [
          'Restrict who can modify Windows DHCP and Cisco emergency DHCP settings.',
          'Log failover events and configuration changes for auditability.',
          'Use switch protections and rogue DHCP prevention where available.',
          'Treat backup DHCP as a tested continuity measure, not a casual always-on convenience.',
        ],
      },
      {
        title: 'Final Summary',
        lead:
          'This project demonstrates practical network engineering and systems administration judgment. Windows Server 2022 remains the preferred DHCP and DNS authority, Proxmox and UPS improve the primary platform posture, and the Cisco edge provides controlled emergency continuity when the primary server is unavailable.',
      },
    ],
  },
};
