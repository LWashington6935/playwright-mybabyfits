# MyBabyFits E2E Testing Suite

<div align="center">

![E2E Tests](https://github.com/LWashington6935/playwright-mybabyfits/actions/workflows/e2e.yml/badge.svg)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

*Comprehensive end-to-end testing for [MyBabyFits](https://www.mybabyfits.com) e-commerce platform*

</div>

## 🚀 Overview

This repository contains a robust end-to-end testing suite built with **Playwright** for the MyBabyFits e-commerce platform. The test suite ensures critical user journeys work seamlessly across multiple browsers while providing detailed reporting and debugging capabilities.

### ✨ Key Features

- **🛒 Complete E-commerce Flow**: Tests the full customer journey from browsing to checkout
- **🌐 Cross-Browser Support**: Validates functionality across Chromium, Firefox, and WebKit
- **📊 Rich Reporting**: HTML reports with screenshots, videos, and execution traces
- **🔄 CI/CD Integration**: Automated testing on GitHub Actions with artifact preservation
- **🐛 Advanced Debugging**: UI mode, inspector, and comprehensive error tracking

---

## 🧪 Test Coverage

### Core User Journeys
| Flow | Description | Status |
|------|-------------|--------|
| **Shopping Flow** | Home → Shop → Product → Add to Cart → Cart | ✅ |
| **Authentication** | Classic login & hosted Shopify accounts | ✅ |
| **Health Checks** | Navigation controls & console error monitoring | ✅ |

### Browser Matrix
- ✅ **Chromium** (Primary CI browser)
- ✅ **Firefox** 
- ✅ **WebKit** (Safari engine)

---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Configure environment
cp .env.example .env
# Edit .env and set BASE_URL=https://www.mybabyfits.com
```

### Running Tests

```bash
# 🎯 Headless test run (fastest)
npm test

# 🎨 Interactive UI mode (recommended for development)
npx playwright test --ui

# 📊 View latest test report
npx playwright show-report
```

---

## 📁 Project Structure

```
playwright-mybabyfits/
├── tests/
│   ├── mfb-happy.spec.ts          # 🛒 End-to-end shopping flow
│   ├── mfb-health.spec.ts         # 🏥 Site health & availability checks
│   └── mfb-auth-negative.spec.ts  # 🔐 Authentication surface testing
├── playwright.config.ts           # ⚙️  Configuration & browser projects
├── .env.example                   # 📝 Environment template
├── .github/workflows/e2e.yml      # 🤖 CI/CD pipeline
└── README.md
```

---

## 🔧 Advanced Usage

### Targeted Test Execution

```bash
# Run specific browser
npx playwright test --project=chromium

# Run single test file
npx playwright test tests/mfb-happy.spec.ts

# Run tests matching pattern
npx playwright test -g "add a product to cart"

# Debug mode with inspector
PWDEBUG=1 npx playwright test --project=chromium
```

### Development Workflow

```bash
# 1. Write/modify tests
# 2. Run in UI mode for immediate feedback
npx playwright test --ui

# 3. Debug specific failures
npx playwright test tests/mfb-happy.spec.ts --debug

# 4. Generate updated screenshots (if needed)
npx playwright test --update-snapshots
```

---

## 🤖 Continuous Integration

### GitHub Actions Workflow

Our CI pipeline automatically:
- ✅ Runs on every push to `main` branch
- ✅ Supports manual workflow dispatch
- ✅ Tests against production environment
- ✅ Generates comprehensive HTML reports
- ✅ Preserves test artifacts even on failures

### Accessing CI Results

1. Navigate to **Actions** tab in GitHub repository
2. Select **e2e** workflow
3. Click **Run workflow** (manual) or view latest automatic run
4. Download **playwright-report** artifact
5. Extract and open `index.html` for detailed results

---

## 🛠️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `BASE_URL` | Target application URL | `https://www.mybabyfits.com` |
| `CI` | CI environment flag | `true` (auto-set in GitHub Actions) |

### Browser Configuration

The test suite is configured to run across multiple browsers with optimized settings:

```typescript
// playwright.config.ts excerpt
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

---

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| **"Invalid URL" errors** | Verify `.env` file exists and `BASE_URL` is properly set |
| **"Project not found"** | Ensure browser projects are defined in `playwright.config.ts` |
| **CI failures with no details** | Download `playwright-report` artifact and open `index.html` |
| **Tests timing out** | Check network connectivity and increase timeout values |

### Debug Techniques

```bash
# Enable verbose logging
DEBUG=pw:api npx playwright test

# Run with headed browser (local only)
npx playwright test --headed

# Generate trace files for debugging
npx playwright test --trace on
```

---

## 📊 Reporting & Artifacts

### Local Reports
- **HTML Report**: Rich interactive report with test results, screenshots, and videos
- **Console Output**: Real-time test execution feedback
- **Trace Files**: Step-by-step execution traces for debugging

### CI Artifacts
- **Screenshots**: Capture of failures and key interaction points
- **Videos**: Full test execution recordings
- **Traces**: Detailed execution traces for post-mortem analysis
- **Test Results**: Structured test outcome data

---

## 🤝 Contributing

### Adding New Tests

1. Create test file in `tests/` directory
2. Follow existing naming convention: `mfb-[feature].spec.ts`
3. Include appropriate test descriptions and assertions
4. Run locally before committing:
   ```bash
   npx playwright test tests/your-new-test.spec.ts
   ```

### Best Practices

- ✅ Use descriptive test names and descriptions
- ✅ Implement proper page object models for complex flows
- ✅ Add appropriate waits and assertions
- ✅ Include cleanup steps when necessary
- ✅ Test both happy path and edge cases

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MyBabyFits Website](https://www.mybabyfits.com)
- [Test Results & Reports](https://github.com/LWashington6935/playwright-mybabyfits/actions)

---

<div align="center">

**Built with ❤️ for MyBabyFits Quality Assurance**

*Ensuring every customer has a seamless shopping experience*

</div>
