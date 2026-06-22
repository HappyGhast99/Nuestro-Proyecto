// API endpoints base URL (localhost relative)
const API_BASE = '';

let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isTimerPaused = false;
let activeTareaId = null;

let currentRunningTaskId = null;
let taskTimerInterval = null;
let taskTimerRemainingSeconds = 0;
let taskTimerPaused = false;

function mostrarErrorServidor() {
  const banner = document.getElementById('error-banner');
  if (banner) banner.style.display = 'block';
}

function ocultarErrorServidor() {
  const banner = document.getElementById('error-banner');
  if (banner) banner.style.display = 'none';
}

async function apiFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    ocultarErrorServidor();
    return res;
  } catch (error) {
    mostrarErrorServidor();
    throw error;
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  cargarLogros();
  cargarTareas();
});

// ==========================================
// MODO ARRANQUE (TIMER & MINI-LOGROS)
// ==========================================
function iniciarArranque(minutos, tareaId = null) {
  if (timerInterval) clearInterval(timerInterval);
  
  isTimerPaused = false;
  activeTareaId = tareaId;
  const btnPausar = document.getElementById('btn-pausar');
  if (btnPausar) {
    btnPausar.innerText = 'Pausar';
    btnPausar.className = 'btn btn-warning btn-sm';
  }
  
  totalSeconds = minutos * 60;
  remainingSeconds = totalSeconds;
  
  document.getElementById('timer-container').style.display = 'flex';
  document.getElementById('timer-value').innerText = formatTime(remainingSeconds);
  
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = 0;

  // Scroll smoothly to the timer to focus user attention
  const timerSection = document.getElementById('seccion-arranque');
  if (timerSection) {
    timerSection.scrollIntoView({ behavior: 'smooth' });
  }

  timerInterval = setInterval(() => {
    if (isTimerPaused) return;

    remainingSeconds--;
    document.getElementById('timer-value').innerText = formatTime(remainingSeconds);
    
    // Update progress circle ring
    const progress = remainingSeconds / totalSeconds;
    const offset = circumference - (progress * circumference);
    circle.style.strokeDashoffset = offset;

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById('timer-container').style.display = 'none';
      
      if (activeTareaId) {
        completarTarea(activeTareaId);
      } else {
        completarSesionArranque(minutos);
      }
    }
  }, 1000);
}

function alternarPausaArranque() {
  if (!timerInterval) return;
  isTimerPaused = !isTimerPaused;
  const btn = document.getElementById('btn-pausar');
  if (btn) {
    if (isTimerPaused) {
      btn.innerText = 'Reanudar';
      btn.className = 'btn btn-success btn-sm';
    } else {
      btn.innerText = 'Pausar';
      btn.className = 'btn btn-warning btn-sm';
    }
  }
}

function cancelarArranque() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isTimerPaused = false;
  activeTareaId = null;
  document.getElementById('timer-container').style.display = 'none';
}

async function completarSesionArranque(minutos) {
  try {
    const res = await apiFetch(`${API_BASE}/arranque/completar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duracion: minutos })
    });
    const data = await res.json();
    
    if (res.status === 201) {
      cargarLogros();
      // Show reward celebration
      abrirModal(data.logro);
    } else {
      alert(data.error || 'Error al completar la sesión.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function cargarLogros() {
  try {
    const res = await apiFetch(`${API_BASE}/mini-logros`);
    const logros = await res.json();
    const listElement = document.getElementById('lista-logros');
    
    if (logros.length === 0) {
      listElement.innerHTML = '<li class="empty-list">No has completado sesiones rápidas hoy.</li>';
      return;
    }

    listElement.innerHTML = logros.map(logro => `
      <li>
        <span>🎯</span>
        <div style="flex-grow: 1;">
          <strong>${logro.descripcion}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${new Date(logro.fecha).toLocaleTimeString()}</div>
        </div>
      </li>
    `).join('');
  } catch (error) {
    console.error('Error al cargar logros:', error);
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ==========================================
// TAREAS & RECOMPENSAS
// ==========================================
async function crearTarea(event) {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion').value;
  const recompensa = document.getElementById('recompensa').value;
  const duracion_bloque = parseInt(document.getElementById('duracion_bloque').value);
  const proyecto_grande = document.getElementById('proyecto_grande').checked;

  try {
    const res = await apiFetch(`${API_BASE}/tareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descripcion, recompensa, duracion_bloque, proyecto_grande })
    });
    
    if (res.status === 201) {
      document.getElementById('task-form').reset();
      cargarTareas();
    } else {
      const data = await res.json();
      alert(data.error || 'Error al crear la tarea.');
    }
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
}

async function cargarTareas() {
  try {
    const res = await apiFetch(`${API_BASE}/tareas`);
    const tareas = await res.json();
    const listElement = document.getElementById('lista-tareas');
    
    if (tareas.length === 0) {
      listElement.innerHTML = '<div class="empty-list">No tienes tareas activas. ¡Comienza creando una!</div>';
      return;
    }

    listElement.innerHTML = '';
    
    for (const tarea of tareas) {
      // Fetch subtasks for this task
      const resSubs = await apiFetch(`${API_BASE}/subtareas/tarea/${tarea.id}`);
      const subtareas = await resSubs.json();
      
      const taskCard = document.createElement('div');
      taskCard.className = `task-item ${tarea.estado === 'completada' ? 'completada' : ''}`;
      
      let subtasksHtml = '';
      if (subtareas.length > 0) {
        subtasksHtml = `
          <div class="subtasks-section">
            <div class="subtasks-header">Checklist de Subtareas:</div>
            ${subtareas.map(sub => `
              <div class="subtask-item ${sub.estado === 'completada' ? 'completada' : ''}">
                <input type="checkbox" ${sub.estado === 'completada' ? 'checked' : ''} 
                       ${tarea.estado === 'completada' ? 'disabled' : ''}
                       onchange="cambiarEstadoSubtarea(${sub.id}, this)">
                <span>${sub.descripcion}</span>
              </div>
            `).join('')}
          </div>
        `;
      } else if (tarea.estado === 'pendiente') {
        subtasksHtml = `
          <div class="subtasks-section">
            <button class="btn btn-secondary btn-sm" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;" onclick="desglosarTarea(${tarea.id})">
              🪄 Desglosar Tarea en Subtareas
            </button>
          </div>
        `;
      }

      let timerHtml = '';
      if (tarea.estado === 'pendiente') {
        const isThisTaskRunning = currentRunningTaskId === tarea.id;
        const timeDisplay = isThisTaskRunning ? formatTime(taskTimerRemainingSeconds) : `${tarea.duracion_bloque}:00`;
        const btnText = isThisTaskRunning ? (taskTimerPaused ? 'Reanudar' : 'Pausar') : 'Iniciar Enfoque';
        const btnClass = isThisTaskRunning ? (taskTimerPaused ? 'btn btn-success btn-sm' : 'btn btn-warning btn-sm') : 'btn btn-primary btn-sm';
        const cancelStyle = isThisTaskRunning ? '' : 'style="display: none;"';

        timerHtml = `
          <div class="task-card-timer" id="task-timer-ui-${tarea.id}">
            <span class="timer-display-text" id="task-timer-value-${tarea.id}">⏱️ ${timeDisplay}</span>
            <button class="${btnClass}" id="task-timer-btn-start-${tarea.id}" onclick="alternarTemporizadorTarea(${tarea.id}, ${tarea.duracion_bloque})">${btnText}</button>
            <button class="btn btn-danger btn-sm" id="task-timer-btn-cancel-${tarea.id}" ${cancelStyle} onclick="cancelarTemporizadorTarea(${tarea.id})">Cancelar</button>
          </div>
        `;
      }

      taskCard.innerHTML = `
        <div class="task-main-row">
          <div class="task-info">
            <h4 style="${tarea.estado === 'completada' ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${tarea.titulo}</h4>
            <p>${tarea.descripcion || 'Sin descripción'}</p>
            <span class="task-reward-badge">🎁 Recompensa: ${tarea.recompensa}</span>
            <span class="task-duration-badge">⏱️ ${tarea.duracion_bloque} min</span>
          </div>
          <div class="task-actions" style="display: flex; align-items: center; gap: 0.5rem;">
            ${tarea.estado === 'pendiente' ? `
              <button class="btn btn-success btn-sm" onclick="completarTarea(${tarea.id})">Completar</button>
            ` : `
              <span style="color: var(--success); font-weight: 600; font-size: 0.85rem;">✓ Completada</span>
              <button class="btn-delete" title="Eliminar tarea" onclick="eliminarTarea(${tarea.id})">🗑️</button>
            `}
          </div>
        </div>
        ${subtasksHtml}
        ${timerHtml}
      `;
      
      listElement.appendChild(taskCard);
    }
  } catch (error) {
    console.error('Error al cargar tareas:', error);
  }
}

async function desglosarTarea(tareaId) {
  try {
    const res = await apiFetch(`${API_BASE}/tareas/${tareaId}/desglosar`, {
      method: 'POST'
    });
    if (res.status === 201) {
      cargarTareas();
    } else {
      alert('Error al desglosar la tarea.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function cambiarEstadoSubtarea(subtareaId, checkbox) {
  try {
    const res = await apiFetch(`${API_BASE}/subtareas/${subtareaId}/estado`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: checkbox.checked ? 'completada' : 'pendiente' })
    });
    const data = await res.json();
    
    if (res.status === 200) {
      // Toggle parent style class
      checkbox.parentElement.classList.toggle('completada', checkbox.checked);
      
      // If it was the first completed subtask, trigger the Toast Notification!
      if (data.primer_paso_recompensado) {
        mostrarToastPrimerPaso();
      }
    } else {
      checkbox.checked = !checkbox.checked;
      alert(data.error || 'Error al actualizar la subtarea.');
    }
  } catch (error) {
    checkbox.checked = !checkbox.checked;
    console.error('Error:', error);
  }
}

async function completarTarea(tareaId) {
  try {
    const res = await apiFetch(`${API_BASE}/tareas/${tareaId}/completar`, {
      method: 'PUT'
    });
    const data = await res.json();
    
    if (res.status === 200) {
      cargarTareas();
      abrirModal(data.recompensa);
    } else {
      alert(data.error || 'Error al completar la tarea.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// ==========================================
// INTERFACES Y CELEBRACIONES
// ==========================================
function abrirModal(recompensa) {
  document.getElementById('reward-text').innerText = recompensa;
  document.getElementById('modal-recompensa').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal-recompensa').style.display = 'none';
}

function mostrarToastPrimerPaso() {
  const toast = document.getElementById('toast-primer-paso');
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.5s ease forwards';
    setTimeout(() => {
      toast.style.display = 'none';
      toast.style.animation = 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 500);
  }, 4000);
}

async function eliminarTarea(tareaId) {
  if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return;
  try {
    const res = await apiFetch(`${API_BASE}/tareas/${tareaId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      cargarTareas();
    } else {
      const data = await res.json();
      alert(data.error || 'Error al eliminar la tarea.');
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
}

function alternarTemporizadorTarea(tareaId, minutos) {
  if (currentRunningTaskId !== null && currentRunningTaskId !== tareaId) {
    alert('Ya tienes un temporizador corriendo en otra tarea. Termínalo o cancélalo primero.');
    return;
  }

  const startBtn = document.getElementById(`task-timer-btn-start-${tareaId}`);
  const cancelBtn = document.getElementById(`task-timer-btn-cancel-${tareaId}`);
  const timerText = document.getElementById(`task-timer-value-${tareaId}`);

  if (currentRunningTaskId === null) {
    currentRunningTaskId = tareaId;
    taskTimerRemainingSeconds = minutos * 60;
    taskTimerPaused = false;

    if (startBtn) {
      startBtn.innerText = 'Pausar';
      startBtn.className = 'btn btn-warning btn-sm';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-flex';
    }

    taskTimerInterval = setInterval(() => {
      if (taskTimerPaused) return;

      taskTimerRemainingSeconds--;
      if (timerText) {
        timerText.innerText = `⏱️ ${formatTime(taskTimerRemainingSeconds)}`;
      }

      if (taskTimerRemainingSeconds <= 0) {
        clearInterval(taskTimerInterval);
        taskTimerInterval = null;
        currentRunningTaskId = null;
        completarTarea(tareaId);
      }
    }, 1000);
  } else {
    taskTimerPaused = !taskTimerPaused;
    if (startBtn) {
      if (taskTimerPaused) {
        startBtn.innerText = 'Reanudar';
        startBtn.className = 'btn btn-success btn-sm';
      } else {
        startBtn.innerText = 'Pausar';
        startBtn.className = 'btn btn-warning btn-sm';
      }
    }
  }
}

function cancelarTemporizadorTarea(tareaId) {
  if (currentRunningTaskId === tareaId) {
    clearInterval(taskTimerInterval);
    taskTimerInterval = null;
    currentRunningTaskId = null;
    taskTimerPaused = false;
  }
  cargarTareas();
}
