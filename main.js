const {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
} = require("./fbPosterCore");

const COOKIE_PATH = "./fb_cookies.json"; // <--- Store your facebook cookies in this path
const GROUP_IDS = [ // <--- Input your Group IDs here
"1764221823770070",
"1833274956819913",
"2299563390328949",
"nhabanhcm"
];

const POST_CONTENT = [
 
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

```
🏡 Bán Đất Thạnh Xuân, Quận 12
- Hẻm 31, Thạnh Xuân 14, Quận 12 (hướng Đông Bắc).
- 66.7m² (thổ cư 60.4m²).
- 3.744 tỷ VNĐ (56,2 triệu/m², thương lượng).
Lợi thế:
- Vị trí gần mặt tiền, thuận lợi kinh doanh & an cư.
- Đối diện Pi City High Park, tiện ích đầy đủ.
- Tiềm năng tăng trưởng cao, giá trị tăng 5-8% mỗi năm.
#BấtĐộngSản #ThạnhXuân #ĐấtQuận12
```