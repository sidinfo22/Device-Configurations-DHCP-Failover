export const pagePathByFile = {
  'index.html': '/',
  'objectives.html': '/objectives',
  'assets.html': '/deploy',
  'deploy.html': '/deploy',
  'diagrams.html': '/deploy',
  'segmentation.html': '/deploy',
  'voip.html': '/voip',
  'cloud.html': '/deploy',
  'programming.html': '/voip',
  'cybersecurity.html': '/hippa',
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
    title: 'Overview, Purpose & Platform Strategy | DHCP Failover Project Workflow',
  },
  {
    slug: 'deploy',
    route: '/deploy',
    fileName: 'deploy.html',
    title: 'Platform, Scope & Configuration Architecture | DHCP Failover Project Workflow',
  },
  {
    slug: 'voip',
    route: '/voip',
    fileName: 'voip.html',
    title: 'Automation, Failover Operations & Recovery | DHCP Failover Project Workflow',
  },
  {
    slug: 'hippa',
    route: '/hippa',
    fileName: 'hippa.html',
    title: 'Risk, Governance & Conclusion | DHCP Failover Project Workflow',
  },
];
