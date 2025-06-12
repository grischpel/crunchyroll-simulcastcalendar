(() => {
  'use strict';

  const currentPath = window.location.pathname;
  const baseMatch = currentPath.match(/^(.*?\/simulcastcalendar)/);

  if (!baseMatch) {
    console.error('Basis-URL konnte nicht ermittelt werden.');
    return;
  }
  // --- Übersetzungen ---
  const translations = {
    de: {
      loading: 'Filter werden geladen...',
      reset: 'Zurücksetzen',
      releaseFilter: 'Release-Filter',
      all: 'Alle',
      onlyDubbed: 'Nur synchronisiert',
      onlySubbed: 'Nur mit Untertiteln',
      currentlyWatching: 'Derzeit am Schauen',
    },
    en: {
      loading: 'Loading filters...',
      reset: 'Reset',
      releaseFilter: 'Release Filter',
      all: 'All',
      onlyDubbed: 'Only Dubbed',
      onlySubbed: 'Only Subbed',
      currentlyWatching: 'Currently watching',
    },
    es: {
      loading: 'Cargando filtros...',
      reset: 'Restablecer',
      releaseFilter: 'Filtro de lanzamiento',
      all: 'Todos',
      onlyDubbed: 'Solo doblado',
      onlySubbed: 'Solo subtitulado',
      currentlyWatching: 'Viendo actualmente',
    },
    it: {
      loading: 'Caricamento filtri...',
      reset: 'Reimposta',
      releaseFilter: 'Filtro di rilascio',
      all: 'Tutti',
      onlyDubbed: 'Solo doppiato',
      onlySubbed: 'Solo sottotitolato',
      currentlyWatching: 'Attualmente in visione',
    },
    fr: {
      loading: 'Chargement des filtres...',
      reset: 'Réinitialiser',
      releaseFilter: 'Filtre de sortie',
      all: 'Tous',
      onlyDubbed: 'Seulement doublé',
      onlySubbed: 'Seulement sous-titré',
      currentlyWatching: 'En train de regarder',
    }
  };

  // Sprache aus HTML-Attribut oder Browser-Sprache bestimmen, fallback: deutsch
  const lang = (document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
  const t = translations[lang] || translations.en;
  const base = window.location.origin + baseMatch[1];
  const availableDubLanguages = new Set();

  const episodelist = document.querySelectorAll('.release');

  const createSpinner = () => {
    const spinner = document.createElement('div');
    spinner.id = 'loading_spinner';
    spinner.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
      font-weight: bold;
      background: rgba(255,255,255,0.9);
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
      z-index: 9999;
    `;
    spinner.textContent = t.loading;
    document.body.appendChild(spinner);
    return spinner;
  };

  const spinner = createSpinner();

  const getDubLanguageFromSeasonName = (season) => {
    const dubMatch = season.match(/\(([^)]+) Dub\)/i);
    return dubMatch ? dubMatch[1].trim() : null;
  };

  const fetches = [];

  episodelist.forEach(item => {
    const popoverUrl = item.dataset.popoverUrl;
    if (!popoverUrl) return;

    const relativePopoverPath = popoverUrl.replace(/^\/?simulcastcalendar/, '');
    const getReleaseInfoUrl = `${base}${relativePopoverPath}`;

    const fetchPromise = fetch(getReleaseInfoUrl, {
      method: 'GET',
      headers: new Headers(),
      redirect: 'follow',
    })
    .then(response => response.json())
    .then(result => {
      const season = result?.seasonName ?? '';
      const language = getDubLanguageFromSeasonName(season);
      const inQueue = result?.inQueue === true;

      if (language) {
        item.classList.add('dubbed');
        const langClass = `lang-${language.toLowerCase().replace(/\s+/g, '-')}`;
        item.classList.add(langClass);
        availableDubLanguages.add(language);
      } else {
        item.classList.add('subbed');
      }

      if (inQueue) {
        item.classList.add('in-queue');
      } else {
        item.classList.add('not-in-queue');
      }
    })
    .catch(error => console.error('Fehler beim Abrufen der Episodeninfos:', error));

    fetches.push(fetchPromise);
  });

  const createResetButton = () => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = t.reset;
    btn.className = 'language-reset-button btn btn-language';
    btn.style.marginLeft = '1rem';

    btn.addEventListener('click', () => {
      document.querySelectorAll('.language-checkbox').forEach(cb => cb.checked = false);
      localStorage.removeItem('languageFilter');
      localStorage.removeItem('queueFilter');
      document.querySelector('.in-queue-checkbox').checked = false;
      applyLanguageFilter([]);
      applyQueueFilter(false);
      applyAlternatingRowStyles();
    });

    return btn;
  };

  const createFilterButton = (value, labelText, name = 'release-filter') => {
    const label = document.createElement('label');
    label.className = 'filter-toggle extension-filter-label';

    const contentSpan = document.createElement('span');
    contentSpan.className = 'content';

    const input = document.createElement('input');
    input.className = 'filter-button extension-filter-input';
    input.name = name;
    input.type = 'radio';
    input.value = value;

    input.addEventListener('change', () => {
      localStorage.setItem('mainFilter', value);

      const allReleases = document.querySelectorAll('.release');
      allReleases.forEach(el => el.closest('li').classList.add('d-none'));

      const langFilterContainer = document.querySelector('#language_filter_container');
      langFilterContainer.innerHTML = '';

      if (value === 'all') {
        allReleases.forEach(el => el.closest('li').classList.remove('d-none'));
        langFilterContainer.style.display = 'none';
      } else if (value === 'subbed') {
        document.querySelectorAll('.release.subbed').forEach(el =>
          el.closest('li').classList.remove('d-none')
        );
        langFilterContainer.style.display = 'none';
      } else if (value === 'dubbed') {
        document.querySelectorAll('.release.dubbed').forEach(el =>
          el.closest('li').classList.remove('d-none')
        );

        availableDubLanguages.forEach(lang => {
          langFilterContainer.appendChild(createLanguageCheckbox(lang));
        });

        langFilterContainer.appendChild(createResetButton());
        langFilterContainer.style.display = 'flex';

        const savedLangs = JSON.parse(localStorage.getItem('languageFilter') || '[]');
        if (savedLangs.length) {
          const checkboxes = langFilterContainer.querySelectorAll('.language-checkbox');
          checkboxes.forEach(cb => {
            if (savedLangs.includes(cb.value)) cb.checked = true;
          });
          applyLanguageFilter(savedLangs);
        }
      }
      applyQueueFilter(document.querySelector('.in-queue-checkbox')?.checked);
      applyAlternatingRowStyles();
    });

    contentSpan.appendChild(input);
    contentSpan.appendChild(document.createElement('span')).textContent = labelText;
    label.appendChild(contentSpan);

    return label;
  };

  const createLanguageCheckbox = (language) => {
    const label = document.createElement('label');
    label.className = 'language-filter-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = language;
    checkbox.className = 'language-checkbox';

    checkbox.addEventListener('change', () => {
      const checkedLangs = Array.from(document.querySelectorAll('.language-checkbox:checked'))
        .map(cb => cb.value);
      localStorage.setItem('languageFilter', JSON.stringify(checkedLangs));
      applyLanguageFilter(checkedLangs);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(language));
    return label;
  };

  const createInQueueCheckbox = () => {
    const label = document.createElement('label');
    label.className = 'in-queue-checkbox-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'in-queue-checkbox';

    checkbox.addEventListener('change', () => {
      localStorage.setItem('queueFilter', checkbox.checked ? '1' : '0');
      applyQueueFilter(checkbox.checked);
	  applyAlternatingRowStyles();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(t.currentlyWatching));
    return label;
  };

  const applyLanguageFilter = (checkedLangs) => {
    const classListToMatch = checkedLangs.map(lang =>
      `lang-${lang.toLowerCase().replace(/\s+/g, '-')}`
    );

    document.querySelectorAll('.release.dubbed').forEach(el => {
      const li = el.closest('li');
      if (
        checkedLangs.length === 0 ||
        classListToMatch.some(cls => el.classList.contains(cls))
      ) {
        li.classList.remove('d-none');
      } else {
        li.classList.add('d-none');
      }
    });
  };

  const applyQueueFilter = (onlyInQueue) => {
    document.querySelectorAll('.release').forEach(item => {
      const li = item.closest('li');
      const isInQueue = item.classList.contains('in-queue');

      if (!onlyInQueue || isInQueue) {
        li.classList.remove('queue-hidden');
      } else {
        li.classList.add('queue-hidden');
      }
    });
  };

  const applyAlternatingRowStyles = () => {
    const visibleItems = Array.from(
      document.querySelectorAll('li:not(.d-none):not(.queue-hidden)')
    );
    visibleItems.forEach((li, index) => {
      li.classList.remove('even', 'odd');
      li.classList.add(index % 2 === 0 ? 'even' : 'odd');
    });
  };

  const initFilters = () => {
    const referenceForm = document.querySelector('#filter_toggle_form');
    if (!referenceForm) return;

    const filterWrapper = document.createElement('div');
    filterWrapper.id = 'extension_filter_wrapper';
    filterWrapper.className = 'extension-filter-form';

    const title = document.createElement('h3');
    title.textContent = t.releaseFilter;
    filterWrapper.appendChild(title);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    [
      { value: 'all', label: t.all },
      { value: 'dubbed', label: t.onlyDubbed },
      { value: 'subbed', label: t.onlySubbed },
    ].forEach(({ value, label }) => {
      contentDiv.appendChild(createFilterButton(value, label));
    });

    const langFilterContainer = document.createElement('div');
    langFilterContainer.id = 'language_filter_container';
    langFilterContainer.className = 'language-filter-container';
    langFilterContainer.style.display = 'none';

    filterWrapper.appendChild(contentDiv);
    filterWrapper.appendChild(langFilterContainer);
    filterWrapper.appendChild(createInQueueCheckbox());

    referenceForm.insertAdjacentElement('afterend', filterWrapper);

    const savedMainFilter = localStorage.getItem('mainFilter') || 'all';
    const filterRadio = filterWrapper.querySelector(`input[type=radio][value=${savedMainFilter}]`);
    if (filterRadio) filterRadio.checked = true;
    applyMainFilter(savedMainFilter);

    const savedQueueFilter = localStorage.getItem('queueFilter') === '1';
    if (savedQueueFilter) {
      const checkbox = filterWrapper.querySelector('.in-queue-checkbox');
      checkbox.checked = true;
      applyQueueFilter(true);
    }

    applyAlternatingRowStyles();
  };

  const applyMainFilter = (value) => {
    const allReleases = document.querySelectorAll('.release');
    allReleases.forEach(el => el.closest('li').classList.add('d-none'));

    const langFilterContainer = document.querySelector('#language_filter_container');
    langFilterContainer.innerHTML = '';

    if (value === 'all') {
      allReleases.forEach(el => el.closest('li').classList.remove('d-none'));
      langFilterContainer.style.display = 'none';
    } else if (value === 'subbed') {
      document.querySelectorAll('.release.subbed').forEach(el =>
        el.closest('li').classList.remove('d-none')
      );
      langFilterContainer.style.display = 'none';
    } else if (value === 'dubbed') {
      document.querySelectorAll('.release.dubbed').forEach(el =>
        el.closest('li').classList.remove('d-none')
      );
      availableDubLanguages.forEach(lang => {
        langFilterContainer.appendChild(createLanguageCheckbox(lang));
      });
      langFilterContainer.appendChild(createResetButton());
      langFilterContainer.style.display = 'flex';

      const savedLangs = JSON.parse(localStorage.getItem('languageFilter') || '[]');
      if (savedLangs.length) {
        const checkboxes = langFilterContainer.querySelectorAll('.language-checkbox');
        checkboxes.forEach(cb => {
          if (savedLangs.includes(cb.value)) cb.checked = true;
        });
        applyLanguageFilter(savedLangs);
      }
    }
  };

  Promise.all(fetches).then(() => {
    spinner.remove();
    initFilters();
  });
})();