import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePaste } from '../redux/Slice'
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import styles from './Pastes.module.css';

const Pastes = () => {
  const allpaste = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter notes based on search term (Title or Content)
  const filteredData = Array.isArray(allpaste)
    ? allpaste.filter((paste) =>
      paste.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // --- CHANGED: Dispatch deletePaste (async) instead of remove ---
  const Removed = (id) => {
    dispatch(deletePaste(id));
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

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search notes by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filteredData.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>{searchTerm ? '🔍' : '📝'}</div>
          <h2 className={styles.emptyTitle}>
            {searchTerm ? 'No matching notes' : 'No notes yet'}
          </h2>
          <p className={styles.emptyText}>
            {searchTerm
              ? `No results found for "${searchTerm}"`
              : 'Create your first note to get started!'}
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredData.map((paste) => {
            // MongoDB uses _id, but we also kept 'id' for compatibility
            const displayId = paste._id || paste.id;

            return (
              <div key={displayId} className={styles.card}>
                <h3 className={styles.cardTitle}>{paste.Title}</h3>
                <p className={styles.cardContent}>{paste.value}</p>
                <div className={styles.cardDate}>
                  🕒 {formatDate(paste.createdAt)}
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => navigate(`/viewpastes?id=${displayId}`)}
                  >
                    👁️ View
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => navigate(`/?pasteid=${displayId}`)}
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
                    onClick={() => Removed(displayId)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
};

export default Pastes
