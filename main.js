const {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
} = require("./fbPosterCore");

const COOKIE_PATH = "./fb_cookies.json"; // <--- Store your facebook cookies in this path
const GROUP_IDS = [ // <--- Input your Group IDs here
  // "vieclamquan7phumyhung",
  // "viecllam007",
  // "1132960307894059",
  // "2719994268040685",
  // "vieclamsvquan7",
  "tuyendunghcmsg",
  "758291866374708"
 ];

const POST_CONTENT = [
  "👩‍🍳 TUYỂN PHỤ BẾP + GIAO HÀNG 🛵",
  "📍 Nhà Cung Cấp Calo ULAW",
  "",
  "🕖 Ca sáng: 7h – 12h (giao hàng 11h – 12h)",
  "💰 22k/giờ ➕ Phụ cấp giao hàng 30k/ngày",
  "🙌 Không cần kinh nghiệm – sẽ được hướng dẫn",
  "",
  "📩 Inbox thêm chi tiết!"
].join('\n');


(async () => {
  const images = getImageFilesFromFolder();
  const { browser, page } = await launchBrowserWithCookies(COOKIE_PATH);

  for (const groupId of GROUP_IDS) {
    await postToGroup(page, groupId, POST_CONTENT, images);
    const delayMs = getRandomDelay();
    console.log(`⏳ Waiting ${delayMs / 1000} seconds before next post...`);
    await delay(delayMs);
  }

  console.log("✅ All group posts completed.");
  await browser.close();
})();
