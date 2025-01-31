import {
  clearButton,
  closeButton,
  fieldsContainer,
  fieldTypeSelect,
  previewButton,
  previewContentElement,
  previewModal,
  saveButton,
} from "./eventHandlers";
import { FormField } from "./interfaces";

// Defining the form fields array
let formFields: FormField[] = [];

// adding event listeners to the buttons for cretaing the form type
fieldTypeSelect.addEventListener("change", handleFieldTypeChange);

// Event listener for the save button
saveButton.addEventListener("click", () => {
  alert("Form saved successfully!");
  saveToLocalStorage(formFields);
});

// Event listener for the clear button
clearButton.addEventListener("click", () => {
  formFields = [];
  renderFields(formFields);
  localStorage.removeItem("formFields");
});

// Event listener for the preview button
previewButton.addEventListener("click", () => {
  showPreview(previewContentElement);
});

// close the preview modal when the close button is clicked
closeButton?.addEventListener("click", () => {
  previewModal.style.display = "none";
});

// Function to load the form fields from local storage
window.onload = loadFormFields;

/**
 * Handles the event when the field type is changed.
 *
 * @param {Event} evt - The change event.
 */
function handleFieldTypeChange(evt: Event): void {
  const selectEl = evt.target as HTMLSelectElement;
  const fieldType = selectEl.value;
  if (!fieldType) return;

  // Get label from prompt
  const label = prompt("Enter label for the field:") as string;
  if (!label) return;

  // Create field object based on the field type
  const field: FormField = {
    id: Date.now().toString(),
    type: fieldType as FormField["type"],
    label,
    position: formFields.length,
    isDeleted: false,
    value: fieldType === "checkbox" ? [] : "", // Initialize empty value
  };

  // Get options from prompt if field type is checkbox or radio
  if (fieldType === "checkbox" || fieldType === "radio") {
    const optionsStr = prompt("Enter options separated by comma:") as string;
    if (!optionsStr) return;
    field.options = optionsStr.split(",").map((opt) => opt.trim());
  }

  // Add the field to the form fields array
  formFields.push(field);

  // event for rendering the fields
  renderFields(formFields);
  selectEl.value = "";
}

/**
 * Renders the fields in the form.
 *
 * @param {FormField[]} fields - The form fields to render.
 * @returns {void}
 */
function renderFields(fields: FormField[]): void {
  fieldsContainer.innerHTML = "";

  // Render the fields
  fields
    .filter((field) => !field.isDeleted)
    .sort((a, b) => a.position - b.position)
    .forEach((field) => {
      const fieldElement = document.createElement("div");
      fieldElement.className = "field-container";
      fieldElement.draggable = true;
      fieldElement.dataset.id = field.id;

      fieldElement.innerHTML = `
                <div class="field">
                    <label for="field-${field.id}">${field.label}</label>
                    <div id="field-${field.id}-input" class="field-input">
                    ${renderFieldInput(field)} 
                    <div class="field-actions">
                    <button class='edit' onclick='editField("${field.id}")'>Edit</button>
                    <button onclick="deleteField('${field.id}')" class="button" ${
        field.isDeleted ? "disabled" : ""
      }>x</button>
                    </div>
                    </div>
                </div>
            `;

      // Add drag listeners to the field element
      addDragListeners(fieldElement);

      fieldsContainer.appendChild(fieldElement);

      // Add event listeners to inputs after rendering
      addInputListeners(field.id);
    });
}

/**
 * Renders a form field input element based on the field type.
 *
 * @param {FormField} field - The form field to render.
 * @returns {string} - The rendered form field input element.
 */
function renderFieldInput(field: FormField): string {
  // switch case for rendering the input based on the field type
  switch (field.type) {
    case "text":
      return `<input type="text" class="field-input" id="field-${field.id}" data-field-id="${
        field.id
      }" value="${field.value || ""}">`;
    case "checkbox":
      return (
        field.options
          ?.map((opt) => {
            const isChecked = Array.isArray(field.value) && field.value.includes(opt);
            return `
                    <div class="option">
                        <input type="checkbox" 
                               class="field-input" 
                               data-field-id="${field.id}" 
                               value="${opt}" 
                               ${isChecked ? "checked" : ""}>
                        ${opt}
                    </div>`;
          })
          .join("") || ""
      );
    case "radio":
      return (
        field.options
          ?.map((opt) => {
            const isChecked = field.value === opt;
            return `
                    <div class="option">
                        <input type="radio" 
                               class="field-input" 
                               name="radio_${field.id}" 
                               data-field-id="${field.id}" 
                               value="${opt}" 
                               ${isChecked ? "checked" : ""}>
                        ${opt}
                    </div>`;
          })
          .join("") || ""
      );
    default:
      return "";
  }
}

/**
 * Adds change event listeners to the inputs with the given field ID.
 * @param {string} fieldId - The ID of the field.
 */
function addInputListeners(fieldId: string): void {
  // find the field with the given field ID
  const field = formFields.find((f) => f.id === fieldId);

  // if the field is not found, return
  if (!field) return;

  // find all the input elements with the given field ID
  const inputs = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    `[data-field-id="${fieldId}"]`,
  );

  // add change event listeners to the input elements
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (field.type === "checkbox") {
        const checkedValues = Array.from(inputs)
          .filter((input) => (input as HTMLInputElement).checked)
          .map((input) => input.value);
        field.value = checkedValues;
      } else {
        field.value = input.value;
      }

      // Save to localStorage whenever value changes
      saveToLocalStorage(formFields);
    });
  });
}

/**
 * Saves the current form fields to local storage.
 *
 * @param {FormField[]} formFields - The form fields to save.
 * @returns {void}
 */
function saveToLocalStorage(formFields: FormField[]): void {
  localStorage.setItem("formFields", JSON.stringify(formFields));
}

/**
 * Shows a preview of the form fields.
 *
 * @param {HTMLElement | null} previewContentElement - The element to render the preview content in.
 * @returns {void}
 */
function showPreview(previewContentElement: HTMLElement | null): void {
  if (!previewContentElement) return;

  const previewContent = formFields
    .filter((field) => !field.isDeleted)
    .sort((a, b) => a.position - b.position)
    .map(
      (field) => `
            <div class="preview-field">
                <strong>${field.label}</strong>: 
                <span>${
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value
                    ? field.value
                    : "N/A"
                }</span>
            </div>
        `,
    )
    .join("");

  previewContentElement.innerHTML = previewContent;

  previewModal.style.display = "flex";
}

/**
 * Loads the form fields from localStorage, parses them as FormField[], and renders them.
 *
 * @returns {void}
 */
function loadFormFields(): void {
  const savedFields: string | null = localStorage.getItem("formFields");
  if (savedFields !== null) {
    const parsedFields: FormField[] = JSON.parse(savedFields) as FormField[];
    formFields = parsedFields;
    renderFields(parsedFields);
  }
}

/**
 * Adds event listeners to the given field element for drag events.
 * @param {HTMLDivElement} fieldElement - The field element to add drag listeners to.
 */
function addDragListeners(fieldElement: HTMLDivElement): void {
  if (!fieldElement || !fieldsContainer) return;

  fieldElement.addEventListener("dragstart", (event: DragEvent) => {
    if (!event.dataTransfer || !fieldElement.dataset.id) return;

    event.dataTransfer.setData("text/plain", fieldElement.dataset.id);
    fieldElement.classList.add("dragging");
  });

  fieldElement.addEventListener("dragend", () => {
    fieldElement.classList.remove("dragging");
  });

  fieldsContainer.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    const draggingElement = document.querySelector(".dragging") as HTMLDivElement | null;

    if (!draggingElement) return;

    const afterElement = getDragAfterElement(fieldsContainer, event.clientY);
    if (afterElement == null) {
      fieldsContainer.appendChild(draggingElement);
    } else {
      fieldsContainer.insertBefore(draggingElement, afterElement);
    }
  });

  fieldsContainer.addEventListener("drop", () => {
    const draggingElement = document.querySelector(".dragging") as HTMLDivElement | null;
    if (!draggingElement) return;

    draggingElement.classList.remove("dragging");
    updateFieldPositions(fieldsContainer);
  });
}

/**
 * Gets the element after the given y position in the container.
 * @param {HTMLDivElement} container - The container element to search in.
 * @param {number} y - The y position to search for.
 * @returns {HTMLDivElement | null} The element after the given y position, or null if none is found.
 */
function getDragAfterElement(container: HTMLDivElement, y: number): HTMLDivElement | null {
  if (!container) return null;

  const draggableElements = Array.from(
    container.querySelectorAll<HTMLDivElement>(".field-container:not(.dragging)"),
  );

  return draggableElements.reduce<{ offset: number; element: HTMLDivElement | null }>(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null },
  ).element;
}

/**
 * Updates the positions of the fields based on the DOM order.
 * @param {HTMLDivElement | null} fieldsContainer - The container element of the fields.
 * @returns {void}
 */
function updateFieldPositions(fieldsContainer: HTMLDivElement | null): void {
  if (!fieldsContainer) return;

  const fieldContainers = fieldsContainer.querySelectorAll<HTMLDivElement>(".field-container");
  fieldContainers.forEach((container, index) => {
    const fieldId = container.dataset.id;
    const field = formFields.find((f) => f.id === fieldId);
    if (field) {
      field.position = index;
    }
  });
  saveToLocalStorage(formFields);
}

(window as any).deleteField = deleteField;
function deleteField(fieldId: string) {
  const field = formFields.find((f) => f.id === fieldId);
  if (!field) return;

  field.isDeleted = true;
  renderFields(formFields);
}

(window as any).editField = editField;
function editField(fieldId: string) {
  const field = formFields.find((f) => f.id === fieldId);
  if (field) {
    const newLabel = prompt("Enter new label for the field:", field.label);
    if (newLabel) {
      field.label = newLabel;
      saveToLocalStorage(formFields);
      renderFields(formFields); // Re-render fields to reflect changes
    }
  }
}
