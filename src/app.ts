import { FormField } from "./interfaces";

// Defining the form fields array
const formFields: FormField[] = [];

// Importing the required modules
const fieldTypeSelect = document.getElementById("fieldType") as HTMLSelectElement;
const fieldsContainer = document.getElementById("fieldsContainer") as HTMLDivElement;
const previewModal = document.getElementById("previewModal") as HTMLDivElement;
const saveButton = document.getElementById("saveBtn") as HTMLButtonElement;
const clearButton = document.getElementById("clearBtn") as HTMLButtonElement;
const previewButton = document.getElementById("previewBtn") as HTMLButtonElement;

// adding event listeners to the buttons for cretaing the form type
fieldTypeSelect.addEventListener("change", handleFieldTypeChange);

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
                    <button onclick="deleteField('${field.id}')" class="button" ${
        field.isDeleted ? "disabled" : ""
      }>x</button>
                    </div>
                     
                </div>
            `;

      fieldsContainer.appendChild(fieldElement);
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
                    <div>
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
                    <div>
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
