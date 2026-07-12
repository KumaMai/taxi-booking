import os

from playwright.sync_api import expect, sync_playwright

BASE_URL = "http://localhost:3000"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "ci-admin-password")
EXPECT_SUPER_ADMIN = os.environ.get("E2E_EXPECT_SUPER_ADMIN", "false").lower() == "true"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    page.goto(f"{BASE_URL}/admin/login", wait_until="networkidle")
    page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    page.locator('button[type="submit"]').click()
    page.wait_for_url("**/admin", wait_until="networkidle")
    expect(page.get_by_role("heading", name="A clear view of the road ahead.")).to_be_visible()

    page.goto(f"{BASE_URL}/admin/bookings", wait_until="networkidle")
    expect(page.get_by_role("heading", name="Bookings")).to_be_visible()
    expect(page.get_by_text("Notify", exact=True)).to_be_visible()

    page.goto(f"{BASE_URL}/admin/audit-logs", wait_until="networkidle")
    if EXPECT_SUPER_ADMIN:
        expect(page.get_by_role("heading", name="Audit Logs")).to_be_visible()

    browser.close()
