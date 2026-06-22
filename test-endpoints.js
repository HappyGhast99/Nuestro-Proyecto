const assert = require('assert');

async function runTests() {
  const baseUrl = 'http://localhost:3000';

  console.log('--- Iniciando Pruebas de Endpoints ---');

  // Test 1: POST /arranque/completar
  console.log('\nTest 1: POST /arranque/completar (duracion: 5)');
  const resArranque = await fetch(`${baseUrl}/arranque/completar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ duracion: 5 })
  });
  assert.strictEqual(resArranque.status, 201);
  const dataArranque = await resArranque.json();
  console.log('Respuesta:', dataArranque);
  assert.strictEqual(dataArranque.mensaje, 'Mini-logro otorgado');
  assert.ok(dataArranque.logro.includes('5 minutos'));

  // Test 2: GET /mini-logros
  console.log('\nTest 2: GET /mini-logros');
  const resLogros = await fetch(`${baseUrl}/mini-logros`);
  assert.strictEqual(resLogros.status, 200);
  const dataLogros = await resLogros.json();
  console.log('Logros obtenidos:', dataLogros.length);
  assert.ok(dataLogros.length > 0);

  // Test 3: POST /tareas
  console.log('\nTest 3: POST /tareas');
  const resTarea = await fetch(`${baseUrl}/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Proyecto Semestral de Arquitectura',
      descripcion: 'Desarrollar el backend y frontend unificados',
      recompensa: 'Jugar 2 partidas de Brawl Stars',
      duracion_bloque: 45
    })
  });
  assert.strictEqual(resTarea.status, 201);
  const dataTarea = await resTarea.json();
  console.log('Tarea creada:', dataTarea);
  const tareaId = dataTarea.id;

  // Test 4: POST /tareas/:id/desglosar
  console.log(`\nTest 4: POST /tareas/${tareaId}/desglosar`);
  const resDesglose = await fetch(`${baseUrl}/tareas/${tareaId}/desglosar`, {
    method: 'POST'
  });
  assert.strictEqual(resDesglose.status, 201);
  const dataDesglose = await resDesglose.json();
  console.log('Subtareas generadas:', dataDesglose.subtareas);
  assert.strictEqual(dataDesglose.subtareas.length, 3);
  const subtarea1 = dataDesglose.subtareas[0];
  const subtarea2 = dataDesglose.subtareas[1];

  // Test 5: PUT /subtareas/:id/estado (Completar la primera subtarea)
  console.log(`\nTest 5: PUT /subtareas/${subtarea1.id}/estado (completada - Primer Paso)`);
  const resSub1 = await fetch(`${baseUrl}/subtareas/${subtarea1.id}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'completada' })
  });
  assert.strictEqual(resSub1.status, 200);
  const dataSub1 = await resSub1.json();
  console.log('Respuesta subtarea 1:', dataSub1);
  assert.strictEqual(dataSub1.primer_paso_recompensado, true);

  // Test 6: PUT /subtareas/:id/estado (Completar la segunda subtarea)
  console.log(`\nTest 6: PUT /subtareas/${subtarea2.id}/estado (completada - Segundo Paso)`);
  const resSub2 = await fetch(`${baseUrl}/subtareas/${subtarea2.id}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'completada' })
  });
  assert.strictEqual(resSub2.status, 200);
  const dataSub2 = await resSub2.json();
  console.log('Respuesta subtarea 2:', dataSub2);
  assert.strictEqual(dataSub2.primer_paso_recompensado, false);

  // Test 7: PUT /tareas/:id/completar
  console.log(`\nTest 7: PUT /tareas/${tareaId}/completar`);
  const resCompletar = await fetch(`${baseUrl}/tareas/${tareaId}/completar`, {
    method: 'PUT'
  });
  assert.strictEqual(resCompletar.status, 200);
  const dataCompletar = await resCompletar.json();
  console.log('Respuesta completar:', dataCompletar);
  assert.strictEqual(dataCompletar.mensaje, 'Tarea completada con éxito');
  assert.strictEqual(dataCompletar.recompensa, 'Jugar 2 partidas de Brawl Stars');

  console.log('\n--- ¡Todas las pruebas pasaron con éxito! ---');
}

runTests().catch(err => {
  console.error('Error durante las pruebas:', err);
  process.exit(1);
});
