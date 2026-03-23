'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {

  const [data,setData]=useState<any[]>([]);
  const [name,setName]=useState('');
  const [time,setTime]=useState('');
  const [note,setNote]=useState('');

  useEffect(()=>{
    const saved=localStorage.getItem('data');
    if(saved) setData(JSON.parse(saved));
  },[]);

  const save=()=>{
    const next=[...data,{name,time,note,date:new Date().toISOString()}];
    setData(next);
    localStorage.setItem('data',JSON.stringify(next));
  };

  const backup=()=>{
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='backup.json';
    a.click();
  };

  const restore=(e:any)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      const parsed=JSON.parse(reader.result as string);
      setData(parsed);
      localStorage.setItem('data',JSON.stringify(parsed));
    };
    reader.readAsText(file);
  };

  return (
    <div style={{padding:20}}>
      <h2>양주옥정회중 3집단 봉사기록</h2>

      <input placeholder="이름" value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder="시간" value={time} onChange={e=>setTime(e.target.value)} /><br/>
      <input placeholder="비고" value={note} onChange={e=>setNote(e.target.value)} /><br/><br/>

      <button onClick={save}>저장</button>
      <button onClick={backup}>백업</button>
      <input type="file" onChange={restore}/>

      <pre>{JSON.stringify(data,null,2)}</pre>
    </div>
  );
}