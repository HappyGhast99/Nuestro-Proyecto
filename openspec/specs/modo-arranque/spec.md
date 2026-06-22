# modo-arranque Specification

## Purpose
TBD - created by archiving change incentivos-inicio-tareas. Update Purpose after archive.
## Requirements
### Requirement: Temporizador de Inicio Rápido (Modo Arranque)
El sistema SHALL proveer un botón de "Iniciar sesión rápida" que active un temporizador de corta duración (5 o 10 minutos) orientado a reducir la resistencia inicial a comenzar una tarea.

#### Scenario: Iniciar sesión rápida
- **WHEN** el usuario presiona el botón de "Iniciar sesión rápida" eligiendo una duración de 5 o 10 minutos
- **THEN** el sistema inicia un temporizador de cuenta regresiva en segundo plano o visible en la interfaz.

#### Scenario: Entrega de mini-logro al finalizar
- **WHEN** el temporizador de inicio rápido llega a cero (00:00) y finaliza la sesión activa
- **THEN** el sistema otorga un mini-logro o bonificación menor para recompensar la reducción de fricción inicial.

