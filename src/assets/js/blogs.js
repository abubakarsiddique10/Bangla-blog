import { fetchData, convertToBanglaDate } from "./common.js";
import { loading } from "./main.js"

const queryParams = new URLSearchParams(window.location.search);
const slug = queryParams.get('topic');
const blogId = slug.split('-').pop();

// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const blogArray = response.reduce((acc, curr) => acc.concat(curr.blogs), []);
        const filterData = blogArray.find(({ id }) => id == blogId);
        blogDetailsDisplay(filterData);
        loading(false)
    } catch (error) {
        console.error(error);
    }
}


// Display blog details
const blogDetailsDisplay = ({ title = '', blogImg = '', contents = [], createdAt = '' }) => {
    const blogDetails = document.getElementById('blog_details');
    if (!blogDetails) return;
    blogDetails.innerHTML = '';

    // Title
    const h1 = document.createElement('h1');
    h1.className = 'text-[32px] leading-[46px] lg:text-[40px] lg:leading-[56px] font-bold mb-4';

    h1.textContent = title;

    // Image Section
    const figure = document.createElement('figure');
    figure.className = 'mb-4';

    const img = document.createElement('img');
    img.src = blogImg;
    img.alt = `Blog banner for ${title}`;
    img.className = 'w-full', 'h-auto';
    figure.appendChild(img);

    // Date Section
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'flex items-center gap-x-1.5 text-sm';

    const dateLabel = document.createElement('span');
    dateLabel.className = 'font-medium';
    dateLabel.textContent = 'প্রকাশ:';

    const time = document.createElement('time');
    time.className = 'text-nowrap';
    time.textContent = convertToBanglaDate(createdAt);

    dateWrapper.append(dateLabel, time);

    // Article Content
    const article = document.createElement('article');
    article.className = 'my-6 text-[17px] lg:text-lg lg:leading-[30px]';

    const fragment = document.createDocumentFragment();
    contents.forEach(content => {
        fragment.appendChild(createParagraph(content));
    });
    article.appendChild(fragment);

    // Append to main container
    blogDetails.append(h1, figure, dateWrapper, article);
};


const createParagraph = ({ title = '', type, items = [] }) => {
    // Create a container div to hold the content
    const container = document.createElement('div');

    // If a title is provided, create and append it as a heading
    if (title) {
        const heading = document.createElement('h2');
        heading.className = 'text-xl font-semibold mt-4 mb-2';
        heading.textContent = title;
        container.appendChild(heading);
    }

    // Render content based on the specified type
    switch (type) {
        case 'paragraph':
            items.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                container.appendChild(p);
            });
            break;

        case 'list':
            const ul = document.createElement('ul');
            ul.className = 'mb-2';
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            container.appendChild(ul);
            break;

        case 'image':
            items.forEach(item => {
                const img = document.createElement('img');
                img.className = 'w-full h-auto';
                img.src = item;
                img.alt = 'blog image';
                container.appendChild(img);
            });
            break;

        default:
            // Log a warning if an unsupported type is provided
            console.warn(`Unsupported content type: ${type}`);
    }

    return container;
};



// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)












