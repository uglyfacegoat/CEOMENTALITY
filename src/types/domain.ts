export type CandidateStatus =
  | 'Under review'
  | 'Approved'
  | 'Rejected'
  | 'Code assigned'
  | 'Code used'
  | 'Accepted'
  | 'Waitlisted'
  | 'Archived';

export type CandidateStage = 'purchase' | 'club';
export type CandidateSource = 'Website' | 'Telegram bot' | 'Partner' | 'Referral' | 'Manual' | 'Import' | 'API';
export type CodeType = 'Single-use' | 'Multi-use';
export type DropStatus = 'Draft' | 'Scheduled' | 'Active' | 'Paused' | 'Closed' | 'Expired' | 'Cancelled';
export type AppRoute = 'Candidate Dossiers' | 'Access Codes' | 'Analytics' | 'Profile';
export type Language = 'en' | 'ru';

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  status: CandidateStatus;
  wave: string;
  code: string | null;
  notes: string[];
  summary: string;
  expertise: string;
  country: string;
  telegram: string;
  source: CandidateSource;
  stage: CandidateStage;
  appliedAt: string;
}

export interface AccessBatch {
  id: string;
  name: string;
  description: string;
  issued: number;
  redeemed: number;
  status: DropStatus;
  validity: string;
  code: string;
  codeType?: CodeType;
  source?: CandidateSource;
}

export interface ActivityEvent {
  id: string;
  type: string;
  detail: string;
  at: string;
}

export interface WorkspaceState {
  candidates: Candidate[];
  drops: AccessBatch[];
  activity: ActivityEvent[];
}

export interface WorkspaceFilters {
  status: string;
  wave: string;
  source: string;
  expertise?: string;
  codeType?: string;
  expiry?: string;
  drop?: string;
}

export interface SavedView {
  filters: WorkspaceFilters;
  query: string;
  mode: string;
}

export interface CandidateDraft {
  name: string;
  telegram: string;
  country: string;
  role: string;
  company: string;
  expertise: string;
  wave: string;
  stage: CandidateStage;
  summary: string;
  source: CandidateSource;
}

export interface DropDraft {
  name: string;
  description: string;
  issued: number;
  validity: string;
  code: string;
}

export interface BatchDraft {
  name: string;
  description: string;
  issued: number;
  validity: string;
  codeType: CodeType;
}
