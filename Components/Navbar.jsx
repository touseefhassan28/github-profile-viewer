import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

// Define initial profiles

const INITIAL_PROFILES = [
    { 
        login: "torvalds", 
        avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4", 
        html_url: "https://github.com/torvalds" 
    },
    { 
        login: "octocat", 
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4", 
        html_url: "https://github.com/octocat" 
    },
    { 
        login: "addyosmani", 
        avatar_url: "https://avatars.githubusercontent.com/u/674489?v=4", 
        html_url: "https://github.com/addyosmani" 
    },
    { 
        login: "pjhyett", 
        avatar_url: "https://avatars.githubusercontent.com/u/118365?v=4", 
        html_url: "https://github.com/pjhyett" 
    },
    { 
        login: "defunkt", 
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4", 
        html_url: "https://github.com/defunkt" 
    }
];


function Navbar() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInitialProfiles, setShowInitialProfiles] = useState(true); 
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/${username}`, { state: { profile } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hide initial profiles when a search is initiated
        setShowInitialProfiles(false);

        // Trim the username input
        const trimmedUsername = username.trim();

        // Check if the input field is empty
        if (!trimmedUsername) {
            setError("Please enter a GitHub username to search ...");
            setProfile(null);
            return;
        }

        // Clear previous search results and errors
        setProfile(null);
        setError(null);

        // Check if the data is available in localStorage
        const cachedProfile = localStorage.getItem(trimmedUsername);

        if (cachedProfile) {
            // Load data from localStorage
            setProfile(JSON.parse(cachedProfile));
            setError(null);
        } else {
            setLoading(true); // Start loading

            // Fetch data from API
            try {
                const response = await axios.get(
                    `https://api.github.com/users/${trimmedUsername}`);
                const profileData = response.data;
                // console.log(profileData)

                // Fetch repositories
                const reposResponse = await axios.get(profileData.repos_url);
                profileData.repos = reposResponse.data;

                // Store data in localStorage
                localStorage.setItem(trimmedUsername, JSON.stringify(profileData));

                setProfile(response.data);
                setError(null);
            } catch {
                setProfile(null);
                setError("User Not Found 😢");
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="logo" id="logo" />
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter Github Username ..."
                        className="searchbox"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button type="submit" className="search-btn" onClick={handleSubmit}>
                        Search
                    </button>
                </div>
            </div>

            <div className="main-container">
                {loading && <div className="loader"></div>} {/* Loader */}
                {error && <p className="error-msg">{error}</p>}
                {showInitialProfiles && (
                    <div className="initial-profiles">
                        <h2 className="initial-profiles-heading">Top Github Users</h2>
                        <div className="initial-profiles-container">

                        {INITIAL_PROFILES.map((user) => (
                            <div className="profile-div" key={user.login} onClick={() => window.open(user.html_url, "_blank")}>
                                
                                        <img src={user.avatar_url} alt="Avatar" className="user-avatar" />
                                        <h1 className="user-name">{user.login}</h1>
                                        <a href={user.html_url} className="user-url">
                                            @{user.login}
                                        </a>
                                 
                            </div>
                        ))}

                        </div>
                    </div>
                )}
                {profile && (
                    <div className="profile-container" onClick={handleCardClick}>
                        <div className="profile-content">
                            <div className="profile-img">
                                <img src={profile.avatar_url} alt="Avatar" className="avatar" />
                                <p className="location">{profile.location}</p>
                            </div>
                            <div className="profile-details">
                                <h1 className="profile-name">{profile.name}</h1>
                                <a href={profile.html_url} className="profile-url">
                                    @{profile.login}
                                </a>
                                <p className="profile-bio">{profile.bio}</p>

                                <div className="profile-stats">
                                    <p className="profile-repos">
                                        Repositories
                                        <br />
                                        <span className="repos">{profile.public_repos}</span>
                                    </p>
                                    <p className="profile-followers">
                                        Followers
                                        <br />
                                        <span className="followers">{profile.followers}</span>
                                    </p>
                                    <p className="profile-following">
                                        Following
                                        <br />
                                        <span className="following">{profile.following}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;
