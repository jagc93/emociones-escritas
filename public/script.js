let currentPage = 1;
let pagesTotal = document.querySelectorAll(`div[class^="page"]`).length;

function siguientePagina() {
    const page = document.getElementById(`page${currentPage}`);
    currentPage++;

    if (currentPage > pagesTotal) {
        currentPage = pagesTotal;
        document.querySelector('.arrow-next').classList.add('hide');
        return;
    }

    const num = currentPage > 1 ? currentPage - 1 : currentPage;
    if (num !== currentPage) {
        document.getElementById(`page${num}`).classList.add('hide');
    }

    const pageNext = document.getElementById(`page${currentPage}`);

    if (pageNext.classList.contains('hide')) {
        pageNext.classList.remove('hide');
    }

    page.style.transform = 'translateX(-100%)';
    pageNext.style.transform = 'translateX(0)';

    const previous = document.querySelector('.arrow-previous');
    previous.classList.remove('hide');

    if (currentPage >= pagesTotal) {
        const next = document.querySelector('.arrow-next');
        next.classList.add('hide');
    }

    const itemsPageNextHide = pageNext.querySelectorAll(`p[class^="p"]:not(.hide)`);
    const itemsPageNextAll = pageNext.querySelectorAll(`p[class^="p"]`);
    const reload = document.querySelector(`.reload-page`);

    if (itemsPageNextHide.length === 0) {
        if (!reload.classList.contains('hide')) {
            reload.classList.add('hide');
        }
    } else if(itemsPageNextHide.length === itemsPageNextAll.length) {
        if (reload.classList.contains('hide')) {
            reload.classList.remove('hide');
        }
    } else {
        if (!reload.classList.contains('hide')) {
            reload.classList.add('hide');
        }
    }
}

function volverPagina() {
    const page = document.getElementById(`page${currentPage}`);
    currentPage--;

    if (currentPage < 1) {
        currentPage = 1;
        document.querySelector('.arrow-previous').classList.add('hide');
        return;
    }

    const pagePrevious = document.getElementById(`page${currentPage}`);

    if (pagePrevious.classList.contains('hide')) {
        pagePrevious.classList.remove('hide');
    }

    pagePrevious.style.transform = 'translateX(0)';
    page.style.transform = 'translateX(100%)';

    if (currentPage === 1) {
        const previous = document.querySelector('.arrow-previous');
        previous.classList.add('hide');
    }

    const next = document.querySelector('.arrow-next');
    if (next.classList.contains('hide')) {
        next.classList.remove('hide');
    }

    const itemspagePreviousHide = pagePrevious.querySelectorAll(`p[class^="p"]:not(.hide)`);
    const itemspagePreviousAll = pagePrevious.querySelectorAll(`p[class^="p"]`);
    const reload = document.querySelector(`.reload-page`);

    if (itemspagePreviousHide.length === 0) {
        if (!reload.classList.contains('hide')) {
            reload.classList.add('hide');
        }
    } else if(itemspagePreviousHide.length === itemspagePreviousAll.length) {
        if (reload.classList.contains('hide')) {
            reload.classList.remove('hide');
        }
    } else {
        if (!reload.classList.contains('hide')) {
            reload.classList.add('hide');
        }
    }
}

/** Mostrar contenido de la pagina gradualmente */
function mostrarSiguienteParrafo(page, current) {
    document.querySelector(`#${page} .p${current}`).classList.remove('hide');

    for (let i = current; i > 0; i--) {
        document.querySelector(`#${page} .btn${i}`).classList.add('hide');
    }

    const totalItems = document.querySelectorAll(`#${page} p[class^="p"]`).length;
    const reload = document.querySelector(`.reload-page`);

    if (current < totalItems) {
        document.querySelector(`#${page} .btn${current + 1}`).classList.remove('hide');
        if (!reload.classList.contains('hide')) {
            reload.classList.add('hide');
        }
    } else {
        if (reload.classList.contains('hide')) {
            reload.classList.remove('hide');
        }
    }
}

/** Reinicia solo la página que se visible */
function reloadPage() {
    const visiblePage = document.querySelector('.page:not(.hide)');

    if (visiblePage) {
        const items = visiblePage.querySelectorAll('p[class^="p"]:not(.hide)');
        items.forEach(item => item.classList.add('hide'));
        visiblePage.querySelector(`.btn1`).classList.remove('hide');
    }
    document.querySelector(`.reload-page`).classList.add('hide');
}

/** Dirigir a la página deseada */
function init() {
    const href = location.href;
    const params = href.split('?');

    if (params.length > 1) {
        const param = params[1].split('=');
        if (param.length > 1 && param[0].trim() === 'step') {
            const num = Number(param[1])
            const step = isNaN(num) || num === 0 ? 1 : num > pagesTotal ? pagesTotal : num;
            currentPage = step - 1;
            if (currentPage > 0) {
                siguientePagina();
            } else {
                currentPage = 1;
                showDefault();
            }
        } else {
            showDefault();
        }
    } else {
        showDefault();
    }
}

function showDefault() {
    const page = document.getElementById(`page${currentPage}`);
    page.classList.remove('hide');
}