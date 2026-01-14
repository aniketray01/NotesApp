import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../redux/Slice'
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import styles from './Pastes.module.css';

const Pastes = () => {
  const allpaste = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Removed = (data) => {
    dispatch(remove(data));
    toast.success('Note deleted successfully!');
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📚 All Notes</h1>
        <p className={styles.subtitle}>
          {allpaste.length} {allpaste.length === 1 ? 'note' : 'notes'} saved
        </p>
      </div>

      {allpaste.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h2 className={styles.emptyTitle}>No notes yet</h2>
          <p className={styles.emptyText}>
            Create your first note to get started!
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {allpaste.map((paste) => (
            <div key={paste.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{paste.Title}</h3>
              <p className={styles.cardContent}>{paste.value}</p>
              <div className={styles.cardDate}>
                🕒 {formatDate(paste.createdAt)}
              </div>
              <div className={styles.actions}>
                <button
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => navigate(`/viewpastes?id=${paste.id}`)}
                >
                  👁️ View
                </button>
                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => navigate(`/?pasteid=${paste.id}`)}
                >
                  ✏️ Edit
                </button>
                <CopyToClipboard
                  text={paste.value}
                  onCopy={() => toast.success("Copied to clipboard!")}
                >
                  <button className={`${styles.actionButton} ${styles.copyButton}`}>
                    📋 Copy
                  </button>
                </CopyToClipboard>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => Removed(paste.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default Pastes
