var URL = " http://localhost:3000";
var allBooksDisplayed = false;

/**
 * Makes a new bootstrap modal visible when a card is clicked.
 * @param {string} id
 */
function openModal(id) {
  let modal = new bootstrap.Modal(document.getElementById(`${id}-modal`));
  modal.show();
}

/**
 * Contains the html code to create a modal for each book.
 * @param {Object} element book data from database.
 * @returns HTML of modal
 */
function createModal(element) {
  return `
  <div class="modal fade" id="${element.title}-modal" tabindex="-1" aria-labelledby="${element.title}-modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `;
}

/**
 * Contains the html code that creates each clickable book card.
 * @param {Object} element book data from database.
 * @returns HTML of the card.
 */
function createCard(element) {
  return `
    <div id="${element.title}" class="card h-100" onclick="openModal(this.id)">
      <img
        src="${element.image}"
        class="card-img-top"
        alt="${element.title} cover photo"
      />
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">
          ${element.authors.substring(2, element.authors.length - 2)}
        </p>
      </div>
    </div>
  `;
}

/**
 * Reads JSON data from an API endpoint and displays the data to the screen.
 * @param {Object} info
 */
function displayBooks(info) {
  a = $.ajax(info)
    .done((data) => {
      for (let element of data) {
        let bookContainer = $(`<div class="col"></div>`);
        bookContainer.append(createCard(element));
        bookContainer.append(createModal(element));
        $("#books").append(bookContainer);
      }
    })
    .fail((error) => {
      console.log("Error: ", error.statusText);
      setTimeout(displayBooks, 5000);
    });
}

/**
 * Displays all of the initial books to the screen.
 */
function getAllBooks() {
  let allBooks = {
    url: URL + "/api/v1/data",
    method: "GET",
  };
  allBooksDisplayed = true;
  displayBooks(allBooks);
}

/**
 * Displays books based on filter.
 * @param {string} filterName
 */
function setFilter(filterName) {
  // clear initial books
  if (allBooksDisplayed) {
    $("#books").html("");
  }

  let apiInfo = {
    url: URL + `/api/v1/${filterName}`,
    method: "GET",
  };

  displayBooks(apiInfo);
}
