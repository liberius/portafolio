"""
🎬 SELENIUM CODE GENERATOR - Professional RPA Recorder
======================================================

Auto-generates robust Selenium code by recording user interactions.

Key Features:
- 8 fallback selector strategies (ID → Name → XPath → CSS → Text → Position)
- Automatic popup detection (Material UI, Bootstrap, generic modals)
- Self-healing code generation with automatic fallbacks
- Screenshot capture for debugging
- Generates production-ready Python code

Author: Manuel Medina
License: MIT
"""

import json
import time
import threading
from datetime import datetime
from pathlib import Path
import keyboard
import mouse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options


class SeleniumRecorder:
    """Professional Selenium code recorder with multi-strategy selectors"""

    def __init__(self):
        self.driver = None
        self.actions = []
        self.session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.screenshots_count = 0
        self.recording = False
        self.text_buffer = ""
        self.detected_popups = []

    def start_recording(self, url):
        """Initialize recording session"""
        print("🎬 SELENIUM CODE GENERATOR")
        print("=" * 55)

        # Setup browser
        self._setup_browser()
        self._register_action("navigate", {"url": url})
        self.driver.get(url)
        self._take_screenshot("start")

        print(f"📹 Session: {self.session_id}")
        print(f"🌐 URL: {url}")
        print("\n🔴 RECORDING WITH MAXIMUM ROBUSTNESS...")
        print("=" * 40)
        print("✅ 8 selector strategies per element")
        print("✅ Automatic popup detection")
        print("✅ Self-healing code generation")
        print("✅ Screenshot debugging support")
        print("=" * 40)
        print("\n⚠️  CONTROLS:")
        print("📋 F10 = Pause/Resume recording")
        print("🛑 F12 = Finish and generate code")
        print("📸 F9  = Manual screenshot")
        print("🔍 F11 = Detect popups")
        print("=" * 55)

        self.recording = True
        self._setup_listeners()

        # Start popup monitor thread
        self.popup_thread = threading.Thread(target=self._monitor_popups)
        self.popup_thread.daemon = True
        self.popup_thread.start()

        self._wait_for_finish()

    def _setup_browser(self):
        """Configure Selenium WebDriver"""
        options = Options()
        options.add_argument("--start-maximized")
        options.add_experimental_option("excludeSwitches", ["enable-logging"])

        self.driver = webdriver.Edge(options=options)
        self.driver.implicitly_wait(5)

    def _setup_listeners(self):
        """Configure keyboard and mouse listeners"""
        mouse.on_click(self._capture_click)
        keyboard.on_press(self._capture_key)

        # Hotkeys
        keyboard.add_hotkey('f10', self._toggle_recording)
        keyboard.add_hotkey('f12', self._finish_recording)
        keyboard.add_hotkey('f9', self._manual_screenshot)
        keyboard.add_hotkey('f11', self._manual_popup_detection)

    def _monitor_popups(self):
        """Continuously monitor for popup windows"""
        previous_count = 0

        while self.recording:
            try:
                current_count = self._count_popups()

                if current_count > previous_count:
                    difference = current_count - previous_count
                    for _ in range(difference):
                        print(f"🔔 POPUP DETECTED #{current_count}")
                        self._register_popup()
                        self._take_screenshot(f"popup_{current_count}")

                previous_count = current_count
                time.sleep(0.5)

            except Exception as e:
                print(f"⚠️ Popup monitor error: {e}")
                break

    def _count_popups(self):
        """Count active popup windows"""
        try:
            script = """
            var popups = 0;
            popups += document.querySelectorAll('[id*="mat-dialog"]').length;
            popups += document.querySelectorAll('.modal.show').length;
            popups += document.querySelectorAll('[role="dialog"]').length;
            popups += document.querySelectorAll('[role="alert"]').length;
            return popups;
            """
            return self.driver.execute_script(script)
        except:
            return 0

    def _register_popup(self):
        """Register popup appearance"""
        popup_info = self._get_popup_info()

        self._register_action("popup_detected", {
            "timestamp": time.time(),
            "popup": popup_info
        })

        self.detected_popups.append(popup_info)

    def _get_popup_info(self):
        """Get information about the most recent popup"""
        try:
            script = """
            var dialogs = document.querySelectorAll('[id*="mat-dialog"], [role="dialog"], .modal.show');
            if (dialogs.length > 0) {
                var lastDialog = dialogs[dialogs.length - 1];
                return {
                    'id': lastDialog.id || '',
                    'class': lastDialog.className || '',
                    'type': lastDialog.tagName.toLowerCase(),
                    'content': lastDialog.textContent.trim().substring(0, 100),
                    'visible': !lastDialog.hidden
                };
            }
            return null;
            """
            return self.driver.execute_script(script) or {"type": "unknown"}
        except Exception as e:
            return {"error": str(e), "type": "unknown"}

    def _capture_click(self):
        """Capture clicks with multiple selector strategies"""
        if not self.recording:
            return

        try:
            time.sleep(0.15)  # Delay for better detection

            # Get element with multiple selectors
            element_info = self._get_element_with_selectors()

            if element_info and element_info.get('selectors'):
                # Register pending text
                if self.text_buffer.strip():
                    self._register_text()

                self._register_action("click", {
                    "element": element_info,
                    "timestamp": time.time()
                })

                selectors = element_info.get('selectors', [])
                print(f"👆 Click captured with {len(selectors)} selectors:")
                for i, sel in enumerate(selectors[:3], 1):
                    print(f"   {i}. {sel}")

                self._take_screenshot(f"click_{len(self.actions)}")
            else:
                print("⚠️ Click not identified with robust selectors")

        except Exception as e:
            print(f"⚠️ Error capturing click: {e}")

    def _get_element_with_selectors(self):
        """Get element with 8 selector strategies"""
        try:
            script = """
            var element = document.activeElement;
            if (!element || element.tagName.toLowerCase() === 'body') {
                var hovered = document.querySelectorAll(':hover');
                if (hovered.length > 0) {
                    element = hovered[hovered.length - 1];
                }
            }

            if (element && element.tagName.toLowerCase() !== 'body') {
                var selectors = [];

                // 1. ID selector (highest priority)
                if (element.id) {
                    selectors.push('id:' + element.id);
                }

                // 2. Name attribute
                if (element.name) {
                    selectors.push('css:[name="' + element.name + '"]');
                }

                // 3. Type + placeholder (for inputs)
                if (element.type && element.placeholder) {
                    selectors.push('css:input[type="' + element.type + '"][placeholder="' + element.placeholder + '"]');
                }

                // 4. Unique class selector
                if (element.className) {
                    var classes = element.className.split(' ').filter(c => c.length > 0);
                    for (var i = 0; i < classes.length; i++) {
                        selectors.push('class:' + classes[i]);
                    }
                }

                // 5. XPath by text
                if (element.textContent && element.textContent.trim().length > 0 && element.textContent.trim().length < 50) {
                    var text = element.textContent.trim();
                    selectors.push('xpath://' + element.tagName.toLowerCase() + '[contains(text(),"' + text + '")]');
                }

                // 6. XPath by attributes
                var xpath = '//' + element.tagName.toLowerCase();
                if (element.id) {
                    xpath += '[@id="' + element.id + '"]';
                } else if (element.className) {
                    var firstClass = element.className.split(' ')[0];
                    xpath += '[contains(@class,"' + firstClass + '")]';
                }
                selectors.push('xpath:' + xpath);

                // 7. Compound CSS selector
                var cssSelector = element.tagName.toLowerCase();
                if (element.id) {
                    cssSelector += '#' + element.id;
                } else if (element.className) {
                    cssSelector += '.' + element.className.split(' ')[0];
                }
                selectors.push('css:' + cssSelector);

                // 8. Position-based selector (last resort)
                var siblings = Array.from(element.parentElement.children);
                var index = siblings.indexOf(element);
                selectors.push('css:' + element.tagName.toLowerCase() + ':nth-child(' + (index + 1) + ')');

                // Remove duplicates
                selectors = [...new Set(selectors)];

                return {
                    'tag': element.tagName.toLowerCase(),
                    'id': element.id || '',
                    'class': element.className || '',
                    'text': element.textContent.trim().substring(0, 50),
                    'type': element.type || '',
                    'name': element.name || '',
                    'selectors': selectors
                };
            }

            return null;
            """
            return self.driver.execute_script(script)
        except Exception as e:
            return {"error": str(e), "selectors": []}

    def _capture_key(self, event):
        """Capture keyboard input"""
        if not self.recording:
            return

        try:
            key = event.name

            # Ignore control keys
            control_keys = ['f9', 'f10', 'f11', 'f12', 'ctrl', 'alt', 'shift', 'tab']
            if key.lower() in control_keys:
                return

            if key == 'space':
                self.text_buffer += ' '
            elif key == 'enter':
                if self.text_buffer.strip():
                    self._register_text()
                self._register_action("enter", {"timestamp": time.time()})
                print("⏎ Enter detected")
            elif key == 'backspace':
                if self.text_buffer:
                    self.text_buffer = self.text_buffer[:-1]
            elif len(key) == 1:
                self.text_buffer += key

        except Exception as e:
            print(f"⚠️ Error capturing key: {e}")

    def _register_text(self):
        """Register text input with multiple selectors"""
        if not self.text_buffer.strip():
            return

        element = self._get_element_with_selectors()

        if element and element.get('selectors'):
            self._register_action("type_text", {
                "text": self.text_buffer,
                "element": element,
                "timestamp": time.time()
            })

            selectors = element.get('selectors', [])
            print(f"✍️ Text: '{self.text_buffer}' with {len(selectors)} fallback selectors")
            self._take_screenshot(f"text_{len(self.actions)}")

        self.text_buffer = ""

    def _toggle_recording(self):
        """Pause/resume recording"""
        self.recording = not self.recording
        print("\n🔴 RECORDING RESUMED" if self.recording else "\n⏸️ RECORDING PAUSED")

    def _manual_screenshot(self):
        """Manual screenshot"""
        if self.recording:
            self._take_screenshot("manual")
            print("📸 Manual screenshot taken")

    def _manual_popup_detection(self):
        """Manual popup detection"""
        if self.recording:
            count = self._count_popups()
            print(f"🔍 Detected popups: {count}")
            if count > 0:
                self._register_popup()
                self._take_screenshot("popup_manual")

    def _finish_recording(self):
        """Finish recording and generate code"""
        print("\n🛑 FINISHING RECORDING...")
        self.recording = False

        if self.text_buffer.strip():
            self._register_text()

        self._process_and_generate()

    def _wait_for_finish(self):
        """Wait for user to finish recording"""
        print("⏳ Recording... Press F12 when done")

        try:
            while self.recording:
                time.sleep(0.1)
        except KeyboardInterrupt:
            print("\n🛑 Recording interrupted")
            self.recording = False

    def _take_screenshot(self, name):
        """Take screenshot"""
        self.screenshots_count += 1
        filename = f"screenshot_{self.session_id}_{self.screenshots_count:02d}_{name}.png"
        self.driver.save_screenshot(filename)

    def _register_action(self, action_type, data):
        """Register user action"""
        action = {
            "id": len(self.actions) + 1,
            "timestamp": datetime.now().isoformat(),
            "type": action_type,
            "data": data
        }
        self.actions.append(action)

    def _process_and_generate(self):
        """Generate robust Selenium code"""
        print(f"\n📊 PROCESSING {len(self.actions)} ACTIONS...")
        print(f"🔔 DETECTED POPUPS: {len(self.detected_popups)}")

        # Save session
        self._save_session()

        # Generate code
        code = self._build_robust_code()
        code_file = f"generated_automation_{self.session_id}.py"

        with open(code_file, "w", encoding="utf-8") as f:
            f.write(code)

        print(f"\n🎉 RECORDING COMPLETED!")
        print("=" * 50)
        print(f"📄 Generated code: {code_file}")
        print(f"📊 Total actions: {len(self.actions)}")
        print(f"📸 Screenshots: {self.screenshots_count}")
        print(f"🔔 Popups detected: {len(self.detected_popups)}")
        print("=" * 50)

        self.driver.quit()

    def _save_session(self):
        """Save session data to JSON"""
        data = {
            "session_id": self.session_id,
            "timestamp": datetime.now().isoformat(),
            "total_actions": len(self.actions),
            "detected_popups": self.detected_popups,
            "actions": self.actions
        }

        filename = f"session_{self.session_id}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def _build_robust_code(self):
        """Build production-ready Selenium code with fallbacks"""
        lines = [
            '"""',
            f'🎬 AUTO-GENERATED SELENIUM AUTOMATION',
            f'Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}',
            f'Session: {self.session_id}',
            f'Total actions: {len(self.actions)}',
            f'Popups detected: {len(self.detected_popups)}',
            '"""',
            '',
            'from selenium import webdriver',
            'from selenium.webdriver.common.by import By',
            'from selenium.webdriver.support.ui import WebDriverWait',
            'from selenium.webdriver.support import expected_conditions as EC',
            'from selenium.webdriver.edge.options import Options',
            'import time',
            '',
            'def robust_click(driver, selectors, description="element"):',
            '    """Try clicking with multiple fallback selectors"""',
            '    for i, selector in enumerate(selectors):',
            '        try:',
            '            strategy, value = selector.split(":", 1)',
            '            by = {"id": By.ID, "css": By.CSS_SELECTOR, "xpath": By.XPATH, "class": By.CLASS_NAME}.get(strategy, By.CSS_SELECTOR)',
            '            ',
            '            element = WebDriverWait(driver, 5).until(',
            '                EC.element_to_be_clickable((by, value))',
            '            )',
            '            element.click()',
            '            print(f"✅ Click on {description} using: {selector}")',
            '            return True',
            '        except Exception as e:',
            '            print(f"⚠️ Attempt {i+1}/{len(selectors)} failed: {str(e)[:50]}")',
            '            if i < len(selectors) - 1:',
            '                time.sleep(1)',
            '    return False',
            '',
            'def robust_type(driver, selectors, text, description="field"):',
            '    """Try typing with multiple fallback selectors"""',
            '    for i, selector in enumerate(selectors):',
            '        try:',
            '            strategy, value = selector.split(":", 1)',
            '            by = {"id": By.ID, "css": By.CSS_SELECTOR, "xpath": By.XPATH, "class": By.CLASS_NAME}.get(strategy, By.CSS_SELECTOR)',
            '            ',
            '            element = WebDriverWait(driver, 5).until(',
            '                EC.presence_of_element_located((by, value))',
            '            )',
            '            element.clear()',
            '            element.send_keys(text)',
            '            print(f"✅ Text typed in {description} using: {selector}")',
            '            return True',
            '        except Exception as e:',
            '            print(f"⚠️ Attempt {i+1}/{len(selectors)} failed: {str(e)[:50]}")',
            '            if i < len(selectors) - 1:',
            '                time.sleep(1)',
            '    return False',
            '',
            'def run_automation():',
            '    """Execute recorded automation with maximum robustness"""',
            '    options = Options()',
            '    options.add_argument("--start-maximized")',
            '    driver = webdriver.Edge(options=options)',
            '    ',
            '    try:',
            '        print("🎬 Executing recorded automation...")',
            '        '
        ]

        # Add initial URL
        for action in self.actions:
            if action["type"] == "navigate":
                url = action["data"]["url"]
                lines.append(f'        # Navigate to initial URL')
                lines.append(f'        driver.get("{url}")')
                lines.append('        driver.save_screenshot("step_00_start.png")')
                lines.append('        time.sleep(3)')
                lines.append('        ')
                break

        # Process actions
        step = 1
        for action in self.actions:
            if action["type"] == "navigate":
                continue

            action_type = action["type"]
            data = action["data"]

            lines.append(f'        # Step {step}: {action_type}')

            if action_type == "click":
                element = data.get("element", {})
                selectors = element.get("selectors", [])
                desc = element.get("tag", "element")

                if selectors:
                    lines.append(f'        selectors_{step} = {selectors}')
                    lines.append(f'        robust_click(driver, selectors_{step}, "{desc}")')
                    lines.append(f'        driver.save_screenshot("step_{step:02d}_click.png")')

            elif action_type == "type_text":
                element = data.get("element", {})
                selectors = element.get("selectors", [])
                text = data.get("text", "")
                desc = element.get("tag", "field")

                if selectors and text:
                    lines.append(f'        selectors_{step} = {selectors}')
                    lines.append(f'        robust_type(driver, selectors_{step}, "{text}", "{desc}")')
                    lines.append(f'        driver.save_screenshot("step_{step:02d}_type.png")')

            elif action_type == "popup_detected":
                lines.append('        # Popup detected - wait for it to load')
                lines.append('        time.sleep(2)')
                lines.append(f'        driver.save_screenshot("step_{step:02d}_popup.png")')

            lines.append('        time.sleep(1.5)')
            lines.append('        ')
            step += 1

        lines.extend([
            '        print("✅ Automation completed successfully!")',
            '        input("Press ENTER to close browser...")',
            '        ',
            '    except Exception as e:',
            '        print(f"❌ Critical error: {e}")',
            '        driver.save_screenshot("error.png")',
            '        ',
            '    finally:',
            '        driver.quit()',
            '',
            'if __name__ == "__main__":',
            '    run_automation()'
        ])

        return '\n'.join(lines)


def main():
    """Main entry point"""
    print("🎬 SELENIUM CODE GENERATOR")
    print("=" * 35)
    print("✅ 8 fallback selector strategies")
    print("✅ Automatic popup detection")
    print("✅ Self-healing code generation")

    url = input("\n🌐 URL to record: ")
    if not url.startswith("http"):
        url = "https://" + url

    print("\n⚠️ CONTROLS:")
    print("📋 F10 = Pause/Resume")
    print("📸 F9  = Screenshot")
    print("🔍 F11 = Detect popups")
    print("🛑 F12 = Finish")

    input("\nPress ENTER to start recording...")

    recorder = SeleniumRecorder()
    recorder.start_recording(url)


if __name__ == "__main__":
    main()
