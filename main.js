// =======================
// 1. Smooth scrolling for anchor links
// =======================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// =======================
// 2. Typing animation for heading
// =======================
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i++);
      setTimeout(type, speed);
    }
  };
  type();
};

window.addEventListener('load', () => {
  const heading = document.querySelector('h1');
  heading && typeWriter(heading, heading.textContent, 80);

  // Dynamic greeting
  const greeting = document.querySelector('.tagline');
  if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent = hour < 12
      ? "Good morning! Welcome to my corner of the internet ☀️"
      : hour < 18
        ? "Good afternoon! Welcome to my corner of the internet ☀️"
        : "Good evening! Welcome to my corner of the internet 🌙";
  }

  // Theme toggle setup
  createThemeToggle?.();
});

// =======================
// 3. Project cards & GitHub README modal
// =======================
document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelectorAll('.project');
  const modal = document.getElementById('project-modal');
  const closeModal = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalLoading = document.getElementById('modal-loading');
  const modalReadme = document.getElementById('modal-readme');
  const modalLinks = document.getElementById('modal-links');

  const fetchGitHubReadme = async (user, repo) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${user}/${repo}/readme`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return atob(data.content);
    } catch (err) {
      console.error('Error fetching README:', err);
      return `# ${repo}\n\nError loading README. Visit GitHub repository.\n\n**Error:** ${err.message}`;
    }
  };

  projects.forEach(project => {
    // Hover effect
    project.addEventListener('mouseenter', () => {
      project.style.transform = 'translateY(-5px)';
      project.style.transition = 'transform 0.3s ease';
      project.style.cursor = 'pointer';
    });
    project.addEventListener('mouseleave', () => project.style.transform = 'translateY(0)');

    // Modal click
    project.addEventListener('click', async e => {
      if (e.target.tagName === 'A' || !modal) return;

      const title = project.dataset.title || project.querySelector('h3')?.textContent || '';
      const githubUser = project.dataset.githubUser;
      const githubRepo = project.dataset.githubRepo;
      const links = project.dataset.links || '';

      modalTitle.textContent = title;
      modalLinks.innerHTML = links;
      modalLoading.style.display = 'block';
      modalReadme.style.display = 'none';
      modal.classList.add('show');

      if (githubUser && githubRepo) {
        const readme = await fetchGitHubReadme(githubUser, githubRepo);
        modalLoading.style.display = 'none';
        modalReadme.style.display = 'block';
        modalReadme.innerHTML = typeof marked !== 'undefined' ? marked.parse(readme) : `<pre>${readme}</pre>`;
      } else {
        modalLoading.style.display = 'none';
        modalReadme.style.display = 'block';
        modalReadme.innerHTML = '<p>No README available for this project.</p>';
      }
    });
  });

  // Close modal
  closeModal?.addEventListener('click', () => modal?.classList.remove('show'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });
});

// =======================
// 4. Intersection Observer for fade-in animations
// =======================
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// =======================
// 5. Email validation (example for contact form)
// =======================
const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
