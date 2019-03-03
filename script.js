const apiKey = `AIzaSyC7XZTpcRGzNfzIFBz9V2Zxm_ElK3SSPFI`

function getDataFromApi(searchTerm, callback) {
   const api_url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}` 
  
  $.getJSON(api_url, callback);
}

function renderResult(result) {
  return `
  <div class="book-container ">
      <img src="${result.volumeInfo.imageLinks.thumbnail}">
      <div class="content">
        <h2 class="js-result-name">${result.volumeInfo.title}</h2> 
        <p class="js-user-name"> Author ${result.volumeInfo.authors[0]}</p>
        <p>Published by ${result.volumeInfo.publisher} </p> 
        <button class=more-info><a class="read-more" href="${result.volumeInfo.previewLink}">More Info</a></button>

      </div>
  </div>
  `;
}

function displayGoogleData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGoogleData);
  });
}

$(watchSubmit);

