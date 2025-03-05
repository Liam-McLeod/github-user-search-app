const dateTransformer = (date) => {
    const dateObj = new Date(date);
    const dateString = dateObj.toDateString();
    const [weekday, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year}`;
  };

async function getData(user) {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();

    // User not found
    if (data.message) {
        document.querySelector('.search-error').classList.remove('hidden');
        return
    }

    // Display data
    document.querySelector('.user-avatar-mobile').src = data.avatar_url;
    document.querySelector('.user-avatar-desktop').src = data.avatar_url;
    document.querySelector('.user-fullname').innerText = data.name || data.login;
    document.querySelector('.user-username').innerText = `@${data.login}`;
    document.querySelector('.user-location').innerText = data.location;
    document.querySelector('.user-joined').innerText = `Joined ${dateTransformer(data.created_at)}`;
    document.querySelector('.user-repo-number').innerText = data.public_repos;
    document.querySelector('.user-followers-number').innerText = data.followers;
    document.querySelector('.user-following-number').innerText = data.following;

    //User Bio
    user_bio = document.querySelector('.user-bio');
    user_bio.innerText = data.bio || "This profile has no bio";
    user_bio.style.opacity = data.bio ? 1 : 0.5;

    // User Location
    const user_location = document.querySelector('.user-location');
    user_location.innerText = data.location || "Not Available";
    user_location.style.opacity = data.location ? 1 : 0.5;

    // User Website 
    const user_website = document.querySelector('.user-website');
    user_website.innerText = data.blog || "Not Available";
    user_website.href = data.blog || "#";
    user_website.style.opacity = data.blog ? 1 : 0.5;

    // User Twitter
    const user_twitter = document.querySelector('.user-twitter');
    user_twitter.innerText = data.twitter_username || "Not Available";
    user_twitter.href = data.twitter_username ? `https://twitter.com/${data.twitter_username}` : "#";
    user_twitter.style.opacity = data.twitter_username ? 1 : 0.5;

    // User Company
    const user_company = document.querySelector('.user-company');
    user_company.innerText = data.company || "Not Available";
    user_company.style.opacity = data.company ? 1 : 0.5;

}

// Light Mode and Dark Mode Button
const theme_button = document.querySelector('.light-dark-btn');
theme_button.addEventListener('click', () => {
    
    if (document.body.classList.contains('dark-mode')) {
        theme_button.innerText = "LIGHT";
        theme_button.style.backgroundImage = "url('assets/icon-sun.svg')";
    } else {
        theme_button.innerText = "DARK";
        theme_button.style.backgroundImage = "url('assets/icon-moon.svg')";
    }
});

// Get Data on Search
const user_search = document.querySelector('input');
const search_button = document.querySelector('.search-btn');
search_button.addEventListener('click', () => {
    getData(user_search.value);
});

getData('octocat');