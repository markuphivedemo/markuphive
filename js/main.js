
/* ==========================================
   MARKUPHIVE — MAIN JAVASCRIPT
   ========================================== */


/* ==========================================
   1. HELPER FUNCTIONS
   ========================================== */

const $ = (q, root = document) => root.querySelector(q);

const peso = n =>
    '₱' + Number(n).toLocaleString('en-PH');

const escapeHTML = s =>
    String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));


/* ==========================================
   2. HEADER AND FOOTER
   ========================================== */

function layout() {

    const page = document.body.dataset.page || 'home';

    const nav = [
        ['index.html', 'Home', 'home'],
        ['about.html', 'About Me', 'about'],
        ['projects.html', 'Projects', 'projects'],
        ['offers.html', 'Offers', 'offers']
    ];

    // HEADER
    $('#header').innerHTML = `
        <header class="site-header">
            <div class="container nav-wrap">

                <a
                    class="logo"
                    href="index.html"
                    aria-label="MarkupHive home"
                >
                    <img
                        src="assets/logo-wordmark.png"
                        alt="MarkupHive logo"
                    >
                </a>

                <button
                    class="menu-toggle"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                >
                    ☰
                </button>

                <nav class="nav" aria-label="Main navigation">
                    ${nav.map(([url, label, key]) => `
                        <a
                            class="${
                                page === key ||
                                (page === 'ready' || page === 'custom') &&
                                key === 'offers'
                                    ? 'active'
                                    : ''
                            }"
                            href="${url}"
                        >
                            ${label}
                        </a>
                    `).join('')}
                </nav>

            </div>
        </header>
    `;

    // MOBILE NAVIGATION
    $('.menu-toggle').addEventListener('click', () => {

        const open = $('.nav').classList.toggle('open');

        $('.menu-toggle').setAttribute(
            'aria-expanded',
            open
        );

    });


    // FOOTER
    $('#footer').innerHTML = `
        <footer class="footer">
            <div class="container">

                <div class="footer-grid">

                    <!-- Brand -->
                    <div class="footer-brand">

                        <a href="index.html">
                            <img
                                src="assets/logo-wordmark.png"
                                alt="MarkupHive"
                            >
                        </a>

                        <p>
                            Thoughtfully crafted websites for
                            businesses, creators, and dreamers.
                        </p>

                    </div>

                    <!-- Explore -->
                    <div>
                        <h3>Explore</h3>

                        <a href="index.html">Home</a>
                        <a href="about.html">About Me</a>
                        <a href="projects.html">Projects</a>
                        <a href="offers.html">Offers</a>
                    </div>

                    <!-- Services -->
                    <div>
                        <h3>Services</h3>

                        <a href="ready-made.html">
                            Ready-Made Websites
                        </a>

                        <a href="made-to-order.html">
                            Made-to-Order
                        </a>
                    </div>

                    <!-- Contact and Policies -->
                    <div>
                        <h3>Get in Touch</h3>

                        <a
                            href="${MH_CONFIG.facebook}"
                            target="_blank"
                            rel="noopener"
                        >
                            Facebook
                        </a>

                        <a href="mailto:${MH_CONFIG.email}">
                            Email
                        </a>

                        <a
                            href="${MH_CONFIG.messenger}"
                            target="_blank"
                            rel="noopener"
                        >
                            Messenger
                        </a>

                        <a href="policies.html#terms">
                            Terms of Service
                        </a>

                        <a href="policies.html#privacy">
                            Privacy Policy
                        </a>

                        <a href="policies.html#purchases">
                            Refunds and Cancellations
                        </a>
                    </div>

                </div>

                <div class="footer-bottom">

                    <span>
                        © ${new Date().getFullYear()}
                        MarkupHive. All rights reserved.
                    </span>

                    <span>
                        Designed & developed by MarkupHive ♡
                    </span>

                </div>

            </div>
        </footer>
    `;
}


/* ==========================================
   3. PROJECT CARDS
   ========================================== */

function projectCard(p) {

    return `
        <article class="card">

            <a
                href="${escapeHTML(p.url)}"
                target="_blank"
                rel="noopener"
                aria-label="Visit ${escapeHTML(p.name)}"
            >
                <div class="card-image">

                    <img
                        src="${escapeHTML(p.image)}"
                        alt="Preview of ${escapeHTML(p.name)}"
                        loading="lazy"
                    >

                </div>
            </a>

            <div class="card-body">

                <h3>${escapeHTML(p.name)}</h3>

                <p>${escapeHTML(p.description)}</p>

                <a
                    class="btn btn-sm"
                    href="${escapeHTML(p.url)}"
                    target="_blank"
                    rel="noopener"
                >
                    Navigate Website ↗
                </a>

            </div>

        </article>
    `;
}


/* ==========================================
   4. WEBSITE TEMPLATE CARDS
   ========================================== */

function templateCard(p) {

    return `
        <article class="card">

            <a
                href="${escapeHTML(p.url)}"
                target="_blank"
                rel="noopener"
                aria-label="Preview ${escapeHTML(p.name)}"
            >
                <div class="card-image">

                    <img
                        src="${escapeHTML(p.image)}"
                        alt="Preview of ${escapeHTML(p.name)}"
                        loading="lazy"
                    >

                </div>
            </a>

            <div class="card-body">

                <span class="chip">
                    ${escapeHTML(p.category)}
                </span>

                <h3 style="margin-top:12px">
                    ${escapeHTML(p.name)}
                </h3>

                <p>${escapeHTML(p.description)}</p>

                <div class="price">
                    ${peso(p.price)}
                </div>

                <div class="card-actions">

                    <a
                        class="btn btn-sm btn-outline"
                        href="${escapeHTML(p.url)}"
                        target="_blank"
                        rel="noopener"
                    >
                        Preview ↗
                    </a>

                    <button
                        class="btn btn-sm buy"
                        data-id="${escapeHTML(p.id)}"
                    >
                        Purchase Template
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* ==========================================
   5. PROJECT AND TEMPLATE FILTERS
   ========================================== */

function renderFilters(type) {

    const data = type === 'projects'
        ? MH_PROJECTS
        : MH_TEMPLATES;

    const root = $('#catalog');
    const filterRoot = $('#filters');

    if (!root) return;

    const categories = [
        'All',
        ...new Set(data.map(p => p.category))
    ];

    let selected = 'All';


    function draw() {

        // Generate filter buttons
        filterRoot.innerHTML = categories.map(c => `
            <button
                type="button"
                class="filter ${c === selected ? 'active' : ''}"
                data-filter="${escapeHTML(c)}"
            >
                ${escapeHTML(c)}
            </button>
        `).join('');


        // Filter the catalog
        const items = data.filter(p =>
            selected === 'All' || p.category === selected
        );


        // Display the cards
        root.innerHTML = items.map(
            type === 'projects'
                ? projectCard
                : templateCard
        ).join('') || '<p class="empty">No results found.</p>';


        // Filter button events
        filterRoot.querySelectorAll('button').forEach(b => {

            b.addEventListener('click', () => {

                selected = b.dataset.filter;

                draw();

            });

        });


        // Purchase button events
        if (type === 'templates') {

            root.querySelectorAll('.buy').forEach(b => {

                b.addEventListener('click', () => {
                    openPurchase(b.dataset.id);
                });

            });

        }

    }

    draw();
}


/* ==========================================
   6. CLIENT TESTIMONIALS / REVIEWS
   ========================================== */

let reviewStart = 0;

function reviews() {

    const root = $('#reviews');

    if (!root) return;

    const n = MH_REVIEWS.length;


    function draw() {

        root.innerHTML = Array.from(
            { length: Math.min(3, n) },
            (_, i) => {

                const r = MH_REVIEWS[(reviewStart + i) % n];

                return `
                    <article class="review-card">

                        <div
                            class="stars"
                            aria-label="5 stars"
                        >
                            ★★★★★
                        </div>

                        <p>
                            “${escapeHTML(r.quote)}”
                        </p>

                        <small>
                            — ${escapeHTML(r.by)}
                        </small>

                    </article>
                `;

            }
        ).join('');


        // Review pagination indicators
        $('#review-dots').textContent = Array.from(
            { length: n },
            (_, i) => i === reviewStart ? '●' : '○'
        ).join(' ');

    }


    // Previous review
    $('#review-prev').addEventListener('click', () => {

        reviewStart = (reviewStart + n - 1) % n;

        draw();

    });


    // Next review
    $('#review-next').addEventListener('click', () => {

        reviewStart = (reviewStart + 1) % n;

        draw();

    });


    draw();
}


/* ==========================================
   7. ORDER SUMMARY GENERATOR
   ========================================== */

function orderSummary(data) {

    return `
MARKUPHIVE — TEMPLATE PURCHASE INQUIRY

Template: ${data.product.name}
Price: ${peso(data.product.price)}
Customer: ${data.name}
Email: ${data.email}
Business / Brand: ${data.brand || 'Not provided'}
Preferred Contact: ${data.contact}
Customization Notes: ${data.notes || 'None'}

I would like to inquire about purchasing this template.
Please confirm availability, scope, payment details,
and delivery timeline.
    `.trim();

}


/* ==========================================
   8. PURCHASE MODAL
   ========================================== */

let activeProduct = null;

function openPurchase(id) {

    activeProduct = MH_TEMPLATES.find(p => p.id === id);

    if (!activeProduct) return;

    $('#selected-template').textContent =
        `${activeProduct.name} — ${peso(activeProduct.price)}`;

    $('#purchase-form').reset();

    $('#purchase-step').classList.remove('hidden');

    $('#summary-step').classList.add('hidden');

    $('#purchase-modal').showModal();
}


/* ==========================================
   9. TEMPLATE CHECKOUT
   ========================================== */

function initCheckout() {

    const dialog = $('#purchase-modal');

    if (!dialog) return;


    // Close modal
    $('#close-modal').addEventListener('click', () => {
        dialog.close();
    });


    // Close when clicking outside
    dialog.addEventListener('click', e => {

        if (e.target === dialog) {
            dialog.close();
        }

    });


    // Purchase form submission
    $('#purchase-form').addEventListener('submit', e => {

        e.preventDefault();

        const f = new FormData(e.currentTarget);

        const data = {
            product: activeProduct,
            name: f.get('name').trim(),
            email: f.get('email').trim(),
            brand: f.get('brand').trim(),
            contact: f.get('contact'),
            notes: f.get('notes').trim()
        };

        const s = orderSummary(data);

        $('#order-summary').textContent = s;

        $('#purchase-step').classList.add('hidden');

        $('#summary-step').classList.remove('hidden');


        // Copy order summary
        $('#copy-order').onclick = async () => {

            try {

                await navigator.clipboard.writeText(s);

                $('#copy-order').textContent = 'Copied ✓';

            } catch {

                const range = document.createRange();

                range.selectNodeContents($('#order-summary'));

                getSelection().removeAllRanges();

                getSelection().addRange(range);

                alert(
                    'Select and copy the highlighted summary manually.'
                );

            }

        };


        // Messenger link
        $('#messenger-order').href = MH_CONFIG.messenger;

    });


    // Edit order details
    $('#edit-order').addEventListener('click', () => {

        $('#summary-step').classList.add('hidden');

        $('#purchase-step').classList.remove('hidden');

    });

}


/* ==========================================
   10. MADE-TO-ORDER WEBSITE FORM
   ========================================== */

function initCustom() {

    const form = $('#custom-form');

    if (!form) return;


    form.addEventListener('submit', e => {

        e.preventDefault();

        const f = new FormData(form);

        const s = `
MARKUPHIVE — CUSTOM WEBSITE REQUEST

Name: ${f.get('name')}
Email: ${f.get('email')}
Business: ${f.get('brand') || 'Not provided'}
Website Type: ${f.get('type')}
Pages: ${f.get('pages')}
Budget: ${f.get('budget')}
Timeline: ${f.get('timeline') || 'Flexible'}
Features & Notes: ${f.get('notes') || 'None'}

Please send a quotation and next steps.
        `.trim();


        // Display generated summary
        $('#custom-summary').textContent = s;

        $('#custom-result').classList.remove('hidden');

        $('#custom-result').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });


        // Copy custom website inquiry
        $('#custom-copy').onclick = async () => {

            try {

                await navigator.clipboard.writeText(s);

                $('#custom-copy').textContent = 'Copied ✓';

            } catch {

                alert(
                    'Please select and copy the summary manually.'
                );

            }

        };


        // Messenger link
        $('#custom-messenger').href = MH_CONFIG.messenger;

    });

}


/* ==========================================
   11. INITIALIZE WEBSITE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Load header and footer
    layout();

    // Initialize client reviews
    reviews();

    // Initialize project/template catalogs
    if ($('#catalog')) {

        renderFilters(
            document.body.dataset.page === 'projects'
                ? 'projects'
                : 'templates'
        );

    }

    // Initialize purchase modal
    initCheckout();

    // Initialize made-to-order form
    initCustom();

});
