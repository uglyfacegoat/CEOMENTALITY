import type { WorkspaceState } from '../types/domain';

const STORAGE_KEY = 'ceomentality:mvp:v1';

export const seedState: WorkspaceState = {
  candidates: [
    { id: 'alexei-petrov', name: 'Alexei Petrov', initials: 'AP', role: 'Founder / CEO', company: 'Northtrail', status: 'Under review', wave: 'Wave 02', code: null, notes: ['AI infrastructure for logistics.'], summary: 'Serial founder with two exits. Building in AI + supply chain with global ambitions.', expertise: 'Founder / CEO', country: 'Switzerland', telegram: '@alexei', source: 'Website', stage: 'purchase', appliedAt: '2025-04-30' },
    { id: 'maria-ivanova', name: 'Maria Ivanova', initials: 'MI', role: 'Investor', company: 'Vision Capital', status: 'Approved', wave: 'Wave 01', code: 'CM-W1-7X9K-PLATINUM', notes: ['Strong investor network in EU.'], summary: 'Early-stage investor focused on deep tech and infrastructure.', expertise: 'Investor', country: 'Germany', telegram: '@maria', source: 'Partner', stage: 'purchase', appliedAt: '2025-04-27' },
    { id: 'dmitry-sorokin', name: 'Dmitry Sorokin', initials: 'DS', role: 'CFO', company: 'Hyperline', status: 'Code assigned', wave: 'Wave 03', code: 'CM-W3-R8M2-J3QH', notes: ['Referred by Anastasia Belova.'], summary: 'Scaled finance ops across multiple high-growth companies.', expertise: 'Finance', country: 'Russia', telegram: '@dmitry', source: 'Referral', stage: 'purchase', appliedAt: '2025-05-02' },
    { id: 'nikita-volkov', name: 'Nikita Volkov', initials: 'NV', role: 'Product Lead', company: 'Templar', status: 'Waitlisted', wave: 'Wave 02', code: null, notes: ['Strong product sense.'], summary: 'Product leader with experience in marketplace and SaaS.', expertise: 'Product', country: 'Serbia', telegram: '@nikita', source: 'Website', stage: 'purchase', appliedAt: '2025-05-03' },
    { id: 'anastasia-belova', name: 'Anastasia Belova', initials: 'AB', role: 'Founder', company: 'Casa', status: 'Under review', wave: 'Wave 01', code: null, notes: ['Invited via partner network.'], summary: 'Consumer brand builder with international background.', expertise: 'Founder / CEO', country: 'Italy', telegram: '@anastasia', source: 'Partner', stage: 'club', appliedAt: '2025-05-05' },
    { id: 'sergey-karpov', name: 'Sergey Karpov', initials: 'SK', role: 'Creative Director', company: 'Studio K', status: 'Code assigned', wave: 'Wave 04', code: 'CM-W4-K4B2-WAITLIST', notes: ['Creative leader with global campaigns.'], summary: 'Award-winning creative director working with top lifestyle brands.', expertise: 'Creative / Brand', country: 'France', telegram: '@sergey', source: 'Referral', stage: 'purchase', appliedAt: '2025-05-06' },
    { id: 'olga-smirnova', name: 'Olga Smirnova', initials: 'OS', role: 'Editor-in-Chief', company: 'The Bird', status: 'Approved', wave: 'Wave 02', code: 'CM-W2-A3F8-OBSIDIAN', notes: ['Media leader with strong audience reach.'], summary: '20+ years in media and content strategy.', expertise: 'Media / Content', country: 'UK', telegram: '@olga', source: 'Website', stage: 'club', appliedAt: '2025-05-07' },
    { id: 'pavel-e', name: 'Pavel E.', initials: 'PE', role: 'Angel Investor', company: 'AngelList', status: 'Waitlisted', wave: 'Wave 03', code: null, notes: ['High demand. Consider for next wave.'], summary: 'Active angel investing in B2B SaaS.', expertise: 'Investor', country: 'UAE', telegram: '@pavel', source: 'Website', stage: 'purchase', appliedAt: '2025-05-08' },
    { id: 'ivan-kuznetsov', name: 'Ivan Kuznetsov', initials: 'IK', role: 'Founder', company: 'Foodex', status: 'Rejected', wave: 'Wave 01', code: null, notes: ['Out of scope for current community.'], summary: 'Strong operator, not a fit for this wave.', expertise: 'Founder / CEO', country: 'Russia', telegram: '@ivan', source: 'Website', stage: 'purchase', appliedAt: '2025-05-09' },
  ],
  drops: [
    { id: 'wave-01', name: 'Wave 01', description: 'Spring Collection Drop', issued: 1000, redeemed: 672, status: 'Active', validity: 'May 1 - May 31, 2025', code: 'CM-SPRING-01' },
    { id: 'wave-02', name: 'Wave 02', description: 'Spring Collection Drop', issued: 800, redeemed: 320, status: 'Active', validity: 'May 10 - May 31, 2025', code: 'CM-SPRING-02' },
    { id: 'partner', name: 'Partner Access', description: 'Brand & Media Partners', issued: 300, redeemed: 120, status: 'Active', validity: 'May 13 - Jun 13, 2025', code: 'CM-PARTNER' },
    { id: 'waitlist', name: 'Waitlist Release', description: 'Next in line', issued: 500, redeemed: 0, status: 'Scheduled', validity: 'May 20 - Jun 3, 2025', code: 'CM-WAITLIST' },
  ],
  activity: [{ id: 'seed', type: 'System initialized', detail: 'MVP demo workspace is ready', at: new Date().toISOString() }],
};

const wait = <T,>(value: T): Promise<T> => new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), 120));
const read = (): WorkspaceState => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as WorkspaceState | null || structuredClone(seedState);
const write = (state: WorkspaceState): WorkspaceState => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return state; };

// Replace this adapter with HTTP calls later. Components only depend on this contract.
export const api = {
  load: () => wait(read()),
  save: (state: WorkspaceState) => wait(write(state)),
  // Future backend contract: replace the local index with GET /api/search?q=...
  search: (query: string) => {
    const state = read();
    const needle = query.trim().toLowerCase();
    return wait({
      candidates: needle ? state.candidates.filter((item) =>
        [item.name, item.company, item.telegram, item.code].filter(Boolean).join(' ').toLowerCase().includes(needle)
      ) : [],
      drops: needle ? state.drops.filter((item) =>
        [item.name, item.description, item.code].filter(Boolean).join(' ').toLowerCase().includes(needle)
      ) : [],
    });
  },
  reset: () => { localStorage.removeItem(STORAGE_KEY); return wait(seedState); },
  export: (state: WorkspaceState) => new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }),
};
