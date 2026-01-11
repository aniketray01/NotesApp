import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { add, update } from '../redux/Slice';
import { nanoid } from "@reduxjs/toolkit";
import styles from './ViewPastes.module.css';

const ViewPastes = () => {
  const [Title, setTitle] = useState('');
  const [value, setvalue] = useState('');
  const [searchParam, setsearchParam] = useSearchParams();
  const pastid = searchParam.get("id");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (!pastid) {
      setTitle("");
      setvalue("");
    };

    const paste = allpastes.find((p) => p.id === pastid);
    if (paste) {
      setTitle(paste.Title);
      setvalue(paste.value);

    }

  }, [pastid, allpastes]);

  function Create() {
    const data = { Title, value, id: pastid || nanoid(), createdAt: new Date().toISOString() };
    if (pastid) {
      dispatch(update(data));

    }
    else {
      dispatch(add(data));
    }
    setTitle('');
    setvalue('');
    setsearchParam({});
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>👁️ View Note</h1>
        <p className={styles.subtitle}>Read-only view of your note</p>
      </div>

      <div className={styles.viewCard}>
        <div className={styles.readOnlyBadge}>
          🔒 Read-Only Mode
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            disabled
            placeholder='Enter Title here'
            value={Title}
            className={styles.input}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Content</label>
          <textarea
            value={value}
            disabled
            placeholder='Enter text'
            onChange={(e) => { setvalue(e.target.value) }}
            className={`${styles.input} ${styles.textarea}`}
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default ViewPastes
