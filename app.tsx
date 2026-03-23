'use client';

import React, { useEffect, useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) setSaved(data);
  }, []);

  const save = () => {
    localStorage.setItem('data', text);
    setSaved(text);
    alert('저장됨');
  };

  const download = () => {
    const blob = new Blob([saved], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>테스트 앱</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: 100 }}
      />

      <br /><br />

      <button onClick={save}>저장</button>
      <button onClick={download}>백업</button>

      <h3>저장된 내용</h3>
      <div>{saved}</div>
    </div>
  );
}