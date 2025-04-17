// Create blog article card element
const createArticleCard = ({ id, title, subtitle, blogImg, publishedDate, dataType }) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'blog__card border-b py-6 cursor-pointer select-none';
    cardElement.setAttribute('data-id', `${id}`);
    cardElement.setAttribute('data-type', `${dataType}`);

    // Wrapper div (flex row)
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center justify-between';

    // Content Section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'mr-6 md:mr-14';

    const titleEl = document.createElement('h2');
    titleEl.className = 'blog_card_title text-xl md:text-2xl lg:text-2xl font-bold pb-2';
    titleEl.textContent = title;

    const subtitleEl = document.createElement('p');
    subtitleEl.className = 'blog_card_description text-base font-normal lg:text-[17px]';
    subtitleEl.textContent = subtitle;

    contentDiv.appendChild(titleEl);
    contentDiv.appendChild(subtitleEl);

    // Image Section
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'flex-none max-w-[100px] md:max-w-[150px]';

    const imgEl = document.createElement('img');
    imgEl.className = 'image w-full h-auto';
    imgEl.src = blogImg;
    imgEl.alt = 'Blog thumbnail about finding a good mentor';
    imgEl.loading = 'lazy';

    imageWrapper.appendChild(imgEl);

    // Add content and image to wrapper
    wrapper.appendChild(contentDiv);
    wrapper.appendChild(imageWrapper);

    // Date Section
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date mt-2';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'published_data text-sm';
    dateSpan.textContent = publishedDate;

    dateDiv.appendChild(dateSpan);

    // Assemble card
    cardElement.appendChild(wrapper);
    cardElement.appendChild(dateDiv);

    return cardElement;
};


const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const blogs = document.getElementById('blog');
    blogs.addEventListener('click', (event) => {
        const blogCard = event.target.closest('.blog__card');
        if (blogCard) {
            const blogId = blogCard.dataset.id;
            window.location.href = "blogs.html?id=" + blogId;
        }
    })
}

// export all components function
export { createArticleCard, setupCategoryClickListener }