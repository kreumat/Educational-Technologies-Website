
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        # Desktop test
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(f'file:///app/files/pages/vocabularypages/classroom_objects.html')
        page.screenshot(path='jules-scratch/verification/desktop_layout_fixed.png')
        browser.close()

        # Mobile test
        browser = p.chromium.launch(headless=True)
        iphone_11 = p.devices['iPhone 11']
        context = browser.new_context(**iphone_11)
        page = context.new_page()
        page.goto(f'file:///app/files/pages/vocabularypages/classroom_objects.html')

        # Simulate the click-to-match interaction
        page.locator('.draggable-item[data-item-id="pencil"]').click()
        page.locator('.drop-target[data-item-id="pencil"]').click()

        page.screenshot(path='jules-scratch/verification/mobile_layout_fixed.png')
        browser.close()

run()
