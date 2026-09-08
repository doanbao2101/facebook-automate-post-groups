const {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
} = require("./fbPosterCore");
const GROUP_IDS_APPROVAL = ["chothuenhaquan7quan4nhabe.goi0778868676ngoccuong"]
const COOKIE_PATH = "./fb_cookies.json"; // <--- Store your facebook cookies in this path // 
const GROUP_IDS = ["chothuenhaquan4quan7", "1003269067182777", "sinchanh02", "412641129723985", "154915347116720", "chothuenhaquan7quan4nhabe.goi0778868676ngoccuong","196659689346935","chothuenhanguyencanquan7quan4nhabe", "224158730285502"]
// const GROUP_IDS =  ["chothuenhaquan7quan4nhabe.goi0778868676ngoccuong","196659689346935","chothuenhanguyencanquan7quan4nhabe", "224158730285502"]
// const GROUP_IDS =  ["toiladannhabe","926464117920405","288226340350882","chothuematbangquan7.quan4.nhabe","711403257142372", "2195605697393698"]
// const GROUP_IDS =  ["303109391457175","682147963551657","1428701073934074"]

const POST_CONTENT = [
  "🔥 CHÍNH CHỦ CHO THUÊ - NHÀ 4❌10, 3PN - FULL 3 MÁY LẠNH - 6,5TR/THÁNG!",
  "📍 Hẻm 2056 Huỳnh Tấn Phát, Nhà Bè - gần chùa Lá, hẻm rộng thoáng",
  "🏠 1 lầu • 3PN • 2WC • Bếp • Ban công • 3 máy lạnh có sẵn",
  "🛵 Xe máy vào tận nhà • Có 2 hướng đi thuận tiện",
  "📌 Nhà sạch đẹp, dọn vào ở ngay, thiện chí liên hệ trực tiếp chủ nhà."
].join('\n');

(async () => {
  const images = getImageFilesFromFolder();
  const { browser } = await launchBrowserWithCookies(COOKIE_PATH);

  try {
    for (const groupId of GROUP_IDS) {
      const page = await postToGroup(browser, groupId, POST_CONTENT, images);
      const delayMs = getRandomDelay();
      console.log(`⏳ Waiting ${delayMs / 1000} seconds before next post...`);

      try {
        await delay(delayMs);
      } finally {
        await page.close();
      }
    }

    console.log("✅ All group posts completed.");
  } finally {
    await browser.close();
  }
})();
