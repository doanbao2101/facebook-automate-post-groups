const {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
} = require("./fbPosterCore");

const COOKIE_PATH = "./fb_cookies.json"; // <--- Store your facebook cookies in this path
const GROUP_IDS = ["chothuenhaquan4quan7","1003269067182777","sinchanh02","412641129723985"]
// const GROUP_IDS =  ["154915347116720","chothuenhaquan7quan4nhabe.goi0778868676ngoccuong","196659689346935","chothuenhanguyencanquan7quan4nhabe", "224158730285502"]
// const GROUP_IDS =  ["926464117920405","288226340350882","chothuematbangquan7.quan4.nhabe","711403257142372", "2195605697393698"]
// const GROUP_IDS =  ["toiladannhabe","303109391457175","682147963551657","1428701073934074"]

const POST_CONTENT = [
  "🔥 4❌10 – 3PN, 3 máy lạnh – 6,5TR/tháng!",
  "📍 Hẻm 2056 Huỳnh Tấn Phát, Nhà Bè (gần chùa Lá, hẻm rộng thoáng)",
  "🏠 1 lầu • 3PN • 2WC • Bếp • Ban công • Máy Lạnh có sẵn",
  "🛵 Xe máy vào tận nhà, 2 hướng đi",
  "📌 P.S: Nhà sạch đẹp, dọn vào ở ngay!"
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
