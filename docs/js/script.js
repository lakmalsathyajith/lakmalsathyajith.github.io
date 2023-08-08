// Create jobpost using job object
const createJobPost = (jobPost) => {
  return `<div class="job-card">
                            <div class="job-card__description">
                              <img src="${jobPost.logo}" alt="" class="job-card__logo">
                              <div class="job-card__details">
                                <div class="job-card__statuses">
                                  <div class="job-card__type">${jobPost.company}</div>
                                  ${jobPost.new ? `<div class="job-card__type job-card__type--new">NEW!</div>` : ""}
                                  ${jobPost.featured ? `<div class="job-card__type job-card__type--featured">FEATURED</div>` : ""}
                                </div>
                                <div class="job-card__title">${jobPost.position}</div>
                                <div class="job-card__venues">
                                  <div class="job-card__type venue">${jobPost.postedAt}</div>
                                  <span></span>
                                  <div class="job-card__type venue">${jobPost.contract}</div>
                                  <span></span>
                                  <div class="job-card__type venue">${jobPost.location}</div>
                                </div>
                              </div>
                            </div>
                            <div class="job-card__tags">
                              <div class="tag" onclick="onTagElementClick(this)" data-value="${jobPost.role}"><span>${jobPost.role}</span></div>
                              <div class="tag" onclick="onTagElementClick(this)" data-value="${jobPost.level}"><span >${jobPost.level}</span></div>
                              ${jobPost.languages.map((language) => {
    return `<div onclick="onTagElementClick(this)" class="tag" data-value="${language}"><span>${language}</span></div>`
  }).join("")}
                            </div>
                          </div>`;
};
document.filterData = [];

// Populate the posts in the post listing
const populatePosts = (filteredPosts) => {
  const elem = document.querySelector('.main');
  const elements = [];
  elem.innerHTML = "";
  filteredPosts.forEach(jobPost => {
    elem.innerHTML = elem.innerHTML + createJobPost(jobPost);
  })
};

// Populate the filters on the filter panel
const populateFilters = () => {
  const elem = document.querySelector('.filter');
  const filters = document.filterData.map(data => `<div class="tag"><span>${data}</span><span data-value="${data}"  onclick="onRemoveFilterElementClick(this)" class="close"></span></div>`).join('');
  elem.innerHTML = filters;
  if (document.filterData.length > 0) {
    elem.style.visibility = 'visible';
  } else {
    elem.style.visibility = 'hidden';
  }
}

// Filter jobs list by given filter array
const postFilter = (filters) => {
  const result = fetch('./data.json')
    .then(response => response.json())
    .then(json => {
      const filteredPosts = json.filter((data) => {
        let filterCount = filters.length;
        filters.forEach((filterType) => {
          if (data.languages.indexOf(filterType) > -1 || data.level === filterType || data.role === filterType) {
            filterCount--;
          }
        })
        return filterCount === 0;
      })
      populatePosts(filteredPosts);
    });
}

// Trigger when tag element is clicked
function onTagElementClick(e) {
  const filterData = document.filterData;
  if (filterData && filterData.indexOf(e.dataset.value) === -1) {
    document.filterData.push(e.dataset.value);
  }
  populateFilters();
  postFilter(filterData)
}

// Trigger when filter element close button is clicked.
const onRemoveFilterElementClick = (selector) => {
  const filteredFilters = document.filterData.filter(filter => filter !== selector.dataset.value);
  document.filterData = filteredFilters;
  populateFilters(filteredFilters);
  postFilter(filteredFilters)
}

document.addEventListener('DOMContentLoaded', function (event) {
  postFilter(document.filterData);
});