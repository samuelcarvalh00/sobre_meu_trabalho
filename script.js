document.addEventListener('DOMContentLoaded', function() {
  // Configuração das partículas
  particlesJS("particles-js", {
    "particles": {
      "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
      "color": {"value": "#ffffff"},
      "shape": {"type": "circle"},
      "opacity": {"value": 0.5, "random": true, "anim": {"enable": true, "speed": 1}},
      "size": {"value": 3, "random": true, "anim": {"enable": true, "speed": 2}},
      "line_linked": {
        "enable": true, 
        "distance": 150, 
        "color": "#ffffff", 
        "opacity": 0.4, 
        "width": 1
      },
      "move": {
        "enable": true, 
        "speed": 2, 
        "direction": "none", 
        "random": true, 
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {"enable": true, "mode": "repulse"},
        "onclick": {"enable": true, "mode": "push"}
      },
      "modes": {
        "repulse": {"distance": 100, "duration": 0.4},
        "push": {"particles_nb": 4}
      }
    },
    "retina_detect": true
  });

  // Inicializar habilidades dinâmicas
  initSkills();

  // Navegação entre páginas
  initNavigation();

  // Menu mobile
  initMobileMenu();

  // Animações de scroll reveal
  initScrollAnimations();

  // Barras de progresso das skills
  initSkillBars();

  // Formulário de contato
  initContactForm();

  // Animações de texto
  initTextAnimations();
});

// Dados das habilidades
const skillsData = [
  { name: "HTML5", level: "Avançado", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", progress: 90 },
  { name: "CSS3", level: "Avançado", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", progress: 90 },
  { name: "JavaScript", level: "Intermediário", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", progress: 70 },
  { name: "TypeScript", level: "Intermediário", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", progress: 70 },
  { name: "Python", level: "Intermediário", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", progress: 70 },
  { name: "Node.js", level: "Básico", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png", progress: 40 },
  { name: "React", level: "Básico", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/640px-React_Logo_SVG.svg.png", progress: 40 }
];

// Função para inicializar habilidades dinamicamente
function initSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = ''; // Limpar grid antes de adicionar

    skillsData.forEach(skill => {
      const skillCard = document.createElement('div');
      skillCard.classList.add('skill-card', 'scroll-reveal');
      skillCard.innerHTML = `
        <div class="skill-icon">
          <img src="${skill.icon}" alt="${skill.name}">
        </div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level">${skill.level}</div>
        <div class="progress-bar">
          <div class="progress-fill" data-width="${skill.progress}"></div>
        </div>
      `;
      skillsGrid.appendChild(skillCard);
    });
  }
}

// Navegação entre páginas
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active de todos os links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Menu mobile
function initMobileMenu() {
  const menuToggle = document.createElement('button');
  menuToggle.textContent = '☰';
  menuToggle.className = 'menu-toggle';
  document.body.prepend(menuToggle);

  const sidebar = document.querySelector('.sidebar');
  
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
}

// Animações de scroll reveal
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// Barras de progresso das skills
function initSkillBars() {
  window.animateSkillBars = function() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      }, index * 200); // Delay escalonado
    });
  };
}

// Formulário de contato
function initContactForm() {
  const form = document.querySelector('#contact-form');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Coleta os dados do formulário
      const formData = new FormData(form);
      const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        message: formData.get('message').trim()
      };

      // Validação no frontend
      if (!data.name || !data.email || !data.message) {
        submitBtn.textContent = 'Preencha todos os campos';
        submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
        return;
      }

      if (!/\S+@\S+\.\S+/.test(data.email)) {
        submitBtn.textContent = 'E-mail inválido';
        submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
        return;
      }

      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;

      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          submitBtn.textContent = 'Mensagem Enviada!';
          submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
          form.reset();
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          const errorData = await response.json();
          submitBtn.textContent = errorData.error || 'Erro ao Enviar';
          submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        }
      } catch (error) {
        console.error('Erro:', error);
        submitBtn.textContent = 'Erro ao Enviar';
        submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
}

// Animações de texto
function initTextAnimations() {
  function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  const homeTitle = document.querySelector('.home-content h1');
  if (homeTitle) {
    const originalText = homeTitle.textContent;
    setTimeout(() => {
      typeWriter(homeTitle, originalText, 100);
    }, 1000);
  }
}