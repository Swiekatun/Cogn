## Prerequisites

1. **Node.js**  
   Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

2. **Playwright**  
   The project requires Playwright to be installed for browser automation.

## Setup

1. **Clone the Repository**  
   Clone this repository to your local machine. 

2. **Install Dependencies**  
   Run the following command to install the required node dependencies:  

   ```bash
   npm install
   ```

3. **Install Playwright**  
   Install Playwright by running:  

   ```bash
   npx playwright install
   ```

4. **Create a `USER.js` File**  
   Create a file named `USER.js` in the project's main directory. This file will store your email and password credentials.

   **Example `USER.js`:**

   ```javascript
   export const USER = {
     email: 'youremail@email.com',
     password: 'yourpassword',
   };
   ```

   *Replace `youremail@email.com` and `yourpassword` with your actual credentials.*
