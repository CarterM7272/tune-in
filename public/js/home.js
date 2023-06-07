const search = document.querySelector('#home-search-button');
const searchInputEl = document.querySelector('#search-input');

const submitFormHandler = (event) =>  {
  const searchVal = searchInputEl.value.trim();

  fetch('/api/search', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      youtuber: searchVal
    })
  }).then((res) => {
    return res.json();
  }).then((data) => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  });

  
}

document.addEventListener('click', submitFormHandler);
