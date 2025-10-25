import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get absolute paths
        repo_root = "/app"
        index_path = os.path.join(repo_root, "index.html")
        hub_path = os.path.join(repo_root, "files", "pages", "vocabulary.html")

        # Verify Index Page Link
        await page.goto(f"file://{index_path}")
        await page.screenshot(path="jules-scratch/verification/final_index.png")

        # Click the vocabulary link inside the main navigation and verify navigation
        nav_vocabulary_link = page.locator("nav.main-nav").get_by_role("link", name="Vocabulary")
        await nav_vocabulary_link.click()
        await expect(page).to_have_url(f"file://{hub_path}")

        # Verify Hub Page styling
        await page.screenshot(path="jules-scratch/verification/final_hub.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
