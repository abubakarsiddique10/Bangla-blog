import { fetchData } from "./common.js";
import { loading } from "./main.js"

const queryParams = new URLSearchParams(window.location.search);
const blogId = queryParams.get('id');
// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const filterData = response.find(({ id }) => id == blogId);
        blogDetailsDisplay(filterData);
        loading(false)
    } catch (error) {
        console.error(error);
    }
}


// Display blog details
const blogDetailsDisplay = ({ title = '', blogImg = '', contents = [], publishedDate = '' }) => {
    const blogDetails = document.getElementById('blog_details');
    if (!blogDetails) return;
    blogDetails.innerHTML = '';

    // Title
    const h1 = document.createElement('h1');
    h1.classList.add(
        'text-[32px]', 'leading-[46px]', 'lg:text-[40px]',
        'lg:leading-[56px]', 'font-bold', 'mb-4'
    );
    h1.textContent = title;

    // Image Section
    const figure = document.createElement('figure');
    figure.classList.add('mb-4');

    const img = document.createElement('img');
    img.src = blogImg;
    img.alt = `Blog banner for ${title}`;
    img.classList.add('w-full', 'h-auto');
    figure.appendChild(img);

    // Date Section
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('flex', 'items-center', 'gap-x-1.5', 'text-sm');

    const dateLabel = document.createElement('span');
    dateLabel.classList.add('font-medium');
    dateLabel.textContent = 'প্রকাশ:';

    const time = document.createElement('time');
    time.classList.add('text-nowrap');
    time.textContent = publishedDate;

    dateWrapper.append(dateLabel, time);

    // Article Content
    const article = document.createElement('article');
    article.classList.add('my-6', 'text-[17px]', 'lg:text-lg', 'lg:leading-[30px]');

    const fragment = document.createDocumentFragment();
    contents.forEach(content => {
        fragment.appendChild(createParagraph(content));
    });
    article.appendChild(fragment);

    // Append to main container
    blogDetails.append(h1, figure, dateWrapper, article);
};


const createParagraph = ({ title = '', type, items = [], list = [] }) => {
    const container = document.createElement('div');

    if (title) {
        const heading = document.createElement('h2');
        heading.classList.add('text-xl', 'font-semibold', 'mt-4', 'mb-2');
        heading.textContent = title;
        container.appendChild(heading);
    }

    if (type === "paragraph") {
        items.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            container.appendChild(p);
        });
    } else if (type === "list") {
        const ul = document.createElement('ul');
        ul.classList.add('mb-2');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    } else {
        console.warn(`Unsupported content type: ${type}`);
    }

    return container;
};


// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)












