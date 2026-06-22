let timerInterval;
let timeLeft;
let isRunning = false;
let isStudySession = true;
let studyCycleCompleted = false;
let completedTaskIds = new Set(); // Para rastrear localmente lo completado en la sesión

function toggleCompleted() {
    const container = document.getElementById('completed-container');
    const icon = document.getElementById('toggle-icon');
    container.classList.toggle('collapsed');
    icon.classList.toggle('rotated');
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        document.getElementById('start-timer').innerText = isStudySession ? 'Reanudar Estudio' : 'Reanudar Descanso';
        isRunning = false;
    } else {
        if (!timeLeft) {
            timeLeft = (isStudySession ? document.getElementById('study-time').value : document.getElementById('rest-time').value) * 60;
        }
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                
                if (isStudySession) {
                    studyCycleCompleted = true;
                    document.getElementById('cycle-msg').innerText = '✅ ¡Ciclo de estudio completado! Ya puedes completar tareas.';
                    document.getElementById('cycle-msg').className = 'success-msg';
                    alert('¡Sesión de estudio terminada! Tiempo de descansar.');
                    isStudySession = false;
                    document.getElementById('timer-status').innerText = 'Tiempo de Descanso';
                    document.getElementById('start-timer').innerText = 'Iniciar Descanso';
                } else {
                    alert('¡Descanso terminado! ¿Listo para otra sesión?');
                    isStudySession = true;
                    document.getElementById('timer-status').innerText = 'Tiempo de Estudio';
                    document.getElementById('start-timer').innerText = 'Iniciar Estudio';
                }
                timeLeft = (isStudySession ? document.getElementById('study-time').value : document.getElementById('rest-time').value) * 60;
                updateTimerDisplay();
            }
        }, 1000);
        
        document.getElementById('start-timer').innerText = 'Pausar';
        document.getElementById('timer-status').innerText = isStudySession ? 'Estudiando...' : 'Descansando...';
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isStudySession = true;
    timeLeft = document.getElementById('study-time').value * 60;
    updateTimerDisplay();
    document.getElementById('timer-status').innerText = 'Listo para empezar';
    document.getElementById('start-timer').innerText = 'Iniciar Estudio';
}

async function fetchProfile() {
    const res = await fetch('/api/user/profile');
    const data = await res.json();
    
    document.getElementById('username').innerText = data.name;
    document.getElementById('total-xp').innerText = data.total_xp;
    document.getElementById('streak-count').innerText = data.current_streak;
    
    const fireIcon = document.getElementById('fire-icon');
    if (data.current_streak > 0) {
        fireIcon.classList.remove('hidden');
    } else {
        fireIcon.classList.add('hidden');
    }
}

async function fetchActivities() {
    const res = await fetch('/cursos');
    const activities = await res.json();
    const availableList = document.getElementById('activities-list');
    const completedList = document.getElementById('completed-list');
    
    availableList.innerHTML = '';
    completedList.innerHTML = '';
    
    activities.forEach(activity => {
        const diffEsp = { 'Easy': 'Fácil', 'Medium': 'Media', 'Hard': 'Difícil' }[activity.difficulty] || 'Media';
        const li = document.createElement('li');
        
        if (completedTaskIds.has(activity.id)) {
            li.innerHTML = `
                <div>
                    <strong>${activity.nombre}</strong> (${diffEsp})
                </div>
                <span class="status-badge">Completada ✅</span>
            `;
            completedList.appendChild(li);
        } else {
            li.innerHTML = `
                <div>
                    <strong>${activity.nombre}</strong> (${diffEsp})
                </div>
                <button class="complete-btn" onclick="completeActivity(${activity.id})">Completar</button>
            <button class="delete-btn" onclick="deleteActivity(${activity.id})">🗑️</button>
            `;
            availableList.appendChild(li);
        }
    });
}

async function addActivity() {
    const nombre = document.getElementById('new-activity-name').value;
    const difficulty = document.getElementById('new-activity-difficulty').value;

    if (!nombre) return alert('Por favor, ingresa un nombre para la actividad.');

    const res = await fetch('/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, instructor: 'Usuario', creditos: 1, difficulty })
    });

    if (res.ok) {
        document.getElementById('new-activity-name').value = '';
        fetchActivities();
    } else {
        alert('Error al agregar la actividad.');
    }
}

async function completeActivity(id) {
    if (!studyCycleCompleted) {
        return alert('¡Atención! Debes completar al menos un ciclo de estudio completo antes de marcar una tarea como terminada.');
    }

    const res = await fetch(`/api/activities/${id}/complete`, { method: 'POST' });
    if (res.ok) {
        const result = await res.json();
        alert(`¡Completado! Ganaste ${result.awardedXp} XP. Tu nueva racha es ${result.newStreak}.`);
        
        // Mover a la lista de completadas
        completedTaskIds.add(id);
        
        fetchProfile();
        fetchActivities();
    } else {
        alert('Error al completar la actividad.');
    }
}

async function deleteActivity(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
        return;
    }
    const res = await fetch(`/cursos/${id}`, { method: 'DELETE' });
    if (res.ok) {
        alert('Actividad eliminada.');
        // Si la actividad eliminada estaba en el set de completadas, removerla
        completedTaskIds.delete(id); 
        fetchActivities(); // Recargar las actividades para actualizar ambas listas
    } else {
        alert('Error al eliminar la actividad.');
    }
}

// Inicializar display
timeLeft = 25 * 60;
updateTimerDisplay();

fetchProfile();
fetchActivities();