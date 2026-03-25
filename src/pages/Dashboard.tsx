import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/authContext';
import { useUI } from '../features/uiContext';
import api from '../api/axios';
import Header from '../components/Header';
import HeaderMUI from '../components/HeaderMUI';
import HeaderBS from '../components/HeaderBS';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import styles from './Dashboard.module.css';

interface Project { id: string; name: string; color: string; }
interface Column { id: string; title: string; tasks: string[]; }

export default function Dashboard() {
    const { state: authState, dispatch } = useAuth();
    const { uiType, toggleUI } = useUI();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [columns, setColumns] = useState<Column[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [projRes, colRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/columns'),
                ]);
                setProjects(projRes.data);
                setColumns(colRes.data);
            } catch (e) {
                console.error(e);
                setError('Erreur lors du chargement des données');
            }
            finally { setLoading(false); }
        }
        fetchData();
    }, []);

    async function addProject(name: string, color: string) {
        setSaving(true);
        setError(null);
        try {
            const { data } = await api.post('/projects', { name, color });
            setProjects(prev => [...prev, data]);
            setShowForm(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || `Erreur ${err.response?.status}`);
            } else {
                setError('Erreur inconnue');
            }
        } finally {
            setSaving(false);
        }
    }

    async function renameProject(id: string, project: Project) {
        const newName = prompt('Nouveau nom :', project.name);
        if (!newName || newName === project.name) return;

        setSaving(true);
        setError(null);
        try {
            const { data } = await api.put(`/projects/${id}`, { ...project, name: newName });
            setProjects(prev => prev.map(p => p.id === id ? data : p));
        } catch (err) {
            console.error(err);
            setError('Erreur lors du renommage');
        } finally {
            setSaving(false);
        }
    }

    async function deleteProject(id: string) {
        if (!confirm('Êtes-vous sûr ?')) return;

        setSaving(true);
        setError(null);
        try {
            await api.delete(`/projects/${id}`);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la suppression');
        } finally {
            setSaving(false);
        }
    }

    const renderHeader = () => {
        const headerProps = {
            title: "TaskFlow",
            onMenuClick: () => setSidebarOpen(p => !p),
            userName: authState.user?.name,
            onLogout: () => dispatch({ type: 'LOGOUT' })
        };

        switch (uiType) {
            case 'MUI':
                return <HeaderMUI {...headerProps} />;
            case 'Bootstrap':
                return <HeaderBS {...headerProps} />;
            default:
                return <Header {...headerProps} />;
        }
    };

    if (loading) return <div className={styles.loading}>Chargement...</div>;

    return (
        <div className={styles.layout}>
            {renderHeader()}
            <div className={styles.body}>
                <Sidebar
                    projects={projects}
                    isOpen={sidebarOpen}
                    onRenameProject={renameProject}
                    onDeleteProject={deleteProject}
                />
                <div className={styles.content}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.toolbar} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            {!showForm ? (
                                <button
                                    className={styles.addBtn}
                                    onClick={() => setShowForm(true)}
                                    disabled={saving}
                                >
                                    + Nouveau projet
                                </button>
                            ) : (
                                <ProjectForm
                                    submitLabel={saving ? 'Enregistrement...' : 'Créer'}
                                    onSubmit={addProject}
                                    onCancel={() => setShowForm(false)}
                                />
                            )}
                        </div>

                        {/* UI Switcher */}
                        <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>UI Mode: {uiType}</span>
                            <button
                                onClick={toggleUI}
                                style={{
                                    padding: '5px 12px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: uiType === 'MUI' ? '#1976d2' : '#0d6efd',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Switch to {uiType === 'MUI' ? 'Bootstrap' : 'MUI'}
                            </button>
                        </div>
                    </div>
                    <MainContent columns={columns} />
                </div>
            </div>
        </div>
    );
}