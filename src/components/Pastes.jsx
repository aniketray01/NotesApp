import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePaste } from '../redux/Slice'
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Eye,
  Pencil,
  Copy,
  Trash2,
  Clock,
  Inbox,
  Filter,
  Tag,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Pastes.module.css';

const Pastes = () => {
  const allpaste = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterLabel, setFilterLabel] = React.useState("all");
  const [hoveredPaste, setHoveredPaste] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter notes based on search term AND selected label
  const filteredData = Array.isArray(allpaste)
    ? allpaste.filter((paste) => {
      const plainText = paste.value.replace(/<[^>]*>/g, '');
      const matchesSearch = paste.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plainText.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLabel = filterLabel === "all" || paste.label === filterLabel;

      return matchesSearch && matchesLabel;
    })
    : [];

  const Removed = (id) => {
    dispatch(deletePaste(id));
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const getReadingTime = (text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = plainText.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
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
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <Filter size={16} className={styles.filterGroupIcon} />
        {["all", "Minato", "Kushina"].map((l) => (
          <button
            key={l}
            className={`${styles.filterButton} ${filterLabel === l ? styles.filterActive : ''}`}
            onClick={() => setFilterLabel(l)}
          >
            {l === "all" ? "All Notes" : l}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {filteredData.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyIcon}>
              {searchTerm ? <Search size={48} /> : <Inbox size={48} />}
            </div>
            <h2 className={styles.emptyTitle}>
              {searchTerm ? 'No matching notes' : 'No notes yet'}
            </h2>
            <p className={styles.emptyText}>
              {searchTerm
                ? `No results found for "${searchTerm}"`
                : 'Create your first note to get started!'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className={styles.grid}
          >
            {filteredData.map((paste) => {
              const displayId = paste._id || paste.id;

              return (
                <motion.div
                  layout
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    show: { y: 0, opacity: 1 }
                  }}
                  key={displayId}
                  className={styles.card}
                  onMouseEnter={() => setHoveredPaste(paste)}
                  onMouseLeave={() => setHoveredPaste(null)}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{paste.Title}</h3>
                    {paste.label && paste.label !== "none" && (
                      <span className={`${styles.badge} ${styles[`badge${paste.label}`]}`}>
                        {paste.label}
                      </span>
                    )}
                  </div>

                  <p className={styles.cardContent}>{paste.value.replace(/<[^>]*>/g, '')}</p>

                  <div className={styles.cardMeta}>
                    <div className={styles.cardDate}>
                      <Calendar size={14} />
                      {formatDate(paste.createdAt)}
                    </div>
                    <div className={styles.readingTime}>
                      <Clock size={14} />
                      {getReadingTime(paste.value)}
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => navigate(`/viewpastes?id=${displayId}`)}
                      title="View Note"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => navigate(`/?pasteid=${displayId}`)}
                      title="Edit Note"
                    >
                      <Pencil size={16} />
                    </button>
                    <CopyToClipboard
                      text={paste.value.replace(/<[^>]*>/g, '')}
                      onCopy={() => toast.success("Copied to clipboard!")}
                    >
                      <button
                        className={`${styles.actionButton} ${styles.copyButton}`}
                        title="Copy Content"
                      >
                        <Copy size={16} />
                      </button>
                    </CopyToClipboard>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => Removed(displayId)}
                      title="Delete Note"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredPaste && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={styles.previewPane}
          >
            <div className={styles.previewHeader}>
              <h4 className={styles.previewTitle}>{hoveredPaste.Title}</h4>
              <div className={styles.previewMeta}>
                <span className={styles.previewDate}>
                  <Calendar size={12} />
                  {formatDate(hoveredPaste.createdAt)}
                </span>
                <span className={styles.previewTime}>
                  <Clock size={12} />
                  {getReadingTime(hoveredPaste.value)}
                </span>
                {hoveredPaste.label !== 'none' && (
                  <span className={styles.previewBadge}>
                    <Tag size={12} />
                    {hoveredPaste.label}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.previewContent}>
              <FileText size={16} className={styles.previewIcon} />
              <p>{hoveredPaste.value.replace(/<[^>]*>/g, '')}</p>
            </div>
            <div className={styles.previewFooter}>
              Hover over a note to see quick details
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

export default Pastes
