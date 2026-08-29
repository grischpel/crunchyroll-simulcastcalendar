const translations = {
  de: {
    title: "Folgenfortschrittsanzeige-Farbe",
    label: "Folgenfortschrittsanzeige-Farbe",
    save: "Speichern",
    saved: "Gespeichert",
    error: "Fehler beim Speichern",
    ariaColor: "Folgenfortschrittsanzeige-Farbe auswählen",
    ariaPreview: "Ausgewählte Farbe anzeigen",
    ariaSave: "Ausgewählte Farbe speichern",
  },
  en: {
    title: "Episode progress color",
    label: "Episode progress color",
    save: "Save",
    saved: "Saved",
    error: "Save failed",
    ariaColor: "Select episode progress color",
    ariaPreview: "Show selected color",
    ariaSave: "Save selected color",
  },
  id: {
    title: "Warna progress episode",
    label: "Warna progress episode",
    save: "Simpan",
    saved: "Tersimpan",
    error: "Gagal menyimpan",
    ariaColor: "Pilih warna progress episode",
    ariaPreview: "Tampilkan warna yang dipilih",
    ariaSave: "Simpan warna yang dipilih",
  },
  es: {
    title: "Color de progreso del episodio",
    label: "Color de progreso del episodio",
    save: "Guardar",
    saved: "Guardado",
    error: "Error al guardar",
    ariaColor: "Seleccionar color de progreso del episodio",
    ariaPreview: "Mostrar el color seleccionado",
    ariaSave: "Guardar el color seleccionado",
  },
  fr: {
    title: "Couleur de progression de l'épisode",
    label: "Couleur de progression de l'épisode",
    save: "Enregistrer",
    saved: "Enregistré",
    error: "Échec de l'enregistrement",
    ariaColor: "Sélectionner la couleur de progression de l'épisode",
    ariaPreview: "Afficher la couleur sélectionnée",
    ariaSave: "Enregistrer la couleur sélectionnée",
  },
  it: {
    title: "Colore avanzamento episodio",
    label: "Colore avanzamento episodio",
    save: "Salva",
    saved: "Salvato",
    error: "Salvataggio non riuscito",
    ariaColor: "Seleziona il colore di avanzamento episodio",
    ariaPreview: "Mostra il colore selezionato",
    ariaSave: "Salva il colore selezionato",
  },
  pt: {
    title: "Cor de progresso do episódio",
    label: "Cor de progresso do episódio",
    save: "Salvar",
    saved: "Salvo",
    error: "Falha ao salvar",
    ariaColor: "Selecionar cor de progresso do episódio",
    ariaPreview: "Mostrar cor selecionada",
    ariaSave: "Salvar a cor selecionada",
  },
  ru: {
    title: "Цвет прогресса эпизода",
    label: "Цвет прогресса эпизода",
    save: "Сохранить",
    saved: "Сохранено",
    error: "Ошибка сохранения",
    ariaColor: "Выбрать цвет прогресса эпизода",
    ariaPreview: "Показать выбранный цвет",
    ariaSave: "Сохранить выбранный цвет",
  },
  ar: {
    title: "لون تقدم الحلقة",
    label: "لون تقدم الحلقة",
    save: "حفظ",
    saved: "تم الحفظ",
    error: "فشل الحفظ",
    ariaColor: "اختر لون تقدم الحلقة",
    ariaPreview: "إظهار اللون المحدد",
    ariaSave: "حفظ اللون المحدد",
  },
  hi: {
    title: "एपिसोड प्रगति रंग",
    label: "एपिसोड प्रगति रंग",
    save: "सेव करें",
    saved: "सेव हो गया",
    error: "सेव करने में त्रुटि",
    ariaColor: "एपिसोड प्रगति रंग चुनें",
    ariaPreview: "चयनित रंग दिखाएँ",
    ariaSave: "चयनित रंग सेव करें",
  },
  th: {
    title: "สีความคืบหน้าของตอน",
    label: "สีความคืบหน้าของตอน",
    save: "บันทึก",
    saved: "บันทึกแล้ว",
    error: "บันทึกไม่สำเร็จ",
    ariaColor: "เลือกสีความคืบหน้าของตอน",
    ariaPreview: "แสดงสีที่เลือก",
    ariaSave: "บันทึกสีที่เลือก",
  },
};

const lang = (navigator.language || "en").slice(0, 2).toLowerCase();
const t = translations[lang] || translations.en;

const colorInput = document.getElementById("userColorInput");
const colorLabel = document.getElementById("userColorLabel");
const saveToast = document.getElementById("saveToast");
const defaultColor = "#ffffff";
let saveTimer = null;

const showToast = (message, isError = false) => {
  if (!saveToast) {
    return;
  }

  saveToast.classList.toggle("error", isError);
  saveToast.innerHTML = `<div class="toast-content">${message}</div>`;
  saveToast.classList.add("visible");

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    saveToast.classList.remove("visible");
  }, 1200);
};

const saveColor = (color) => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    chrome.storage.local.set({ userColor: color }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab?.id) {
          chrome.tabs.sendMessage(tab.id, { type: "updateUserColor", color }, () => {
            const sendError = chrome.runtime.lastError;
            if (sendError) {
              console.warn("Color update message could not be delivered to content script:", sendError.message || sendError);
            }
          });
        }
      });

      showToast(t.saved || t.save, false);
    });
  }, 500);
};

document.getElementById("popupTitle").textContent = t.title;
colorLabel.textContent = t.label;
colorInput.setAttribute("aria-label", t.ariaColor);
colorInput.setAttribute("title", t.ariaColor);

chrome.storage.local.get(["userColor"], (result) => {
  const storedColor = result.userColor || defaultColor;
  colorInput.value = storedColor;
});

colorInput.addEventListener("input", () => {
  const color = colorInput.value;
  saveColor(color);
});
