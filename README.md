# GitHub Profile Viewer
Welcome to the GitHub Profile Viewer app! This web application allows you to search for GitHub users, view their profiles, and explore their repositories. It provides a simple and interactive way to explore GitHub profiles with real-time data fetching and caching.

# Features
Search GitHub Users: Enter a GitHub username to fetch and view their profile details.
View Profile Details: Displays user profile information including avatar, name, bio, and stats such as repositories, followers, and following.
Explore Repositories: Lists repositories with details such as visibility and description.
Initial Profiles: Shows a selection of popular GitHub users to get started.
Loading State: Indicates when data is being fetched.
Error Handling: Displays error messages if the user is not found or if there's an issue with fetching data.
Technologies Used
React: For building the user interface and managing state.
React Router: For handling navigation between different views.
Axios: For making HTTP requests to the GitHub API.
CSS: For styling the components.

Installation
To get started with the GitHub Profile Viewer app locally, follow these steps:

Clone the Repository:
git clone https://github.com/yourusername/github-profile-viewer.git

Navigate to the Project Directory:
cd github-profile-viewer

Install Dependencies:
npm install

Start the Development Server:
npm start

The app will be available at http://localhost:5173.

# Usage
Search for a GitHub User:
Enter a GitHub username in the search bar and press "Search" or hit "Enter".
View the profile details and repositories of the searched user.

Explore Initial Profiles:
Click on the initial profiles displayed on the home page to view popular GitHub users' profiles.

Navigate Back:
Use the "Go Back" button to return to the previous view after viewing a profile.

# Components
Navbar: Contains the search bar and displays initial profiles.
UserDetail: Shows detailed information about the selected GitHub user.

#File Structure
/src
  /assets
    logo.png
  /components
    Navbar.js
    UserDetail.js
  /styles
    Navbar.css
    UserDetails.css
  App.js
  index.js

#Contributing
Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Contact
For any questions or feedback, feel free to reach out to my email.
