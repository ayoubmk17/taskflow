import styles from './Sidebar.module.css';

interface Project { id: string; name: string; color: string; }
interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRenameProject: (id: string, project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export default function Sidebar({ projects, isOpen, onRenameProject, onDeleteProject }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id} className={styles.item}>
            <div className={styles.projectInfo}>
              <span className={styles.dot} style={{ background: p.color }} />
              <span className={styles.projectName}>{p.name}</span>
            </div>
            <div className={styles.projectActions}>
              <button className={styles.actionBtn} onClick={() => onRenameProject(p.id, p)} title="Renommer">✏️</button>
              <button className={styles.actionBtn} onClick={() => onDeleteProject(p.id)} title="Supprimer">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
} 