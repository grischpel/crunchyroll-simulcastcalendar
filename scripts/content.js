(() => {
  'use strict';

  const currentPath = window.location.pathname;
  const baseMatch = currentPath.match(/^(.*?\/simulcastcalendar)/);

  if (!baseMatch) {
    console.error('Basis-URL konnte nicht ermittelt werden.');
    return;
  }

const translations = {
  de: {
    loading: 'Filter werden geladen...',
    reset: 'Zurücksetzen',
    releaseFilter: 'Release-Filter',
    all: 'Alle',
    onlyDubbed: 'Nur synchronisiert',
    onlySubbed: 'Nur mit Untertiteln',
    currentlyWatching: 'Derzeit am Schauen',
    languageLabels: {
      de: 'Deutsch',
      en: 'Englisch',
      id: 'Indonesisch',
      es: 'Spanisch',
      fr: 'Französisch',
      it: 'Italienisch',
      pt: 'Portugiesisch',
      ru: 'Russisch',
      ar: 'Arabisch',
      hi: 'Hindi',
      th: 'Thailändisch',
      ja: 'Japanisch',
      ko: 'Koreanisch',
      tr: 'Türkisch',
      pl: 'Polnisch',
      unknown: 'Unbekannt'
    }
  },

  en: {
    loading: 'Loading filters...',
    reset: 'Reset',
    releaseFilter: 'Release Filter',
    all: 'All',
    onlyDubbed: 'Only Dubbed',
    onlySubbed: 'Only Subbed',
    currentlyWatching: 'Currently watching',
    languageLabels: {
      de: 'German',
      en: 'English',
      id: 'Indonesian',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ar: 'Arabic',
      hi: 'Hindi',
      th: 'Thai',
      ja: 'Japanese',
      ko: 'Korean',
      tr: 'Turkish',
      pl: 'Polish',
      unknown: 'Unknown'
    }
  },

  id: {
    loading: 'Memuat filter...',
    reset: 'Setel ulang',
    releaseFilter: 'Filter rilis',
    all: 'Semua',
    onlyDubbed: 'Hanya dubbing',
    onlySubbed: 'Hanya subtitle',
    currentlyWatching: 'Sedang ditonton',
    languageLabels: {
      de: 'Jerman',
      en: 'Inggris',
      id: 'Bahasa Indonesia',
      es: 'Spanyol',
      fr: 'Prancis',
      it: 'Italia',
      pt: 'Portugis',
      ru: 'Rusia',
      ar: 'Arab',
      hi: 'Hindi',
      th: 'Thai',
      ja: 'Jepang',
      ko: 'Korea',
      tr: 'Turki',
      pl: 'Polandia',
      unknown: 'Tidak diketahui'
    }
  },

  es: {
    loading: 'Cargando filtros...',
    reset: 'Restablecer',
    releaseFilter: 'Filtro de estreno',
    all: 'Todos',
    onlyDubbed: 'Solo doblado',
    onlySubbed: 'Solo subtitulado',
    currentlyWatching: 'Viendo actualmente',
    languageLabels: {
      de: 'Alemán',
      en: 'Inglés',
      id: 'Indonesio',
      es: 'Español',
      fr: 'Francés',
      it: 'Italiano',
      pt: 'Portugués',
      ru: 'Ruso',
      ar: 'Árabe',
      hi: 'Hindi',
      th: 'Tailandés',
      ja: 'Japonés',
      ko: 'Coreano',
      tr: 'Turco',
      pl: 'Polaco',
      unknown: 'Desconocido'
    }
  },

  fr: {
    loading: 'Chargement des filtres...',
    reset: 'Réinitialiser',
    releaseFilter: 'Filtre de sortie',
    all: 'Tous',
    onlyDubbed: 'Seulement doublé',
    onlySubbed: 'Seulement sous-titré',
    currentlyWatching: 'En train de regarder',
    languageLabels: {
      de: 'Allemand',
      en: 'Anglais',
      id: 'Indonésien',
      es: 'Espagnol',
      fr: 'Français',
      it: 'Italien',
      pt: 'Portugais',
      ru: 'Russe',
      ar: 'Arabe',
      hi: 'Hindi',
      th: 'Thaï',
      ja: 'Japonais',
      ko: 'Coréen',
      tr: 'Turc',
      pl: 'Polonais',
      unknown: 'Inconnu'
    }
  },

  it: {
    loading: 'Caricamento filtri...',
    reset: 'Reimposta',
    releaseFilter: 'Filtro di uscita',
    all: 'Tutti',
    onlyDubbed: 'Solo doppiato',
    onlySubbed: 'Solo sottotitolato',
    currentlyWatching: 'Attualmente in visione',
    languageLabels: {
      de: 'Tedesco',
      en: 'Inglese',
      id: 'Indonesiano',
      es: 'Spagnolo',
      fr: 'Francese',
      it: 'Italiano',
      pt: 'Portoghese',
      ru: 'Russo',
      ar: 'Arabo',
      hi: 'Hindi',
      th: 'Thailandese',
      ja: 'Giapponese',
      ko: 'Coreano',
      tr: 'Turco',
      pl: 'Polacco',
      unknown: 'Sconosciuto'
    }
  },

  pt: {
    loading: 'Carregando filtros...',
    reset: 'Redefinir',
    releaseFilter: 'Filtro de lançamento',
    all: 'Todos',
    onlyDubbed: 'Somente dublado',
    onlySubbed: 'Somente legendado',
    currentlyWatching: 'Assistindo no momento',
    languageLabels: {
      de: 'Alemão',
      en: 'Inglês',
      id: 'Indonésio',
      es: 'Espanhol',
      fr: 'Francês',
      it: 'Italiano',
      pt: 'Português',
      ru: 'Russo',
      ar: 'Árabe',
      hi: 'Hindi',
      th: 'Tailandês',
      ja: 'Japonês',
      ko: 'Coreano',
      tr: 'Turco',
      pl: 'Polonês',
      unknown: 'Desconhecido'
    }
  },

  ru: {
    loading: 'Загрузка фильтров...',
    reset: 'Сбросить',
    releaseFilter: 'Фильтр релизов',
    all: 'Все',
    onlyDubbed: 'Только дубляж',
    onlySubbed: 'Только с субтитрами',
    currentlyWatching: 'Сейчас смотрю',
    languageLabels: {
      de: 'Немецкий',
      en: 'Английский',
      id: 'Индонезийский',
      es: 'Испанский',
      fr: 'Французский',
      it: 'Итальянский',
      pt: 'Португальский',
      ru: 'Русский',
      ar: 'Арабский',
      hi: 'Хинди',
      th: 'Тайский',
      ja: 'Японский',
      ko: 'Корейский',
      tr: 'Турецкий',
      pl: 'Польский',
      unknown: 'Неизвестно'
    }
  },

  ar: {
    loading: 'جارٍ تحميل عوامل التصفية...',
    reset: 'إعادة تعيين',
    releaseFilter: 'تصفية الإصدارات',
    all: 'الكل',
    onlyDubbed: 'المدبلج فقط',
    onlySubbed: 'المترجم فقط',
    currentlyWatching: 'أشاهد حاليًا',
    languageLabels: {
      de: 'الألمانية',
      en: 'الإنجليزية',
      id: 'الإندونيسية',
      es: 'الإسبانية',
      fr: 'الفرنسية',
      it: 'الإيطالية',
      pt: 'البرتغالية',
      ru: 'الروسية',
      ar: 'العربية',
      hi: 'الهندية',
      th: 'التايلاندية',
      ja: 'اليابانية',
      ko: 'الكورية',
      tr: 'التركية',
      pl: 'البولندية',
      unknown: 'غير معروف'
    }
  },

  hi: {
    loading: 'फ़िल्टर लोड हो रहे हैं...',
    reset: 'रीसेट करें',
    releaseFilter: 'रिलीज़ फ़िल्टर',
    all: 'सभी',
    onlyDubbed: 'केवल डब',
    onlySubbed: 'केवल सबटाइटल',
    currentlyWatching: 'अभी देख रहा हूँ',
    languageLabels: {
      de: 'जर्मन',
      en: 'अंग्रेज़ी',
      id: 'इंडोनेशियाई',
      es: 'स्पेनिश',
      fr: 'फ़्रेंच',
      it: 'इतालवी',
      pt: 'पुर्तगाली',
      ru: 'रूसी',
      ar: 'अरबी',
      hi: 'हिंदी',
      th: 'थाई',
      ja: 'जापानी',
      ko: 'कोरियाई',
      tr: 'तुर्की',
      pl: 'पोलिश',
      unknown: 'अज्ञात'
    }
  },

  th: {
    loading: 'กำลังโหลดตัวกรอง...',
    reset: 'รีเซ็ต',
    releaseFilter: 'ตัวกรองการเผยแพร่',
    all: 'ทั้งหมด',
    onlyDubbed: 'เฉพาะพากย์',
    onlySubbed: 'เฉพาะซับไตเติล',
    currentlyWatching: 'กำลังรับชม',
    languageLabels: {
      de: 'เยอรมัน',
      en: 'อังกฤษ',
      id: 'อินโดนีเซีย',
      es: 'สเปน',
      fr: 'ฝรั่งเศส',
      it: 'อิตาลี',
      pt: 'โปรตุเกส',
      ru: 'รัสเซีย',
      ar: 'อาหรับ',
      hi: 'ฮินดี',
      th: 'ไทย',
      ja: 'ญี่ปุ่น',
      ko: 'เกาหลี',
      tr: 'ตุรกี',
      pl: 'โปแลนด์',
      unknown: 'ไม่ทราบ'
    }
  }
};

const lang = (document.documentElement.lang || navigator.language || 'en')
  .slice(0, 2)
  .toLowerCase();

const t = translations[lang] || translations.en;
  const base = window.location.origin + baseMatch[1];
  const episodelist = document.querySelectorAll('.release');
  const availableDubLanguages = new Set();

const languageCodeMap = {
  de: ['german', 'deutsch', 'allemand', 'aleman', 'tedesco'],
  en: ['english', 'english (us)', 'englisch', 'anglais', 'ingles', 'inglese'],
  id: ['bahasa indonesia', 'indonesian', 'indonesisch', 'indonesio', 'indonesiano', 'indonesien'],
  es: ['spanish', 'spanisch', 'espanol', 'espanol (espana)', 'espagnol', 'spagnolo'],
  fr: ['french', 'franzosisch', 'francais', 'francais (france)', 'frances', 'francese'],
  it: ['italian', 'italienisch', 'italiano', 'italien'],
  pt: ['portuguese', 'portugiesisch', 'portugues', 'portugues (brasil)', 'portugues (portugal)', 'portugais', 'portoghese'],
  ru: ['russian', 'russisch', 'russe', 'ruso', 'russo', 'русский', 'русскии'],
  ar: ['arabic', 'arabisch', 'arabe', 'arabo', 'العربية'],
  hi: ['hindi', 'हिंदी'],
  th: ['thai', 'thailandisch', 'tailandes', 'thailandese', 'ไทย'],
  ja: ['japanese', 'japanisch', 'japonais', 'japones', 'giapponese', '日本語'],
  ko: ['korean', 'koreanisch', 'coreano', 'coreen', '한국어'],
  tr: ['turkish', 'turkisch', 'turco', 'turc', 'turkce'],
  pl: ['polish', 'polnisch', 'polaco', 'polonais', 'polski']
};

  const normalizeText = (value) =>
    String(value || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

const getLanguageCode = (rawLanguage) => {
  const normalized = normalizeText(rawLanguage);

  for (const [code, aliases] of Object.entries(languageCodeMap)) {
    if (aliases.includes(normalized)) {
      return code;
    }
  }

  return 'unknown';
};

  const getLanguageLabel = (code) => {
    return t.languageLabels?.[code] || code;
  };

	const getDubLanguageFromSeasonName = (season) => {
	  if (typeof season !== 'string' || season.trim() === '') {
		return null;
	  }

	  const dubMatch = season.match(/\(([^)]+?)\s+Dub\)/i);
	  if (dubMatch) {
		return dubMatch[1].trim();
	  }

	  const plainLanguageMatch = season.match(/\(([^)]+)\)\s*$/i);
	  if (plainLanguageMatch) {
		const possibleLanguage = plainLanguageMatch[1].trim();
		const languageCode = getLanguageCode(possibleLanguage);

		if (languageCode !== 'unknown') {
		  return possibleLanguage;
		}
	  }

	  return null;
	};

  const createSpinner = () => {
    const spinner = document.createElement('div');
    spinner.id = 'loading_spinner';
    spinner.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
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

  const applyAlternatingRowStyles = () => {
    const visibleItems = Array.from(
      document.querySelectorAll('li:not(.d-none):not(.queue-hidden)')
    );

    visibleItems.forEach((li, index) => {
      li.classList.remove('even', 'odd');
      li.classList.add(index % 2 === 0 ? 'even' : 'odd');
    });
  };

  const applyLanguageFilter = (checkedLangs) => {
    const dubbedReleases = document.querySelectorAll('.release.dubbed');

    if (checkedLangs.length === 0) {
      dubbedReleases.forEach((el) => {
        const li = el.closest('li');
        if (li) {
          li.classList.remove('d-none');
        }
      });
      return;
    }

    const classListToMatch = checkedLangs.map((code) => `lang-${code}`);

    dubbedReleases.forEach((el) => {
      const li = el.closest('li');
      if (!li) {
        return;
      }

      const matchesLanguage = classListToMatch.some((cls) =>
        el.classList.contains(cls)
      );

      if (matchesLanguage) {
        li.classList.remove('d-none');
      } else {
        li.classList.add('d-none');
      }
    });
  };

  const applyQueueFilter = (onlyInQueue) => {
    document.querySelectorAll('.release').forEach((item) => {
      const li = item.closest('li');
      if (!li) {
        return;
      }

      const isInQueue = item.classList.contains('in-queue');

      if (!onlyInQueue || isInQueue) {
        li.classList.remove('queue-hidden');
      } else {
        li.classList.add('queue-hidden');
      }
    });
  };

const createResetButton = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = t.reset;
  btn.className = 'language-reset-button btn btn-language';

  btn.addEventListener('click', () => {
    localStorage.removeItem('mainFilter');
    localStorage.removeItem('languageFilter');
    localStorage.removeItem('queueFilter');

    const mainFilterAll = document.querySelector('input[type="radio"][value="all"]');
    if (mainFilterAll) {
      mainFilterAll.checked = true;
    }

    document.querySelectorAll('.language-checkbox').forEach((cb) => {
      cb.checked = false;
    });

    const queueCheckbox = document.querySelector('.in-queue-checkbox');
    if (queueCheckbox) {
      queueCheckbox.checked = false;
    }

    applyMainFilter('all');
    applyQueueFilter(false);
    applyAlternatingRowStyles();
  });

  return btn;
};

  const createLanguageCheckbox = (languageCode) => {
    const label = document.createElement('label');
    label.className = 'language-filter-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = languageCode;
    checkbox.className = 'language-checkbox';

    checkbox.addEventListener('change', () => {
      const checkedLangs = Array.from(
        document.querySelectorAll('.language-checkbox:checked')
      ).map((cb) => cb.value);

      localStorage.setItem('languageFilter', JSON.stringify(checkedLangs));
      applyLanguageFilter(checkedLangs);
      applyQueueFilter(document.querySelector('.in-queue-checkbox')?.checked === true);
      applyAlternatingRowStyles();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(getLanguageLabel(languageCode)));

    return label;
  };

  const renderLanguageFilterContainer = () => {
    const langFilterContainer = document.querySelector('#language_filter_container');
    if (!langFilterContainer) {
      return;
    }

    langFilterContainer.innerHTML = '';

    const sortedLanguageCodes = Array.from(availableDubLanguages).sort((a, b) =>
      getLanguageLabel(a).localeCompare(getLanguageLabel(b), lang)
    );

    sortedLanguageCodes.forEach((languageCode) => {
      langFilterContainer.appendChild(createLanguageCheckbox(languageCode));
    });

if (sortedLanguageCodes.length > 0) {
  langFilterContainer.style.display = 'flex';

      const savedLangs = JSON.parse(localStorage.getItem('languageFilter') || '[]');
      if (savedLangs.length > 0) {
        const checkboxes = langFilterContainer.querySelectorAll('.language-checkbox');
        checkboxes.forEach((cb) => {
          if (savedLangs.includes(cb.value)) {
            cb.checked = true;
          }
        });
        applyLanguageFilter(savedLangs);
      }
    } else {
      langFilterContainer.style.display = 'none';
    }
  };

  const applyMainFilter = (value) => {
    const allReleases = document.querySelectorAll('.release');

    allReleases.forEach((el) => {
      const li = el.closest('li');
      if (li) {
        li.classList.add('d-none');
      }
    });

    const langFilterContainer = document.querySelector('#language_filter_container');
    if (langFilterContainer) {
      langFilterContainer.innerHTML = '';
      langFilterContainer.style.display = 'none';
    }

    if (value === 'all') {
      allReleases.forEach((el) => {
        const li = el.closest('li');
        if (li) {
          li.classList.remove('d-none');
        }
      });
    } else if (value === 'subbed') {
      document.querySelectorAll('.release.subbed').forEach((el) => {
        const li = el.closest('li');
        if (li) {
          li.classList.remove('d-none');
        }
      });
    } else if (value === 'dubbed') {
      document.querySelectorAll('.release.dubbed').forEach((el) => {
        const li = el.closest('li');
        if (li) {
          li.classList.remove('d-none');
        }
      });

      renderLanguageFilterContainer();
    }

    applyQueueFilter(document.querySelector('.in-queue-checkbox')?.checked === true);
    applyAlternatingRowStyles();
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
      applyMainFilter(value);
    });

    contentSpan.appendChild(input);

    const textSpan = document.createElement('span');
    textSpan.textContent = labelText;
    contentSpan.appendChild(textSpan);

    label.appendChild(contentSpan);

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

  const initFilters = () => {
    const referenceForm = document.querySelector('#filter_toggle_form');
    if (!referenceForm) {
      return;
    }

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

const queueActionsWrapper = document.createElement('div');
queueActionsWrapper.className = 'queue-actions-wrapper';
queueActionsWrapper.appendChild(createInQueueCheckbox());
queueActionsWrapper.appendChild(createResetButton());

filterWrapper.appendChild(queueActionsWrapper);

    referenceForm.insertAdjacentElement('afterend', filterWrapper);

    const savedMainFilter = localStorage.getItem('mainFilter') || 'all';
    const filterRadio = filterWrapper.querySelector(
      `input[type="radio"][value="${savedMainFilter}"]`
    );

    if (filterRadio) {
      filterRadio.checked = true;
    }

    const savedQueueFilter = localStorage.getItem('queueFilter') === '1';
    const queueCheckbox = filterWrapper.querySelector('.in-queue-checkbox');

    if (queueCheckbox) {
      queueCheckbox.checked = savedQueueFilter;
    }

    applyMainFilter(savedMainFilter);
  };

  const fetches = [];

  episodelist.forEach((item) => {
    const popoverUrl = item.dataset.popoverUrl;
    if (!popoverUrl) {
      return;
    }

    const relativePopoverPath = popoverUrl.replace(/^\/?simulcastcalendar/, '');
    const getReleaseInfoUrl = `${base}${relativePopoverPath}`;

    const fetchPromise = fetch(getReleaseInfoUrl, {
      method: 'GET',
      headers: new Headers(),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        const season = result?.seasonName ?? '';
        const language = getDubLanguageFromSeasonName(season);
        const inQueue = result?.inQueue === true;

        if (language) {
          const languageCode = getLanguageCode(language);
          item.classList.add('dubbed');
          item.classList.add(`lang-${languageCode}`);
          availableDubLanguages.add(languageCode);
        } else {
          item.classList.add('subbed');
        }

        if (inQueue) {
          item.classList.add('in-queue');
        } else {
          item.classList.add('not-in-queue');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Episodeninfos:', error);
      });

    fetches.push(fetchPromise);
  });

  Promise.all(fetches).then(() => {
    if (spinner) {
      spinner.remove();
    }
    initFilters();
  });
})();