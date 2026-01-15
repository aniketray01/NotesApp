import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addPaste, updatePaste } from '../redux/Slice';
import { nanoid } from "@reduxjs/toolkit";
import styles from './Home.module.css';

const Home = () => {
  const [Title, setTitle] = useState('');
  const [value, setvalue] = useState('');
  const [searchParam, setsearchParam] = useSearchParams();
  const pastid = searchParam.get("pasteid");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (!pastid) {
      setTitle("");
      setvalue("");
    };

    // --- CHANGED: Check both 'id' and '_id' for compatibility ---
    // Added defensive Array.isArray check to prevent s.find crashes if API returns non-array
    const paste = Array.isArray(allpastes) ? allpastes.find((p) => (p.id === pastid || p._id === pastid)) : null;
    if (paste) {
      setTitle(paste.Title);
      setvalue(paste.value);
    }

  }, [pastid, allpastes]);

  function Create() {
    // --- CHANGED: Dispatch async thunks for MongoDB operations ---
    if (pastid) {
      const existingPaste = allpastes.find((p) => (p.id === pastid || p._id === pastid));
      const data = {
        ...existingPaste,
        Title,
        value,
      };
      // Dispatch update to MongoDB
      dispatch(updatePaste(data));
    }
    else {
      const data = {
        Title,
        value,
        id: nanoid(),
        createdAt: new Date().toISOString()
      };
      // Dispatch add to MongoDB
      dispatch(addPaste(data));
    }
    setTitle('');
    setvalue('');
    setsearchParam({});
  }

  function handleClear() {
    setTitle('');
    setvalue('');
    setsearchParam({});
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {pastid ? '✏️ Edit Note' : '✨ Create New Note'}
        </h1>
        <p className={styles.subtitle}>
          {pastid ? 'Update your note below' : 'Capture your thoughts and ideas'}
        </p>
      </div>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            placeholder='Enter a catchy title...'
            value={Title}
            className={styles.input}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Content</label>
          <textarea
            value={value}
            placeholder='Write your note here...'
            onChange={(e) => { setvalue(e.target.value) }}
            className={`${styles.input} ${styles.textarea}`}
            rows={10}
          ></textarea>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={Create}
            disabled={!Title.trim() || !value.trim()}
          >
            {pastid ? "💾 Update Note" : "✨ Create Note"}
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleClear}
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
