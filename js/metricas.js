
document.addEventListener('DOMContentLoaded', function() {

    let filtrosActuales = {
        periodo: '2025',
        departamento: 'todos',
        tipo: 'clima'
    };

    const selectPeriodo = document.getElementById('periodo');
    const selectDepartamento = document.getElementById('departamento');
    const selectTipo = document.getElementById('metricas-tipo');
    const btnAplicar = document.getElementById('btnAplicarFiltros');
    const filtrosRapidos = document.querySelectorAll('.filtro-rapido-btn');

    const kpisPorPeriodo = {
        '2026': { satisfaccion: '89%', clima: '93%', retencion: '91%', productividad: '95%' },
        '2025': { satisfaccion: '87%', clima: '92%', retencion: '89%', productividad: '94%' },
        '2024': { satisfaccion: '84%', clima: '88%', retencion: '86%', productividad: '91%' },
        '2023': { satisfaccion: '81%', clima: '85%', retencion: '83%', productividad: '88%' }
    };

    function actualizarKPIs(periodo) {
        const datos = kpisPorPeriodo[periodo] || kpisPorPeriodo['2025'];
        document.getElementById('kpiSatisfaccion').textContent = datos.satisfaccion;
        document.getElementById('kpiClima').textContent = datos.clima;
        document.getElementById('kpiRetencion').textContent = datos.retencion;
        document.getElementById('kpiProductividad').textContent = datos.productividad;
    }

    function aplicarFiltros() {
        const periodo = selectPeriodo.value;
        const depto = selectDepartamento.value;
        const tipo = selectTipo.value;

        filtrosActuales = { periodo, departamento: depto, tipo };


        actualizarKPIs(periodo);


        actualizarGraficas(periodo, depto, tipo);


        actualizarTabla(periodo, depto);

        mostrarNotificacion(`Filtros aplicados: ${periodo} - ${depto} - ${tipo}`);

        filtrosRapidos.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.periodo === periodo && 
                btn.dataset.depto === depto && 
                btn.dataset.tipo === tipo) {
                btn.classList.add('active');
            }
        });
    }

    function actualizarGraficas(periodo, depto, tipo) {
        const placeholders = document.querySelectorAll('.embed-placeholder');
        const textos = [
            `📊 Evolución del Clima Laboral - ${periodo}`,
            `📈 Distribución por Departamento - ${depto !== 'todos' ? depto : 'Todos'}`,
            `📊 Retención vs Rotación - ${periodo}`
        ];

        placeholders.forEach((placeholder, index) => {
            const p = placeholder.querySelector('p');
            if (p) {
                p.textContent = `🔗 ${textos[index] || 'Gráfica'}`;
            }
            const nota = placeholder.querySelector('.embed-nota');
            if (nota) {
                nota.textContent = `Filtro: ${tipo} | ${depto !== 'todos' ? depto : 'Todos los departamentos'}`;
            }
        });
    }

    function actualizarTabla(periodo, depto) {
        const filas = document.querySelectorAll('.tabla-metricas tbody tr');
        const departamentos = ['Operaciones', 'Administración', 'Ingeniería', 'Recursos Humanos', 'Logística', 'Mantenimiento'];
        
        const variaciones = {
            '2026': [2, 1.5, 4, 3, 0, -1],
            '2025': [2, 1.5, 4, 3, 0, -1],
            '2024': [1, 0.5, 2, 1.5, -1, -2],
            '2023': [0.5, 0, 1, 0.5, -1.5, -2.5]
        };

        const variacion = variaciones[periodo] || variaciones['2025'];

        filas.forEach((fila, index) => {
            const celdas = fila.querySelectorAll('td');
            if (celdas.length >= 5) {
                const base = 85 + (index * 2);
                const factor = variacion[index] || 0;
                const nuevosValores = [
                    Math.min(98, Math.max(70, base + factor * 0.5)),
                    Math.min(98, Math.max(70, base + 3 + factor * 0.4)),
                    Math.min(98, Math.max(70, base - 1 + factor * 0.6)),
                    Math.min(98, Math.max(70, base + 5 + factor * 0.3))
                ];
                
                celdas[1].textContent = Math.round(nuevosValores[0]) + '%';
                celdas[2].textContent = Math.round(nuevosValores[1]) + '%';
                celdas[3].textContent = Math.round(nuevosValores[2]) + '%';
                celdas[4].textContent = Math.round(nuevosValores[3]) + '%';

                const trendBadge = celdas[5].querySelector('.trend-badge');
                if (trendBadge) {
                    const tendencia = factor > 0 ? 'positive' : (factor < 0 ? 'negative' : 'neutral');
                    const icono = factor > 0 ? 'fa-arrow-up' : (factor < 0 ? 'fa-arrow-down' : 'fa-minus');
                    const texto = factor > 0 ? `+${Math.abs(factor)}%` : (factor < 0 ? `${factor}%` : '0%');
                    trendBadge.className = `trend-badge ${tendencia}`;
                    trendBadge.innerHTML = `<i class="fas ${icono}"></i> ${texto}`;
                }
            }
        });

        const filasTabla = document.querySelectorAll('.tabla-metricas tbody tr');
        if (depto !== 'todos') {
            const deptoMap = {
                'operaciones': 'Operaciones',
                'administracion': 'Administración',
                'ingenieria': 'Ingeniería',
                'rh': 'Recursos Humanos',
                'logistica': 'Logística',
                'mantenimiento': 'Mantenimiento'
            };
            const deptoNombre = deptoMap[depto] || depto;
            filasTabla.forEach(fila => {
                const nombreDepto = fila.querySelector('td strong')?.textContent || '';
                if (nombreDepto.toLowerCase() === deptoNombre.toLowerCase()) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        } else {
            filasTabla.forEach(fila => {
                fila.style.display = '';
            });
        }
    }

    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-flotante';
        notificacion.innerHTML = `
            <i class="fas fa-check-circle" style="color: #2ecc71;"></i>
            <span>${mensaje}</span>
        `;
        notificacion.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: var(--color-white);
            padding: 14px 24px;
            border-radius: var(--border-radius);
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            font-weight: 500;
            font-size: 0.95rem;
            border-left: 4px solid #2ecc71;
            animation: slideIn 0.4s ease;
            max-width: 400px;
        `;

        if (!document.getElementById('notificacion-styles')) {
            const style = document.createElement('style');
            style.id = 'notificacion-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.remove();
                }
            }, 300);
        }, 3000);
    }

    btnAplicar.addEventListener('click', aplicarFiltros);

    filtrosRapidos.forEach(btn => {
        btn.addEventListener('click', function() {
            selectPeriodo.value = this.dataset.periodo;
            selectDepartamento.value = this.dataset.depto;
            selectTipo.value = this.dataset.tipo;
            aplicarFiltros();
        });
    });

    document.querySelectorAll('.filtro-select').forEach(select => {
        select.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                aplicarFiltros();
            }
        });
    });

    document.getElementById('descargarCSV').addEventListener('click', function(e) {
        e.preventDefault();
        const table = document.querySelector('.tabla-metricas');
        let csv = '';
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowData = Array.from(cells).map(cell => 
                cell.textContent.trim().replace(/,/g, '')
            );
            csv += rowData.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `metricas_${filtrosActuales.periodo}_${filtrosActuales.departamento}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        mostrarNotificacion('📥 Datos exportados correctamente');
    });

    document.getElementById('imprimirTabla').addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
    });

    const kpiValues = document.querySelectorAll('.kpi-value');
    kpiValues.forEach(value => {
        const originalText = value.textContent;
        value.textContent = '0%';
        setTimeout(() => {
            value.textContent = originalText;
            value.style.transition = 'all 0.5s ease';
        }, 300);
    });

    aplicarFiltros();

    document.querySelectorAll('.embed-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const p = this.querySelector('p');
            const texto = p ? p.textContent : 'Gráfica';
            mostrarNotificacion(`📊 ${texto}\nConfiguración pendiente para incrustar gráfica real.`);
        });
    });

    console.log('✅ Módulo de Métricas - Inicializado correctamente');
});