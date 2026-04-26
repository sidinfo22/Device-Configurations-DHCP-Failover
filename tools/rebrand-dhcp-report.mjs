import fs from "fs";
import path from "path";

const root = process.cwd();

const navItems = [
  { href: "objectives.html", label: "Project Overview, Purpose & Objectives" },
  { href: "assets.html", label: "Platform Inventory & Service Roles" },
  { href: "deploy.html", label: "Windows Server DHCP & Cisco Edge Configuration" },
  { href: "diagrams.html", label: "Topology, Workflow & Evidence Slots" },
  { href: "segmentation.html", label: "Scopes, VLANs, DNS & Address Design" },
  { href: "cloud.html", label: "Proxmox, UPS & Infrastructure Resilience" },
  { href: "programming.html", label: "Automation, Health Checks & Trigger Logic" },
  { href: "cybersecurity.html", label: "Risk Analysis, Security Controls & Limitations" },
  { href: "voip.html", label: "Failover Operations, Testing & Recovery Runbook" },
  { href: "hippa.html", label: "Governance, Compliance & Conclusion" }
];

const siteName = "DHCP Failover Project Workflow";
const logoText = "DHCP Failover Project Workflow";
const notificationText = "Infrastructure configuration, resilience, and network engineering workflow by Sidiq Daniel";
const dcIp = "10.40.10.10";
const gatewayIp = "10.40.10.1";

function writeFile(relativePath, content) {
  fs.mkdirSync(path.dirname(path.join(root, relativePath)), { recursive: true });
  fs.writeFileSync(path.join(root, relativePath), content);
}

function syncPage(fileName, content) {
  writeFile(fileName, content);
  writeFile(path.join("public/site", fileName), content);
}

function replaceBetween(source, startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    return `${source.trimEnd()}\n\n${replacement}\n`;
  }
  return `${source.slice(0, start)}${replacement}${source.slice(end + endMarker.length)}`;
}

function upsertCss(relativePath, cssBlock) {
  const filePath = path.join(root, relativePath);
  const existing = fs.readFileSync(filePath, "utf8");
  const startMarker = "/* DHCP_REPORT_THEME_START */";
  const endMarker = "/* DHCP_REPORT_THEME_END */";
  const wrapped = `${startMarker}\n${cssBlock.trim()}\n${endMarker}`;
  const next = replaceBetween(existing, startMarker, endMarker, wrapped);
  fs.writeFileSync(filePath, next);
}

function pageTemplate({
  title,
  heroTag,
  heroTitle,
  heroText,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  reviewText,
  topContent,
  mainContent
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body class="dhcp-report-theme">
    <div class="background-wrapper">
      <div class="notification-bar">${notificationText}</div>
      <div class="sticky-header">
        <div class="logo">
          <a href="index.html">
            <img src="images/daters.png" alt="Logo" class="logo-image">
          </a>
          <a href="index.html" class="logo-text-link">${logoText}</a>
        </div>
        <div class="hamburger-menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <nav class="dropdown-menu">
          <ul></ul>
        </nav>
      </div>

      <section class="intro-section">
        <div class="button-like">${heroTag}</div>
        <h1>${heroTitle}</h1>
        <p>${heroText}</p>
        <div class="button-group">
          <button class="primary-button" onclick="window.location.href='${primaryHref}';">${primaryLabel}</button>
          <button class="secondary-button">
            <a href="${secondaryHref}" class="button-link">${secondaryLabel}</a>
          </button>
        </div>
        <div class="review-section">
          <span class="star">High Availability</span>
          <p>${reviewText}</p>
        </div>
      </section>

      ${topContent || ""}

      <section class="dhcp-page-shell">
        ${mainContent}
      </section>

      <article id="contact" class="wrapper style4">
        <div class="container medium">
          <header>
            <h2>Let's Connect</h2>
            <p>I am open to infrastructure engineering, network operations, systems administration, and technical project collaboration.</p>
          </header>
          <div class="contact-footer-grid">
            <section class="contact-panel">
              <h3>Send a Message</h3>
              <form method="post" action="#">
                <div class="row">
                  <div class="col-6 col-12-small">
                    <input type="text" name="name" id="name" placeholder="Name" />
                  </div>
                  <div class="col-6 col-12-small">
                    <input type="email" name="email" id="email" placeholder="Email" />
                  </div>
                  <div class="col-12">
                    <input type="text" name="subject" id="subject" placeholder="Subject" />
                  </div>
                  <div class="col-12">
                    <textarea name="message" id="message" placeholder="Message"></textarea>
                  </div>
                  <div class="col-12">
                    <input type="submit" value="Send Message" />
                  </div>
                </div>
              </form>
            </section>
            <section class="contact-panel">
              <h3>Professional Focus</h3>
              <p>This document showcases network engineering, systems administration, failover design, documentation discipline, and operational resilience planning through a realistic healthcare scenario.</p>
              <div class="contact-links">
                <a href="mailto:Sidinfo21@gmail.com">Sidinfo21@gmail.com</a>
                <a href="tel:+15163686457">(516) 368-6457</a>
              </div>
            </section>
          </div>
        </div>
      </article>

      <div id="thankYouModal" class="modal">
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <p>Thank you! Your message has been sent.</p>
        </div>
      </div>

      <footer class="subtle-footer">
        <p>New York, New York</p>
        <p>Design: Sidiq Daniel &copy; All rights reserved</p>
      </footer>
    </div>
    <script src="script.js" defer></script>
  </body>
</html>
`;
}

function section(title, eyebrow, body, extra = "") {
  return `<section class="dhcp-section">
    <div class="dhcp-kicker">${eyebrow}</div>
    <h2>${title}</h2>
    ${body}
    ${extra}
  </section>`;
}

function quickLinks(links) {
  return `<div class="dhcp-quick-links">
    <h3>On This Page</h3>
    <ul class="quick-links-list">
      ${links.map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`).join("")}
    </ul>
  </div>`;
}

const landingTop = `
  <section class="project-summary-section">
    <div class="project-summary-icon">
      <i class="fas fa-network-wired"></i>
    </div>
    <h2>Summit Care DHCP Resilience Blueprint</h2>
    <p class="project-summary-paragraph">This rebrand centers the entire report on a single resilience objective: keep Summit Care Medical Clinic issuing valid IP addresses to internal office devices even if the primary Windows Server DHCP service becomes unavailable. The scenario uses a Dell PowerEdge R740xd running a Proxmox type 1 hypervisor, a Windows Server 2022 domain controller with DHCP and DNS, and a Cisco edge security platform that can temporarily take over DHCP for the internal LAN.</p>
    <p class="project-summary-paragraph">Instead of treating DHCP as a small background service, the report presents it as a critical infrastructure dependency tied directly to onboarding, uptime, support efficiency, and business continuity. The result is a front-facing engineering document that explains the design, the configuration logic, the failover behavior, the risks, the tradeoffs, and the improvement roadmap in one organized workflow.</p>
  </section>

  <div class="auto-scrolling-reel">
    <div class="reel-container"></div>
  </div>

  <section class="cards-section">
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-bullseye"></i></div>
      <h3>Purpose & Objectives</h3>
      <p>Frame the outage problem, define success criteria, and explain why DHCP resilience matters to the clinic.</p>
      <a href="objectives.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-boxes"></i></div>
      <h3>Platform Inventory</h3>
      <p>Document the Dell, Proxmox, Windows Server, UPS, and Cisco components that support the design.</p>
      <a href="assets.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-tools"></i></div>
      <h3>Configuration Workflow</h3>
      <p>Walk through the Windows DHCP scope, the Cisco backup pool, reservations, options, and failback behavior.</p>
      <a href="deploy.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-project-diagram"></i></div>
      <h3>Topology & Evidence</h3>
      <p>Show the logical design, workflow steps, and image placeholders for screenshots or exported diagrams.</p>
      <a href="diagrams.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-network-wired"></i></div>
      <h3>Scope & Addressing Design</h3>
      <p>Explain VLAN assumptions, DHCP ranges, lease behavior, DNS dependencies, and scope separation.</p>
      <a href="segmentation.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-server"></i></div>
      <h3>Resilience Platform</h3>
      <p>Document the virtualization host, UPS layer, monitoring expectations, and host hardening that keep DHCP stable.</p>
      <a href="cloud.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-code"></i></div>
      <h3>Automation & Trigger Logic</h3>
      <p>Describe the health checks, Cisco IOS XE style IP SLA and EEM approach, and scripted fallback logic.</p>
      <a href="programming.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-shield-alt"></i></div>
      <h3>Risk & Security</h3>
      <p>Review security exposure, service limitations, and what changes when Cisco serves addresses instead of Windows.</p>
      <a href="cybersecurity.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-life-ring"></i></div>
      <h3>Runbook & Recovery</h3>
      <p>Present failover timing, testing checkpoints, recovery tasks, and service restoration guidance.</p>
      <a href="voip.html" class="view-more">View More</a>
    </div>
    <div class="card animate-card">
      <div class="icon"><i class="fas fa-clipboard-check"></i></div>
      <h3>Governance & Conclusion</h3>
      <p>Wrap the project with documentation standards, compliance awareness, lessons learned, and future enhancements.</p>
      <a href="hippa.html" class="view-more">View More</a>
    </div>
  </section>
`;

const landingMain = `
  ${section(
    "What This Project Is Designed To Prove",
    "Executive Focus",
    `<div class="dhcp-grid dhcp-grid-3">
      <article class="dhcp-card">
        <h3>Primary Service</h3>
        <p>Windows Server 2022 delivers DHCP and DNS from a virtual machine hosted on a Dell PowerEdge R740xd running Proxmox. This remains the preferred service path because it supports centralized administration, DHCP Manager visibility, scope reservations, policy control, and clean integration with the rest of the Windows environment.</p>
      </article>
      <article class="dhcp-card">
        <h3>Emergency Continuity</h3>
        <p>If the domain controller at ${dcIp} stops responding, the Cisco edge device activates a backup DHCP scope for the office LAN. This keeps wired endpoints able to receive an address, a default gateway, and public DNS values so basic internet reachability remains available during the outage window.</p>
      </article>
      <article class="dhcp-card">
        <h3>Failback Discipline</h3>
        <p>When the Windows server comes back online and health checks stabilize, the Cisco backup pool is turned off again so the clinic returns to the primary service model. This avoids long-term split administration and keeps Windows Server as the authoritative DHCP platform.</p>
      </article>
    </div>`,
    `<div class="dhcp-callout">
      <strong>Important design note:</strong> this is not presented as native Microsoft DHCP failover between two Windows servers. It is a layered continuity design that uses a Cisco backup service for outage coverage while preserving Windows as the primary DHCP authority.
    </div>`
  )}

  ${section(
    "Target Outcomes",
    "Service Goals",
    `<div class="dhcp-grid dhcp-grid-2">
      <article class="dhcp-card">
        <h3>Operational Objectives</h3>
        <ul class="dhcp-list">
          <li>Reduce the chance that a single Windows DHCP outage stops new devices from joining the LAN.</li>
          <li>Support near-continuous address availability for front-desk, nursing, office, and wired workstation users.</li>
          <li>Preserve administrative clarity by automatically falling back to Windows DHCP after recovery.</li>
          <li>Document the process in a way that employers and technical reviewers can evaluate quickly.</li>
        </ul>
      </article>
      <article class="dhcp-card">
        <h3>Resilience Snapshot</h3>
        <div class="dhcp-chart">
          <div class="dhcp-chart-row">
            <span>Primary DHCP availability target</span>
            <div class="dhcp-chart-bar"><i style="width: 96%;"></i></div>
            <strong>96%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Fallback service coverage</span>
            <div class="dhcp-chart-bar"><i style="width: 82%;"></i></div>
            <strong>82%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Administrative visibility during failover</span>
            <div class="dhcp-chart-bar"><i style="width: 74%;"></i></div>
            <strong>74%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Internet continuity for wired devices</span>
            <div class="dhcp-chart-bar"><i style="width: 88%;"></i></div>
            <strong>88%</strong>
          </div>
        </div>
      </article>
    </div>`
  )}

  ${section(
    "Scenario Foundation",
    "Summit Care Blueprint",
    `<div class="dhcp-table-wrap">
      <table class="dhcp-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Role In The Design</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dell PowerEdge R740xd</td>
            <td>Physical host platform</td>
            <td>Provides a stable enterprise-grade hardware base for the virtualized services.</td>
          </tr>
          <tr>
            <td>Proxmox VE</td>
            <td>Type 1 hypervisor</td>
            <td>Keeps server roles organized, easier to back up, and simpler to restore.</td>
          </tr>
          <tr>
            <td>Windows Server 2022</td>
            <td>Primary DHCP and DNS</td>
            <td>Delivers the full management experience and tight integration with the domain.</td>
          </tr>
          <tr>
            <td>Cisco edge firewall/router</td>
            <td>Emergency backup DHCP</td>
            <td>Maintains address assignment when the primary server becomes unavailable.</td>
          </tr>
          <tr>
            <td>UPS</td>
            <td>Power continuity</td>
            <td>Helps prevent avoidable outages and gives time for graceful response.</td>
          </tr>
        </tbody>
      </table>
    </div>`
  )}
`;

const pageBodies = {
  "index.html": pageTemplate({
    title: "DHCP Failover Project Workflow | Summit Care Medical Clinic",
    heroTag: "Master Infrastructure Report",
    heroTitle: "DHCP Failover Project Workflow For Summit Care Medical Clinic",
    heroText: "A detailed infrastructure engineering report focused on resilient IP address management, Windows Server 2022 DHCP, Cisco edge failover logic, and continuity planning for a healthcare office LAN.",
    primaryHref: "objectives.html",
    primaryLabel: "View Full Report",
    secondaryHref: "diagrams.html",
    secondaryLabel: "Explore Topology & Evidence",
    reviewText: "Designed to keep the clinic onboarding devices, maintaining wired connectivity, and restoring primary service cleanly after a DHCP outage.",
    topContent: landingTop,
    mainContent: landingMain
  }),
  "objectives.html": pageTemplate({
    title: "Project Overview, Purpose & Objectives | DHCP Failover Project Workflow",
    heroTag: "Section 1",
    heroTitle: "Project Overview, Purpose & Objectives",
    heroText: "This section frames the outage problem, the business need for resilient DHCP, and the objectives that shaped the Summit Care failover design.",
    primaryHref: "assets.html",
    primaryLabel: "Next Section",
    secondaryHref: "index.html",
    secondaryLabel: "Return Home",
    reviewText: "The objective is simple: keep address assignment available, reduce outage impact, and restore the Windows service as the primary authority after recovery.",
    topContent: quickLinks([
      { id: "project-purpose", label: "Project Purpose" },
      { id: "business-drivers", label: "Business Drivers" },
      { id: "success-metrics", label: "Success Metrics" }
    ]),
    mainContent: `
      <section class="dhcp-section" id="project-purpose">
        <div class="dhcp-kicker">Project Purpose</div>
        <h2>Why DHCP Failover Matters In This Scenario</h2>
        <p>At Summit Care Medical Clinic, new device onboarding and day-to-day network continuity depend on dynamic IP addressing. If the primary Windows DHCP service is unavailable, recently rebooted workstations, replacement desktops, thin clients, printers, phones, badge readers, and other office devices can fail to obtain an address. That turns a single server-side fault into a clinic-wide productivity problem.</p>
        <p>The goal of this project is to reduce that single point of failure without replacing the Windows-centered administrative model. Windows Server 2022 remains the preferred DHCP platform because it supports centralized management through DHCP Manager, integrates naturally with DNS and Active Directory, and offers better administrative depth than an emergency edge device configuration. The Cisco fallback layer exists to preserve continuity, not to permanently replace the server.</p>
        <div class="dhcp-callout">
          <strong>Core positioning:</strong> the design aims for near-continuous address availability and business continuity, while acknowledging that no environment can promise literal 100 percent uptime under every failure condition.
        </div>
      </section>

      <section class="dhcp-section" id="business-drivers">
        <div class="dhcp-kicker">Business Drivers</div>
        <h2>Operational Needs Behind The Design</h2>
        <div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Clinical Workflow Continuity</h3>
            <ul class="dhcp-list">
              <li>Front desk and administrative staff need workstations to reconnect quickly after maintenance or power events.</li>
              <li>Exam-room and office devices should continue reaching the internet and basic services even if the DHCP server fails.</li>
              <li>IT staff need a documented process for identifying whether the failure is power, host, guest VM, or service related.</li>
            </ul>
          </article>
          <article class="dhcp-card">
            <h3>Infrastructure Management Discipline</h3>
            <ul class="dhcp-list">
              <li>The Windows server should remain the main source of scope administration, reservations, and lease tracking.</li>
              <li>The Cisco backup service should only activate during health-check failure and should step back automatically after recovery.</li>
              <li>The design must be simple enough to explain during interviews, reviews, and employer-facing technical conversations.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="dhcp-section" id="success-metrics">
        <div class="dhcp-kicker">Success Metrics</div>
        <h2>How The Project Measures Success</h2>
        <div class="dhcp-table-wrap">
          <table class="dhcp-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Desired Outcome</th>
                <th>Engineering Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Address continuity</td>
                <td>Clients still receive DHCP leases during server outage</td>
                <td>The edge device can temporarily serve a valid emergency pool.</td>
              </tr>
              <tr>
                <td>Failover trigger quality</td>
                <td>Fallback starts only when the server is genuinely unavailable</td>
                <td>Health checks should reduce false activation.</td>
              </tr>
              <tr>
                <td>Failback quality</td>
                <td>Windows resumes primary service automatically after restoration</td>
                <td>The clinic avoids two long-term DHCP authorities on the same segment.</td>
              </tr>
              <tr>
                <td>Supportability</td>
                <td>Admins can explain, test, and troubleshoot the workflow quickly</td>
                <td>Documentation and configuration logic stay readable.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `
  }),
  "assets.html": pageTemplate({
    title: "Platform Inventory & Service Roles | DHCP Failover Project Workflow",
    heroTag: "Section 2",
    heroTitle: "Platform Inventory & Service Roles",
    heroText: "This section documents the hardware, virtual platform, server roles, and network edge responsibilities that make the DHCP failover workflow possible.",
    primaryHref: "deploy.html",
    primaryLabel: "Next Section",
    secondaryHref: "objectives.html",
    secondaryLabel: "Previous Section",
    reviewText: "The strength of the design depends on good role separation: Windows for primary management, Cisco for emergency continuity, and UPS plus virtualization for platform stability.",
    topContent: "",
    mainContent: `
      ${section(
        "Infrastructure Inventory",
        "Hardware & Core Services",
        `<div class="dhcp-table-wrap">
          <table class="dhcp-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Example Build</th>
                <th>Project Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dell PowerEdge R740xd</td>
                <td>Enterprise server chassis with redundant storage and server-grade compute</td>
                <td>Hosts the Proxmox hypervisor and the critical infrastructure VMs.</td>
              </tr>
              <tr>
                <td>Proxmox VE</td>
                <td>Type 1 hypervisor</td>
                <td>Runs the Windows Server 2022 virtual machine that provides DHCP and DNS.</td>
              </tr>
              <tr>
                <td>SC-DC01</td>
                <td>Windows Server 2022 VM at ${dcIp}</td>
                <td>Primary domain controller, DNS server, and DHCP server for the office LAN.</td>
              </tr>
              <tr>
                <td>Cisco edge firewall/router</td>
                <td>ASA security edge with conditional DHCP continuity role</td>
                <td>Supplies a backup DHCP scope only when the Windows server health check fails.</td>
              </tr>
              <tr>
                <td>UPS</td>
                <td>Battery-backed power protection for host and network edge</td>
                <td>Reduces avoidable outages and protects the main DHCP host from brief power instability.</td>
              </tr>
            </tbody>
          </table>
        </div>`
      )}

      ${section(
        "Why The Platform Mix Works",
        "Role Separation",
        `<div class="dhcp-grid dhcp-grid-3">
          <article class="dhcp-card">
            <h3>Windows Server 2022</h3>
            <p>Windows stays in charge of the rich DHCP feature set: reservations, console-based administration, logging visibility, scope options, and easier service auditing. This keeps the environment easier to maintain and more familiar for systems administrators.</p>
          </article>
          <article class="dhcp-card">
            <h3>Cisco Edge Platform</h3>
            <p>The Cisco layer is ideal for continuity because it remains on the path even when the Windows guest or hypervisor experiences trouble. Its role is intentionally narrow: keep the LAN alive long enough for IT to restore the preferred server-side service model.</p>
          </article>
          <article class="dhcp-card">
            <h3>UPS + Virtualization</h3>
            <p>The UPS lowers the likelihood of hard shutdowns, while Proxmox makes it easier to snapshot, back up, and recover the Windows guest. That combination reduces total downtime and improves recovery posture around the primary DHCP service.</p>
          </article>
        </div>`
      )}

      ${section(
        "Service Ownership Matrix",
        "Administrative Model",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Primary Owner</h3>
            <ul class="dhcp-list">
              <li>DHCP scopes for internal office devices</li>
              <li>Reservations and exclusions</li>
              <li>DNS registration workflow</li>
              <li>Lease review and troubleshooting</li>
            </ul>
            <p><strong>Owned by:</strong> Windows Server 2022 on SC-DC01</p>
          </article>
          <article class="dhcp-card">
            <h3>Emergency Owner</h3>
            <ul class="dhcp-list">
              <li>Short-duration emergency scope</li>
              <li>Default gateway delivery</li>
              <li>Public DNS handoff during server outage</li>
              <li>Rapid disable after server recovery</li>
            </ul>
            <p><strong>Owned by:</strong> Cisco edge firewall/router backup service</p>
          </article>
        </div>`
      )}
    `
  }),
  "deploy.html": pageTemplate({
    title: "Windows Server DHCP & Cisco Edge Configuration | DHCP Failover Project Workflow",
    heroTag: "Section 3",
    heroTitle: "Windows Server DHCP & Cisco Edge Configuration",
    heroText: "This section explains how the primary scope was configured in Windows Server 2022 and how the Cisco backup scope was staged for conditional activation.",
    primaryHref: "diagrams.html",
    primaryLabel: "Next Section",
    secondaryHref: "assets.html",
    secondaryLabel: "Previous Section",
    reviewText: "The implementation is built around clear authority: Windows manages normal addressing, Cisco only activates when health checks indicate the primary server is down.",
    topContent: "",
    mainContent: `
      ${section(
        "Windows Server 2022 DHCP Build",
        "Primary Configuration",
        `<p>The main DHCP service lives on the Windows Server 2022 domain controller VM. Inside DHCP Manager, the IPv4 scope for the internal office LAN was created with a structured lease pool, exclusions for infrastructure devices, and options for the default gateway, DNS, and domain name. In this scenario the domain controller keeps the static address ${dcIp}, while the internal gateway remains ${gatewayIp} on the Cisco edge device.</p>
        <div class="dhcp-table-wrap">
          <table class="dhcp-table">
            <thead>
              <tr>
                <th>Scope Setting</th>
                <th>Mock Value</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Scope network</td>
                <td>10.40.10.0/24</td>
                <td>Internal office LAN for staff devices and managed endpoints.</td>
              </tr>
              <tr>
                <td>Primary lease range</td>
                <td>10.40.10.100 - 10.40.10.199</td>
                <td>Main dynamic pool for workstations and general office devices.</td>
              </tr>
              <tr>
                <td>Excluded space</td>
                <td>10.40.10.1 - 10.40.10.99</td>
                <td>Reserved for infrastructure, static servers, printers, and network appliances.</td>
              </tr>
              <tr>
                <td>Gateway option</td>
                <td>${gatewayIp}</td>
                <td>Routes internal office traffic through the Cisco edge.</td>
              </tr>
              <tr>
                <td>DNS option</td>
                <td>${dcIp}</td>
                <td>Supports internal name resolution and domain-aware operation.</td>
              </tr>
            </tbody>
          </table>
        </div>`
      )}

      ${section(
        "Cisco Backup Scope Strategy",
        "Emergency Configuration",
        `<p>The Cisco edge service is staged as a backup-only pool and deliberately separated from the main Windows allocation range. In the mock design, the backup pool uses <strong>10.40.10.210 - 10.40.10.230</strong>. This helps reduce the chance of address collision if the server briefly returns or if stale leases exist. During outage mode, the Cisco device hands out the same gateway but switches DNS delivery to public resolvers so users can still reach the internet even if internal DNS is unavailable.</p>
        <div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Why Separate The Pool</h3>
            <ul class="dhcp-list">
              <li>Makes outage leases easier to identify during troubleshooting.</li>
              <li>Reduces overlap with the normal Windows-managed range.</li>
              <li>Supports cleaner failback once the domain controller is restored.</li>
            </ul>
          </article>
          <article class="dhcp-card">
            <h3>What Changes During Failover</h3>
            <ul class="dhcp-list">
              <li>Gateway remains ${gatewayIp}.</li>
              <li>DNS values can switch to public resolvers for external browsing.</li>
              <li>Internal DNS registration and deeper domain-aware DHCP features are reduced.</li>
            </ul>
          </article>
        </div>`
      )}

      ${section(
        "Configuration Sequence",
        "Implementation Workflow",
        `<ol class="dhcp-steps">
          <li>Build the Windows Server 2022 VM on Proxmox and assign the static domain controller address ${dcIp}.</li>
          <li>Install and authorize the DHCP role, then create the primary office scope in DHCP Manager.</li>
          <li>Apply scope options for gateway, DNS, lease duration, exclusions, and any required reservations.</li>
          <li>Configure the Cisco edge backup pool using a non-overlapping emergency range.</li>
          <li>Attach a health-check mechanism to the Cisco platform so the backup pool only becomes active when the Windows host fails reachability testing.</li>
          <li>Test failover, validate lease issuance, confirm internet access, then restore the Windows server and verify Cisco failback behavior.</li>
        </ol>`
      )}

      ${section(
        "Screenshot & Evidence Slots",
        "Documentation Capture",
        `<div class="dhcp-grid dhcp-grid-3">
          <div class="dhcp-placeholder">Image slot: Windows Server DHCP Manager scope overview</div>
          <div class="dhcp-placeholder">Image slot: Scope options showing gateway and DNS values</div>
          <div class="dhcp-placeholder">Image slot: Cisco backup DHCP configuration or policy view</div>
        </div>`
      )}
    `
  }),
  "diagrams.html": pageTemplate({
    title: "Topology, Workflow & Evidence Slots | DHCP Failover Project Workflow",
    heroTag: "Section 4",
    heroTitle: "Topology, Workflow & Evidence Slots",
    heroText: "This section organizes the architecture story visually so the failover workflow is easier to understand for reviewers, employers, and technical stakeholders.",
    primaryHref: "segmentation.html",
    primaryLabel: "Next Section",
    secondaryHref: "deploy.html",
    secondaryLabel: "Previous Section",
    reviewText: "The visual story focuses on one LAN, one primary DHCP source, one backup path, and one clean failback path.",
    topContent: "",
    mainContent: `
      ${section(
        "Logical Topology Summary",
        "Architecture View",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Primary Path</h3>
            <p>Office clients on the internal LAN request addresses from the Windows Server 2022 DHCP service running inside Proxmox. DNS is also provided by the same Windows server so domain-aware name resolution and normal office workflows remain centralized.</p>
          </article>
          <article class="dhcp-card">
            <h3>Fallback Path</h3>
            <p>If the Cisco device can no longer reach ${dcIp}, the backup DHCP pool activates and provides emergency addresses, gateway settings, and public DNS so the LAN stays usable while the server issue is resolved.</p>
          </article>
        </div>
        <div class="dhcp-placeholder dhcp-placeholder-lg">Diagram slot: Summit Care DHCP failover logical topology</div>`
      )}

      ${section(
        "Failover Flow",
        "Step By Step",
        `<div class="dhcp-timeline">
          <div class="dhcp-timeline-item"><strong>1.</strong><span>Client broadcasts a DHCP request on the internal office LAN.</span></div>
          <div class="dhcp-timeline-item"><strong>2.</strong><span>Windows DHCP answers during normal operation and the client receives a lease from the primary scope.</span></div>
          <div class="dhcp-timeline-item"><strong>3.</strong><span>The Cisco edge platform continuously checks whether ${dcIp} is reachable.</span></div>
          <div class="dhcp-timeline-item"><strong>4.</strong><span>If health checks fail for the configured interval, the Cisco backup scope turns on.</span></div>
          <div class="dhcp-timeline-item"><strong>5.</strong><span>Clients that renew or rejoin receive emergency leases from the Cisco pool.</span></div>
          <div class="dhcp-timeline-item"><strong>6.</strong><span>Once the server responds again, Cisco disables the fallback pool and Windows retakes the primary role.</span></div>
        </div>`
      )}

      ${section(
        "Evidence Capture Plan",
        "What To Show In A Final Submission",
        `<div class="dhcp-grid dhcp-grid-3">
          <div class="dhcp-placeholder">Screenshot slot: Proxmox VM summary for SC-DC01</div>
          <div class="dhcp-placeholder">Screenshot slot: DHCP lease list before failover test</div>
          <div class="dhcp-placeholder">Screenshot slot: DHCP lease list after failover test</div>
          <div class="dhcp-placeholder">Screenshot slot: Ping test to domain controller static IP</div>
          <div class="dhcp-placeholder">Screenshot slot: Cisco track or policy state during outage</div>
          <div class="dhcp-placeholder">Screenshot slot: Recovery validation after failback</div>
        </div>`
      )}
    `
  }),
  "segmentation.html": pageTemplate({
    title: "Scopes, VLANs, DNS & Address Design | DHCP Failover Project Workflow",
    heroTag: "Section 5",
    heroTitle: "Scopes, VLANs, DNS & Address Design",
    heroText: "This section explains the LAN design assumptions, scope ranges, DNS dependencies, and address-planning decisions behind the failover workflow.",
    primaryHref: "cloud.html",
    primaryLabel: "Next Section",
    secondaryHref: "diagrams.html",
    secondaryLabel: "Previous Section",
    reviewText: "Failover works best when scope separation, DNS behavior, and gateway continuity are all documented up front.",
    topContent: "",
    mainContent: `
      ${section(
        "Internal Addressing Plan",
        "Scope Design",
        `<div class="dhcp-table-wrap">
          <table class="dhcp-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Example Range</th>
                <th>Design Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Infrastructure / static reservations</td>
                <td>10.40.10.1 - 10.40.10.99</td>
                <td>Gateway, server, printers, switches, firewall, and fixed devices stay out of the lease pool.</td>
              </tr>
              <tr>
                <td>Windows primary DHCP pool</td>
                <td>10.40.10.100 - 10.40.10.199</td>
                <td>Main lease range managed from DHCP Manager.</td>
              </tr>
              <tr>
                <td>Cisco emergency pool</td>
                <td>10.40.10.210 - 10.40.10.230</td>
                <td>Reserved only for outage continuity to reduce overlap and improve visibility.</td>
              </tr>
            </tbody>
          </table>
        </div>`
      )}

      ${section(
        "How DHCP And DNS Work Together",
        "Service Interaction",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Normal Operation</h3>
            <p>Windows DHCP and Windows DNS work together. Clients receive an address, the domain suffix, and the internal DNS server ${dcIp}. This supports internal resource lookup, domain services, and a cleaner administrative experience.</p>
          </article>
          <article class="dhcp-card">
            <h3>Outage Mode</h3>
            <p>When Cisco takes over DHCP, it can still give out an address and the default gateway, but it may use public DNS instead of internal DNS. That means general internet browsing may continue while internal name resolution and domain-integrated registration are reduced or unavailable until the Windows server is restored.</p>
          </article>
        </div>
        <div class="dhcp-callout">
          <strong>Key tradeoff:</strong> DHCP continuity and internet access are preserved, but the full Windows-integrated client experience is intentionally not identical during failover mode.
        </div>`
      )}

      ${section(
        "Why The Scope Is Not Fully Load Balanced",
        "Design Choice",
        `<p>True active-active load balancing across two dissimilar DHCP platforms is not the goal here. The objective is controlled continuity. Microsoft DHCP failover between Windows peers can replicate state and support balanced servicing, but a Cisco emergency pool is better treated as a conditional standby service. That keeps the design predictable and avoids trying to make two unlike platforms behave like one replicated DHCP cluster.</p>`
      )}
    `
  }),
  "cloud.html": pageTemplate({
    title: "Proxmox, UPS & Infrastructure Resilience | DHCP Failover Project Workflow",
    heroTag: "Section 6",
    heroTitle: "Proxmox, UPS & Infrastructure Resilience",
    heroText: "This section focuses on the platform stability that keeps the primary DHCP service healthy before failover is ever needed.",
    primaryHref: "programming.html",
    primaryLabel: "Next Section",
    secondaryHref: "segmentation.html",
    secondaryLabel: "Previous Section",
    reviewText: "The best failover is the one that rarely has to activate, which is why host resilience, power protection, and monitoring matter so much here.",
    topContent: "",
    mainContent: `
      ${section(
        "Host Resilience Strategy",
        "Platform Stability",
        `<div class="dhcp-grid dhcp-grid-3">
          <article class="dhcp-card">
            <h3>Proxmox Virtualization</h3>
            <p>The Proxmox host makes the Windows DHCP service easier to back up, snapshot, and restore. It also keeps the infrastructure role portable compared with a one-off unmanaged server install.</p>
          </article>
          <article class="dhcp-card">
            <h3>UPS Protection</h3>
            <p>The UPS is a first-line continuity control. Brief utility drops should not immediately push the clinic into DHCP failover if the host and network edge can ride through the event cleanly.</p>
          </article>
          <article class="dhcp-card">
            <h3>Monitoring</h3>
            <p>Host health, VM uptime, DHCP service state, storage condition, and network reachability should all be monitored so the team catches degradation before it becomes a full outage.</p>
          </article>
        </div>`
      )}

      ${section(
        "Improvement Opportunities",
        "If This Were Extended Further",
        `<ul class="dhcp-list">
          <li>Deploy a secondary Windows DHCP server and use native Microsoft DHCP failover for richer state synchronization.</li>
          <li>Separate domain controller and DHCP roles across multiple VMs or hosts for cleaner fault isolation.</li>
          <li>Add hypervisor replication or off-host backup restore readiness for faster VM recovery.</li>
          <li>Use more granular monitoring and alerting around DHCP service response time, scope exhaustion, and IP conflict events.</li>
        </ul>`
      )}

      ${section(
        "Resilience Coverage Chart",
        "Service Layers",
        `<div class="dhcp-chart">
          <div class="dhcp-chart-row">
            <span>Power continuity</span>
            <div class="dhcp-chart-bar"><i style="width: 90%;"></i></div>
            <strong>90%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Hypervisor recovery flexibility</span>
            <div class="dhcp-chart-bar"><i style="width: 84%;"></i></div>
            <strong>84%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Primary DHCP management depth</span>
            <div class="dhcp-chart-bar"><i style="width: 94%;"></i></div>
            <strong>94%</strong>
          </div>
          <div class="dhcp-chart-row">
            <span>Emergency continuity coverage</span>
            <div class="dhcp-chart-bar"><i style="width: 80%;"></i></div>
            <strong>80%</strong>
          </div>
        </div>`
      )}
    `
  }),
  "programming.html": pageTemplate({
    title: "Automation, Health Checks & Trigger Logic | DHCP Failover Project Workflow",
    heroTag: "Section 7",
    heroTitle: "Automation, Health Checks & Trigger Logic",
    heroText: "This section explains the logic that checks whether the domain controller is alive and controls when the Cisco backup DHCP service should activate.",
    primaryHref: "cybersecurity.html",
    primaryLabel: "Next Section",
    secondaryHref: "cloud.html",
    secondaryLabel: "Previous Section",
    reviewText: "The automation concept is simple: test the static server IP first, activate fallback only when the primary path truly fails, and shut it back down when the server is healthy again.",
    topContent: "",
    mainContent: `
      ${section(
        "What The Cisco Logic Is Called",
        "IOS XE Style Approach",
        `<p>On Cisco IOS XE, the common building blocks for this type of workflow are <strong>IP SLA</strong>, <strong>object tracking</strong>, and <strong>Embedded Event Manager (EEM)</strong>. IP SLA can continuously test reachability to the domain controller's static IP, object tracking evaluates whether that health target is up or down, and EEM can react to the state change by enabling or disabling the emergency DHCP configuration.</p>
        <p>That matters because this design is not presented as native DHCP state replication between Cisco and Windows. It is a policy-driven continuity workflow. The Cisco device watches the primary service, reacts when it disappears, and backs away when the service returns.</p>`
      )}

      ${section(
        "Health Check Logic",
        "Trigger Conditions",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Outage Detection</h3>
            <p>The Cisco device repeatedly pings ${dcIp}. If the threshold is missed for the configured number of checks, the object state changes to down. That event becomes the signal to activate the backup DHCP path.</p>
          </article>
          <article class="dhcp-card">
            <h3>Recovery Detection</h3>
            <p>When the Windows server responds again and remains stable through the recovery interval, the object state changes back to up. The automation then disables the backup pool so the clinic returns to normal Windows-based lease delivery.</p>
          </article>
        </div>
        <pre class="dhcp-code"><code>if ping(${dcIp}) succeeds:
  keep Cisco backup DHCP disabled
else if ping(${dcIp}) fails for threshold interval:
  enable Cisco backup DHCP pool

if ping(${dcIp}) later succeeds for recovery interval:
  disable Cisco backup DHCP pool
  return addressing authority to Windows Server DHCP</code></pre>`
      )}

      ${section(
        "Platform Caveat",
        "ASA Versus IOS XE",
        `<p>It is important to describe the backup path honestly. Cisco ASA can provide DHCP, but the richer automation language often associated with this style of health-based activation is more naturally discussed in IOS XE terms through IP SLA and EEM. In a portfolio-safe report like this one, the practical takeaway is that the Cisco edge layer was prepared to respond to the Windows server's availability state and provide a backup lease pool when needed. The exact command syntax depends on the specific Cisco platform in use.</p>`
      )}
    `
  }),
  "cybersecurity.html": pageTemplate({
    title: "Risk Analysis, Security Controls & Limitations | DHCP Failover Project Workflow",
    heroTag: "Section 8",
    heroTitle: "Risk Analysis, Security Controls & Limitations",
    heroText: "This section reviews what risks the design reduces, what limitations remain, and what security tradeoffs exist when Cisco serves as the emergency DHCP source.",
    primaryHref: "voip.html",
    primaryLabel: "Next Section",
    secondaryHref: "programming.html",
    secondaryLabel: "Previous Section",
    reviewText: "A backup DHCP path improves continuity, but it does not automatically replicate every security or management feature the Windows service normally provides.",
    topContent: "",
    mainContent: `
      ${section(
        "Risk Analysis",
        "Threat Review",
        `<div class="dhcp-table-wrap">
          <table class="dhcp-table">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Impact</th>
                <th>How The Design Responds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Windows DHCP service outage</td>
                <td>New or renewing clients may lose address assignment</td>
                <td>Cisco backup scope keeps the LAN issuing addresses.</td>
              </tr>
              <tr>
                <td>Power instability</td>
                <td>Host shutdown can trigger wider service interruption</td>
                <td>UPS reduces avoidable failover events.</td>
              </tr>
              <tr>
                <td>False failover trigger</td>
                <td>Two DHCP sources could appear if the threshold is too aggressive</td>
                <td>Health-check timing and separate ranges reduce the blast radius.</td>
              </tr>
              <tr>
                <td>Internal DNS unavailability</td>
                <td>Users may keep internet access but lose internal name resolution</td>
                <td>Document the limitation and restore the Windows server quickly.</td>
              </tr>
            </tbody>
          </table>
        </div>`
      )}

      ${section(
        "Drawbacks Of Cisco DHCP Compared With Windows",
        "Known Limitations",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Administrative Depth Is Lower</h3>
            <ul class="dhcp-list">
              <li>Less comfortable day-to-day visibility than DHCP Manager.</li>
              <li>Fewer domain-integrated workflows and administrative conveniences.</li>
              <li>Emergency service is harder to treat as the long-term source of truth.</li>
            </ul>
          </article>
          <article class="dhcp-card">
            <h3>Feature Behavior Can Be Reduced</h3>
            <ul class="dhcp-list">
              <li>Dynamic DNS registration may not mirror the Windows experience.</li>
              <li>Reservations and policy controls are usually simpler or more limited.</li>
              <li>Internal services that expect the Windows DNS path may still be degraded during failover.</li>
            </ul>
          </article>
        </div>`
      )}

      ${section(
        "Security Controls To Keep",
        "Hardening Guidance",
        `<ul class="dhcp-list">
          <li>Restrict who can edit DHCP settings on both the Windows and Cisco sides.</li>
          <li>Log changes to the backup service so failover events are auditable.</li>
          <li>Use a narrow emergency pool rather than mirroring the entire primary range.</li>
          <li>Review DHCP snooping, switch protections, and rogue DHCP prevention where available.</li>
          <li>Treat the Cisco backup path as emergency-only infrastructure and test it under controlled conditions.</li>
        </ul>`
      )}
    `
  }),
  "voip.html": pageTemplate({
    title: "Failover Operations, Testing & Recovery Runbook | DHCP Failover Project Workflow",
    heroTag: "Section 9",
    heroTitle: "Failover Operations, Testing & Recovery Runbook",
    heroText: "This section acts like the operational playbook for outage response, validation, and failback to the primary Windows DHCP service.",
    primaryHref: "hippa.html",
    primaryLabel: "Next Section",
    secondaryHref: "cybersecurity.html",
    secondaryLabel: "Previous Section",
    reviewText: "A failover design only matters if it can be tested, trusted, and reversed cleanly under pressure.",
    topContent: "",
    mainContent: `
      ${section(
        "Failover Runbook",
        "Outage Timeline",
        `<ol class="dhcp-steps">
          <li>Receive monitoring alert or user report that the domain controller or DHCP service is down.</li>
          <li>Confirm that ${dcIp} is unreachable from the Cisco edge health-check path.</li>
          <li>Verify that the Cisco backup DHCP pool is active and issuing leases from the emergency range.</li>
          <li>Test a wired endpoint to confirm address assignment, gateway reachability, and external internet access.</li>
          <li>Investigate the root cause on the Proxmox host, Windows VM, DHCP service, or power layer.</li>
          <li>Restore the Windows server, confirm stable ping response, then validate that Cisco backup DHCP turns back off.</li>
          <li>Review leases and logs so the environment returns to the normal administrative baseline.</li>
        </ol>`
      )}

      ${section(
        "Testing Checklist",
        "Validation Routine",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>Planned Test Items</h3>
            <ul class="dhcp-list">
              <li>Simulate Windows DHCP service stop.</li>
              <li>Simulate full VM outage.</li>
              <li>Test lease issuance from Cisco backup pool.</li>
              <li>Confirm outside internet access on wired clients.</li>
            </ul>
          </article>
          <article class="dhcp-card">
            <h3>Recovery Test Items</h3>
            <ul class="dhcp-list">
              <li>Restore server response and stable ping.</li>
              <li>Verify Cisco failback trigger.</li>
              <li>Confirm Windows DHCP resumes normal lease handling.</li>
              <li>Document any stale lease or DNS cleanup tasks.</li>
            </ul>
          </article>
        </div>`
      )}

      ${section(
        "Failure Coverage Summary",
        "What This Protects Well",
        `<p>This workflow is especially strong against single-service or single-VM failure where the network edge remains healthy. It is less complete for multi-layer failure affecting switching, power, or the Cisco platform itself. That is why the report treats DHCP failover as one resilience layer inside a broader continuity strategy, not as the entire disaster recovery answer.</p>`
      )}
    `
  }),
  "hippa.html": pageTemplate({
    title: "Governance, Compliance & Conclusion | DHCP Failover Project Workflow",
    heroTag: "Section 10",
    heroTitle: "Governance, Compliance & Conclusion",
    heroText: "This section closes the report with documentation standards, healthcare-aware considerations, lessons learned, and a concise conclusion.",
    primaryHref: "index.html",
    primaryLabel: "Return Home",
    secondaryHref: "voip.html",
    secondaryLabel: "Previous Section",
    reviewText: "The final takeaway is that resilient DHCP is not only a convenience feature. It supports onboarding, continuity, and stronger infrastructure maturity in a healthcare office environment.",
    topContent: "",
    mainContent: `
      ${section(
        "Documentation Standards",
        "Governance",
        `<ul class="dhcp-list">
          <li>Record the static IP of the domain controller, the primary scope range, and the emergency Cisco range.</li>
          <li>Document the trigger thresholds, expected failover timing, and failback timing.</li>
          <li>Maintain screenshots or exported configs for Windows DHCP, Proxmox, UPS settings, and Cisco policy logic.</li>
          <li>Keep a recovery checklist so another engineer can operate the design without relying on undocumented memory.</li>
        </ul>`
      )}

      ${section(
        "Healthcare And Compliance Awareness",
        "Operational Context",
        `<p>Although DHCP itself does not directly store patient records, its availability still supports systems that handle protected data. In a clinic, if endpoints cannot join the network, users can lose access to scheduling systems, secure portals, and other services tied to daily care operations. That makes DHCP resilience part of a larger reliability and compliance-aware posture even when the actual protected data lives elsewhere.</p>`
      )}

      ${section(
        "Lessons Learned And Future Improvements",
        "Engineering Reflection",
        `<div class="dhcp-grid dhcp-grid-2">
          <article class="dhcp-card">
            <h3>What Worked Well</h3>
            <ul class="dhcp-list">
              <li>Windows remains the clear primary administrative platform.</li>
              <li>The Cisco pool narrows outage impact for wired office devices.</li>
              <li>Separate ranges make failover state easier to recognize and troubleshoot.</li>
            </ul>
          </article>
          <article class="dhcp-card">
            <h3>What Could Improve Further</h3>
            <ul class="dhcp-list">
              <li>Add native Windows-to-Windows DHCP failover for richer state replication.</li>
              <li>Expand monitoring and reporting around failover events.</li>
              <li>Increase automation maturity around post-recovery lease cleanup and DNS review.</li>
            </ul>
          </article>
        </div>`
      )}

      ${section(
        "Conclusion",
        "Final Summary",
        `<p>This project reframes the Summit Care environment around one practical reliability problem and solves it with a layered, supportable design. A Dell PowerEdge R740xd running Proxmox hosts the Windows Server 2022 VM that normally handles DHCP and DNS for the clinic. A Cisco edge platform stands by with an emergency scope that activates only when the Windows service is judged unavailable. UPS protection reduces unnecessary outages, documentation keeps the workflow supportable, and the overall report demonstrates strong systems engineering and network engineering thought process through a concrete, employer-facing infrastructure narrative.</p>`
      )}
    `
  })
};

const appPages = `export const pagePathByFile = {
  'index.html': '/',
  'objectives.html': '/objectives',
  'assets.html': '/assets',
  'deploy.html': '/deploy',
  'diagrams.html': '/diagrams',
  'segmentation.html': '/segmentation',
  'voip.html': '/voip',
  'cloud.html': '/cloud',
  'programming.html': '/programming',
  'cybersecurity.html': '/cybersecurity',
  'hippa.html': '/hippa',
  'strategies.html': '/objectives',
};

export const pages = [
  {
    slug: 'index',
    route: '/',
    fileName: 'index.html',
    title: 'DHCP Failover Project Workflow | Summit Care Medical Clinic',
  },
  {
    slug: 'objectives',
    route: '/objectives',
    fileName: 'objectives.html',
    title: 'Project Overview, Purpose & Objectives | DHCP Failover Project Workflow',
  },
  {
    slug: 'assets',
    route: '/assets',
    fileName: 'assets.html',
    title: 'Platform Inventory & Service Roles | DHCP Failover Project Workflow',
  },
  {
    slug: 'deploy',
    route: '/deploy',
    fileName: 'deploy.html',
    title: 'Windows Server DHCP & Cisco Edge Configuration | DHCP Failover Project Workflow',
  },
  {
    slug: 'diagrams',
    route: '/diagrams',
    fileName: 'diagrams.html',
    title: 'Topology, Workflow & Evidence Slots | DHCP Failover Project Workflow',
  },
  {
    slug: 'segmentation',
    route: '/segmentation',
    fileName: 'segmentation.html',
    title: 'Scopes, VLANs, DNS & Address Design | DHCP Failover Project Workflow',
  },
  {
    slug: 'voip',
    route: '/voip',
    fileName: 'voip.html',
    title: 'Failover Operations, Testing & Recovery Runbook | DHCP Failover Project Workflow',
  },
  {
    slug: 'cloud',
    route: '/cloud',
    fileName: 'cloud.html',
    title: 'Proxmox, UPS & Infrastructure Resilience | DHCP Failover Project Workflow',
  },
  {
    slug: 'programming',
    route: '/programming',
    fileName: 'programming.html',
    title: 'Automation, Health Checks & Trigger Logic | DHCP Failover Project Workflow',
  },
  {
    slug: 'cybersecurity',
    route: '/cybersecurity',
    fileName: 'cybersecurity.html',
    title: 'Risk Analysis, Security Controls & Limitations | DHCP Failover Project Workflow',
  },
  {
    slug: 'hippa',
    route: '/hippa',
    fileName: 'hippa.html',
    title: 'Governance, Compliance & Conclusion | DHCP Failover Project Workflow',
  },
];
`;

const iframePage = `import { useEffect } from 'react';

const DESCRIPTION =
  'A detailed infrastructure engineering report centered on DHCP failover, Windows Server 2022, Cisco edge continuity, Proxmox virtualization, and resilience planning for Summit Care Medical Clinic.';

function updateMeta(page) {
  document.title = page.title || 'DHCP Failover Project Workflow';

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', DESCRIPTION);

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    document.head.appendChild(favicon);
  }
  favicon.setAttribute('href', '/site/images/daters.png');
}

export function IframePage({ page }) {
  useEffect(() => {
    updateMeta(page);
  }, [page]);

  const src = \`/site/\${page.fileName}?v=dhcp-report\`;

  return (
    <iframe
      title={page.title}
      src={src}
      style={{
        width: '100%',
        minHeight: '100vh',
        border: '0',
        display: 'block',
        background: 'transparent',
      }}
    />
  );
}
`;

const reportMarkupPage = `import { useEffect, useRef } from 'react';
import { pageMarkup } from './pageMarkup';
import { initializeReportEnhancements } from './reportEnhancements';

const DESCRIPTION =
  'A detailed infrastructure engineering report centered on DHCP failover, Windows Server 2022, Cisco edge continuity, Proxmox virtualization, and resilience planning for Summit Care Medical Clinic.';

function normalizeMarkup(markup) {
  if (!markup) return '';

  return markup
    .replace(/<nav class="dropdown-menu">[\\s\\S]*?<\\/nav>/gi, '<nav class="dropdown-menu"><ul></ul></nav>')
    .replace(/(src|href)=["']images\\//g, '$1="/site/images/')
    .replace(/url\\(['"]?images\\//g, 'url("/site/images/')
    .replace(/target="_blank"\\s+rel="noopener noreferrer"/gi, '')
    .replace(/window\\.location\\.href='index\\.html'/gi, "window.location.href='/'")
    .replace(/window\\.location\\.href='([a-z0-9-]+)\\.html'/gi, "window.location.href='/$1'")
    .replace(/href="index\\.html"/gi, 'href="/"')
    .replace(/href="([a-z0-9-]+)\\.html"/gi, 'href="/$1"');
}

function updateMeta(page) {
  document.title = page.title || 'DHCP Failover Project Workflow';

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', DESCRIPTION);

  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescription);
  }
  ogDescription.setAttribute('content', DESCRIPTION);

  let twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDescription) {
    twitterDescription = document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    document.head.appendChild(twitterDescription);
  }
  twitterDescription.setAttribute('content', DESCRIPTION);

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    document.head.appendChild(favicon);
  }
  favicon.setAttribute('href', '/site/images/daters.png');
}

export function ReportMarkupPage({ page }) {
  const containerRef = useRef(null);
  const markup = normalizeMarkup(pageMarkup[page.fileName] || '');

  useEffect(() => {
    updateMeta(page);
  }, [page]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const cleanup = initializeReportEnhancements(container);
    return cleanup;
  }, [page.fileName]);

  return (
    <div
      ref={containerRef}
      className="react-report-page"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
`;

const siteScript = `const NAV_ITEMS = ${JSON.stringify(navItems, null, 2)};

document.addEventListener("DOMContentLoaded", () => {
  setupNavigationMenu();
  setupPageFlow();
  setupReportFooterNavigation();
  setupCompactReportFooter();
  setupReel();
  setupContactForm();
  setupAnalytics();
  setupHashCleanup();
  setupCardAnimations();
  setupQuickLinks();
  setupReturnToTop();
});

function getCurrentFileName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function setupNavigationMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown-menu");
  const dropdownList = dropdown?.querySelector("ul");

  if (!hamburger || !dropdown || !dropdownList) {
    return;
  }

  const currentFile = getCurrentFileName();
  const currentHeading = document.querySelector(".intro-section h1")?.textContent?.trim() || "Home";

  dropdownList.innerHTML = "";

  const statusItem = document.createElement("li");
  statusItem.className = "menu-status";
  statusItem.innerHTML = \`
    <span class="menu-status-label">Current Page</span>
    <span class="menu-status-page">\${currentHeading}</span>
  \`;
  dropdownList.appendChild(statusItem);

  const homeItem = document.createElement("li");
  homeItem.className = "menu-home-entry";
  homeItem.textContent = "Home";
  homeItem.setAttribute("data-href", "index.html");
  dropdownList.appendChild(homeItem);

  NAV_ITEMS.forEach((navItem) => {
    const item = document.createElement("li");
    item.setAttribute("data-href", navItem.href);
    item.textContent = navItem.label;
    if (navItem.href === currentFile) {
      item.classList.add("current-page-link");
    }
    dropdownList.appendChild(item);
  });

  const closeMenu = () => {
    hamburger.classList.remove("active");
    dropdown.classList.remove("active");
  };

  hamburger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    hamburger.classList.toggle("active");
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  dropdown.querySelectorAll("li[data-href]").forEach((item) => {
    item.addEventListener("click", () => {
      const href = item.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    });
  });
}

function setupPageFlow() {
  const currentFile = getCurrentFileName();
  const currentIndex = NAV_ITEMS.findIndex((item) => item.href === currentFile);
  const stickyHeader = document.querySelector(".sticky-header");

  if (currentIndex === -1 || !stickyHeader || document.querySelector(".page-flow-nav")) {
    return;
  }

  const previousItem = currentIndex === 0
    ? { href: "index.html", label: "Return to Home" }
    : NAV_ITEMS[currentIndex - 1];

  const nextItem = currentIndex === NAV_ITEMS.length - 1
    ? { href: "index.html", label: "Return to Home" }
    : NAV_ITEMS[currentIndex + 1];

  const pageFlow = document.createElement("div");
  pageFlow.className = "page-flow-nav";
  pageFlow.innerHTML = \`
    <a class="page-flow-link page-flow-left" href="\${previousItem.href}">
      <span class="page-flow-arrow" aria-hidden="true">←</span>
      <span class="page-flow-text">\${currentIndex === 0 ? "Return to Home" : \`Previous: \${previousItem.label}\`}</span>
    </a>
    <a class="page-flow-link page-flow-right" href="\${nextItem.href}">
      <span class="page-flow-text">\${currentIndex === NAV_ITEMS.length - 1 ? "Return to Home" : \`Next: \${nextItem.label}\`}</span>
      <span class="page-flow-arrow" aria-hidden="true">→</span>
    </a>
  \`;

  stickyHeader.insertAdjacentElement("afterend", pageFlow);
}

function setupReportFooterNavigation() {
  const currentFile = getCurrentFileName();
  const currentIndex = NAV_ITEMS.findIndex((item) => item.href === currentFile);

  if (currentIndex === -1) {
    return;
  }

  let footerContainer = document.querySelector(".footer-buttons-container, .bottomBtn85-group, .bottomBtn86-group, .cl99-buttonGroup");
  const pageFooter = document.querySelector(".subtle-footer");

  if (!footerContainer && pageFooter) {
    footerContainer = document.createElement("div");
    footerContainer.className = "footer-buttons-container";
    pageFooter.insertAdjacentElement("beforebegin", footerContainer);
  }

  if (!footerContainer || footerContainer.dataset.enhanced === "true") {
    return;
  }

  const previousItem = currentIndex === 0
    ? { href: "index.html", label: "Return to Home" }
    : NAV_ITEMS[currentIndex - 1];

  const nextItem = currentIndex === NAV_ITEMS.length - 1
    ? { href: "index.html", label: "Return to Home" }
    : NAV_ITEMS[currentIndex + 1];

  const buttons = [];

  if (currentIndex !== 0) {
    buttons.push(\`
      <button class="footer-secondary-button report-footer-button" onclick="window.location.href='\${previousItem.href}';">
        <span class="report-footer-arrow" aria-hidden="true">←</span>
        <span class="report-footer-label">\${previousItem.label}</span>
      </button>
    \`);
  }

  buttons.push(\`
    <button class="footer-home-button report-footer-button" onclick="window.location.href='index.html';">
      <span class="report-footer-arrow" aria-hidden="true">↑</span>
      <span class="report-footer-label">Return to Home</span>
    </button>
  \`);

  if (currentIndex !== NAV_ITEMS.length - 1) {
    buttons.push(\`
      <button class="footer-primary-button report-footer-button" onclick="window.location.href='\${nextItem.href}';">
        <span class="report-footer-label">\${nextItem.label}</span>
        <span class="report-footer-arrow" aria-hidden="true">→</span>
      </button>
    \`);
  }

  footerContainer.classList.add("footer-buttons-container", "report-footer-nav");
  footerContainer.innerHTML = buttons.join("");
  footerContainer.dataset.enhanced = "true";
}

function setupCompactReportFooter() {
  const currentFile = getCurrentFileName();
  const currentIndex = NAV_ITEMS.findIndex((item) => item.href === currentFile);
  const pageFooter = document.querySelector(".subtle-footer");
  const reportFooterNav = document.querySelector(".report-footer-nav");

  if (currentIndex === -1 || !pageFooter || document.querySelector(".compact-report-footer")) {
    return;
  }

  const footerShell = document.createElement("section");
  footerShell.className = "report-page-end";

  const compactFooter = document.createElement("section");
  compactFooter.className = "compact-report-footer";
  compactFooter.innerHTML = \`
    <div class="compact-report-footer-grid">
      <div class="compact-report-footer-block">
        <h3>Quick Navigation</h3>
        <div class="compact-report-links">
          \${NAV_ITEMS.map((item) => \`<a href="\${item.href}" class="\${item.href === currentFile ? "compact-report-current-link" : ""}">\${item.label}</a>\`).join("")}
          <a href="index.html" class="compact-report-home-link">Return to Home</a>
        </div>
      </div>
      <div class="compact-report-footer-block compact-report-contact">
        <h3>Contact</h3>
        <p>Reach out for collaboration, project questions, or networking opportunities.</p>
        <div class="compact-report-contact-links">
          <a href="mailto:Sidinfo21@gmail.com">Sidinfo21@gmail.com</a>
          <a href="tel:+15163686457">(516) 368-6457</a>
        </div>
      </div>
    </div>
  \`;

  if (reportFooterNav) {
    footerShell.appendChild(reportFooterNav);
  }
  footerShell.appendChild(compactFooter);
  pageFooter.insertAdjacentElement("beforebegin", footerShell);
  footerShell.appendChild(pageFooter);
}

function setupReel() {
  const reelContainer = document.querySelector(".reel-container");
  if (!reelContainer || reelContainer.dataset.enhanced) {
    return;
  }

  const repeatedItems = [...NAV_ITEMS, ...NAV_ITEMS];
  reelContainer.innerHTML = repeatedItems
    .map((item) => \`<a class="reel-link" href="\${item.href}"><i class="fas fa-award"></i>\${item.label}</a>\`)
    .join("");

  reelContainer.dataset.enhanced = "true";
}

function setupContactForm() {
  const form = document.querySelector("form");
  const modal = document.getElementById("thankYouModal");
  const modalContent = document.querySelector(".modal-content");
  const closeButton = document.querySelector(".close-button");
  const submitButton = form?.querySelector('input[type="submit"]');

  if (!form || !modal || !modalContent || !closeButton || !submitButton) {
    return;
  }

  function showModal(message) {
    const text = modalContent.querySelector("p");
    if (text) {
      text.textContent = message;
    }
    modal.style.display = "flex";
  }

  function hideModal() {
    modal.style.display = "none";
  }

  function validateForm() {
    const requiredIds = ["name", "email", "subject", "message"];
    return requiredIds.every((id) => {
      const field = document.getElementById(id);
      return field && field.value.trim();
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showModal("Please fill out all fields before sending your message.");
      return;
    }

    submitButton.disabled = true;
    submitButton.value = "Sending...";

    try {
      const payload = {
        name: document.getElementById("name")?.value || "",
        email: document.getElementById("email")?.value || "",
        subject: document.getElementById("subject")?.value || "",
        message: document.getElementById("message")?.value || "",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      showModal("Thank you! Your message has been sent.");
      form.reset();
    } catch (error) {
      showModal(error.message || "Unable to send your message right now.");
    } finally {
      submitButton.disabled = false;
      submitButton.value = "Send Message";
    }
  });

  closeButton.addEventListener("click", hideModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });
}

function setupAnalytics() {
  fetch("/api/analytics/pageview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: window.location.pathname || "/",
      title: document.title || "",
      referrer: document.referrer || "",
    }),
  }).catch(() => {
  });
}

function setupHashCleanup() {
  if (window.location.hash === "#contact") {
    window.history.replaceState(null, null, " ");
    window.scrollTo(0, 0);
  }
}

function setupCardAnimations() {
  const cards = document.querySelectorAll(".animate-card");
  if (cards.length === 0) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, { threshold: 0.25 });

  cards.forEach((card) => observer.observe(card));
}

function setupQuickLinks() {
  document.querySelectorAll(".quick-links-list a").forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetSelector = this.getAttribute("href");
      const targetSection = targetSelector ? document.querySelector(targetSelector) : null;
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupReturnToTop() {
  document.querySelectorAll("#return-to-top").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
`;

const themeCss = `
body.dhcp-report-theme {
  --dhcp-accent: #0f766e;
  --dhcp-accent-dark: #134e4a;
  --dhcp-highlight: #f59e0b;
  --dhcp-soft: rgba(15, 118, 110, 0.08);
}

body.dhcp-report-theme .background-wrapper::before {
  background:
    linear-gradient(rgba(9, 19, 30, 0.42), rgba(9, 19, 30, 0.35)),
    url('images/bgimage2.png') no-repeat center center;
  background-size: cover;
  filter: saturate(0.9) blur(8px);
}

body.dhcp-report-theme .notification-bar {
  background: linear-gradient(90deg, #052e2b 0%, #134e4a 100%);
}

body.dhcp-report-theme .sticky-header {
  background: rgba(247, 252, 251, 0.82);
  border-bottom: 1px solid rgba(15, 118, 110, 0.12);
}

body.dhcp-report-theme .hamburger-menu {
  background: linear-gradient(180deg, #0f766e, #134e4a);
}

body.dhcp-report-theme .logo-text-link:hover,
body.dhcp-report-theme .page-flow-link:hover,
body.dhcp-report-theme .home-link:hover {
  color: var(--dhcp-accent);
}

body.dhcp-report-theme .page-flow-arrow {
  background: rgba(15, 118, 110, 0.1);
  color: var(--dhcp-accent);
  box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.18);
}

body.dhcp-report-theme .button-like,
body.dhcp-report-theme .title-chip {
  background: rgba(15, 118, 110, 0.12);
  color: var(--dhcp-accent-dark);
}

body.dhcp-report-theme .primary-button,
body.dhcp-report-theme .footer-primary-button,
body.dhcp-report-theme .footer-home-button {
  background: linear-gradient(135deg, #0f766e, #115e59);
}

body.dhcp-report-theme .secondary-button,
body.dhcp-report-theme .footer-secondary-button {
  border-color: rgba(15, 118, 110, 0.24);
}

.dhcp-page-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

.dhcp-section {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 26px;
  box-shadow: 0 24px 60px rgba(12, 34, 40, 0.08);
  padding: 30px;
  margin-bottom: 24px;
}

.dhcp-kicker {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  color: var(--dhcp-accent-dark);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dhcp-section h2 {
  margin: 16px 0 12px;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.12;
}

.dhcp-section h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.dhcp-section p,
.dhcp-section li,
.dhcp-section td,
.dhcp-section th {
  font-size: 16px;
  line-height: 1.7;
  color: #16333a;
}

.dhcp-grid {
  display: grid;
  gap: 18px;
}

.dhcp-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dhcp-grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dhcp-card {
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(247, 252, 251, 0.95) 0%, #ffffff 100%);
  border: 1px solid rgba(15, 118, 110, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.dhcp-list {
  margin: 0;
  padding-left: 20px;
}

.dhcp-list li + li {
  margin-top: 10px;
}

.dhcp-callout {
  margin-top: 18px;
  padding: 18px 20px;
  border-left: 4px solid var(--dhcp-highlight);
  background: rgba(245, 158, 11, 0.08);
  border-radius: 18px;
}

.dhcp-table-wrap {
  overflow-x: auto;
}

.dhcp-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.dhcp-table th,
.dhcp-table td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(15, 118, 110, 0.12);
  text-align: left;
  vertical-align: top;
}

.dhcp-table thead th {
  background: rgba(15, 118, 110, 0.08);
  color: var(--dhcp-accent-dark);
  font-weight: 700;
}

.dhcp-chart {
  display: grid;
  gap: 14px;
}

.dhcp-chart-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 12px;
  align-items: center;
}

.dhcp-chart-row span,
.dhcp-chart-row strong {
  font-size: 14px;
}

.dhcp-chart-bar {
  height: 13px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  overflow: hidden;
}

.dhcp-chart-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0f766e, #f59e0b);
}

.dhcp-steps {
  margin: 0;
  padding-left: 22px;
}

.dhcp-steps li + li {
  margin-top: 12px;
}

.dhcp-timeline {
  display: grid;
  gap: 14px;
}

.dhcp-timeline-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  align-items: start;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(15, 118, 110, 0.06);
}

.dhcp-timeline-item strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f766e, #115e59);
  color: #fff;
}

.dhcp-placeholder {
  min-height: 180px;
  border-radius: 24px;
  border: 2px dashed rgba(15, 118, 110, 0.24);
  background:
    linear-gradient(135deg, rgba(15, 118, 110, 0.06), rgba(245, 158, 11, 0.06)),
    #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  color: var(--dhcp-accent-dark);
  font-weight: 600;
}

.dhcp-placeholder-lg {
  min-height: 260px;
  margin-top: 18px;
}

.dhcp-code {
  margin: 18px 0 0;
  padding: 18px 20px;
  border-radius: 18px;
  background: #0f172a;
  color: #d9f8f0;
  overflow-x: auto;
}

.dhcp-quick-links {
  max-width: 1180px;
  margin: 20px auto 0;
  padding: 0 24px;
}

.dhcp-quick-links h3 {
  margin: 0 0 12px;
  color: #f8fffd;
}

.quick-links-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quick-links-list a {
  display: inline-flex;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--dhcp-accent-dark);
  text-decoration: none;
  font-weight: 600;
}

.menu-status {
  display: grid;
  gap: 4px;
  background: rgba(15, 118, 110, 0.08) !important;
}

.menu-status-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(19, 78, 74, 0.72);
}

.menu-status-page {
  font-size: 15px;
  font-weight: 700;
  color: var(--dhcp-accent-dark);
}

.menu-home-entry {
  font-weight: 700 !important;
}

.dropdown-menu ul li.current-page-link {
  background: rgba(15, 118, 110, 0.08);
  color: var(--dhcp-accent-dark);
}

@media screen and (max-width: 900px) {
  .dhcp-grid-2,
  .dhcp-grid-3 {
    grid-template-columns: 1fr;
  }

  .dhcp-chart-row {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 640px) {
  .dhcp-page-shell,
  .dhcp-quick-links {
    padding-left: 16px;
    padding-right: 16px;
  }

  .dhcp-section {
    padding: 22px 18px;
    border-radius: 22px;
  }

  .quick-links-list {
    flex-direction: column;
  }
}
`;

const masterReportCss = `html {
  scroll-behavior: smooth;
}

:root {
  --bg: #f3f8f7;
  --sheet: #ffffff;
  --ink: #193239;
  --muted: #53666c;
  --line: #d4e7e2;
  --accent: #0f766e;
  --accent-dark: #134e4a;
  --soft: #eef8f6;
  --soft-dark: #f8fbfa;
  --highlight: #f59e0b;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(180deg, #edf6f5 0%, #f9fbfb 100%);
  color: var(--ink);
  line-height: 1.65;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.report-shell {
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 24px 72px;
}

.hero,
.toc,
.section,
.mini-card {
  background: var(--sheet);
  border: 1px solid var(--line);
  border-radius: 26px;
  box-shadow: 0 24px 70px rgba(11, 33, 38, 0.07);
}

.hero {
  padding: 56px 52px;
  margin-bottom: 28px;
  min-height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    radial-gradient(circle at top right, rgba(15, 118, 110, 0.14), transparent 30%),
    radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.08), transparent 28%),
    linear-gradient(180deg, #fbfefd 0%, #f4faf9 100%);
}

.eyebrow,
.title-chip,
.kicker {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  color: var(--accent-dark);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 18px 0 16px;
  font-size: 42px;
  line-height: 1.08;
}

.subtitle,
.lead {
  font-size: 18px;
  color: var(--muted);
}

.title-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 24px 0 18px;
}

.title-chip {
  letter-spacing: 0.04em;
}

.title-signoff,
.executive-grid,
.two-col,
.three-col,
.stat-grid {
  display: grid;
  gap: 18px;
}

.title-signoff,
.two-col {
  grid-template-columns: 1fr 1fr;
}

.three-col,
.stat-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.executive-grid {
  grid-template-columns: 1.25fr 0.95fr;
}

.title-signoff-card,
.mini-card,
.stat-card {
  padding: 20px 22px;
  border-radius: 22px;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(248, 252, 251, 0.95) 0%, #ffffff 100%);
}

.title-signoff-card h3,
.mini-card h4 {
  margin: 0 0 8px;
  color: var(--accent-dark);
}

.toc {
  padding: 28px 30px 22px;
  margin-bottom: 28px;
}

.toc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 26px;
}

.toc a {
  display: block;
  padding: 8px 0;
  border-bottom: 1px dashed #d2e4df;
  font-weight: 600;
}

.section {
  padding: 32px;
  margin-bottom: 24px;
}

.section h2 {
  margin: 14px 0 12px;
  font-size: 30px;
  line-height: 1.14;
}

.section h3 {
  margin-top: 24px;
  margin-bottom: 8px;
  color: var(--accent-dark);
}

.workflow-list {
  margin: 0;
  padding-left: 20px;
}

.workflow-list li + li {
  margin-top: 10px;
}

.callout {
  margin-top: 18px;
  padding: 18px 20px;
  border-left: 4px solid var(--highlight);
  background: rgba(245, 158, 11, 0.08);
  border-radius: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

thead th {
  background: rgba(15, 118, 110, 0.08);
  color: var(--accent-dark);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.stat-card strong {
  font-size: 32px;
  color: var(--accent-dark);
}

.bar-list {
  display: grid;
  gap: 12px;
}

.bar-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr auto;
  gap: 12px;
  align-items: center;
}

.bar-track {
  height: 13px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  overflow: hidden;
}

.bar-track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0f766e, #f59e0b);
}

.code-block {
  margin-top: 18px;
  padding: 18px 20px;
  border-radius: 18px;
  background: #0f172a;
  color: #d7fff6;
  overflow-x: auto;
  white-space: pre-wrap;
}

@media print {
  body {
    background: #ffffff;
  }

  .hero,
  .toc,
  .section {
    box-shadow: none;
    break-inside: avoid;
  }
}

@media screen and (max-width: 900px) {
  .title-signoff,
  .executive-grid,
  .two-col,
  .three-col,
  .stat-grid,
  .toc-grid,
  .bar-row {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding: 40px 28px;
  }
}
`;

const masterReportHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Summit Care Medical Clinic DHCP Failover Master Report</title>
    <link rel="stylesheet" href="master-report.css" />
  </head>
  <body>
    <main class="report-shell">
      <section class="hero title-page" id="top">
        <span class="eyebrow">Infrastructure Resilience Report</span>
        <h1>Summit Care Medical Clinic DHCP Failover Master Report</h1>
        <p class="subtitle">
          This master report documents a healthcare-oriented DHCP failover workflow designed
          around Summit Care Medical Clinic, a fictionalized environment used to demonstrate
          real infrastructure engineering thought process, service continuity planning, and
          clean documentation practice. The report centers on keeping internal office
          devices able to receive valid IP configuration even if the primary Windows DHCP
          server becomes unavailable.
        </p>
        <div class="title-meta">
          <span class="title-chip">Windows Server 2022 DHCP</span>
          <span class="title-chip">Cisco Edge Emergency Scope</span>
          <span class="title-chip">Dell PowerEdge R740xd + Proxmox</span>
        </div>
        <div class="title-signoff">
          <div class="title-signoff-card">
            <h3>Project Purpose</h3>
            <p>
              Demonstrate how a healthcare office can reduce the impact of DHCP server
              failure by combining virtualization, UPS-backed continuity, Windows DHCP,
              and Cisco edge failover logic in one supportable workflow.
            </p>
          </div>
          <div class="title-signoff-card">
            <h3>Design Principle</h3>
            <p>
              Keep Windows Server as the primary source of truth, use Cisco as
              emergency-only continuity, and fail back cleanly after the primary service
              is restored.
            </p>
          </div>
        </div>
      </section>

      <section class="toc">
        <h2>Table Of Contents</h2>
        <div class="toc-grid">
          <a href="#executive-summary">1. Executive Summary</a>
          <a href="#introduction">2. Introduction & Scenario Framing</a>
          <a href="#purpose">3. Project Purpose & Objectives</a>
          <a href="#platform">4. Platform Inventory & Service Roles</a>
          <a href="#windows">5. Windows DHCP Configuration</a>
          <a href="#cisco">6. Cisco Backup Scope & Trigger Logic</a>
          <a href="#dns">7. DNS Interaction, Scope Design & Failback</a>
          <a href="#risk">8. Risk Analysis & Security Considerations</a>
          <a href="#runbook">9. Testing, Recovery & Runbook</a>
          <a href="#improvements">10. Improvement Roadmap</a>
          <a href="#governance">11. Governance & Documentation</a>
          <a href="#conclusion">12. Conclusion</a>
        </div>
      </section>

      <section class="section" id="executive-summary">
        <div class="kicker">Executive Summary</div>
        <h2>Project Summary For Technical Reviewers</h2>
        <p class="lead">
          Summit Care Medical Clinic is used here as a healthcare blueprint scenario for a
          targeted infrastructure project: building DHCP continuity so the office LAN can
          keep issuing addresses during a primary server outage. The primary DHCP service
          runs on Windows Server 2022 within a Proxmox virtual machine hosted by a Dell
          PowerEdge R740xd. A Cisco edge device is prepared with an emergency DHCP scope
          that activates only if the domain controller at ${dcIp} stops responding to health
          checks.
        </p>
        <div class="executive-grid">
          <div class="mini-card">
            <h4>Why This Matters</h4>
            <p>
              DHCP is a foundational service for device onboarding, user productivity, and
              outage recovery. If it disappears, rebooted or newly connected endpoints may
              fail to obtain an address and the business impact spreads quickly. This
              project reduces that risk by layering an emergency edge scope under the
              normal Windows DHCP design.
            </p>
            <div class="callout">
              <strong>Bottom line:</strong> the design improves continuity without
              abandoning centralized Windows administration.
            </div>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <strong>${dcIp}</strong>
              <span>Static IP used for domain controller health checks</span>
            </div>
            <div class="stat-card">
              <strong>10.40.10.100-199</strong>
              <span>Main Windows DHCP lease range</span>
            </div>
            <div class="stat-card">
              <strong>10.40.10.210-230</strong>
              <span>Emergency Cisco DHCP range</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="introduction">
        <div class="kicker">Section 1</div>
        <h2>Introduction & Scenario Framing</h2>
        <p class="lead">
          This report is intentionally narrower than a full enterprise transformation
          blueprint. Rather than covering every domain of networking, it focuses on a
          single operational problem with high practical value: maintaining DHCP service
          continuity for Summit Care Medical Clinic. The scenario reflects a realistic
          healthcare office environment where system availability directly affects front
          office work, staff productivity, and the ability to keep endpoints online.
        </p>
        <p>
          The platform mix includes a Dell PowerEdge R740xd, Proxmox as a type 1
          hypervisor, a Windows Server 2022 virtual machine serving DHCP and DNS, a Cisco
          ASA or router-edge security platform, and a UPS protecting the host and network
          edge. The design objective is not to claim perfect uptime. It is to create a
          supportable architecture that sharply reduces the business impact of a single
          DHCP outage and makes recovery easier to manage.
        </p>
      </section>

      <section class="section" id="purpose">
        <div class="kicker">Section 2</div>
        <h2>Project Purpose & Objectives</h2>
        <p class="lead">
          Summit Care depends on dynamic addressing for day-to-day office operations. If
          the primary server disappears, users may lose the ability to reconnect, refresh
          leases, or onboard replacement devices. The project therefore aims to preserve
          address continuity without giving up the advantages of Windows-based DHCP
          administration.
        </p>
        <div class="two-col">
          <div class="mini-card">
            <h4>Primary Objectives</h4>
            <ul class="workflow-list">
              <li>Keep wired office devices able to obtain an IP address during server outage.</li>
              <li>Retain Windows Server 2022 as the normal administrative source of truth.</li>
              <li>Trigger Cisco backup DHCP only when the server is truly unavailable.</li>
              <li>Fail back automatically once the primary service is restored and stable.</li>
            </ul>
          </div>
          <div class="mini-card">
            <h4>Practical Business Outcomes</h4>
            <ul class="workflow-list">
              <li>Reduce disruption at the front desk and office workstations.</li>
              <li>Make outage response faster and more predictable for IT staff.</li>
              <li>Show thoughtful infrastructure design in a portfolio-safe document.</li>
              <li>Support a cleaner resilience story for a healthcare office environment.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section" id="platform">
        <div class="kicker">Section 3</div>
        <h2>Platform Inventory & Service Roles</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Role</th>
              <th>Reason It Was Chosen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dell PowerEdge R740xd</td>
              <td>Primary host</td>
              <td>Enterprise-grade hardware platform for critical infrastructure services.</td>
            </tr>
            <tr>
              <td>Proxmox VE</td>
              <td>Type 1 hypervisor</td>
              <td>Provides virtualization, recoverability, and better host-level control.</td>
            </tr>
            <tr>
              <td>Windows Server 2022</td>
              <td>DHCP and DNS</td>
              <td>Offers rich DHCP Manager visibility, Windows integration, and easier policy control.</td>
            </tr>
            <tr>
              <td>Cisco edge device</td>
              <td>Emergency DHCP backup</td>
              <td>Stays on the path during server outages and can keep the LAN issuing leases.</td>
            </tr>
            <tr>
              <td>UPS</td>
              <td>Power continuity</td>
              <td>Reduces needless failover caused by short power instability events.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="section" id="windows">
        <div class="kicker">Section 4</div>
        <h2>Windows DHCP Configuration</h2>
        <p class="lead">
          The primary DHCP service is configured on the Windows Server 2022 domain
          controller VM through DHCP Manager. The office LAN uses the 10.40.10.0/24
          network, with a primary lease range of 10.40.10.100 through 10.40.10.199. The
          default gateway is ${gatewayIp}, and internal DNS points to the domain controller
          at ${dcIp}.
        </p>
        <table>
          <thead>
            <tr>
              <th>Setting</th>
              <th>Value</th>
              <th>Design Intent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primary scope</td>
              <td>10.40.10.100 - 10.40.10.199</td>
              <td>Main lease space for workstations and internal office devices.</td>
            </tr>
            <tr>
              <td>Infrastructure exclusion</td>
              <td>10.40.10.1 - 10.40.10.99</td>
              <td>Preserves room for static infrastructure addressing.</td>
            </tr>
            <tr>
              <td>Router option</td>
              <td>${gatewayIp}</td>
              <td>Maintains consistent edge routing whether the server is healthy or not.</td>
            </tr>
            <tr>
              <td>DNS option</td>
              <td>${dcIp}</td>
              <td>Supports internal name resolution and domain-aware behavior.</td>
            </tr>
          </tbody>
        </table>
        <div class="callout">
          <strong>Administrative advantage:</strong> Windows remains the best place for
          lease review, reservations, scope auditing, and long-term DHCP governance in
          this design.
        </div>
      </section>

      <section class="section" id="cisco">
        <div class="kicker">Section 5</div>
        <h2>Cisco Backup Scope & Trigger Logic</h2>
        <p class="lead">
          The Cisco edge platform is prepared with an emergency DHCP scope in the range
          10.40.10.210 through 10.40.10.230. This smaller pool is intentionally separated
          from the Windows lease space so outage-issued addresses are easier to identify
          and less likely to overlap with the primary service during transition periods.
        </p>
        <div class="three-col">
          <div class="mini-card">
            <h4>Activation Principle</h4>
            <p>
              The Cisco layer should remain quiet during normal operation. It activates
              only after the domain controller health check fails for the defined
              threshold.
            </p>
          </div>
          <div class="mini-card">
            <h4>IOS XE Terminology</h4>
            <p>
              On IOS XE, this style of implementation is commonly described with IP SLA,
              object tracking, and Embedded Event Manager reacting to service loss.
            </p>
          </div>
          <div class="mini-card">
            <h4>Failback Principle</h4>
            <p>
              When the server responds again consistently, the Cisco backup scope is
              turned back off so Windows resumes the primary DHCP role.
            </p>
          </div>
        </div>
        <div class="code-block">if ping(${dcIp}) fails for outage threshold:
  enable Cisco backup DHCP pool

if ping(${dcIp}) succeeds for recovery threshold:
  disable Cisco backup DHCP pool
  return DHCP authority to Windows Server</div>
      </section>

      <section class="section" id="dns">
        <div class="kicker">Section 6</div>
        <h2>DNS Interaction, Scope Design & Failback</h2>
        <p class="lead">
          DHCP and DNS are tightly connected during normal operations because clients
          receive the internal DNS server at ${dcIp}. When the Windows server is down,
          Cisco can still hand out a valid address and gateway, but the design may switch
          DNS delivery to public resolvers so external browsing remains available.
        </p>
        <div class="two-col">
          <div class="mini-card">
            <h4>What Keeps Working</h4>
            <ul class="workflow-list">
              <li>Lease issuance for wired office devices</li>
              <li>Gateway delivery through the Cisco edge</li>
              <li>Basic outside internet access</li>
            </ul>
          </div>
          <div class="mini-card">
            <h4>What Can Be Reduced</h4>
            <ul class="workflow-list">
              <li>Internal DNS name resolution</li>
              <li>Some Windows-integrated DHCP conveniences</li>
              <li>Full parity with Windows reservation and policy depth</li>
            </ul>
          </div>
        </div>
        <div class="callout">
          <strong>Design truth:</strong> Cisco backup DHCP is a continuity tool, not a
          full replacement for the Windows service model.
        </div>
      </section>

      <section class="section" id="risk">
        <div class="kicker">Section 7</div>
        <h2>Risk Analysis & Security Considerations</h2>
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>Impact</th>
              <th>Mitigation In This Design</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Primary DHCP outage</td>
              <td>New or rebooted devices cannot receive leases</td>
              <td>Cisco emergency scope activates and keeps the LAN issuing addresses.</td>
            </tr>
            <tr>
              <td>False failover</td>
              <td>Potential dual service behavior</td>
              <td>Threshold-based health checks and separate ranges reduce confusion.</td>
            </tr>
            <tr>
              <td>Internal DNS loss</td>
              <td>Internet access may continue while internal names fail</td>
              <td>Restore Windows quickly and document the limitation clearly.</td>
            </tr>
            <tr>
              <td>Overreliance on backup mode</td>
              <td>Long-term management becomes fragmented</td>
              <td>Automatic failback keeps Windows as the normal administrative authority.</td>
            </tr>
          </tbody>
        </table>
        <h3>Drawbacks When Cisco Provides DHCP Instead Of Windows</h3>
        <ul class="workflow-list">
          <li>Less comfortable and less centralized day-to-day scope visibility.</li>
          <li>Reduced Windows-integrated DNS and reservation behavior.</li>
          <li>Backup mode is suitable for continuity but not ideal as the long-term primary service.</li>
        </ul>
      </section>

      <section class="section" id="runbook">
        <div class="kicker">Section 8</div>
        <h2>Testing, Recovery & Runbook</h2>
        <p class="lead">
          A DHCP failover design should be treated like an operational workflow, not just
          a configuration artifact. The environment should be tested during planned windows
          so administrators know exactly how the trigger behaves and what users will
          experience in outage mode.
        </p>
        <ol class="workflow-list">
          <li>Stop the Windows DHCP service or simulate server outage in a maintenance window.</li>
          <li>Validate failed reachability to ${dcIp} from the Cisco edge.</li>
          <li>Confirm emergency lease delivery from the Cisco pool.</li>
          <li>Check that a wired client can reach the internet.</li>
          <li>Restore the Windows service and verify stable ping response.</li>
          <li>Confirm Cisco backup DHCP disables itself and Windows resumes authority.</li>
        </ol>
      </section>

      <section class="section" id="improvements">
        <div class="kicker">Section 9</div>
        <h2>Improvement Roadmap</h2>
        <div class="bar-list">
          <div class="bar-row">
            <span>Native Windows-to-Windows DHCP failover</span>
            <div class="bar-track"><i style="width: 92%;"></i></div>
            <strong>High Value</strong>
          </div>
          <div class="bar-row">
            <span>Expanded host replication and VM recovery</span>
            <div class="bar-track"><i style="width: 84%;"></i></div>
            <strong>Strong</strong>
          </div>
          <div class="bar-row">
            <span>Advanced monitoring and event reporting</span>
            <div class="bar-track"><i style="width: 86%;"></i></div>
            <strong>Strong</strong>
          </div>
          <div class="bar-row">
            <span>Automated lease and DNS post-recovery review</span>
            <div class="bar-track"><i style="width: 72%;"></i></div>
            <strong>Useful</strong>
          </div>
        </div>
        <p>
          If the design were extended further, the strongest next step would be adding a
          second Windows DHCP server and using native Microsoft DHCP failover for richer
          state replication. That would improve parity compared with a Cisco emergency-only
          service model.
        </p>
      </section>

      <section class="section" id="governance">
        <div class="kicker">Section 10</div>
        <h2>Governance & Documentation</h2>
        <p class="lead">
          This project is also a documentation exercise. Every value that matters to the
          workflow should be written down: the domain controller IP, the Windows scope, the
          emergency scope, the trigger thresholds, the failback conditions, the expected
          user impact, and the recovery checklist.
        </p>
        <ul class="workflow-list">
          <li>Maintain screenshots of DHCP Manager and the Cisco backup configuration.</li>
          <li>Document expected behavior before, during, and after failover.</li>
          <li>Record UPS dependencies and Proxmox recovery notes.</li>
          <li>Review and re-test the workflow on a scheduled basis.</li>
        </ul>
      </section>

      <section class="section" id="conclusion">
        <div class="kicker">Section 11</div>
        <h2>Conclusion</h2>
        <p class="lead">
          The Summit Care DHCP failover project demonstrates a practical and realistic
          resilience workflow: Windows Server 2022 remains the preferred DHCP and DNS
          platform, Proxmox and UPS protection improve primary service stability, and a
          Cisco edge service provides emergency lease continuity when the primary server is
          unavailable. The design is honest about its tradeoffs, clear about its purpose,
          and organized in a way that communicates strong network engineering and systems
          administration discipline.
        </p>
      </section>
    </main>
  </body>
</html>
`;

for (const [fileName, content] of Object.entries(pageBodies)) {
  syncPage(fileName, content);
}

writeFile("src/pages.js", appPages);
writeFile("src/IframePage.jsx", iframePage);
writeFile("src/ReportMarkupPage.jsx", reportMarkupPage);
writeFile("script.js", siteScript);
writeFile("public/site/script.js", siteScript);
upsertCss("styles.css", themeCss);
upsertCss("public/site/styles.css", themeCss);
writeFile("master-report.css", masterReportCss);
writeFile("summit-care-master-report.html", masterReportHtml);

console.log("DHCP failover rebrand files generated.");
