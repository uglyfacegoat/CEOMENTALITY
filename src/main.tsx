import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './services/api';
import { setRuntimeLanguage } from './i18n-runtime/shared';
import { Icon } from './components/ui/Icon';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CandidateForm } from './features/candidates/CandidateForm';
import { DropForm } from './features/access/DropForm';
import { ErrorBoundary } from './app/ErrorBoundary';
import { parseRoute, writeRoute } from './app/routes';
import type { AccessBatch, AppRoute, BatchDraft, Candidate, CandidateDraft, DropDraft, Language, SavedView, WorkspaceFilters, WorkspaceState } from './types/domain';
import './styles.css';

const Dossiers=lazy(()=>import('./features/candidates/DossiersPage').then(module=>({default:module.Dossiers})));
const Dossier=lazy(()=>import('./features/candidates/DossierPage').then(module=>({default:module.Dossier})));
const Access=lazy(()=>import('./features/access/AccessPage').then(module=>({default:module.Access})));
const Analytics=lazy(()=>import('./features/analytics/AnalyticsPage').then(module=>({default:module.Analytics})));
const ProfilePage=lazy(()=>import('./features/profile/ProfilePage').then(module=>({default:module.ProfilePage})));
const LoginPage=lazy(()=>import('./features/auth/LoginPage').then(module=>({default:module.LoginPage})));
const defaultFilters:WorkspaceFilters={status:'All',wave:'All',source:'All',expertise:'All'};
const getSavedView=():SavedView|null=>{try{return JSON.parse(localStorage.getItem('ceomentality:view')||'null') as SavedView|null}catch{return null}};

function App() {
 const initialRoute=parseRoute();
 const [state,setState]=useState<WorkspaceState|null>(null),[active,setActive]=useState<AppRoute>(initialRoute.page),[selected,setSelected]=useState<string|null>(initialRoute.candidateId),[query,setQuery]=useState(()=>getSavedView()?.query||''),[filters,setFilters]=useState<WorkspaceFilters>(()=>getSavedView()?.filters||defaultFilters),[modal,setModal]=useState<'candidate'|'drop'|null>(null),[toast,setToast]=useState(''),[sidebarCollapsed,setSidebarCollapsed]=useState(()=>localStorage.getItem('ceomentality:sidebar')==='collapsed'),[authenticated,setAuthenticated]=useState(()=>localStorage.getItem('ceomentality:session')==='active'),[language,setLanguage]=useState<Language>(()=>localStorage.getItem('ceomentality:language')==='ru'?'ru':'en');
 useEffect(()=>{api.load().then(setState)},[]); useEffect(()=>{if(state)api.save(state)},[state]);
 useEffect(()=>{const onPopState=()=>{const route=parseRoute();setActive(route.page);setSelected(route.candidateId)};window.addEventListener('popstate',onPopState);return()=>window.removeEventListener('popstate',onPopState)},[]);
 useEffect(()=>{setRuntimeLanguage(language);localStorage.setItem('ceomentality:language',language);document.documentElement.lang=language},[language]);
 const notify=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2600)};
 const changeLanguage=(next:Language)=>{setRuntimeLanguage(next);setLanguage(next)};
 const login=()=>{localStorage.setItem('ceomentality:session','active');setAuthenticated(true);writeRoute(active,selected,true)};
 const logout=()=>{localStorage.removeItem('ceomentality:session');setAuthenticated(false);setActive('Candidate Dossiers');setSelected(null);window.history.replaceState({},'','/login')};
 if(!authenticated)return <LoginPage onLogin={login}/>;
 if(!state)return <div className="loading">Loading workspace…</div>;
 const updateCandidate=(c:Candidate)=>{setState({...state,candidates:state.candidates.map(x=>x.id===c.id?c:x),activity:[{id:crypto.randomUUID(),type:'Candidate updated',detail:`${c.name}: ${c.status}`,at:new Date().toISOString()},...state.activity]});notify('Candidate updated')};
 const addCandidate=(f:CandidateDraft)=>{const initials=f.name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();const c:Candidate={...f,id:`${f.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${Date.now()}`,initials,status:'Under review',code:null,notes:[],appliedAt:new Date().toISOString().slice(0,10)};setState({...state,candidates:[c,...state.candidates]});setModal(null);notify('Candidate created')};
 const addDrop=(f:DropDraft)=>{setState({...state,drops:[{...f,id:`drop-${Date.now()}`,redeemed:0,status:'Active',code:f.code.toUpperCase()},...state.drops]});setModal(null);notify('Drop created')};
 const generateBatch=(f:BatchDraft)=>{const suffix=Math.random().toString(36).slice(2,8).toUpperCase();const batch:AccessBatch={...f,id:`batch-${Date.now()}`,redeemed:0,status:'Active',code:`CM-${suffix}`};setState({...state,drops:[batch,...state.drops],activity:[{id:crypto.randomUUID(),type:'Codes generated',detail:`${f.issued} codes · ${f.name}`,at:new Date().toISOString()},...state.activity]});notify(`${f.issued} codes generated for ${f.name}`)};
 const exportData=()=>{const url=URL.createObjectURL(api.export(state));const a=document.createElement('a');a.href=url;a.download='ceomentality-export.json';a.click();URL.revokeObjectURL(url);notify('Workspace exported')};
 const navigate=(t:AppRoute)=>{setActive(t);setSelected(null);writeRoute(t);setQuery('');setFilters({status:'All',wave:'All',source:'All',expertise:'All',codeType:'All',expiry:'All',drop:'All drops'})}; const mode=selected?'Candidate Dossiers':active;
 const openCandidate=(id:string)=>{setActive('Candidate Dossiers');setSelected(id);writeRoute('Candidate Dossiers',id)};
 const closeCandidate=()=>{setSelected(null);writeRoute('Candidate Dossiers')};
 const moveCandidate=(direction:number)=>{const index=state.candidates.findIndex(c=>c.id===selected);const next=(index+direction+state.candidates.length)%state.candidates.length;const id=state.candidates[next]?.id??null;setSelected(id);writeRoute('Candidate Dossiers',id)};
 const selectedCandidate=selected?state.candidates.find(c=>c.id===selected):undefined;
 const toggleSidebar=()=>setSidebarCollapsed(value=>{const next=!value;localStorage.setItem('ceomentality:sidebar',next?'collapsed':'open');return next});
 return <><Header active={mode} navigate={navigate} candidates={state.candidates} openCandidate={openCandidate} openProfile={()=>navigate('Profile')} onLogout={logout} language={language} setLanguage={changeLanguage}/><div className={`app-shell ${active==='Profile'?'profile-shell':''} ${sidebarCollapsed?'sidebar-collapsed':''}`}>{active!=='Profile'&&<><Sidebar mode={mode} query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} candidates={state.candidates} reset={()=>{setQuery('');setFilters({status:'All',wave:'All',source:'All',expertise:'All',codeType:'All',expiry:'All',drop:'All drops'})}}/><span className="sidebar-reveal-zone"/><button className="sidebar-toggle" onClick={toggleSidebar} aria-label={sidebarCollapsed?'Show sidebar':'Hide sidebar'} title={sidebarCollapsed?'Show sidebar':'Hide sidebar'}><Icon name="sidebar" size={20}/></button></>}{active==='Profile'?<ProfilePage notify={notify}/>:selectedCandidate?<Dossier candidate={selectedCandidate} back={closeCandidate} update={updateCandidate} addNote={n=>{updateCandidate({...selectedCandidate,notes:[...selectedCandidate.notes,n]})}} notify={notify} onPrevious={()=>moveCandidate(-1)} onNext={()=>moveCandidate(1)}/>:active==='Candidate Dossiers'?<Dossiers candidates={state.candidates} open={openCandidate} query={query} filters={filters}/>:active==='Access Codes'?<Access drops={state.drops} query={query} filters={filters} notify={notify} createDrop={()=>setModal('drop')} generateBatch={generateBatch} resetFilters={()=>{setQuery('');setFilters({status:'All',wave:'All',source:'All',codeType:'All',expiry:'All',drop:'All drops'})}} closeDrop={id=>{setState({...state,drops:state.drops.map(d=>d.id===id?{...d,status:d.status==='Active'?'Closed':'Active'}:d)});notify('Drop status updated')}} exportData={exportData}/>:<Analytics candidates={state.candidates} drops={state.drops} filters={filters} exportData={exportData}/>}</div>{modal==='candidate'&&<CandidateForm onClose={()=>setModal(null)} onSubmit={addCandidate}/>} {modal==='drop'&&<DropForm onClose={()=>setModal(null)} onSubmit={addDrop}/>} {toast&&<div className="toast">{toast}</div>}</>;
}

const root=document.getElementById('root');
if(!root)throw new Error('Root element not found');
createRoot(root).render(<ErrorBoundary><Suspense fallback={<div className="loading">Loading workspace…</div>}><App/></Suspense></ErrorBoundary>);
