const search = document.querySelector('#home-search-button');
const searchInputEl = document.querySelector('#search-input');
const searchResultsEl = document.querySelector('#search-results');

const createVideoElement = (video) => {
  const { title, thumbnails, description, viewCount, likeCount, commentCount } = video;

  const videoElement = document.createElement('div');
  videoElement.classList.add('row', 'mb-4');

  const thumbnailColumn = document.createElement('div');
  thumbnailColumn.classList.add('col-md-6', 'col-lg-4');
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = thumbnails.default.url;
  thumbnailImg.alt = title;
  thumbnailImg.classList.add('img-fluid');
  thumbnailColumn.appendChild(thumbnailImg);

  const infoColumn = document.createElement('div');
  infoColumn.classList.add('col-md-6', 'col-lg-8');
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  const statsElement = document.createElement('div');
  statsElement.classList.add('video-stats');
  statsElement.innerHTML = `
    <p>Views: ${viewCount}</p>
    <p>Likes: ${likeCount}</p>
    <p>Comments: ${commentCount}</p>
  `;

  infoColumn.appendChild(titleElement);
  infoColumn.appendChild(descriptionElement);
  infoColumn.appendChild(statsElement);

  videoElement.appendChild(thumbnailColumn);
  videoElement.appendChild(infoColumn);

  return videoElement;
};


const updateSearchResults = (data) => {
  searchResultsEl.innerHTML = '';

  data.forEach((video) => {
    const videoElement = createVideoElement(video);
    searchResultsEl.appendChild(videoElement);
  });
};

const submitFormHandler = (event) => {
  event.preventDefault();

  const searchVal = searchInputEl.value.trim();

  fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      youtuber: searchVal,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { allVideoData } = data;
      updateSearchResults(allVideoData);
    })
    .catch((error) => {
      console.error('Error fetching YouTube search results:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  search.addEventListener('click', submitFormHandler);
});
