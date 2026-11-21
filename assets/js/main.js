/*=============== SHOW SCROLL UP ===============*/

const scrollUp = () => {
    const el = document.getElementById('scroll-up')
    if (!el) return
    window.scrollY >= 350 ? el.classList.add('show-scroll') : el.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 90
        const sectionId = current.getAttribute('id')
        const links = document.querySelectorAll('.nav_list a[href*=' + sectionId + ']')
        const isActive = scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight
        links.forEach(l => l.classList.toggle('active-link', isActive))
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== MINI NAV (apparaît au scroll, après le hero) ===============*/

const miniNav = document.getElementById('mini-nav')
const hero = document.getElementById('home')

const onScrollNav = () => {
    if (!miniNav || !hero) return
    const trigger = hero.offsetTop + hero.offsetHeight - 140
    miniNav.classList.toggle('nav-shown', window.scrollY > trigger)
}
window.addEventListener('scroll', onScrollNav, { passive: true })
window.addEventListener('resize', onScrollNav)
onScrollNav()


/*=============== STAT COUNTERS (count up on view) ===============*/

const stats = document.querySelectorAll('.stat')

const animateStat = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0
    const suffix = el.getAttribute('data-suffix') || ''
    const duration = 1200
    const start = performance.now()
    const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(eased * target) + (p === 1 ? suffix : '')
        if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

if ('IntersectionObserver' in window && stats.length) {
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target)
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.4 })
    stats.forEach(s => obs.observe(s))
} else {
    stats.forEach(s => { s.textContent = (s.getAttribute('data-target') || '') + (s.getAttribute('data-suffix') || '') })
}


/*=============== CARROUSEL EXPÉRIENCES (plein écran) ===============*/

const xp = document.querySelector('.xp')
if (xp) {
    const slides = xp.querySelectorAll('.xp-slide')
    const thumbs = xp.querySelectorAll('.xp-thumb')
    const counter = xp.querySelector('.xp-counter')
    const counter2 = xp.querySelector('.xp-counter2')
    const bar = xp.querySelector('.xp-bar')
    const total = slides.length
    let idx = 0
    const pad = n => String(n + 1).padStart(2, '0')

    const show = (n) => {
        const prev = idx
        idx = (n + total) % total
        slides.forEach((s, i) => {
            if (i === idx) {
                s.classList.add('is-active')
                s.classList.remove('is-prev')
            } else if (i === prev && prev !== idx) {
                s.classList.remove('is-active')
                s.classList.add('is-prev')
            } else {
                s.classList.remove('is-active', 'is-prev')
            }
        })
        // La vignette de l'expérience active disparaît : les autres se décalent (défilement)
        thumbs.forEach((t, i) => t.classList.toggle('is-hidden', i === idx))
        if (counter) counter.textContent = pad(idx)
        if (counter2) counter2.textContent = pad(idx)
        if (bar) bar.style.width = ((idx + 1) / total * 100) + '%'
    }

    const prev = xp.querySelector('.xp-prev')
    const next = xp.querySelector('.xp-next')
    if (prev) prev.addEventListener('click', () => show(idx - 1))
    if (next) next.addEventListener('click', () => show(idx + 1))
    thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)))

    show(0)
}
