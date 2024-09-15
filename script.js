function generarTabla() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    const tablaContainer = document.getElementById('tabla-container');
    tablaContainer.innerHTML = '';

    const tabla = document.createElement('table');

    const thead = document.createElement('thead');
    const encabezado = document.createElement('tr');
    encabezado.appendChild(document.createElement('th'));
    for (let i = 1; i <= columnas; i++) {
        const th = document.createElement('th');
        th.textContent = 's' + i;
        encabezado.appendChild(th);
    }
    thead.appendChild(encabezado);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let i = 1; i <= filas; i++) {
        const fila = document.createElement('tr');
        const thFila = document.createElement('th');
        thFila.textContent = 'a' + i;
        fila.appendChild(thFila);

        for (let j = 1; j <= columnas; j++) {
            const celda = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
    }

    tabla.appendChild(tbody);
    tablaContainer.appendChild(tabla);

    // Limpiar las tablas de resultados cuando se genera una nueva tabla
    document.getElementById('maximax-container').innerHTML = '';
    document.getElementById('minimax-container').innerHTML = '';
     // Agregar sección para probabilidades
     const probabilidadesContainer = document.getElementById('probabilidades-container');
     probabilidadesContainer.innerHTML = '<h3>Probabilidades</h3>';
     const probabilidadesInputs = document.createElement('div');
     for (let i = 1; i <= columnas; i++) {
         const label = document.createElement('label');
         label.textContent = `P(s${i}):`;
         const input = document.createElement('input');
         input.type = 'number';
         input.min = '0';
         input.max = '1';
         input.step = '0.01';
         input.id = `prob-s${i}`;
         probabilidadesInputs.appendChild(label);
         probabilidadesInputs.appendChild(input);
     }
     probabilidadesContainer.appendChild(probabilidadesInputs);
}

// Calcular Maximax y Minimax
function calcularMaxMin() {
    const filas = document.getElementById('filas').value;
    const tabla = document.querySelector('#tabla-container table tbody');

    let maximaxValues = [];
    let minimaxValues = [];

    // Recorrer cada fila y calcular el máximo y el mínimo
    for (let i = 0; i < filas; i++) {
        const inputs = tabla.rows[i].querySelectorAll('input');
        let valoresFila = Array.from(inputs).map(input => parseFloat(input.value) || 0);

        let max = Math.max(...valoresFila);
        let min = Math.min(...valoresFila);

        maximaxValues.push(max);
        minimaxValues.push(min);
    }

    mostrarMaximax(maximaxValues);
    mostrarMinimax(minimaxValues);
}

// Mostrar tabla Maximax
function mostrarMaximax(maxValues) {
    const maximaxContainer = document.getElementById('maximax-container');
    maximaxContainer.innerHTML = '<h3>Criterio Maximax</h3>';

    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Alternativa', 'Valor'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    const maxValue = Math.max(...maxValues);
    
    maxValues.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor.toFixed(2);
        if (valor === maxValue) {
            celdaValor.classList.add('highlight');
        }
        fila.appendChild(celdaValor);
        
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    maximaxContainer.appendChild(tabla);
}
// Mostrar tabla Minimax
function mostrarMinimax(minValues) {
    const minimaxContainer = document.getElementById('minimax-container');
    minimaxContainer.innerHTML = '<h3>Criterio Maximin</h3>';

    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Alternativa', 'Valor'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    const maxOfMins = Math.max(...minValues);
    
    minValues.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor.toFixed(2);
        if (valor === maxOfMins) {
            celdaValor.classList.add('highlight');
        }
        fila.appendChild(celdaValor);
        
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    minimaxContainer.appendChild(tabla);
}

function calcularLaplace() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    const tabla = document.querySelector('#tabla-container table tbody');
    
    let laplaceValues = [];
    let procedimiento = '';

    for (let i = 0; i < filas; i++) {
        const inputs = tabla.rows[i].querySelectorAll('input');
        let valoresFila = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        let suma = valoresFila.reduce((a, b) => a + b, 0);
        let promedio = suma / columnas;
        laplaceValues.push(promedio);
        
        procedimiento += `Alternativa ${i+1}: (${valoresFila.join(' + ')}) / ${columnas} = ${promedio.toFixed(2)}<br>`;
    }

    mostrarLaplace(laplaceValues, procedimiento);
}

function mostrarLaplace(laplaceValues, procedimiento) {
    const laplaceContainer = document.getElementById('laplace-container');
    laplaceContainer.innerHTML = '<h3>Criterio de Laplace</h3>';

    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Alternativa', 'Valor'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    const maxValue = Math.max(...laplaceValues);
    
    laplaceValues.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor.toFixed(2);
        if (valor === maxValue) {
            celdaValor.classList.add('highlight');
        }
        fila.appendChild(celdaValor);
        
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    laplaceContainer.appendChild(tabla);

    const procedimientoDiv = document.createElement('div');
    procedimientoDiv.className = 'procedure';
    procedimientoDiv.innerHTML = procedimiento;
    laplaceContainer.appendChild(procedimientoDiv);
}

function calcularHurwicz(alpha = 0.5) {
    const filas = document.getElementById('filas').value;
    const tabla = document.querySelector('#tabla-container table tbody');
    
    let hurwiczValues = [];
    let procedimiento = '';

    for (let i = 0; i < filas; i++) {
        const inputs = tabla.rows[i].querySelectorAll('input');
        let valoresFila = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        let max = Math.max(...valoresFila);
        let min = Math.min(...valoresFila);
        let hurwiczValue = alpha * max + (1 - alpha) * min;
        hurwiczValues.push(hurwiczValue);
        
        procedimiento += `Alternativa ${i+1}: (${alpha} * ${max}) + (${1-alpha} * ${min}) = ${hurwiczValue.toFixed(2)}<br>`;
    }

    mostrarHurwicz(hurwiczValues, procedimiento, alpha);
}

function mostrarHurwicz(hurwiczValues, procedimiento, alpha) {
    const hurwiczContainer = document.getElementById('hurwicz-container');
    hurwiczContainer.innerHTML = `<h3>Criterio de Hurwicz (α = ${alpha})</h3>`;

    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Alternativa', 'Valor'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    const maxValue = Math.max(...hurwiczValues);
    
    hurwiczValues.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor.toFixed(2);
        if (valor === maxValue) {
            celdaValor.classList.add('highlight');
        }
        fila.appendChild(celdaValor);
        
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    hurwiczContainer.appendChild(tabla);

    const procedimientoDiv = document.createElement('div');
    procedimientoDiv.className = 'procedure';
    procedimientoDiv.innerHTML = procedimiento;
    hurwiczContainer.appendChild(procedimientoDiv);
}

function calcularSavage() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    const tabla = document.querySelector('#tabla-container table tbody');
    
    let matrizOriginal = [];
    let matrizArrepentimiento = [];
    let procedimiento = '<h4>Matriz de Arrepentimiento:</h4>';

    // Obtener la matriz original
    for (let i = 0; i < filas; i++) {
        const inputs = tabla.rows[i].querySelectorAll('input');
        let valoresFila = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        matrizOriginal.push(valoresFila);
    }

    // Calcular la matriz de arrepentimiento
    for (let j = 0; j < columnas; j++) {
        let maxColumna = Math.max(...matrizOriginal.map(fila => fila[j]));
        procedimiento += `Columna ${j+1} - Máximo: ${maxColumna}<br>`;
        for (let i = 0; i < filas; i++) {
            if (!matrizArrepentimiento[i]) matrizArrepentimiento[i] = [];
            matrizArrepentimiento[i][j] = maxColumna - matrizOriginal[i][j];
            procedimiento += `A${i+1},S${j+1}: ${maxColumna} - ${matrizOriginal[i][j]} = ${matrizArrepentimiento[i][j]}<br>`;
        }
        procedimiento += '<br>';
    }

    // Calcular el máximo arrepentimiento para cada alternativa
    let savageValues = matrizArrepentimiento.map(fila => Math.max(...fila));

    mostrarSavage(savageValues, matrizArrepentimiento, procedimiento);
}

function mostrarSavage(savageValues, matrizArrepentimiento, procedimiento) {
    const savageContainer = document.getElementById('savage-container');
    savageContainer.innerHTML = '<h3>Criterio Minmax \n MAtriz de Deploracion </h3>';

    // Mostrar matriz de arrepentimiento
    const tablaArrepentimiento = document.createElement('table');
    const tbodyArrepentimiento = document.createElement('tbody');
    
    matrizArrepentimiento.forEach((fila, i) => {
        const tr = document.createElement('tr');
        const thFila = document.createElement('th');
        thFila.textContent = `A${i + 1}`;
        tr.appendChild(thFila);
        fila.forEach((valor, j) => {
            const td = document.createElement('td');
            td.textContent = valor.toFixed(2);
            tr.appendChild(td);
        });
        tbodyArrepentimiento.appendChild(tr);
    });
    
    tablaArrepentimiento.appendChild(tbodyArrepentimiento);
    savageContainer.appendChild(tablaArrepentimiento);

    // Mostrar valores de Savage
    const tablaSavage = document.createElement('table');
    const theadSavage = document.createElement('thead');
    const headerRowSavage = document.createElement('tr');
    ['Alternativa', 'Valor'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRowSavage.appendChild(th);
    });
    theadSavage.appendChild(headerRowSavage);
    tablaSavage.appendChild(theadSavage);

    const tbodySavage = document.createElement('tbody');
    const minValue = Math.min(...savageValues);
    
    savageValues.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValor = document.createElement('td');
        celdaValor.textContent = valor.toFixed(2);
        if (valor === minValue) {
            celdaValor.classList.add('highlight');
        }
        fila.appendChild(celdaValor);
        
        tbodySavage.appendChild(fila);
    });

    tablaSavage.appendChild(tbodySavage);
    savageContainer.appendChild(tablaSavage);

    const procedimientoDiv = document.createElement('div');
    procedimientoDiv.className = 'procedure';
    procedimientoDiv.innerHTML = procedimiento;
    savageContainer.appendChild(procedimientoDiv);
}


function calcularDecisionesRiesgo() {
    const filas = document.getElementById('filas').value;
    const columnas = document.getElementById('columnas').value;
    const tabla = document.querySelector('#tabla-container table tbody');
    
    let probabilidades = [];
    let sumaProb = 0;
    for (let i = 1; i <= columnas; i++) {
        const prob = parseFloat(document.getElementById(`prob-s${i}`).value) || 0;
        probabilidades.push(prob);
        sumaProb += prob;
    }

    if (Math.abs(sumaProb - 1) > 0.001) {
        alert("La suma de las probabilidades debe ser 1.");
        return;
    }

    let valoresEsperados = [];
    let procedimientoVE = '<h4>Cálculo de Valores Esperados:</h4>';
    let varianzas = [];
    let procedimientoVar = '<h4>Cálculo de Varianzas:</h4>';

    for (let i = 0; i < filas; i++) {
        const inputs = tabla.rows[i].querySelectorAll('input');
        let valoresFila = Array.from(inputs).map(input => parseFloat(input.value) || 0);
        let valorEsperado = 0;
        
        procedimientoVE += `Alternativa ${i+1}: `;
        for (let j = 0; j < columnas; j++) {
            valorEsperado += valoresFila[j] * probabilidades[j];
            procedimientoVE += `(${valoresFila[j]} * ${probabilidades[j].toFixed(2)})`;
            if (j < columnas - 1) procedimientoVE += ' + ';
        }
        procedimientoVE += ` = ${valorEsperado.toFixed(2)}<br>`;
        
        valoresEsperados.push(valorEsperado);

        // Cálculo de la varianza
        let varianza = 0;
        procedimientoVar += `Alternativa ${i+1}:<br>`;
        for (let j = 0; j < columnas; j++) {
            let termino = Math.pow(valoresFila[j] - valorEsperado, 2) * probabilidades[j];
            varianza += termino;
            procedimientoVar += `(${valoresFila[j]} - ${valorEsperado.toFixed(2)})² * ${probabilidades[j].toFixed(2)} = ${termino.toFixed(2)}`;
            if (j < columnas - 1) procedimientoVar += ' + ';
        }
        procedimientoVar += ` = ${varianza.toFixed(2)}<br><br>`;
        
        varianzas.push(varianza);
    }

    mostrarDecisionesRiesgo(valoresEsperados, procedimientoVE, varianzas, procedimientoVar);
}

function mostrarDecisionesRiesgo(valoresEsperados, procedimientoVE, varianzas, procedimientoVar) {
    const riesgoContainer = document.getElementById('riesgo-container');
    riesgoContainer.innerHTML = '<h3>Decisiones bajo Condiciones de Riesgo</h3>';

    // Tabla de Valores Esperados
    const tablaVE = document.createElement('table');
    const theadVE = document.createElement('thead');
    const headerRowVE = document.createElement('tr');
    ['Alternativa', 'Valor Esperado'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRowVE.appendChild(th);
    });
    theadVE.appendChild(headerRowVE);
    tablaVE.appendChild(theadVE);

    const tbodyVE = document.createElement('tbody');
    const maxValue = Math.max(...valoresEsperados);
    
    valoresEsperados.forEach((valor, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaValorEsperado = document.createElement('td');
        celdaValorEsperado.textContent = valor.toFixed(2);
        if (valor === maxValue) {
            celdaValorEsperado.classList.add('highlight');
        }
        fila.appendChild(celdaValorEsperado);
        
        tbodyVE.appendChild(fila);
    });

    tablaVE.appendChild(tbodyVE);
    riesgoContainer.appendChild(tablaVE);

    const procedimientoVEDiv = document.createElement('div');
    procedimientoVEDiv.className = 'procedure';
    procedimientoVEDiv.innerHTML = procedimientoVE;
    riesgoContainer.appendChild(procedimientoVEDiv);

    // Tabla de Varianzas
    const tablaVar = document.createElement('table');
    const theadVar = document.createElement('thead');
    const headerRowVar = document.createElement('tr');
    ['Alternativa', 'Varianza'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRowVar.appendChild(th);
    });
    theadVar.appendChild(headerRowVar);
    tablaVar.appendChild(theadVar);

    const tbodyVar = document.createElement('tbody');
    const minVarianza = Math.min(...varianzas);
    
    varianzas.forEach((varianza, index) => {
        const fila = document.createElement('tr');
        
        const celdaAlternativa = document.createElement('td');
        celdaAlternativa.textContent = `A${index + 1}`;
        fila.appendChild(celdaAlternativa);
        
        const celdaVarianza = document.createElement('td');
        celdaVarianza.textContent = varianza.toFixed(2);
        if (varianza === minVarianza) {
            celdaVarianza.classList.add('highlight');
        }
        fila.appendChild(celdaVarianza);
        
        tbodyVar.appendChild(fila);
    });

    tablaVar.appendChild(tbodyVar);
    riesgoContainer.appendChild(tablaVar);

    const procedimientoVarDiv = document.createElement('div');
    procedimientoVarDiv.className = 'procedure';
    procedimientoVarDiv.innerHTML = procedimientoVar;
    riesgoContainer.appendChild(procedimientoVarDiv);
}

function calcularTodosCriterios() {
    calcularMaxMin();
    calcularLaplace();
    calcularHurwicz();
    calcularSavage();
    calcularDecisionesRiesgo();
}