# Swagger Token Injector

A Chrome extension that automatically injects Bearer tokens into Swagger UI interfaces.

## Overview

Swagger Token Injector simplifies API testing by automating the authentication process in Swagger UI. It works by:

1. Capturing authentication tokens from a configured URL
2. Automatically filling and submitting the authorization dialog in Swagger UI
3. Enabling seamless API testing without manual token copying

## Features

- Automatic token capture from existing authenticated sessions
- One-click authentication for Swagger UI
- Popup interface to view the current token
- Works with Bearer token authentication

## Installation

1. Clone this repository
   ```
   git clone https://github.com/haris-conga/swagger-auto-auth.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Build the extension
   ```
   npm run build
   ```

4. Load the extension in Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory created by the build process

## Usage

1. Navigate to a Swagger UI page
2. Click the extension icon in your Chrome toolbar
3. The extension will:
   - Open a tab to the configured URL to capture the authentication token
   - Automatically inject the token into the Swagger UI
   - Close the authentication tab once the token is captured

## Configuration

The extension is pre-configured to work with a specific URL. To change this, modify the `configuredUrl` variable in `src/background.ts`.

## Development

- Run `npm run dev` for development mode
- Run `npm run build` to create a production build

## License

This project is licensed under the ISC License - see the LICENSE file for details.
