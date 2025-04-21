// Data fetch example: 1
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return response.json()
}

function convertToBanglaDate(timestamp) {
    const date = new Date(Number(timestamp));

    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const banglaMonths = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

    const day = date.getDate().toString().split('').map(d => banglaDigits[d]).join('');
    const month = banglaMonths[date.getMonth()];
    const year = date.getFullYear().toString().split('').map(d => banglaDigits[d]).join('');

    return `${day} ${month} ${year}`;
}
export { fetchData, convertToBanglaDate }
