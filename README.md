# Facebook Automate Post Groups

Automate Facebook group posting with this tool. Schedule text, image, or link posts to multiple groups using session cookies—no browser automation needed. Great for marketers and community managers. ⚠️ Use responsibly; this may violate Facebook's terms of service.

## Features

- Post text, images, or links to multiple Facebook groups.
- Schedule posts for specific times.
- Uses session cookies for authentication (no browser automation required).
- Lightweight and easy to use.

## Prerequisites

- Node.js installed on your system.
- Facebook session cookies (exported as `fb_cookies.json`).

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/facebook-automate-post-groups.git
   cd facebook-automate-post-groups
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Prepare your session cookies:
   - Export your Facebook session cookies and save them as `fb_cookies.json` in the project root directory.

2. Add images to the `img/` folder if you want to include images in your posts.

3. Run the script to post to groups:
   ```bash
   node post_to_group.js
   ```

4. Customize the `post_to_group.js` file to specify the groups, post content, and schedule.

## File Structure

```
facebook-automate-post-groups/
├── fb_cookies.json       # Facebook session cookies file
├── package.json          # Project dependencies
├── post_to_group.js      # Main script for posting to groups
├── README.md             # Project documentation
├── test.js               # Test script
├── img/                  # Folder for images to include in posts
│   ├── 1-living-room-1.jpg
│   ├── 2-bedroom-1.2.jpg
│   ├── ...
```

## Notes

- Ensure your session cookies are valid and up-to-date.
- Be cautious when automating posts to avoid violating Facebook's terms of service.

## Disclaimer

This tool is for educational purposes only. The author is not responsible for any misuse or consequences resulting from the use of this tool.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
