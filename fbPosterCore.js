const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

/**
 * Launches a Puppeteer browser and loads cookies.
 */
async function launchBrowserWithCookies(cookiePath) {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  const cookies = JSON.parse(fs.readFileSync(cookiePath, "utf8"));
  await page.setCookie(...cookies);
  await page.close();
  return { browser };
}

/**
 * Posts content and images to a specific Facebook group.
 */
async function postToGroup(browser, groupId, postContent, imagePaths) {
  const groupUrl = `https://www.facebook.com/groups/${groupId}`;
  const page = await browser.newPage();

  try {
    await gotoWithRetry(page, groupUrl);

    const postBox = await page.waitForSelector('::-p-xpath(//span[text()="Bạn viết gì đi..."])', { timeout: 30000 });
    await postBox.click();
    await delay(3000);
    await page.keyboard.type(postContent, { delay: 30 });

    await uploadImages(page, imagePaths);

    const postButton = await page.waitForSelector('div[aria-label="Post"], div[aria-label="Đăng"]', { timeout: 10000 });
    await postButton.click();
    console.log(`✅ [${getFormattedTime()}] Post published to group: ${groupId}`);
    return page;
  } catch (error) {
    await page.close();
    throw error;
  }
}

async function gotoWithRetry(page, url, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000
      });
      return;
    } catch (error) {
      const isDetachedFrameError = error.message.includes("detached Frame");
      if (!isDetachedFrameError || attempt === attempts) {
        throw error;
      }

      await delay(2000);
    }
  }
}

/**
 * Uploads images and waits for preview to load. 	https://static.xx.fbcdn.net/rsrc.php/yX/r/8_VnccIZfRa.webp
 */ 
async function uploadImages(page, imagePaths) {
  const icon = await page.waitForSelector('img[src*="8_VnccIZfRa.webp"]', { timeout: 10000 });
  const fileInput = await icon.evaluateHandle(img => {
    let parent = img.closest('div');
    while (parent && !parent.querySelector('input[type="file"]')) {
      parent = parent.parentElement;
    }
    return parent?.querySelector('input[type="file"]');
  });

  if (!fileInput) {
    console.log("❌ File input not found near upload icon.");
    return;
  }

  await fileInput.uploadFile(...imagePaths);
  await delay(5000);
  await page.waitForSelector('img[src*="scontent"]', { timeout: 10000 });
}

/**
 * Reads image files from the specified folder.
 */
function getImageFilesFromFolder(folderPath = "./img") {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder does not exist: ${folderPath}`);
    return [];
  }

  return fs.readdirSync(folderPath)
    .filter(file => validExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => path.resolve(folderPath, file));
}

/**
 * Returns a random delay in milliseconds between min and max seconds. (5 to 10 minutes)
 */
function getRandomDelay(minSeconds = 300, maxSeconds = 600) {
  const seconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
  return seconds * 1000;
}

/**
 * Formats the current date and time.
 */
function getFormattedTime() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false
  }).replace(',', '');
}

/**
 * Delays execution by the given number of milliseconds.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  launchBrowserWithCookies,
  postToGroup,
  getImageFilesFromFolder,
  getRandomDelay,
  delay
};
