function getRandomNumber300to600() {
    const random_number = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    return random_number * 1000;
}

function getFormattedNow() {
    const now = new Date();
    return now.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');
}

const formattedNow = getFormattedNow();
console.log(`✅ [${formattedNow}] Bài viết đã được đăng vào group`);
// Example usage:
console.log(getRandomNumber300to600());
