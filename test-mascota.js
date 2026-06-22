const http = require('http');

const BASE = 'localhost';
const PORT = 3000;
const UID = 1;

let passed = 0;
let failed = 0;

function req(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: BASE,
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {})
      }
    };
    const r = http.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    r.on('error', reject);
    if (bodyStr) r.write(bodyStr);
    r.end();
  });
}

function check(label, condition, detail) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.log(`  ❌ ${label} — ${detail}`);
    failed++;
  }
}

async function run() {
  console.log('\n═══════════════════════════════════════════════');
  console.log('   TEST: Selección Inicial de Mascota Virtual');
  console.log('═══════════════════════════════════════════════\n');

  // CA 1: Usuario puede ingresar (usuario existe en DB)
  console.log('📋 CA 1: El usuario puede ingresar sin problemas');
  const userCheck = await req('GET', `/api/usuarios/${UID}/mascota`);
  check('Usuario de prueba (ID 1) existe', userCheck.status !== 500, `HTTP ${userCheck.status}`);

  // CA 2: GET sin mascota devuelve 404 con hasPet:false
  console.log('\n📋 CA 2: Sin mascota el sistema devuelve 404');
  const noMascota = await req('GET', `/api/usuarios/${UID}/mascota`);
  check('GET retorna 404 cuando no hay mascota', noMascota.status === 404, `HTTP ${noMascota.status}`);
  check('Cuerpo indica hasPet: false', noMascota.body.hasPet === false, `body: ${JSON.stringify(noMascota.body)}`);

  // CA 3: Validación — nombre vacío retorna 400
  console.log('\n📋 CA 3: Nombre vacío retorna 400 Bad Request');
  const nombreVacio = await req('POST', `/api/usuarios/${UID}/mascota`, { nombre_mascota: '', tipo_mascota: 'Gato' });
  check('POST con nombre vacío retorna 400', nombreVacio.status === 400, `HTTP ${nombreVacio.status}`);

  // CA 4: Validación — tipo inválido retorna 400
  console.log('\n📋 CA 4: Tipo inválido retorna 400 Bad Request');
  const tipoInvalido = await req('POST', `/api/usuarios/${UID}/mascota`, { nombre_mascota: 'Michi', tipo_mascota: 'Dragón' });
  check('POST con tipo inválido retorna 400', tipoInvalido.status === 400, `HTTP ${tipoInvalido.status}`);

  // CA 5: Creación exitosa — retorna 201 con datos de la mascota
  console.log('\n📋 CA 5: Creación exitosa retorna 201 y datos de la mascota');
  const crear = await req('POST', `/api/usuarios/${UID}/mascota`, { nombre_mascota: 'Michi', tipo_mascota: 'Gato' });
  check('POST retorna 201 Created', crear.status === 201, `HTTP ${crear.status}`);
  check('Respuesta incluye nombre_mascota', crear.body.nombre_mascota === 'Michi', `body: ${JSON.stringify(crear.body)}`);
  check('Respuesta incluye tipo_mascota', crear.body.tipo_mascota === 'Gato', `body: ${JSON.stringify(crear.body)}`);
  check('Mascota inicia con salud 100', crear.body.salud === 100, `salud: ${crear.body.salud}`);
  check('Mascota inicia en nivel 1', crear.body.nivel === 1, `nivel: ${crear.body.nivel}`);
  check('Mascota queda asociada al usuario', crear.body.usuario_id === UID, `usuario_id: ${crear.body.usuario_id}`);

  // CA 6: GET con mascota existente retorna 200
  console.log('\n📋 CA 6: GET con mascota guardada retorna 200 (persistencia)');
  const conMascota = await req('GET', `/api/usuarios/${UID}/mascota`);
  check('GET retorna 200 con mascota guardada', conMascota.status === 200, `HTTP ${conMascota.status}`);
  check('Respuesta tiene hasPet: true', conMascota.body.hasPet === true, `body: ${JSON.stringify(conMascota.body)}`);

  // CA 7: Usuario ya con mascota retorna 400 al crear otra
  console.log('\n📋 CA 7: Crear segunda mascota retorna 400');
  const duplicado = await req('POST', `/api/usuarios/${UID}/mascota`, { nombre_mascota: 'Otro', tipo_mascota: 'Perro' });
  check('POST con mascota duplicada retorna 400', duplicado.status === 400, `HTTP ${duplicado.status}`);

  // CA 8: Usuario no existente retorna 404
  console.log('\n📋 CA 8: Usuario inexistente retorna 404');
  const noExiste = await req('GET', `/api/usuarios/9999/mascota`);
  check('GET usuario inexistente retorna 404', noExiste.status === 404, `HTTP ${noExiste.status}`);

  console.log('\n═══════════════════════════════════════════════');
  console.log(`   RESULTADO: ${passed} pasados ✅  |  ${failed} fallidos ❌`);
  console.log('═══════════════════════════════════════════════\n');
  
  // Limpiar mascota de prueba para dejar DB limpia
  const db = require('./db');
  db.prepare('DELETE FROM mascotas WHERE nombre_mascota = ?').run('Michi');
  console.log('🧹 DB restaurada (mascota de test eliminada)\n');
}

run().catch(console.error);
