import { useState, type Dispatch, type SetStateAction } from 'react';
import { Icon } from '../ui/Icon';
import { CustomSelect } from '../ui/CustomSelect';
import type { Candidate, WorkspaceFilters } from '../../types/domain';

interface SidebarProps { mode:string; query:string; setQuery:(value:string)=>void; filters:WorkspaceFilters; setFilters:Dispatch<SetStateAction<WorkspaceFilters>>; candidates:Candidate[]; reset:()=>void }
interface SelectSideProps { label:string; value:string; onChange:(value:string)=>void; options?:string[] }
interface FilterGroupProps { title:string; items:string[]; counts?:Record<string,number>; value:string; setValue:(value:string)=>void; radio?:boolean }

export function Sidebar({mode,query,setQuery,filters,setFilters,candidates,reset}:SidebarProps) {
  const [viewSaved,setViewSaved]=useState(()=>Boolean(localStorage.getItem('ceomentality:view')));
  const counts = candidates.length ? {'Under review':24,'Approved':32,'Code assigned':48,'Waitlisted':16,'Rejected':7} : {};
  const candidatesMode = mode === 'Candidate Dossiers';
  const accessMode = mode === 'Access Codes';
  return <aside className="sidebar">
    <div className="filter-head"><span>Filters</span><button onClick={reset}>Clear all</button></div>
    {!mode.includes('Analytics') && <label className="search-box"><Icon name="search" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={candidatesMode?'Search participants...':'Search codes or batches...'}/></label>}
    {mode === 'Analytics' && <><SelectSide label="Drop" value={filters.drop||'All drops'} options={['All drops','Wave 01','Wave 02','Partner Access','Waitlist Release']} onChange={v=>setFilters({...filters,drop:v})}/><SelectSide label="Wave" value={filters.wave==='All'?'All waves':filters.wave} options={['All waves','Wave 01','Wave 02','Wave 03','Wave 04']} onChange={v=>setFilters({...filters,wave:v==='All waves'?'All':v})}/></>}
    <FilterGroup title="Status" items={candidatesMode?['Under review','Approved','Code assigned','Waitlisted','Rejected']:accessMode?['Active','Redeemed','Expired']:['Active','Scheduled','Completed','Expired']} counts={candidatesMode?counts:{Active:456,Redeemed:628,Expired:228,Scheduled:3,Completed:7}} value={filters.status} setValue={v=>setFilters({...filters,status:v})}/>
    {candidatesMode && <FilterGroup title="Wave" items={['Wave 01','Wave 02','Wave 03','Wave 04']} value={filters.wave} setValue={v=>setFilters({...filters,wave:v})} radio/>}
    {mode === 'Analytics' && <FilterGroup title="Wave" items={['Wave 01','Wave 02','Wave 03','Wave 04']} value={filters.wave} setValue={v=>setFilters({...filters,wave:v})} radio/>}
    {candidatesMode && <FilterGroup title="Expertise" items={['Founder / CEO','Investor','Product','Media / Content','Finance','Creative / Brand','Other']} value={filters.expertise||'All'} setValue={v=>setFilters({...filters,expertise:v})}/>}
    {accessMode && <><SelectSide label="Drop" value={filters.drop||'All drops'} options={['All drops','Wave 01','Wave 02','Partner Access','Waitlist Release']} onChange={v=>setFilters({...filters,drop:v})}/><FilterGroup title="Code type" items={['Single-use','Multi-use']} value={filters.codeType||'All'} setValue={v=>setFilters({...filters,codeType:v})}/><FilterGroup title="Expiry" items={['Expires in 7 days','Expired']} value={filters.expiry||'All'} setValue={v=>setFilters({...filters,expiry:v})}/></>}
    <SelectSide label="Source" value={filters.source==='All'?'All sources':filters.source} options={['All sources','Website','Telegram bot','Partner','Referral']} onChange={v=>setFilters({...filters,source:v==='All sources'?'All':v})}/>
    <button className={`save-view ${viewSaved?'saved':''}`} onClick={()=>{if(viewSaved){localStorage.removeItem('ceomentality:view');setViewSaved(false)}else{localStorage.setItem('ceomentality:view',JSON.stringify({filters,query,mode}));setViewSaved(true)}}}><Icon name="bookmark"/>{viewSaved?'Saved view':'Save view'}</button>
  </aside>;
}

function SelectSide({label,value,onChange,options=[value]}:SelectSideProps) { return <div className="filter-block"><label>{label}</label><CustomSelect className="side-select" value={value} options={options} onChange={onChange}/></div> }

function FilterGroup({title,items,counts={},value,setValue,radio}:FilterGroupProps) {
  const allLabel = title === 'Wave' ? 'All waves' : title === 'Expertise' ? 'All expertise' : 'All';
  return <div className={`check-group group-${title.toLowerCase().replace(/\s+/g,'-')}`}><h3>{title}</h3><button className="check-row selected" onClick={()=>setValue('All')}><span className={`${radio?'radio':'box'} ${value==='All'?'active':''}`}/><span>{allLabel}</span></button>{items.map(x=><button className="check-row" key={x} onClick={()=>setValue(x)}><span className={`${radio?'radio':'box'} ${value===x?'active':''}`}/><span>{x}</span>{counts[x]!=null&&<b>{counts[x]}</b>}</button>)}</div>
}
