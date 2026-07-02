

document.addEventListener('DOMContentLoaded', function() {

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');

        pregunta.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });

        pregunta.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pregunta.click();
            }
        });

        pregunta.setAttribute('role', 'button');
        pregunta.setAttribute('tabindex', '0');
    });

    const iframe = document.querySelector('.formulario-frame');
    const fallback = document.querySelector('.formulario-fallback');

    if (iframe) {
        iframe.addEventListener('error', function() {
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
        let timeoutId = setTimeout(() => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.trim() === '') {
                    if (fallback) {
                        fallback.style.display = 'block';
                    }
                }
            } catch (e) {
            }
        }, 8000);

        iframe.addEventListener('load', function() {
            clearTimeout(timeoutId);
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
    }

    const infoCards = document.querySelectorAll('.info-card');

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
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

    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    const pasos = document.querySelectorAll('.instruccion-paso');

    const pasoObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, delay);
            }
        });
    }, {
        threshold: 0.2
    });

    pasos.forEach(paso => {
        paso.style.opacity = '0';
        paso.style.transform = 'translateX(-20px)';
        paso.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        pasoObserver.observe(paso);
    });
    const headerLink = document.querySelector('.page-header-content a[href="#formulario"]');
    if (headerLink) {
        headerLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('.seccion-formulario');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    const btnIrFormulario = document.querySelector('.btn-ir-formulario');
    if (btnIrFormulario) {
        btnIrFormulario.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('.seccion-formulario');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }


    const iframeSrc = iframe ? iframe.getAttribute('src') : '';
    if (iframeSrc && iframeSrc.includes('TU_ID_DEL_FORMULARIO')) {
        console.warn('⚠️ Recuerda reemplazar TU_ID_DEL_FORMULARIO con el ID real de Google Forms');

        const container = document.querySelector('.formulario-container');
        if (container) {
            const aviso = document.createElement('div');
            aviso.className = 'aviso-configuracion';
            aviso.innerHTML = `
                <div style="
                    background: #fff3cd;
                    border: 2px solid #ffc107;
                    border-radius: 8px;
                    padding: 16px 20px;
                    margin: 16px 24px;
                    text-align: center;
                    color: #856404;
                ">
                    <i class="fas fa-cog" style="font-size: 1.2rem; margin-right: 8px;"></i>
                    <strong>Configuración pendiente:</strong>
                    Reemplaza <code>TU_ID_DEL_FORMULARIO</code> con el ID de tu Google Form.
                    <br>
                    <span style="font-size: 0.85rem;">
                        <i class="fas fa-info-circle"></i> 
                        El formulario debe estar configurado como <strong>100% anónimo</strong> 
                        (sin recopilar correos electrónicos).
                    </span>
                </div>
            `;
            const embed = container.querySelector('.formulario-embed');
            if (embed) {
                embed.after(aviso);
            }
        }
    }

    console.log('✅ Módulo Buzón de Quejas - Inicializado correctamente');
    console.log('📌 Recuerda configurar el Google Forms como 100% anónimo');
});