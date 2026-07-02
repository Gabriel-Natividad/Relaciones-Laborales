
document.addEventListener('DOMContentLoaded', function() {
    
    const serviceCards = document.querySelectorAll('.servicio-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });

    const slidesFrame = document.querySelector('.slides-frame');
    if (slidesFrame) {
        slidesFrame.addEventListener('load', function() {
            console.log('✅ Presentación de Google Slides cargada correctamente');
        });
        
        slidesFrame.addEventListener('error', function() {
            console.warn('⚠️ Error al cargar la presentación de Google Slides');
            const container = this.parentElement;
            if (container) {
                const fallbackMsg = document.createElement('div');
                fallbackMsg.className = 'slides-fallback';
                fallbackMsg.innerHTML = `
                    <i class="fas fa-exclamation-circle" style="color: var(--color-secondary); font-size: 2rem;"></i>
                    <p style="margin-top: 8px; color: var(--color-text-light);">
                        No se pudo cargar la presentación. Verifica el enlace.
                    </p>
                `;
                fallbackMsg.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    background: var(--color-gray-100);
                    border-radius: var(--border-radius-sm);
                    padding: 20px;
                `;
                container.appendChild(fallbackMsg);
            }
        });
    }

    const btnWidget = document.querySelector('.btn-widget');
    if (btnWidget) {
        btnWidget.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📧 Por favor, envía un correo a rrhh@empresa.com para avisar sobre tu cumpleaños.');
        });
    }
    
    console.log('✅ Home - Funcionalidades específicas cargadas');
});