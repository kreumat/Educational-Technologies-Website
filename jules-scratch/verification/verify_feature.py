import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get absolute path for the file
        outcomes_path = f"file://{os.path.abspath('files/pages/learning_outcomes.html')}"

        # --- Test Case 1: Initial Modal ---
        await page.goto(outcomes_path, wait_until='networkidle')
        await page.wait_for_selector('#role-selection-modal', state='visible')
        await page.screenshot(path="jules-scratch/verification/01_modal_view.png")

        # --- Test Case 2: Adult View ---
        await page.click('#select-adult')
        await page.wait_for_selector('#role-selection-modal', state='hidden')
        await page.screenshot(path="jules-scratch/verification/02_adult_view.png")

        # --- Test Case 3: Student View ---
        await page.reload(wait_until='networkidle') # Reload to show modal again
        await page.wait_for_selector('#role-selection-modal', state='visible')
        await page.click('#select-student')
        await page.wait_for_selector('#role-selection-modal', state='hidden')
        await page.screenshot(path="jules-scratch/verification/03_student_view.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
