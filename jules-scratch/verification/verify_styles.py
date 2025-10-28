from playwright.sync_api import sync_playwright

def run_verification(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify index.html
    page.goto("file:///app/index.html")
    # Disable animation to prevent timeout errors
    page.add_style_tag(content="""
        .breathing-text {
            animation: none !important;
        }
    """)
    page.screenshot(path="jules-scratch/verification/index_verification.png")

    # Verify pronunciation.html
    page.goto("file:///app/files/pages/pronunciation.html")
    page.screenshot(path="jules-scratch/verification/pronunciation_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
