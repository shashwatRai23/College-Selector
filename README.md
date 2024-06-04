# College Selector
This project is a web interface built with React.js that allows users to search and select a college from a dropdown. After selecting a college, the interface displays the college's name, country, and logo on a dashboard.

 ![Landing Page](public/assets/landingPage.png)
# Table of Contents

1. ⚙️ Tech Stack
2. 🔋 Features
3. 🤸 Quick Start
4. 🤖 Usage

# ⚙️ Tech Stack

- React.js
- Material UI
- CSS

# 🔋 Features
- College Selection Dropdown: Searchable dropdown using Material-UI's Autocomplete component.
- Display College Logo: Fetch and display the logo of the selected college.
- Error Handling: Handle API request errors using Material-UI's Alert component.
- Performance: Efficiently handles large datasets with debounce and loading states.

# 🤸 Quick Start
## 1. Clone the repository
```sh
git clone https://github.com/shashwatRai23/College-Selector.git
```

```sh
cd college-search-dashboard
```
## 2. Install dependencies:
```sh
npm install
```
## 3. Start the development server:
```sh
npm start
```
The application will be available at http://localhost:3000.

# 🤖 Usage
## Components
- **SearchComponent:** The main component that contains the logic for searching and selecting colleges.
## State Management
- **colleges:** List of colleges fetched from the API.
- **selectedCollege:** The currently selected college from the dropdown.
- **logo:** URL of the selected college's logo.
- **loading:** Indicates whether data is being loaded.
- **error:** Holds error messages for API request failures.
## API Functions
- **fetchColleges:** Fetches colleges based on the search query.
  
  ```js
    const fetchColleges = async (searchQuery) => {
      const response = await axios.get(`http://universities.hipolabs.com/search?name=${searchQuery}`);
      return response.data;
    };
  ```
- **fetchLogo:** Fetches the logo of a college based on its domain.
  
   ```js
    const fetchLogo = async (domain) => {
      try {
        const response = await axios.get(`https://logo.clearbit.com/${domain}`);
        return response.status === 200 ? response.config.url : null;
      } catch {
        throw new Error("Error fetching logo");
      }
   };
  ```

## Handling API Errors
API errors are caught and displayed using Material-UI's "Alert" component.

```js
  {error && <Alert severity="error">{error}</Alert>}
```




**Feel free to contribute to the project by submitting issues or pull requests!**
