import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchPastes } from '../redux/Slice';
import styles from './ViewPastes.module.css';

const ViewPastes = () => {
  const [Title, setTitle] = useState('');
  const [value, setvalue] = useState('');
  const [label, setLabel] = useState('none'); // --- ADDED: State for label ---
  const [searchParam, setsearchParam] = useSearchParams();
  const pastid = searchParam.get("id");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (!pastid) {
      setTitle("");
      setvalue("");
      setLabel("none");
    };

    // --- CHANGED: Support both 'id' and '_id' from MongoDB ---
    // Added defensive Array.isArray check to prevent s.find crashes if API returns non-array
    const paste = Array.isArray(allpastes) ? allpastes.find((p) => (p.id === pastid || p._id === pastid)) : null;
    if (paste) {
      setTitle(paste.Title);
      setvalue(paste.value);
      setLabel(paste.label || "none");
    }

  }, [pastid, allpastes]);

  // Create function removed as it's not used in ViewPastes (Read-only)


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>👁️ View Note</h1>
        <p className={styles.subtitle}>Read-only view of your note</p>
      </div>

      <div className={styles.viewCard}>
        <div className={styles.readOnlyBadge}>
          🔒 Read-Only Mode {label !== "none" && `• Categorized as ${label}`}
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
