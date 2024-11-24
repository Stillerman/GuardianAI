import rumps
import threading
import time
from PIL import Image
import pyautogui
from io import BytesIO
import os

class ScreenMonitorApp(rumps.App):
    def __init__(self):
        super(ScreenMonitorApp, self).__init__("📸")
        
        self.monitoring = False
        self.interval = 5  # Default interval in seconds
        self.screenshot_dir = "./screenshots"
        
        # Create screenshots directory if it doesn't exist
        os.makedirs(self.screenshot_dir, exist_ok=True)
        
        # Menu items
        self.start_stop_button = rumps.MenuItem("Start Capturing", callback=self.toggle_monitoring)
        self.interval_button = rumps.MenuItem(f"Interval: {self.interval}s", callback=self.change_interval)
        
        # Add menu items
        self.menu = [
            self.start_stop_button,
            self.interval_button,
            None,  # Separator
            rumps.MenuItem("Open Screenshots Folder", callback=self.open_screenshots_folder),
            "Quit"
        ]

        # Monitoring thread
        self.monitor_thread = None

    def toggle_monitoring(self, sender):
        if not self.monitoring:
            self.start_monitoring()
        else:
            self.stop_monitoring()

    def start_monitoring(self):
        self.monitoring = True
        self.start_stop_button.title = "Stop Capturing"
        self.monitor_thread = threading.Thread(target=self.monitoring_task)
        self.monitor_thread.start()

    def stop_monitoring(self):
        self.monitoring = False
        self.start_stop_button.title = "Start Capturing"
        if self.monitor_thread:
            self.monitor_thread.join()

    def change_interval(self, sender):
        # Simple interval cycling: 5s -> 10s -> 30s -> 60s -> 5s
        intervals = [5, 10, 30, 60]
        current_idx = intervals.index(self.interval)
        self.interval = intervals[(current_idx + 1) % len(intervals)]
        self.interval_button.title = f"Interval: {self.interval}s"

    def open_screenshots_folder(self, sender):
        os.system(f"open {self.screenshot_dir}")

    def monitoring_task(self):
        while self.monitoring:
            try:
                # Take screenshot
                screenshot = pyautogui.screenshot()
                
                # Save screenshot with timestamp
                timestamp = time.strftime("%Y%m%d-%H%M%S")
                filename = os.path.join(self.screenshot_dir, f"screenshot_{timestamp}.jpg")
                screenshot.save(filename, "JPEG", quality=85)
                
            except Exception as e:
                print(f"Error taking screenshot: {e}")
                rumps.notification(
                    title="Screenshot Error",
                    subtitle="Error capturing screen",
                    message=str(e)
                )
            
            time.sleep(self.interval)

if __name__ == "__main__":
    ScreenMonitorApp().run()
