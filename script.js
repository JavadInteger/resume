(() => {
    'use strict';

    const $ = (s, ctx = document) => ctx.querySelector(s);
    const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

    document.getElementById('currentYear').textContent = new Date().getFullYear();


    function addUltraSkillEffects() {
        const ultraBar = document.getElementById('ultraSkillBar');
        if (!ultraBar) return;
        ultraBar.querySelectorAll('.skill-ultra-flame, .skill-sparkle').forEach(el => el.remove());
        const colors = ['#f2b924', '#ddd', '#fff', '#fce38a'];
        for (let i = 0; i < 8; i++) {
            const flame = document.createElement('span');
            flame.className = 'skill-ultra-flame';
            const x = 5 + Math.random() * 85;
            const y = 5 + Math.random() * 40;
            flame.style.left = x + '%';
            flame.style.top = y + '%';
            flame.style.animationDelay = Math.random() * 0.8 + 's';
            flame.style.background =
            `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            flame.style.boxShadow = `0 0 ${4 + Math.random() * 10}px ${flame.style.background}`;
            flame.style.width = (4 + Math.random() * 6) + 'px';
            flame.style.height = (4 + Math.random() * 6) + 'px';
            ultraBar.appendChild(flame);
        }
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('span');
            spark.className = 'skill-sparkle';
            spark.style.left = (5 + Math.random() * 85) + '%';
            spark.style.top = (10 + Math.random() * 60) + '%';
            spark.style.animationDelay = Math.random() * 2 + 's';
            ultraBar.appendChild(spark);
        }
    }

    function addMythicShockwave() {
        const mythicBar = document.getElementById('mythicSkillBar');
        if (!mythicBar) return;
        mythicBar.querySelectorAll('.skill-shockwave').forEach(el => el.remove());
        const shock = document.createElement('span');
        shock.className = 'skill-shockwave';
        shock.style.animation = 'none';
        mythicBar.appendChild(shock);
        requestAnimationFrame(() => {
            shock.style.animation = 'skillShock 2.4s ease-in-out forwards';
        });
    }

    addUltraSkillEffects();
    setInterval(addUltraSkillEffects, 3400);
    addMythicShockwave();
    setInterval(addMythicShockwave, 2400);


    const techColors = {
        html: '#e44d26', css: '#264de4', js: '#f7df1e', ts: '#3178c6',
        php: '#777bb4', c: '#00599c', cpp: '#00599c', linux: '#fcc624',
        windows: '#0078d4', nginx: '#009639', ruby: '#cc342d', bash: '#4eaa25',
        markdown: '#083fa1', julia: '#a270ba', mariadb: '#003545', mysql: '#4479a1',
        mongodb: '#4ea94b', postgres: '#336791', redis: '#dc382c', clickhouse: '#ffcc01',
        neo4j: '#008cc1', elasticsearch: '#005571', jwt: '#ff6b00', opencv: '#5c3ee8',
        nuxt: '#00c58e', node: '#339933', vue: '#4fc08d', symfony: '#000000',
        django: '#092e20', cs: '#092e20', jinja: '#b41717', rails: '#cc0000', doctrine: '#fc6a31',
        phoenix: '#fd4f00', alpinejs: '#77c1d2', bootstrap: '#7952b3', tailwind: '#06b6d4',
        rabbitmq: '#ff6600', githubactions: '#2088ff', gitlabci: '#fc6d26',
        golang: '#00add8', python: '#3776ab', react: '#61dafb', express: '#000000',
        docker: '#2496ed', rust: '#dea584', wasm: '#654ff0', tensorflow: '#ff6f00',
        elixir: '#4e2a8e', asm: '#c0c0c0', cmake: '#064f8c', qt: '#41cd52',
        sqlite: '#003b57', pandas: '#150458', numpy: '#013243', d3: '#f9a03c',
        websocket: '#6c5ce7', go: '#00add8', 'c++': '#00599c', 'node.js': '#339933',
        'vue.js': '#4fc08d', 'phoenixframework': '#fd4f00', 'github actions': '#2088ff',
        'gitlab ci': '#fc6d26',
    };

    function getTechColor(name) {
        const key = name.toLowerCase().trim();
        return techColors[key] || '#8a8a9a';
    }

    function renderTechBar(card) {
        const wrap = card.querySelector('.tech-bar-wrap');
        const legend = card.querySelector('.tech-legend');
        if (!wrap) return;

        const techs = [];
        for (const attr of card.attributes) {
            if (attr.name.startsWith('data-tech-')) {
                const name = attr.name.replace('data-tech-', '');
                const pct = parseInt(attr.value, 10) || 0;
                if (pct > 0) techs.push({ name, pct });
            }
        }
        if (techs.length === 0) {
            wrap.innerHTML = '<div style="font-size:0.7rem;color:#777;padding:4px 0;">No tech data</div>';
            if (legend) legend.innerHTML = '';
            return;
        }

        techs.sort((a, b) => b.pct - a.pct);
        const total = techs.reduce((s, t) => s + t.pct, 0);

        const bar = document.createElement('div');
        bar.className = 'tech-bar';

        techs.forEach(t => {
            const pct = total > 0 ? (t.pct / total) * 100 : 0;
            const seg = document.createElement('div');
            seg.className = 'tech-segment';
            seg.style.width = pct + '%';
            seg.style.background = getTechColor(t.name);
            seg.setAttribute('data-label', t.name);
            const label = document.createElement('span');
            label.className = 'seg-label';
            label.textContent = t.name;
            seg.appendChild(label);
            bar.appendChild(seg);
        });

        wrap.innerHTML = '';
        wrap.appendChild(bar);

        if (legend) {
            legend.innerHTML = '';
            techs.forEach(t => {
                const item = document.createElement('span');
                item.className = 'tech-legend-item';
                const dot = document.createElement('span');
                dot.className = 'tech-legend-dot';
                dot.style.background = getTechColor(t.name);
                item.appendChild(dot);
                const txt = document.createTextNode(t.name + ' ' + t.pct + '%');
                item.appendChild(txt);
                legend.appendChild(item);
            });
        }
    }

    function renderAllTechBars() {
        $$('.project-card').forEach(card => renderTechBar(card));
    }
    renderAllTechBars();


    function sweepScale(sweep, container) {
        if (!sweep || !container) return;
        const sr = sweep.getBoundingClientRect();
        const center = sr.left + sr.width / 2;
        $$('.project-card', container).forEach(card => {
            const cr = card.getBoundingClientRect();
            const cCenter = cr.left + cr.width / 2;
            card.classList.toggle('scaled', Math.abs(center - cCenter) < cr.width * 1.3);
        });
        requestAnimationFrame(() => sweepScale(sweep, container));
    }
    const legendarySweep = document.getElementById('legendarySweep');
    const legendaryProjects = document.getElementById('legendaryProjects');
    if (legendarySweep && legendaryProjects) requestAnimationFrame(() => sweepScale(legendarySweep, legendaryProjects));


    const typedText = document.getElementById('typedText');
    const engraving = document.getElementById('securityEngraved');
    const tooltip = document.getElementById('osTooltip');
    const greeting = document.getElementById('greetingText');
    const securityGlow = document.getElementById('securityGlow');
    const bgNature = document.getElementById('bgNature');
    const bgOcean = document.getElementById('bgOcean');
    const bgCastle = document.getElementById('bgCastle');
    const bgTribute = document.getElementById('bgTribute');
    const allBgs = [bgNature, bgOcean, bgCastle, bgTribute];

    const shadowClasses = {
        nature: 'greeting-shadow-nature',
        ocean: 'greeting-shadow-ocean',
        castle: 'greeting-shadow-castle',
        tribute: 'greeting-shadow-tribute'
    };

    function setActiveBg(activeId) {
        allBgs.forEach(bg => bg.classList.remove('active'));
        const el = document.getElementById(activeId);
        if (el) el.classList.add('active');
    }

    const backgrounds = {
        nature: { bg: 'bgNature', shadow: 'nature' },
        ocean: { bg: 'bgOcean', shadow: 'ocean' },
        castle: { bg: 'bgCastle', shadow: 'castle' },
        tribute: { bg: 'bgTribute', shadow: 'tribute' }
    };

    function setBg(key) {
        const cfg = backgrounds[key];
        if (cfg) {
            setActiveBg(cfg.bg);
            greeting.className = 'greeting';
            greeting.classList.add(shadowClasses[cfg.shadow]);
        }
    }

    function showSecurityGlow(show) {
        securityGlow.classList.toggle('active', show);
    }

    function showTooltip() {
        const rect = typedText.getBoundingClientRect();
        tooltip.style.top = (rect.top - 60) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - 80) + 'px';
        tooltip.classList.add('on');
    }

    function hideTooltip() {
        tooltip.classList.remove('on');
    }

    const phrases = [
        { text: 'Back-End Web Developer', bg: 'nature' },
        { text: 'Desktop Modern App Developer', bg: 'ocean', tooltip: true },
        { text: 'Graphic Designer', bg: 'castle' }
    ];

    let phraseIndex = 0, charIndex = 0, isDeleting = false, isEngraving = false;

    function type() {
        if (isEngraving) {
            if (!engraving.classList.contains('show')) {
                typedText.textContent = '';
                hideTooltip();
                engraving.classList.add('show');
                setBg('tribute');
                showSecurityGlow(true);
                setTimeout(() => {
                    engraving.classList.remove('show');
                    showSecurityGlow(false);
                    isEngraving = false;
                    phraseIndex = 0;
                    charIndex = 0;
                    isDeleting = false;
                    typedText.textContent = '';
                    hideTooltip();
                    setBg('nature');
                    type();
                }, 20000);
            }
            return;
        }

        const phrase = phrases[phraseIndex];
        const fullText = phrase.text;

        if (!isDeleting) {
            if (charIndex < fullText.length) {
                typedText.textContent = fullText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 45);
            } else {
                if (phrase.tooltip) {
                    showTooltip();
                }
                setBg(phrase.bg);
                showSecurityGlow(false);

                setTimeout(() => {
                    if (phraseIndex === phrases.length - 1) {
                        isEngraving = true;
                        type();
                    } else {
                        isDeleting = true;
                        setTimeout(type, 280);
                    }
                }, 2000);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                typedText.textContent = fullText.substring(0, charIndex);
                hideTooltip();
                setTimeout(type, 30);
            } else {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typedText.textContent = '';
                hideTooltip();
                setBg(phrases[phraseIndex].bg);
                showSecurityGlow(false);
                setTimeout(type, 350);
            }
        }
    }

    setBg('nature');
    showSecurityGlow(false);
    setTimeout(type, 400);


    const aboutFireContainer = document.getElementById('purpleFire');
    function createPurpleFlames() {
        aboutFireContainer.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const f = document.createElement('span');
            f.className = 'purple-flame';
            const angle = Math.random() * 360;
            const dist = 55 + Math.random() * 55;
            const rad = angle * Math.PI / 180;
            f.style.left = (50 + Math.cos(rad) * dist / 2) + '%';
            f.style.top = (50 + Math.sin(rad) * dist / 2) + '%';
            f.style.animationDelay = Math.random() * 1.2 + 's';
            aboutFireContainer.appendChild(f);
        }
    }
    createPurpleFlames();
    setInterval(createPurpleFlames, 4800);


    function spawnUltraFlames() {
        const tier = document.getElementById('tierUltra');
        tier.querySelectorAll('.ultra-flame, .sparkle').forEach(e => e.remove());
        const colors = ['#f2b924', '#ddd', '#fff', '#fce38a'];
        for (let i = 0; i < 35; i++) {
            const f = document.createElement('span');
            f.className = 'ultra-flame';
            f.style.left = (2 + Math.random() * 93) + '%';
            f.style.bottom = '0';
            f.style.animationDelay = Math.random() * 0.8 + 's';
            f.style.background =
            `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            f.style.boxShadow = `0 0 ${8 + Math.random() * 22}px ${f.style.background}`;
            tier.appendChild(f);
        }
        for (let i = 0; i < 20; i++) {
            const s = document.createElement('span');
            s.className = 'sparkle';
            s.style.left = (3 + Math.random() * 90) + '%';
            s.style.top = (8 + Math.random() * 70) + '%';
            s.style.animationDelay = Math.random() * 2 + 's';
            tier.appendChild(s);
        }
    }
    spawnUltraFlames();
    setInterval(spawnUltraFlames, 3400);


    function spawnMythicFlames() {
        const tier = document.getElementById('tierMythic');
        tier.querySelectorAll('.mythic-flame').forEach(e => e.remove());
        const colors = ['#ff2222', '#ff4444', '#ff6666', '#fff', '#ffaaaa', '#cc0000'];
        for (let i = 0; i < 50; i++) {
            const f = document.createElement('span');
            f.className = 'mythic-flame';
            f.style.left = (1 + Math.random() * 95) + '%';
            f.style.bottom = '0';
            f.style.animationDelay = Math.random() * 0.5 + 's';
            f.style.background =
            `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            f.style.boxShadow = `0 0 ${10 + Math.random() * 35}px ${f.style.background}`;
            tier.appendChild(f);
        }
    }
    spawnMythicFlames();
    setInterval(spawnMythicFlames, 2400);


    const mythicShock = document.getElementById('mythicShockwave');
    setInterval(() => {
        mythicShock.style.animation = 'none';
        mythicShock.offsetHeight;
        mythicShock.style.animation = 'shock 2.4s ease-in-out forwards';
    }, 2400);


    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.fade-container, .fade-element').forEach(el => fadeObserver.observe(el));
    setTimeout(() => document.getElementById('heroContent').classList.add('visible'), 150);

    window.addEventListener('scroll', hideTooltip);

    document.querySelectorAll('.footer-nav a').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderAllTechBars, 200);
    });
})();
