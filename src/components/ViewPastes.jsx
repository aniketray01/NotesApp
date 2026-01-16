import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, Calendar, Tag, FileText, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ViewPastes.module.css';

const ViewPastes = () => {
  const [Title, setTitle] = useState('');
  const [value, setvalue] = useState('');
  const [label, setLabel] = useState('none');
  const [createdAt, setCreatedAt] = useState(null);
  const [searchParam, setsearchParam] = useSearchParams();
  const pastid = searchParam.get("id");
  const allpastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();

  useEffect(() => {
    const paste = Array.isArray(allpastes) ? allpastes.find((p) => (p.id === pastid || p._id === pastid)) : null;
    if (paste) {
      setTitle(paste.Title);
      setvalue(paste.value);
      setLabel(paste.label || "none");
      setCreatedAt(paste.createdAt);
    }
  }, [pastid, allpastes]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className={styles.container}>
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/pastes')}
        className={styles.backButton}
      >
        <ChevronLeft size={16} />
        <span>Back to Notes</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.viewCard}
      >
        <div className={styles.cardHeader}>
          <div className={styles.statusBadge}>
            <Eye size={12} />
            <span>Read-Only View</span>
          </div>
          {label !== "none" && (
            <div className={styles.categoryBadge}>
              <Tag size={12} />
              <span>{label}</span>
            </div>
          )}
        </div>

        <div className={styles.contentSection}>
          <h1 className={styles.noteTitle}>{Title || "Untitled Note"}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={14} />
              <span>{Math.ceil(value.replace(/<[^>]*>/g, '').trim().split(/\s+/).length / 200)} min read</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.textAreaWrapper}>
            <FileText size={18} className={styles.contentIcon} />
            <div
              className={styles.noteContent}
              dangerouslySetInnerHTML={{ __html: value || "<p>No content available.</p>" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ViewPastes;
