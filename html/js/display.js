var URL = " http://localhost:3000";
var allBooksDisplayed = false;

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

function getReviews(bookTitle) {
  let reviews = {
    url: URL + `/api/${bookTitle}`,
    method: "GET",
  };

  book = $.ajax(reviews)
    .done((data) => {
      localStorage.clear();
      // stores review data from DB into the browser's local storage as a string
      localStorage.setItem("reviewData", JSON.stringify(data));
      window.location.href = "../pages/review.html";
    })
    .fail((error) => {
      console.log("Error: ", error.statusText);
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
  <div class="modal fade" id="${
    element.title
  }-modal" tabindex="-1" aria-labelledby="${
    element.title
  }-modal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${element.title}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <h5>Information:</h5>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Author</th>
                    <td>${element.authors.substring(
                      1,
                      element.authors.length - 1
                    )}</td>
                  </tr>
                  <tr>
                    <th scope="row">Publisher</th>
                    <td>${element.publisher}</td>
                  </tr>
                  <tr>
                    <th scope="row">Publish Date</th>
                    <td>${element.publishDate}</td>
                  </tr>
                  <tr>
                    <th scope="row">Categories</th>
                    <td>${element.categories.substring(
                      1,
                      element.categories.length - 1
                    )}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ratings</th>
                    <td>${element.ratingsCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <h5>Description:</h5>
              <p>${element.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a
          onclick="getReviews('${element.title}')"
          class="btn btn-outline-secondary"
          >
          Reviews
        </a>  
        <a class="btn btn-primary" 
           style="background-color: #713c46; border-color:#713c46;"
           target="_blank" 
           href="${element.previewLink}">
           Preview
        </a>
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
          ${element.authors.substring(1, element.authors.length - 1)}
        </p>
      </div>
    </div>
  `;
}

function createReviewCard(element) {
  return `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${element.review_summary}</h5>
              <div class="mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <span class="card-subtitle mb-2 text-muted">${element.profile_name}</span>
              </div>
              <p class="card-text">
                ${element.review_text}
              </p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#713c46"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
                <span class="card-text text-muted">${element.review}</span>
              </div>
            </div>
          </div>`;
}
