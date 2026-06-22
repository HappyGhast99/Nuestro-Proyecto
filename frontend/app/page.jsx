"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState({ nombre: '', instructor: '', creditos: '', difficulty: 'Medium' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch user profile (always mock ID 1 for now)
      const userRes = await fetch(`${API_URL}/api/user/profile`);
      if (!userRes.ok) throw new Error('Error al cargar perfil de usuario');
      const userData = await userRes.json();
      setUser(userData);

      // Fetch courses
      const cursosRes = await fetch(`${API_URL}/cursos`);
      if (!cursosRes.ok) throw new Error('Error al cargar la lista de cursos');
      const cursosData = await cursosRes.json();
      setCursos(cursosData);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.instructor || !form.creditos) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          instructor: form.instructor,
          creditos: parseInt(form.creditos, 10),
          difficulty: form.difficulty
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al crear la actividad');
      }

      setForm({ nombre: '', instructor: '', creditos: '', difficulty: 'Medium' });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cursos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar la actividad');
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/activities/${id}/complete`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al completar la actividad');
      }
      const data = await res.json();
      alert(`¡Actividad completada! Ganaste ${data.awardedXp} XP.`);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <div className="title-group">
          <h1>🎯 FocusPets Dashboard</h1>
          <p className="subtitle">Gestiona tus cursos y racha de estudio</p>
        </div>

        {user && (
          <div className="profile-card">
            <div className="profile-info">
              <span className="avatar">👤</span>
              <div>
                <h2>{user.name}</h2>
                <span className="streak-badge">🔥 {user.current_streak} días de racha</span>
              </div>
            </div>
            <div className="xp-section">
              <div className="xp-labels">
                <span>Progreso de XP</span>
                <span className="xp-value">{user.total_xp} XP</span>
              </div>
              <div className="xp-bar-container">
                <div 
                  className="xp-bar-fill" 
                  style={{ width: `${Math.min((user.total_xp % 100), 100)}%` }}
                ></div>
              </div>
              <span className="xp-sub">Nivel {Math.floor(user.total_xp / 100) + 1}</span>
            </div>
          </div>
        )}
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="grid-layout">
        {/* Formulario */}
        <section className="card form-section">
          <h3>➕ Agregar Nueva Actividad / Curso</h3>
          <form onSubmit={handleCreate} className="course-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del Curso</label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. Introducción a la Física"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="instructor">Instructor</label>
              <input
                id="instructor"
                type="text"
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                placeholder="Ej. Dr. Hawking"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="creditos">Créditos</label>
                <input
                  id="creditos"
                  type="number"
                  value={form.creditos}
                  onChange={(e) => setForm({ ...form, creditos: e.target.value })}
                  placeholder="Ej. 6"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Dificultad</label>
                <select
                  id="difficulty"
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                >
                  <option value="Easy">Easy (10 XP)</option>
                  <option value="Medium">Medium (25 XP)</option>
                  <option value="Hard">Hard (50 XP)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Crear Actividad</button>
          </form>
        </section>

        {/* Listado */}
        <section className="card list-section">
          <h3>📚 Actividades y Cursos Activos</h3>
          {loading ? (
            <p className="loading-text">Cargando actividades...</p>
          ) : cursos.length === 0 ? (
            <p className="empty-text">No hay actividades creadas. ¡Empieza agregando una!</p>
          ) : (
            <div className="courses-list">
              {cursos.map((c) => (
                <div key={c.id} className="course-item">
                  <div className="course-details">
                    <h4>{c.nombre}</h4>
                    <p className="course-meta">
                      <span>👤 {c.instructor}</span> • <span>🎓 {c.creditos} créditos</span>
                    </p>
                    <span className={`diff-tag ${c.difficulty.toLowerCase()}`}>
                      {c.difficulty}
                    </span>
                  </div>
                  <div className="course-actions">
                    <button 
                      onClick={() => handleComplete(c.id)} 
                      className="btn btn-success"
                      title="Completar actividad y ganar XP"
                    >
                      ✅ Completar
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)} 
                      className="btn btn-danger"
                      title="Eliminar curso"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
