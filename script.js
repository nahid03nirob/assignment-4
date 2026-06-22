const jobs = [
  {
    id: 1,
    companyName: 'Mobile First Corp',
    position: 'React Native Developer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description: 'Build cross-platform mobile applications used by millions of people and collaborate with a product team focused on fast delivery.',
    status: 'applied',
  },
  {
    id: 2,
    companyName: 'WebFlow Agency',
    position: 'Web Designer & Developer',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$80,000 - $120,000',
    description: 'Create polished web experiences for premium clients with a strong eye for layout, motion, and accessibility.',
    status: 'applied',
  },
  {
    id: 3,
    companyName: 'DataViz Solutions',
    position: 'Data Visualization Specialist',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125,000 - $165,000',
    description: 'Turn complex data into clear visual stories with React, D3.js, and thoughtful UI design.',
    status: 'applied',
  },
  {
    id: 4,
    companyName: 'CloudFirst Inc',
    position: 'Backend Developer',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140,000 - $190,000',
    description: 'Design reliable backend systems in Python and AWS while helping scale secure cloud infrastructure.',
    status: 'applied',
  },
  {
    id: 5,
    companyName: 'Innovation Labs',
    position: 'UI/UX Engineer',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110,000 - $150,000',
    description: 'Build intuitive interfaces and bring product ideas to life with a strong design and frontend mindset.',
    status: 'applied',
  },
  {
    id: 6,
    companyName: 'MegaCorp Solutions',
    position: 'JavaScript Developer',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Work on enterprise web applications, collaborate with senior engineers, and improve modern product workflows.',
    status: 'applied',
  },
  {
    id: 7,
    companyName: 'StartupXYZ',
    position: 'Full Stack Engineer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'Join a fast-growing startup and ship core features across Node.js and React with a small product team.',
    status: 'applied',
  },
  {
    id: 8,
    companyName: 'TechCorp Industries',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130,000 - $175,000',
    description: 'Create elegant frontend experiences, improve performance, and help shape a product used by a large audience.',
    status: 'applied',
  },
];

const state = {
  activeFilter: 'all',
  jobs,
};

const jobsList = document.querySelector('#jobsList');
const emptyState = document.querySelector('#emptyState');
const emptyTitle = document.querySelector('#emptyTitle');
const emptySubtitle = document.querySelector('#emptySubtitle');
const visibleJobsCount = document.querySelector('#visibleJobsCount');
const totalCount = document.querySelector('#totalCount');
const interviewCount = document.querySelector('#interviewCount');
const rejectedCount = document.querySelector('#rejectedCount');
const filterButtons = document.querySelectorAll('[data-filter]');
const filterCounts = document.querySelectorAll('[data-filter-count]');

function getStatusLabel(status) {
  if (status === 'interview') return 'Interview';
  if (status === 'rejected') return 'Rejected';
  return 'Not Applied';
}

function getVisibleJobs() {
  if (state.activeFilter === 'all') return state.jobs;
  return state.jobs.filter((job) => job.status === state.activeFilter);
}

function updateCounts() {
  const counts = state.jobs.reduce(
    (accumulator, job) => {
      accumulator.total += 1;
      accumulator[job.status] += 1;
      return accumulator;
    },
    { total: 0, applied: 0, interview: 0, rejected: 0 },
  );

  totalCount.textContent = counts.total;
  interviewCount.textContent = counts.interview;
  rejectedCount.textContent = counts.rejected;

  filterCounts.forEach((node) => {
    const filter = node.dataset.filterCount;
    node.textContent = counts[filter] ?? counts.total;
  });
}

function renderJobs() {
  const visibleJobs = getVisibleJobs();
  visibleJobsCount.textContent = visibleJobs.length;

  if (state.activeFilter === 'interview' && visibleJobs.length === 0) {
    emptyTitle.textContent = 'No interview jobs available';
    emptySubtitle.textContent = 'Move a job into the Interview state to see it listed here.';
  } else if (state.activeFilter === 'rejected' && visibleJobs.length === 0) {
    emptyTitle.textContent = 'No rejected jobs available';
    emptySubtitle.textContent = 'Rejected applications will appear here after you click the Rejected button.';
  } else {
    emptyTitle.textContent = 'No jobs available';
    emptySubtitle.textContent = 'Try another tab or update a job status to see results here.';
  }

  if (visibleJobs.length === 0) {
    jobsList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  jobsList.innerHTML = visibleJobs
    .map(
      (job) => `
        <article class="group rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6" data-job-id="${job.id}">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl font-bold text-slate-950">${job.companyName}</h3>
                <span class="status-pill inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]" data-status="${job.status}">${getStatusLabel(job.status)}</span>
              </div>
              <p class="text-lg font-semibold text-slate-700">${job.position}</p>
              <p class="text-sm text-slate-500">${job.location} • ${job.type} • ${job.salary}</p>
            </div>
            <button class="delete-job inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500" type="button" data-action="delete" aria-label="Delete ${job.companyName}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16" />
                <path d="M9 7V5.6c0-.88.72-1.6 1.6-1.6h2.8c.88 0 1.6.72 1.6 1.6V7" />
                <path d="M7.5 7l.6 11.1c.06 1.11.97 1.9 2.08 1.9h3.64c1.11 0 2.02-.79 2.08-1.9L16.5 7" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </button>
          </div>
          <p class="mt-4 text-sm leading-6 text-slate-600">${job.description}</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <button class="status-action rounded-full border px-4 py-2 text-sm font-semibold transition ${job.status === 'interview' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50'}" type="button" data-action="set-status" data-status="interview">Interview</button>
            <button class="status-action rounded-full border px-4 py-2 text-sm font-semibold transition ${job.status === 'rejected' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-rose-200 bg-white text-rose-600 hover:bg-rose-50'}" type="button" data-action="set-status" data-status="rejected">Rejected</button>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderActiveTab() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.activeFilter;
    button.classList.toggle('active', isActive);
    if (isActive) {
      button.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
      button.classList.remove('bg-white', 'text-slate-600');
    } else {
      button.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
      button.classList.add('bg-white', 'text-slate-600');
    }
  });
}

function render() {
  updateCounts();
  renderActiveTab();
  renderJobs();
}

document.querySelector('[data-filter="all"]').addEventListener('click', () => {
  state.activeFilter = 'all';
  render();
});

document.querySelector('[data-filter="interview"]').addEventListener('click', () => {
  state.activeFilter = 'interview';
  render();
});

document.querySelector('[data-filter="rejected"]').addEventListener('click', () => {
  state.activeFilter = 'rejected';
  render();
});

jobsList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const jobCard = event.target.closest('[data-job-id]');
  if (!jobCard) return;

  const jobId = Number(jobCard.dataset.jobId);
  const job = state.jobs.find((entry) => entry.id === jobId);
  if (!job) return;

  if (button.dataset.action === 'delete') {
    state.jobs = state.jobs.filter((entry) => entry.id !== jobId);
    render();
    return;
  }

  if (button.dataset.action === 'set-status') {
    const nextStatus = button.dataset.status;
    if (job.status !== nextStatus) {
      job.status = nextStatus;
      render();
    }
  }
});

render();