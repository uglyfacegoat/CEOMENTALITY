import { useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import type { DropDraft } from '../../types/domain';

export function DropForm({onClose,onSubmit}:{onClose:()=>void;onSubmit:(draft:DropDraft)=>void}) {
 const [form,setForm]=useState<DropDraft>({name:'',description:'',issued:200,validity:'30 days',code:''});
 const submit=(event:FormEvent)=>{event.preventDefault();onSubmit(form)};
 return <Modal title="Create drop" onClose={onClose}><form className="form-grid" onSubmit={submit}>{([['name','Drop name'],['description','Description'],['issued','Code quantity'],['validity','Validity'],['code','Shared access code']] as const).map(([key,label])=><label className={key==='description'?'full':''} key={key}>{label}<input required value={form[key]} type={key==='issued'?'number':'text'} onChange={event=>setForm({...form,[key]:key==='issued'?Number(event.target.value):event.target.value})}/></label>)}<div className="form-actions"><button type="button" className="outline-btn" onClick={onClose}>Cancel</button><button type="submit" className="primary-btn">Create drop</button></div></form></Modal>;
}
