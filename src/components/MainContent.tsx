import styles from './MainContent.module.css';

interface Column { id: string; title: string; tasks: string[]; }
interface MainContentProps { columns: Column[]; }

export default function MainContent({ columns }: MainContentProps) {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map(col => (
          <div key={col.id} className={styles.column}>
            <div className={styles.colHeader}>
              <h3 className={styles.colTitle}>
                {col.title}
                <span className={styles.taskCount}>{col.tasks.length}</span>
              </h3>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
            <div className={styles.taskList}>
              {col.tasks.map((task, i) => (
                <div key={i} className={styles.card}>{task}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}