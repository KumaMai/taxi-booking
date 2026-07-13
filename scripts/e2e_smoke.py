import os
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000")
ARTIFACTS = Path("artifacts/e2e")
ARTIFACTS.mkdir(parents=True, exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    desktop_context = browser.new_context(viewport={"width": 1440, "height": 900})
    mobile_context = browser.new_context(viewport={"width": 375, "height": 812})
    desktop = desktop_context.new_page()
    mobile = mobile_context.new_page()

    desktop.goto(BASE_URL, wait_until="domcontentloaded")
    expect(desktop.get_by_role("heading", name="Your easy way south.")).to_be_visible()
    desktop.get_by_role("button", name="TH").click()
    expect(desktop.get_by_role("link", name="จองรถ").first).to_be_visible()
    expect(desktop.get_by_role("heading", name="เดินทางลงใต้ ง่ายๆ")).to_be_visible()
    expect(desktop.get_by_role("heading", name="รถดีๆ ทำให้การเดินทางดีขึ้น")).to_be_visible()
    expect(desktop.get_by_role("heading", name="การเดินทางที่ดีคือส่วนหนึ่งของทริป")).to_be_visible()
    desktop.goto(f"{BASE_URL}/contact", wait_until="domcontentloaded")
    expect(desktop.get_by_text("แชทตอนนี้", exact=False)).to_be_visible()
    desktop.goto(f"{BASE_URL}/price-list", wait_until="domcontentloaded")
    expect(desktop.get_by_role("link", name="จองรถรับส่งตอนนี้")).to_be_visible()
    desktop.goto(f"{BASE_URL}/reviews", wait_until="domcontentloaded")
    expect(desktop.get_by_text("ได้รับความไว้วางใจจากนักเดินทางทั่วโลก", exact=False)).to_be_visible()
    desktop.screenshot(path=str(ARTIFACTS / "home-desktop.png"), full_page=True)

    mobile.goto(BASE_URL, wait_until="domcontentloaded")
    mobile.wait_for_timeout(1_000)
    mobile.get_by_role("button", name="Toggle menu").click()
    mobile.get_by_role("button", name="TH", exact=True).click()
    expect(mobile.get_by_role("heading", name="เดินทางลงใต้ ง่ายๆ")).to_be_visible()
    mobile.get_by_role("button", name="EN", exact=True).click()
    expect(mobile.get_by_role("heading", name="Your easy way south.")).to_be_visible()

    mobile.goto(f"{BASE_URL}/booking", wait_until="domcontentloaded")
    expect(mobile.get_by_role("heading", name="Book your private transfer.")).to_be_visible()
    expect(mobile.get_by_text("Step 1 / Journey")).to_be_visible()
    mobile.screenshot(path=str(ARTIFACTS / "booking-journey-mobile.png"), full_page=True)
    mobile.locator('input[type="date"]').fill("2099-05-20")
    mobile.locator('input[type="time"]').fill("10:30")
    mobile.get_by_text("Airport", exact=True).click()
    mobile.locator('input[placeholder="e.g. TG208"]').fill("QA123")
    mobile.locator('input[name="dropoffLocation"]').fill("Khao Lak")
    mobile.locator('input[name="mapsLink"]').fill("https://maps.google.com")
    mobile.get_by_role("button", name="Continue").click()
    expect(mobile.get_by_text("Step 2 / Contact")).to_be_visible()
    mobile.locator('input[name="fullName"]').fill("E2E Traveller")
    mobile.locator('input[name="phone"]').fill("981234567")
    mobile.locator('input[name="contactInfo"]').fill("981234567")
    mobile.get_by_role("button", name="Continue").click()
    expect(mobile.get_by_text("Step 3 / Review")).to_be_visible()
    mobile.screenshot(path=str(ARTIFACTS / "booking-review-mobile.png"), full_page=True)

    expect(desktop.request.get(f"{BASE_URL}/api/auth/session")).to_be_ok()
    invalid_booking = desktop.request.post(f"{BASE_URL}/api/booking", data={})
    assert invalid_booking.status == 400, invalid_booking.status
    desktop_context.close()
    mobile_context.close()
    browser.close()
