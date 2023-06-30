const form = document.querySelector("form");
const input = document.querySelector("input");
const reposContainer = document.querySelector(".repos");
const mainContainer = document.querySelector(".main-container");

const API = "https://api.github.com/users/";
async function fetchData(username) {
  try {
    const responce = await fetch(`${API}${username}`);
    if (!responce.ok) throw new Error(responce.statusText);
    const {
      avatar_url,
      bio,
      blog,
      company,
      followers,
      following,
      location,
      twitter_username,
    } = await responce.json();
    const html = `<div class="user-avater" style="background: url(${avatar_url}) no-repeat center/cover"></div>
    <p class="user-name">${login}</p>
    <button class="follow">Follow</button>
    <p class="user-bio">${bio}</p>
    <div class="followers-info">
      <a href="#">
        <i class="fa-solid fa-person"></i>
        <span class="followers">${followers}</span> follower
      </a>
      <a href="#">
      <span class="following">${following}</span> following
      </a>

      <div class="icon-container">
        <i class="fa-regular fa-building"></i>
        <a href="#" class="company">${company}</a>
      </div>
      <div class="icon-container">
        <i class="fa-sharp fa-solid fa-location-dot"></i>
        <a href="#" class="location">${location}</a>
      </div>
      <div class="icon-container">
        <i class="fa-regular fa-solid fa-link"></i>
        <a href="#" class="blog">${blog}</a>
      </div>
      <div class="icon-container">
        <i class="fa-brands fa-solid fa-twitter"></i>
        <a href="#" class="twitter_username">@${twitter_username}</a>
      </div>
    </div>
    `;

    const section = document.createElement("section");
    section.classList.add("about-user");
    section.innerHTML = html;
    mainContainer.insertAdjacentElement("afterbegin", section);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const val = input.value;

  if (val) {
    try {
      await fetchData(val);
      await fetchRepos(val);
    } catch (error) {
      console.log(error);
    } finally {
      input.value = "";
    }
  }
});
