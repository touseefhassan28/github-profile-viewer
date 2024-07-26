import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/${username}`, { state: { profile } });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Trim the username input
        const trimmedUsername = username.trim();

        // Check if the input field is empty
        if (!trimmedUsername) {
            setError("Please enter a GitHub username to search ...");
            setProfile(null);
        }
        // Check if the data is available in localStorage
        const cachedProfile = localStorage.getItem(trimmedUsername);

        if (cachedProfile) {
            // Load data from localStorage
            setProfile(JSON.parse(cachedProfile));
            setError(null);

        } else {
            // Fetch data from API
            try {
                const response = await axios.get(
                    `https://api.github.com/users/${trimmedUsername}`
                );
                const profileData = response.data;
                console.log(profileData)

                   
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
            }
        };
    }

        return (
            <>
                <div className="navbar">
                    <div className="logo">
                        <img src="./src/assets/logo.png" alt="logo" id="logo" />
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter Github Username ..."
                            className="searchbox"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
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
                    {error && <p className="error-msg">{error}</p>}
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
