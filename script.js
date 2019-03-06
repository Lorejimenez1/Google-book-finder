const apiKey = `AIzaSyC7XZTpcRGzNfzIFBz9V2Zxm_ElK3SSPFI`

function getDataFromApi(searchTerm, callback) {
   const api_url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10&key=${apiKey}` 
  
  $.getJSON(api_url, callback);
}

function renderResult(result) {

  if (result.volumeInfo.authors) {
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
    `
  } else  {
  return `
  <div class="book-container ">
      <img src="${result.volumeInfo.imageLinks.thumbnail}">
      <div class="content">
        <h2 class="js-result-name">${result.volumeInfo.title}</h2> 
        <p class="js-user-name"></p>
        <p>Author unknown</p> 
        <button class=more-info><a class="read-more" href="${result.volumeInfo.previewLink}">More Info</a></button>

      </div>
  </div>
  `;
}
}
function displayGoogleData(data) {
  if(data.items){
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }else{
  $('.js-search-results').html('<h3 style="color: black">error please try a different search term</h3>');
  }
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

