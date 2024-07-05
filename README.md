# adt-mobile-app

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Installation

Follow these steps to set up the project on your local machine.

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/your-repository.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd your-repository
    ```

3. **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

4. **Install CocoaPods dependencies (iOS only):**

    ```sh
    cd ios
    pod install
    cd ..
    ```

## Running the App

To start the development server and run the app on your emulator or device:

### iOS

```sh
npx react-native run-ios
```

### Android

```sh
npx react-native run-android
```

### Start Metro Bundler

In a separate terminal window, start the Metro Bundler if it's not already running:

```sh
npx react-native start
```

## Features

- **Feature 1:** Intro page with react reanimated animations.
- **Feature 2:** Patient admission form.
- **Feature 3:** Patients list with options to update patient information.

## Technologies Used

- **React Native:** A framework for building native apps using React.
- **Redux:** State management for JavaScript apps.
- **React Navigation:** Routing and navigation for your React Native apps.
- **Axios:** Promise based HTTP client for the browser and Node.js.
- **Other libraries:** React-reanimated, expo, etc.
