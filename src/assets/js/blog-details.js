import { fetchData } from "./common.js";
import { loading } from "./main.js"

const queryParams = new URLSearchParams(window.location.search);
const blogId = queryParams.get('id');
// Fetch Namaz Niyat data
/* async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const filterData = response[1].find(({ id }) => id == blogId)
        blogDetailsDisplay(filterData);
        loading(false)
    } catch (error) {
        console.error(error);
    }
} */
// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blog2.json`;
    try {
        const response = await fetchData(url);
        const filterData = response.find(({ id }) => id == blogId);
        blogDetailsDisplay(filterData);
        loading(false)
    } catch (error) {
        console.error(error);
    }
}

/* const blogDetailsDisplay = ({ title, blogImg, content, publishedDate }) => {
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = `
        <h1 id="blog_title" class="text-[32px] leading-[46px] lg:text-[40px] lg:leading-[56px] font-bold mb-4">${title}</h1>
       <figure class="mb-4">
            <img id="blog_img" src="${blogImg}" alt="Blog banner for ভালো মেন্টর কিভাবে খুজবেন?" class="w-full h-auto">
        </figure>
        <div class="flex items-center space-x-1.5 text-sm">
            <span class="font-medium">প্রকাশ:</span>
            <time" class="text-nowrap">${publishedDate}</time>
        </div>
        <article class="my-6 text-[17px] lg:text-lg lg:leading-[30px]">${content.join('')}
        </article >
    `
} */

const blogDetailsDisplay = ({ title, blogImg, contents, publishedDate, type }) => {
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = ''; // Clear previous content

    // Title
    const h1 = document.createElement('h1');
    h1.id = 'blog_title';
    h1.className = 'text-[32px] leading-[46px] lg:text-[40px] lg:leading-[56px] font-bold mb-4';
    h1.textContent = title;

    // Figure with Image
    const figure = document.createElement('figure');
    figure.className = 'mb-4';

    const img = document.createElement('img');
    img.id = 'blog_img';
    img.src = blogImg;
    img.alt = `Blog banner for ${title}`;
    img.className = 'w-full h-auto';
    figure.appendChild(img);

    // Published Date
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'flex items-center space-x-1.5 text-sm';

    const dateLabel = document.createElement('span');
    dateLabel.className = 'font-medium';
    dateLabel.textContent = 'প্রকাশ:';

    const time = document.createElement('time');
    time.className = 'text-nowrap';
    time.textContent = publishedDate;

    dateWrapper.appendChild(dateLabel);
    dateWrapper.appendChild(time);

    // Article Content
    const article = document.createElement('article');
    article.className = 'my-6 text-[17px] lg:text-lg lg:leading-[30px]';


    // Create a fragment for better DOM performance
    const fragment = document.createDocumentFragment();
    contents.forEach(content => {
        fragment.appendChild(createParagraph(content));
    });
    // Append para article
    article.appendChild(fragment)


    // Append everything to the container
    blogDetails.appendChild(h1);
    blogDetails.appendChild(figure);
    blogDetails.appendChild(dateWrapper);
    blogDetails.appendChild(article);
};


const createParagraph = ({ title, paragraph = [], list = [] }) => {
    const container = document.createElement('div');
    // Title
    const heading = document.createElement('h2');
    heading.textContent = title;
    container.appendChild(heading);

    // Paragraphs
    if (paragraph.length) {
        paragraph.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            container.appendChild(p);
        });
    }
    // List
    if (!paragraph.length && list.length) {
        const ul = document.createElement('ul');
        list.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }

    return container;
};

// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)












