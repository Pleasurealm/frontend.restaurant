// Naturum Echo — Phase 1 delivery plan.
// The work breakdown for the web-first pilot, by workstream. Statuses reflect a
// project mid-Build: mobilisation, definition and design complete; legal,
// ecology, technical setup and build in progress; testing, pilot and rollout
// still ahead.

export type PlanStatus = 'done' | 'active' | 'planned'

export interface PlanTask {
  id: string
  task: string
  deliverable: string
  status: PlanStatus
}

export interface Workstream {
  n: number
  name: string
  tasks: PlanTask[]
}

export const workstreams: Workstream[] = [
  {
    n: 1,
    name: 'Mobilisation',
    tasks: [
      { id: '1.1', task: 'Appoint project sponsor and delivery lead', deliverable: 'Named sponsor and delivery lead', status: 'done' },
      { id: '1.2', task: 'Confirm Phase 1 budget envelope', deliverable: 'Approved working budget', status: 'done' },
      { id: '1.3', task: 'Confirm pilot habitat bank', deliverable: 'Named pilot site', status: 'done' },
      { id: '1.4', task: 'Set governance and weekly project meeting', deliverable: 'Meeting cadence and decision log', status: 'done' },
      { id: '1.5', task: 'Review landing page messaging and waiting-list capture', deliverable: 'Approved landing page updates', status: 'done' },
    ],
  },
  {
    n: 2,
    name: 'Definition',
    tasks: [
      { id: '2.1', task: 'Agree Phase 1 objectives and measures of success', deliverable: 'Signed-off product brief', status: 'done' },
      { id: '2.2', task: 'Define primary users and user journeys', deliverable: 'User journey set', status: 'done' },
      { id: '2.3', task: 'Confirm web-first approach and future native-app trigger', deliverable: 'Technology route decision', status: 'done' },
      { id: '2.4', task: 'Agree Phase 1 feature list and exclusions', deliverable: 'Prioritised feature backlog', status: 'done' },
      { id: '2.5', task: 'Define structured recording metadata', deliverable: 'Approved metadata specification', status: 'done' },
      { id: '2.6', task: 'Define platform analytics and reporting requirements', deliverable: 'Measurement plan', status: 'done' },
    ],
  },
  {
    n: 3,
    name: 'Legal and policy',
    tasks: [
      { id: '3.1', task: 'Prepare contributor terms and copyright licence', deliverable: 'Approved contributor terms', status: 'done' },
      { id: '3.2', task: 'Create public download licence categories', deliverable: 'Approved download policy', status: 'done' },
      { id: '3.3', task: 'Prepare privacy notice and consent wording', deliverable: 'Approved privacy wording', status: 'active' },
      { id: '3.4', task: 'Agree sensitive-species and location policy', deliverable: 'Location-protection rules', status: 'active' },
      { id: '3.5', task: 'Create safeguarding and school participation rules', deliverable: 'Safeguarding procedure', status: 'planned' },
      { id: '3.6', task: 'Write moderation and takedown procedure', deliverable: 'Moderation handbook', status: 'planned' },
    ],
  },
  {
    n: 4,
    name: 'Ecology and content',
    tasks: [
      { id: '4.1', task: 'Select permanent acoustic monitoring points at pilot site', deliverable: 'Monitoring-point map', status: 'done' },
      { id: '4.2', task: 'Agree standard recording protocol', deliverable: 'Recording protocol', status: 'done' },
      { id: '4.3', task: 'Audit existing Naturum audio, imagery and habitat records', deliverable: 'Content inventory', status: 'active' },
      { id: '4.4', task: 'Capture initial professional baseline recordings', deliverable: 'Pilot baseline library', status: 'active' },
      { id: '4.5', task: 'Create species and habitat tagging list', deliverable: 'Controlled tag list', status: 'done' },
      { id: '4.6', task: 'Prepare pilot site story and educational copy', deliverable: 'Approved pilot-site content', status: 'planned' },
    ],
  },
  {
    n: 5,
    name: 'Design',
    tasks: [
      { id: '5.1', task: 'Produce information architecture and page list', deliverable: 'Approved site structure', status: 'done' },
      { id: '5.2', task: 'Design mobile upload journey', deliverable: 'Approved upload wireframes', status: 'done' },
      { id: '5.3', task: 'Design site map, sound player and filters', deliverable: 'Approved discovery wireframes', status: 'done' },
      { id: '5.4', task: 'Design Then and Now comparison and site timeline', deliverable: 'Approved comparison prototype', status: 'done' },
      { id: '5.5', task: 'Design moderation and administration dashboard', deliverable: 'Approved admin wireframes', status: 'done' },
      { id: '5.6', task: 'Test clickable prototype with representative users', deliverable: 'Prototype findings and revisions', status: 'done' },
    ],
  },
  {
    n: 6,
    name: 'Technical setup',
    tasks: [
      { id: '6.1', task: 'Confirm architecture, suppliers and ongoing costs', deliverable: 'Technical design and cost schedule', status: 'done' },
      { id: '6.2', task: 'Define security, access roles and backup requirements', deliverable: 'Security and access specification', status: 'done' },
      { id: '6.3', task: 'Design database and audio-storage structure', deliverable: 'Approved data model', status: 'done' },
      { id: '6.4', task: 'Confirm file limits, supported formats and processing rules', deliverable: 'Media specification', status: 'active' },
    ],
  },
  {
    n: 7,
    name: 'Build',
    tasks: [
      { id: '7.1', task: 'Build database, media storage and user roles', deliverable: 'Working platform foundation', status: 'done' },
      { id: '7.2', task: 'Build public map and habitat-site pages', deliverable: 'Working site discovery', status: 'done' },
      { id: '7.3', task: 'Build audio player, filters and recording pages', deliverable: 'Working listening experience', status: 'done' },
      { id: '7.4', task: 'Build public audio and image upload process', deliverable: 'Working submission journey', status: 'active' },
      { id: '7.5', task: 'Build moderation and administration dashboard', deliverable: 'Working admin dashboard', status: 'active' },
      { id: '7.6', task: 'Build controlled download and attribution function', deliverable: 'Working downloads', status: 'planned' },
      { id: '7.7', task: 'Build Then and Now comparison and recording timeline', deliverable: 'Working change-over-time view', status: 'done' },
      { id: '7.8', task: 'Generate site-specific QR codes and landing routes', deliverable: 'Pilot QR pack', status: 'planned' },
      { id: '7.9', task: 'Implement analytics, audit logs and data export', deliverable: 'Working reporting tools', status: 'active' },
    ],
  },
  {
    n: 8,
    name: 'Testing',
    tasks: [
      { id: '8.1', task: 'Complete functional and mobile-browser testing', deliverable: 'Resolved test log', status: 'active' },
      { id: '8.2', task: 'Complete privacy, security and permissions review', deliverable: 'Signed-off compliance review', status: 'planned' },
      { id: '8.3', task: 'Seed platform with approved pilot content', deliverable: 'Launch-ready content library', status: 'planned' },
      { id: '8.4', task: 'Train moderators and Naturum administrators', deliverable: 'Trained operating team', status: 'planned' },
      { id: '8.5', task: 'Install and test pilot QR signs', deliverable: 'Working on-site QR journey', status: 'planned' },
      { id: '8.6', task: 'Approve pilot go-live', deliverable: 'Go-live decision', status: 'planned' },
    ],
  },
  {
    n: 9,
    name: 'Pilot',
    tasks: [
      { id: '9.1', task: 'Launch controlled pilot', deliverable: 'Live pilot', status: 'planned' },
      { id: '9.2', task: 'Monitor submissions and moderation workload weekly', deliverable: 'Weekly pilot report', status: 'planned' },
      { id: '9.3', task: 'Gather user, school, ecologist and partner feedback', deliverable: 'Feedback summary', status: 'planned' },
      { id: '9.4', task: 'Fix priority issues and refine the experience', deliverable: 'Pilot release update', status: 'planned' },
      { id: '9.5', task: 'Review pilot results against success measures', deliverable: 'Pilot evaluation', status: 'planned' },
    ],
  },
  {
    n: 10,
    name: 'Rollout decision',
    tasks: [
      { id: '10.1', task: 'Approve multi-site rollout scope and budget', deliverable: 'Rollout approval', status: 'planned' },
      { id: '10.2', task: 'Agree Phase 2 commercial and education priorities', deliverable: 'Phase 2 roadmap', status: 'planned' },
      { id: '10.3', task: 'Decide whether native apps are justified', deliverable: 'Native-app decision', status: 'planned' },
    ],
  },
]

export const planStatusLabel: Record<PlanStatus, string> = {
  done: 'Complete',
  active: 'In progress',
  planned: 'Upcoming',
}

// Derived helpers ---------------------------------------------------------

export const wsStatus = (w: Workstream): PlanStatus => {
  if (w.tasks.every((t) => t.status === 'done')) return 'done'
  if (w.tasks.some((t) => t.status === 'active' || t.status === 'done')) return 'active'
  return 'planned'
}

export const wsDone = (w: Workstream) => w.tasks.filter((t) => t.status === 'done').length

const allTasks = workstreams.flatMap((w) => w.tasks)

export const planStats = {
  totalTasks: allTasks.length,
  done: allTasks.filter((t) => t.status === 'done').length,
  active: allTasks.filter((t) => t.status === 'active').length,
  planned: allTasks.filter((t) => t.status === 'planned').length,
  activeWorkstreams: workstreams.filter((w) => wsStatus(w) === 'active').length,
  upcomingWorkstreams: workstreams.filter((w) => wsStatus(w) === 'planned').length,
  // Count active work as half-complete for the headline figure.
  progress: Math.round(
    ((allTasks.filter((t) => t.status === 'done').length + allTasks.filter((t) => t.status === 'active').length * 0.5) /
      allTasks.length) *
      100,
  ),
}
