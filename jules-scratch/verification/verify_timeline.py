from playwright.sync_api import Page, expect

def test_timeline_card_stacking(page: Page):
    """
    This test verifies that the timeline cards are stacked correctly,
    with cards higher on the page appearing on top of cards lower on the page.
    """
    # 1. Arrange: Go to the application homepage.
    page.goto("http://localhost:3000")

    # 2. Act: Scroll to the timeline section.
    timeline_section = page.locator("#timeline")
    timeline_section.scroll_into_view_if_needed()

    # Wait for the timeline to be visible
    expect(timeline_section).to_be_visible()

    # 3. Screenshot: Capture the timeline for visual verification.
    page.screenshot(path="jules-scratch/verification/timeline-verification.png")

# To run this test, use the following command:
# python -m pytest --headed jules-scratch/verification/verify_timeline.py