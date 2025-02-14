# Project Title

URL: https://sanooj.github.io/

## Description
Briefly describe what the project is about, its purpose, and its main features.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm start
   ```

## Running End-to-End Tests
To run the e2e tests using Cypress, follow these steps:

1. **Open Cypress Test Runner**
   ```bash
   npx cypress open
   ```

2. **Run Tests**
   - Select the test file you want to run from the Cypress Test Runner interface.
   - The tests will execute in a browser, and you can observe the results in real-time.

3. **Headless Mode (Optional)**
   To run tests in headless mode (without opening the browser), use:
   ```bash
   npx cypress run
   ```

## Events
### Cypress Tests
- **Visit Homepage**: The homepage is tested by visiting the URL `http://localhost:5173/`.
- **Verify URL**: After certain actions, the URL is verified to ensure it does not match the `/stories/...` pattern.

### Story Viewer Component
- **Navigation**: The component allows users to navigate through stories using "prev" and "next" buttons.
- **Visibility**: The buttons are visually hidden but accessible for screen readers.
- **Auto-Switch Stories**: The component automatically switches to the next story after a specified duration.
- **Last Story Handling**: When the last story is reached, it switches to the next story or loops back to the first story.

## Styling
- **SCSS Files**: The project uses SCSS for styling. Key styles include:
  - `.hidden`: Used to hide elements visually.
  - `.content`: Adds padding to the main content area.

## Additional Information
- **Technologies Used**: List any frameworks, libraries, or tools used in the project (e.g., React, Cypress).
- **Contributing**: Provide guidelines for contributing to the project.
