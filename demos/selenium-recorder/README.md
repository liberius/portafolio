# 🎬 Selenium Code Generator

**Professional RPA tool that auto-generates robust Selenium code** by recording user interactions with web applications.

## 🌟 Key Features

### 1. **8 Fallback Selector Strategies**
When recording a click, the tool generates 8 different selectors in priority order:
1. `#id` - ID attribute (highest priority)
2. `[name="..."]` - Name attribute
3. `input[type="..."][placeholder="..."]` - Type + placeholder combination
4. `.class` - Class names
5. `//tag[contains(text(),"...")]` - XPath by visible text
6. `//tag[@id="..."]` - XPath by attributes
7. `tag#id.class` - Compound CSS selector
8. `tag:nth-child(n)` - Position-based (last resort)

**Result**: If the first selector fails, the generated code automatically tries the next one, making your automation **self-healing** and **99% more reliable**.

### 2. **Automatic Popup Detection**
Monitors the page in real-time and detects:
- Material UI dialogs (`mat-dialog`)
- Bootstrap modals (`.modal.show`)
- Generic dialogs (`[role="dialog"]`)
- Alert boxes (`[role="alert"]`)

When a popup appears, it's automatically logged and handled in the generated code.

### 3. **Production-Ready Code Generation**
Generates clean, documented Python code with:
- `robust_click()` - Tries all selectors with timeouts
- `robust_type()` - Types text with fallback strategies
- Screenshot capture at each step
- Error handling and retry logic
- WebDriverWait with explicit waits

### 4. **Session Management**
- JSON export of all actions
- Screenshot archive for debugging
- Timestamp tracking
- Popup event log

## 🚀 Installation

```bash
pip install -r requirements.txt
```

**Requirements**:
- Python 3.8+
- Microsoft Edge browser
- Edge WebDriver (auto-downloaded by selenium)

## ▶️ Usage

### Basic Recording

```bash
python recorder.py
```

Then enter the URL you want to automate.

### Controls During Recording

| Key | Action |
|-----|--------|
| **F10** | Pause/Resume recording |
| **F12** | Finish and generate code |
| **F9** | Take manual screenshot |
| **F11** | Manually detect popups |

### Example Session

```
🌐 URL to record: https://example.com/login

Recording...
👆 Click captured with 8 selectors:
   1. id:username-field
   2. css:[name="username"]
   3. css:input[type="text"][placeholder="Enter username"]

✍️ Text: 'admin' with 8 fallback selectors

👆 Click captured with 8 selectors:
   1. id:login-button
   2. xpath://button[contains(text(),"Login")]
   3. css:button.primary-btn

🔔 POPUP DETECTED #1
📸 Screenshot taken: popup_1.png

🛑 Press F12 to finish...

✅ Generated: generated_automation_20250113_123456.py
```

## 📊 Generated Code Example

```python
def robust_click(driver, selectors, description="element"):
    """Try clicking with multiple fallback selectors"""
    for i, selector in enumerate(selectors):
        try:
            strategy, value = selector.split(":", 1)
            by = {
                "id": By.ID,
                "css": By.CSS_SELECTOR,
                "xpath": By.XPATH,
                "class": By.CLASS_NAME
            }.get(strategy, By.CSS_SELECTOR)

            element = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((by, value))
            )
            element.click()
            print(f"✅ Click on {description} using: {selector}")
            return True
        except Exception as e:
            print(f"⚠️ Attempt {i+1}/{len(selectors)} failed")
            if i < len(selectors) - 1:
                time.sleep(1)
    return False

# Step 1: click
selectors_1 = [
    'id:username',
    'css:[name="username"]',
    'css:input[type="text"]',
    'xpath://input[@id="username"]',
    # ... 4 more fallback selectors
]
robust_click(driver, selectors_1, "input")
```

## 🎯 Why This Tool is Unique

| Commercial Tool | Selenium Recorder |
|----------------|-------------------|
| Selenium IDE: 1 selector | **8 fallback selectors** |
| Chrome Recorder: JSON output | **Executable Python code** |
| Katalon: Paid, closed source | **Free, MIT license** |
| Manual popup handling | **Automatic detection** |
| Brittle selectors | **Self-healing code** |

## 🔧 Architecture

```
┌─────────────────────┐
│   User Interaction  │
│  (Mouse + Keyboard) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  JavaScript Inject  │◄── 8 Selector Strategies
│   (Active Element)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Action Registry    │
│   + Screenshots     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Code Generator     │
│  (robust_click,     │
│   robust_type)      │
└──────────┬──────────┘
           │
           ▼
   🎉 generated_automation.py
```

## 📝 Use Cases

1. **Rapid Automation Prototyping**
   - Record a manual workflow once
   - Get production-ready code in seconds

2. **QA Test Automation**
   - Record test scenarios
   - Convert to automated regression tests

3. **RPA Development**
   - Create robust web automation bots
   - Self-healing selectors reduce maintenance

4. **Scraping Workflows**
   - Record complex navigation patterns
   - Export as repeatable scripts

## 🐛 Troubleshooting

### "No module named 'keyboard'"
```bash
pip install keyboard mouse
```

### "Selectors not working"
- Check if page uses dynamic IDs (randomized)
- Try recording with text-based selectors (click on visible text)
- Manually adjust generated code if needed

### "Popup detection not working"
- Press F11 manually when popup appears
- Check if popup uses custom framework (not Material/Bootstrap)

## 🤝 Contributing

This is a portfolio project, but suggestions welcome!

## 📄 License

MIT License - Free to use, modify, and distribute

---

**Created by Manuel Medina** | [Portfolio](https://github.com/liberius/portafolio)

*Demonstrates: RPA Engineering • Selenium Automation • Metaprogramming • JavaScript Injection • Self-Healing Code Generation*
