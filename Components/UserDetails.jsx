import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserDetails.css';

function UserDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const profile = location.state?.profile;

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="user-detail-container">
            <div className="back-button-container">
            <button onClick={handleBackClick} className="back-button">Go Back</button>
            </div>
            {profile ? (
                <div className="profile-detail">
                    <div className="profile-left-col">
                        <img src={profile.avatar_url} alt="Avatar" className="avatar" id="avatar"/>
                        <h1 className="profile-name">{profile.name}</h1>
                        <a href={profile.html_url} className="profile-url" target="_blank" rel="noopener noreferrer">
                            @{profile.login}
                        </a>
                        <p className="profile-bio">{profile.bio}</p>

                    </div>
                    <div className="profile-right-col">
                        <div className="profile-stats-container">
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
                    <div className="profile-repositories">
                            <h2>Repositories</h2>
                            <div className="repositories-grid">
                                {profile.repos && profile.repos.length > 0 ? (
                                    profile.repos.map(repo => (
                                        <div key={repo.id} className="repo-card">
                                            <div className="repo-row-1">

                                            <h3 className="repo-name">
                                                <a href={repo.html_url} target="_blank">
                                                    {repo.name}
                                                </a>
                                            </h3>
                                            <p>{repo.visibility}</p>
                                            </div>
                                            <p className="repo-description">{repo.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No repositories found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="error-msg">No profile data available</p>
            )}
        </div>
    );
}

export default UserDetail;
