export interface FormField {
  id: string;
  type: "text" | "checkbox" | "radio" | "select";
  label: string;
  options?: string[];
  position: number;
  isDeleted: boolean;
  value: string | string[]; // Add value field to store input values
}
