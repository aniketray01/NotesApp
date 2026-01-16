import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addPaste, updatePaste } from '../redux/Slice';
import { nanoid } from "@reduxjs/toolkit";
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, Tag, PenLine, Sparkles, BookOpen, FileText } from 'lucide-react';

// Rich Text Editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './Home.module.css';

const Home = () => {
  const [Title, setTitle] = useState('');
  const [value, setvalue] = useState('');
  const [label, setLabel] = useState('none');
  const [searchParam, setsearchParam] = useSearchParams();
  const pastid = searchParam.get("pasteid");
  const dispatch = useDispatch();
  const allpastes = useSelector((state) => state.paste.pastes);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    if (!pastid) {
      setTitle("");
      setvalue("");
      setLabel("none");
    };

    const paste = Array.isArray(allpastes) ? allpastes.find((p) => (p.id === pastid || p._id === pastid)) : null;
    if (paste) {
      setTitle(paste.Title);
      setvalue(paste.value);
      setLabel(paste.label || "none");
    }

  }, [pastid, allpastes]);

  function Create() {
    if (pastid) {
      const existingPaste = Array.isArray(allpastes) ? allpastes.find((p) => (p.id === pastid || p._id === pastid)) : null;
      const data = {
        ...existingPaste,
        Title,
        value,
        label,
      };
      dispatch(updatePaste(data));
    }
    else {
      const data = {
        Title,
        value,
        label,
        id: nanoid(),
        createdAt: new Date().toISOString()
      };
      dispatch(addPaste(data));
    }
    setTitle('');
    setvalue('');
    setLabel('none');
    setsearchParam({});
  }

  function handleClear() {
    setTitle('');
    setvalue('');
    setLabel('none');
    setsearchParam({});
  }

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.header}
      >
        <h1 className={styles.title}>
          {pastid ? <PenLine size={32} className={styles.headerIcon} /> : <Sparkles size={32} className={styles.headerIcon} />}
          <span>{pastid ? 'Edit Note' : 'Create New Note'}</span>
        </h1>
        <p className={styles.subtitle}>
          {pastid ? 'Update your note below' : 'Capture your thoughts and ideas'}
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.form}
      >
        <div className={styles.inputGroup}>
          <div className={styles.labelWithIcon}>
            <BookOpen size={14} />
            <label className={styles.label}>Title</label>
          </div>
          <input
            type="text"
            placeholder='Enter a catchy title...'
            value={Title}
            className={styles.input}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelWithIcon}>
            <FileText size={14} />
            <label className={styles.label}>Content</label>
          </div>
          <div className={styles.editorWrapper}>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setvalue}
              placeholder="Write your brilliant ideas here..."
              modules={modules}
              className={styles.editor}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelWithIcon}>
            <Tag size={14} />
            <label className={styles.label}>Category</label>
          </div>
          <div className={styles.labelGroup}>
            {["none", "Minato", "Kushina"].map((l) => (
              <button
                key={l}
                type="button"
                className={`${styles.labelButton} ${label === l ? styles.labelActive : ''}`}
                onClick={() => setLabel(l)}
              >
                {l === "none" ? "None" : l}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={Create}
            disabled={!Title.trim() || !value.trim() || value === "<p><br></p>"}
          >
            {pastid ? <Save size={18} /> : <Plus size={18} />}
            <span>{pastid ? "Update Note" : "Create Note"}</span>
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={handleClear}
          >
            <Trash2 size={18} />
            <span>Clear</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home;
