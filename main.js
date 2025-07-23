const {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
} = require("./fbPosterCore");

const COOKIE_PATH = "./fb_cookies.json"; // <--- Store your facebook cookies in this path
const GROUP_IDS = [
  // "1304108733255469", 
  // "875879243827594", 
  // "220388567778406",
  
  // "339385442911908",
  // "154822255070129",
  // "1542924922603421",
  // "278630919629992",
  // "288052937344755",
  // "356726222129931",
  // "145124054340947",
  // "588676015159605",
  // "275674538732628",
  // "275674538732628",
  // "453764322476971"

];

const POST_CONTENT = [
  "🐻 Pass all 5️⃣0️⃣K Q7"
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
