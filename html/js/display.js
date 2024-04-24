var URL = " http://localhost:3000";
var allBooksDisplayed = false;

function displayBooks(info) {
  a = $.ajax(info)
    .done((data) => {
      for (let element of data) {
        let bookContainer = $(`<div class="col"></div>`);
        let card = `<div class="card h-100">
                  <img
                    src="${element.image}"
                    class="card-img-top"
                    alt="${element.title} cover photo"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">
                      ${element.description.substring(0, 300)}
                    </p>
                  </div>
                </div>`;
        bookContainer.append(card);
        $("#books").append(bookContainer);
      }
    })
    .fail((error) => {
      console.log("Error: ", error.statusText);
      setTimeout(displayBooks, 5000);
    });
}

function getAllBooks() {
  let allBooks = {
    url: URL + "/api/v1/data",
    method: "GET",
  };
  allBooksDisplayed = true;
  displayBooks(allBooks);
}

function setFilter(filterName) {
  // clear old books
  if (allBooksDisplayed) {
    $("#books").html("");
  }

  let apiInfo = {
    url: URL + `/api/v1/${filterName}`,
    method: "GET",
  };

  displayBooks(apiInfo);
}
