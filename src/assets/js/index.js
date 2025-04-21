import { fetchData } from "./common.js";
import { createArticleCard } from "./components.js";
import { loading } from './main.js'

let allData = null;
// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        loading(true)
        const response = await fetchData(url);
        const blogArray = response.reduce((acc, curr) => acc.concat(curr.blogs), []);
        // Sort descending (newest to oldest)
        const sortedArray = blogArray.sort((a, b) => b.createdAt - a.createdAt);
        displayBlog(sortedArray);
        allData = blogArray
        loading(false)
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}
getBlogData();

// Fetch tags data
async function getTags() {
    const url = `././assets/data/blogs/tags.json`;
    try {
        const response = await fetchData(url);
        displayTag(response);
    } catch (error) {
        console.error(error);
    }
}
getTags()


// Display Namaz Niyat data in the UI
const displayBlog = (contents) => {
    let blogContainer = document.getElementById('blog');
    blogContainer.innerHTML = "";
    contents.forEach((content) => {
        const createBLogCard = createArticleCard(content);
        blogContainer.appendChild(createBLogCard);
    });
    /* setupCategoryClickListener() */
}


// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const dataType = event.target.dataset.type;
        const filterData = dataType === "all"
            ? allData
            : allData.filter((data) => data.tag === dataType);
        displayBlog(filterData);
    }
}


// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);

const displayTag = (contents) => {
    const tagUl = document.getElementById('tags');
    contents.forEach((content, index) => {
        const createTagCard = createTagElemnt(content, index === 0);
        tagUl.appendChild(createTagCard);
    })
}


const createTagElemnt = ({ tagName, dataType }, isActive) => {
    const li = document.createElement('li');
    li.className = 'min-w-fit'
    li.innerHTML = `
        <button class="font-medium text-[15px] md:text-base text-left px-2 py-3 lg:p-2 rounded-md block w-full filter-button cursor-pointer ${isActive ? "active" : ""}" data-type="${dataType}">${tagName}</button>
    `
    return li
}


// id generate function
function dateRandomId() {
    return Date.now().toString(16) + Math.floor(Math.random() * 1000).toString(16);
}
const id = dateRandomId();

// date generate function
const timestamp = Date.now();

