

document.addEventListener('DOMContentLoaded', function() {

    const equipoCards = document.querySelectorAll('.equipo-card');
    const infografiaCards = document.querySelectorAll('.infografia-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);

    equipoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    infografiaCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    const btnReporte = document.querySelector('.btn-seguimiento');
    if (btnReporte) {
        btnReporte.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📄 Generando reporte de seguimiento...\nEl archivo se descargará en breve.');

        });
    }

    const estadoBadges = document.querySelectorAll('.estado-badge');
    estadoBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            let tooltipText = '';
            if (this.classList.contains('estado-progreso')) {
                tooltipText = 'El caso está en proceso activo';
            } else if (this.classList.contains('estado-pendiente')) {
                tooltipText = 'Pendiente de primera atención';
            } else if (this.classList.contains('estado-completado')) {
                tooltipText = 'Caso resuelto satisfactoriamente';
            }
            
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip-flotante';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: fixed;
                background: var(--color-primary-dark);
                color: white;
                padding: 6px 14px;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: 500;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                animation: fadeIn 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.bottom + 8) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this.addEventListener('mouseleave', function() {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            });
        });
    });

    const filasTabla = document.querySelectorAll('.tabla-seguimiento tbody tr');
    filasTabla.forEach(fila => {
        fila.style.cursor = 'pointer';
        fila.addEventListener('click', function() {
            const nombre = this.querySelector('.colaborador-nombre')?.textContent || 'Colaborador';
            alert(`📋 Detalles del caso de ${nombre}\n\nPara más información, contacta al área de Trabajo Social.`);
        });
    });

    const visualPlaceholders = document.querySelectorAll('.visual-placeholder');
    visualPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const titulo = this.querySelector('span')?.textContent || 'Infografía';
            alert(`🖼️ "${titulo}"\n\nPróximamente disponible. Estamos trabajando en el contenido visual.`);
        });
    });

    console.log('✅ Módulo de Trabajo Social - Inicializado correctamente');
});