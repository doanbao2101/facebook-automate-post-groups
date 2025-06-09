const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const COOKIE_PATH = "./fb_cookies.json";
// Waiting for approved: 224158730285502; 926464117920405
// recheck url: https://www.facebook.com/groups/chothuenhaquan4quan7/search/?q=%C4%90o%C3%A0n%20B%E1%BA%A3o
// search: https://www.facebook.com/groups/search/groups/?q=Thu%C3%AA%20nh%C3%A0%20nh%C3%A0%20b%C3%A8
// const GROUP_ID = ["chothuenhaquan4quan7","1003269067182777","sinchanh02","412641129723985"]
// const GROUP_ID =  ["154915347116720","chothuenhaquan7quan4nhabe.goi0778868676ngoccuong","196659689346935","chothuenhanguyencanquan7quan4nhabe", "224158730285502"]
// const GROUP_ID =  ["926464117920405","288226340350882","chothuematbangquan7.quan4.nhabe","711403257142372", "2195605697393698"]
const GROUP_ID =  ["toiladannhabe","303109391457175","682147963551657","1428701073934074"]

// const GROUP_ID =  ["sinchanh02"]

// const POST_CONTENT = [
//   "📏 4❌10 – NHÀ NGUYÊN CĂN 3PN, 3 MÁY LẠNH – THUÊ 6TR/THÁNG!",
//   "📍 Hẻm 2056 Huỳnh Tấn Phát, Nhà Bè (gần chùa Lá, hẻm rộng, thoáng mát)",
//   "🏠 1 lầu • 3 phòng ngủ • 2 WC • Bếp • Ban công",
//   "🛵 2 đường xe vào tận nhà"
// ].join('\n');

const POST_CONTENT = [
  "🔥 4❌10 – 3PN, 3 máy lạnh – 6TR/tháng!",
  "📍 Hẻm 2056 Huỳnh Tấn Phát, Nhà Bè (gần chùa Lá, hẻm rộng thoáng)",
  "🏠 1 lầu • 3PN • 2WC • Bếp • Ban công • Wifi có sẵn",
  "🛵 Xe máy vào tận nhà, 2 hướng đi",
  "📌 P.S: Nhà sạch đẹp, dọn vào ở ngay!"
].join('\n');

(async () => {
  
  // 📝 Configurate cookies and images
  const images = getImageFilesFromFolder();
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const fbPage = await browser.newPage();   
  const cookies = JSON.parse(fs.readFileSync(COOKIE_PATH, "utf8"));
  await fbPage.setCookie(...cookies);

  for (const groupId of GROUP_ID) {
    // 📝 Navigate to group
    const groupUrl = `https://www.facebook.com/groups/${groupId}`;
    await fbPage.goto(groupUrl, { waitUntil: "networkidle2" });

    // 📝 Click on the write box
    const xp = '::-p-xpath(//span[text()="Bạn viết gì đi..."])';
    const writeBox = await fbPage.waitForSelector(xp, { timeout: 30000 });
    await writeBox.click();
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 📝 Type post content
    await fbPage.keyboard.type(POST_CONTENT, { delay: 30 });

    // 📷 Upload images
    await uploadImageAndWaitPreview(fbPage, images);

    // 📤 Post
    const postButton = await fbPage.waitForSelector('div[aria-label="Đăng"], div[aria-label="Post"]', { timeout: 10000 });
    await postButton.click();
    console.log(`✅ [${getFormattedNow()}] Bài viết đã được đăng vào group = ${groupId}`);

    // ⏳ Wait randomly from 5 to 10 minutes before posting to the next group
    const secondsToWait = getRandomNumber();
    console.log(`⏳ Đợi ${secondsToWait / 1000} giây trước khi tiếp tục...`);
    await new Promise(resolve => setTimeout(resolve, secondsToWait));
  }
  console.log("✅ Hoàn thành đăng bài vào tất cả các group.");
  await browser.close();
})();

async function uploadImageAndWaitPreview(fbPage, imagePaths) {
  const uploadIcon = await fbPage.waitForSelector('img[src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"]', { timeout: 10000 });
  const fileInput = await uploadIcon.evaluateHandle((imgEl) => {
    let parent = imgEl.closest('div');
    while (parent && !parent.querySelector('input[type="file"]')) {
      parent = parent.parentElement;
    }
    return parent ? parent.querySelector('input[type="file"]') : null;
  });

  if (fileInput) {
    await fileInput.uploadFile(...imagePaths);
    // console.log("✅ Ảnh đã được upload vào input gần icon.");
    
    // Đợi preview ảnh hiện
    await new Promise(resolve => setTimeout(resolve, 5000));  
    await fbPage.waitForSelector('img[src*="scontent"]', { timeout: 10000 });
    // console.log("✅ Ảnh preview đã hiển thị.");
  } else {
    console.log("❌ Không tìm thấy input[type='file'] gần icon upload ảnh.");
  }
}

function getImageFilesFromFolder(folderPath = './img') {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Thư mục ${folderPath} không tồn tại.`);
    return [];
  }
  const files = fs.readdirSync(folderPath);
  const imageFiles = files
    .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => path.resolve(folderPath, file));

  return imageFiles;
}

function getRandomNumber() {
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


////// BACKUP CODE - Dùng khi cần thiết
// 📌 Tìm đến đúng thẻ <img> để kích hoạt upload
// const uploadIconSelector = 'img[src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"]';
// const uploadIcon = await fbPage.waitForSelector(uploadIconSelector, { timeout: 10000 });