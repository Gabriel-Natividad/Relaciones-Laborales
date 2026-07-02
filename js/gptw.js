

document.addEventListener('DOMContentLoaded', function() {
    const barras = document.querySelectorAll('.barra-fill, .plan-fill');

    const barraObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barra = entry.target;
                void barra.offsetWidth;
                const anchoOriginal = barra.style.width;
                barra.style.width = '0%';
                setTimeout(() => {
                    barra.style.width = anchoOriginal;
                }, 100);
            }
        });
    }, {
        threshold: 0.3
    });

    barras.forEach(barra => {
        barraObserver.observe(barra);
    });

    const cardsToAnimate = document.querySelectorAll('.insignia-card, .resultado-card, .plan-card');

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
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    cardsToAnimate.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    const certificados = document.querySelectorAll('.certificado-placeholder');
    certificados.forEach(cert => {
        cert.addEventListener('click', function() {
            const nombre = this.querySelector('span')?.textContent || 'Certificado';
            alert(`📜 ${nombre}\n\nCertificado disponible en formato digital. Contacta a Relaciones Laborales para más información.`);
        });
    });

    const fotos = document.querySelectorAll('.foto-placeholder');
    fotos.forEach(foto => {
        foto.addEventListener('click', function() {
            const nombre = this.querySelector('span')?.textContent || 'Foto';
            alert(`📸 ${nombre}\n\nImagen del plan de acción. Próximamente más contenido visual.`);
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const titulo = this.querySelector('h4')?.textContent || 'Premio';
            const descripcion = this.querySelector('p')?.textContent || '';
            alert(`🏆 ${titulo}\n\n${descripcion}\n\nPara más detalles, consulta el área de Relaciones Laborales.`);
        });
    });

    const badges = document.querySelectorAll('.insignia-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip-flotante';
            tooltip.textContent = 'Haz clic para más información';
            tooltip.style.cssText = `
                position: fixed;
                background: var(--color-primary-dark);
                color: white;
                padding: 4px 12px;
                border-radius: 6px;
                font-size: 0.7rem;
                font-weight: 500;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                animation: fadeIn 0.2s ease;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.bottom + 6) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

            this.addEventListener('mouseleave', function() {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            });
        });
    });

    console.log('✅ Módulo GPTW - Inicializado correctamente');
});