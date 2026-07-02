

document.addEventListener('DOMContentLoaded', function() {

    const fotosData = [
        // Día de la Madre
        { id: 1, titulo: 'Celebración Día de la Madre 2026', categoria: 'madre', fecha: '10/05/2026', imagen: '' },
        { id: 2, titulo: 'Desayuno con mamás Cotemar', categoria: 'madre', fecha: '10/05/2026', imagen: '' },
        { id: 3, titulo: 'Regalos y sorpresas', categoria: 'madre', fecha: '11/05/2026', imagen: '' },
        
        // Día del Niño
        { id: 4, titulo: 'Fiesta Día del Niño 2026', categoria: 'nino', fecha: '30/04/2026', imagen: '' },
        { id: 5, titulo: 'Juegos y actividades', categoria: 'nino', fecha: '30/04/2026', imagen: '' },
        { id: 6, titulo: 'Los pequeños de Cotemar', categoria: 'nino', fecha: '01/05/2026', imagen: '' },
        
        // Posadas
        { id: 7, titulo: 'Posada Cotemar 2025', categoria: 'posadas', fecha: '15/12/2025', imagen: '' },
        { id: 8, titulo: 'Convivencia navideña', categoria: 'posadas', fecha: '16/12/2025', imagen: '' },
        { id: 9, titulo: 'Entrega de aguinaldos', categoria: 'posadas', fecha: '17/12/2025', imagen: '' },
        
        // Integración
        { id: 10, titulo: 'Taller de integración', categoria: 'integracion', fecha: '25/02/2026', imagen: '' },
        { id: 11, titulo: 'Actividades de equipo', categoria: 'integracion', fecha: '26/02/2026', imagen: '' },
        { id: 12, titulo: 'Convivencia departamental', categoria: 'integracion', fecha: '27/02/2026', imagen: '' },
        
        // Festejos
        { id: 13, titulo: 'Cumpleaños de enero', categoria: 'festejos', fecha: '20/01/2026', imagen: '' },
        { id: 14, titulo: 'Celebración de aniversarios', categoria: 'festejos', fecha: '15/03/2026', imagen: '' },
        { id: 15, titulo: 'Fiesta sorpresa', categoria: 'festejos', fecha: '10/04/2026', imagen: '' },
    ];

    const categoriasMap = {
        'todos': 'Todos',
        'madre': 'Día de la Madre',
        'nino': 'Día del Niño',
        'posadas': 'Posadas',
        'integracion': 'Integración',
        'festejos': 'Festejos'
    };

    const coloresCategoria = {
        'madre': '#e91e63',
        'nino': '#ff9800',
        'posadas': '#4caf50',
        'integracion': '#2196f3',
        'festejos': '#9c27b0'
    };

    const galeriaGrid = document.getElementById('galeriaGrid');
    const filtrosBotones = document.querySelectorAll('.filtro-btn');
    const totalFotos = document.getElementById('totalFotos');
    const galeriaVacia = document.getElementById('galeriaVacia');
    let categoriaActiva = 'todos';

    function getColorForCategoria(categoria) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF9FF3', '#54A0FF'];
        const index = fotosData.filter(f => f.categoria === categoria).length % colors.length;
        return colors[index] || '#dfe6e9';
    }

    function renderizarGaleria(categoria) {
        const fotosFiltradas = categoria === 'todos' 
            ? fotosData 
            : fotosData.filter(f => f.categoria === categoria);

        totalFotos.textContent = `${fotosFiltradas.length} fotos`;

        if (fotosFiltradas.length === 0) {
            galeriaGrid.style.display = 'none';
            galeriaVacia.style.display = 'block';
            return;
        }

        galeriaGrid.style.display = 'grid';
        galeriaVacia.style.display = 'none';

        let html = '';
        fotosFiltradas.forEach((foto, index) => {
            const colorFondo = getColorForCategoria(foto.categoria);
            const nombreCategoria = categoriasMap[foto.categoria] || foto.categoria;
            const colorCategoria = coloresCategoria[foto.categoria] || '#666';

            if (!foto.imagen) {
                html += `
                    <div class="galeria-item" data-categoria="${foto.categoria}" data-id="${foto.id}">
                        <div style="
                            width: 100%;
                            height: 100%;
                            background: ${colorFondo};
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: 500;
                            padding: 16px;
                            text-align: center;
                            font-size: 0.9rem;
                        ">
                            <i class="fas fa-camera" style="font-size: 2rem; margin-bottom: 8px; opacity: 0.6;"></i>
                            ${foto.titulo}
                        </div>
                        <div class="overlay">
                            <span class="categoria-tag" style="background: ${colorCategoria};">${nombreCategoria}</span>
                            <span class="fecha-tag">${foto.fecha}</span>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="galeria-item" data-categoria="${foto.categoria}" data-id="${foto.id}">
                        <img src="${foto.imagen}" alt="${foto.titulo}" loading="lazy" />
                        <div class="overlay">
                            <span class="categoria-tag" style="background: ${colorCategoria};">${nombreCategoria}</span>
                            <span class="fecha-tag">${foto.fecha}</span>
                        </div>
                    </div>
                `;
            }
        });

        galeriaGrid.innerHTML = html;

        document.querySelectorAll('.galeria-item').forEach(item => {
            item.addEventListener('click', function() {
                const titulo = this.querySelector('.overlay')?.querySelector('.categoria-tag')?.textContent || 
                              this.querySelector('div')?.textContent?.trim() || 
                              'Foto';
                const fecha = this.querySelector('.fecha-tag')?.textContent || '';
                alert(`📸 ${titulo}\n📅 ${fecha}\n\nHaz clic para ver la imagen completa.`);
            });
        });
    }

    function setFiltroActivo(categoria) {
        categoriaActiva = categoria;
        filtrosBotones.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.categoria === categoria);
        });
        renderizarGaleria(categoria);
    }

    filtrosBotones.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.dataset.categoria;
            setFiltroActivo(categoria);
        });
    });

    const btnCargarAlbum = document.getElementById('btnCargarAlbum');
    const btnVerAlbum = document.getElementById('btnVerAlbum');

    if (btnCargarAlbum) {
        btnCargarAlbum.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📸 Conectando con Google Photos...\n\n' +
                  'Para integrar tu álbum:\n' +
                  '1. Crea un álbum en Google Photos\n' +
                  '2. Compártelo y copia el enlace\n' +
                  '3. Reemplaza TU_ID_ALBUM en el iframe\n\n' +
                  '¡Las fotos se actualizarán automáticamente!');
        });
    }

    if (btnVerAlbum) {
        btnVerAlbum.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://photos.google.com', '_blank');
        });
    }

    const btnSubirFotos = document.getElementById('btnSubirFotos');
    if (btnSubirFotos) {
        btnSubirFotos.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📸 ¡Comparte tus recuerdos!\n\n' +
                  'Envía tus fotos a Relaciones Laborales:\n' +
                  '📧 rrhh@cotemar.com.mx\n\n' +
                  'Incluye el nombre del evento y la fecha\n' +
                  '¡Tus fotos podrían aparecer en la galería!');
        });
    }

    renderizarGaleria('todos');

    const eventosCards = document.querySelectorAll('.evento-card');
    const eventoObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    eventosCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        eventoObserver.observe(card);
    });

    const galeriaObserver = new MutationObserver(function() {
        const items = document.querySelectorAll('.galeria-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.transition = `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`;
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50 + index * 80);
        });
    });

    galeriaObserver.observe(galeriaGrid, {
        childList: true,
        subtree: false
    });

    console.log('✅ Módulo Vida en la Empresa - Inicializado correctamente');
    console.log(`📸 ${fotosData.length} fotos cargadas en la galería`);
    console.log('🔗 Recuerda configurar la integración con Google Photos para actualización automática');
});