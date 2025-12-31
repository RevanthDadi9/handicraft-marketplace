# Ultimate Android Studio Setup Guide

Follow these steps exactly to ensure a clean, working environment for building your apps.

## Phase 1: Download & Install

1.  **Download**: Visit the official site: [https://developer.android.com/studio](https://developer.a   ndroid.com/studio) and click "Download Android Studio".
2.  **Run Installer**: Open the `.exe` file you downloaded.
3.  **Components**: On the screen "Select components to install", ensure BOTH boxes are checked:
    *   [x] Android Studio
    *   [x] Android Virtual Device (AVD) **(CRITICAL)**
4.  **Install Location**: Leave this as the default: `C:\Program Files\Android\Android Studio`.
5.  **Finish**: Click "Install" and wait for it to complete.

## Phase 2: First Run & SDK Configuration (Crucial)

1.  **Launch**: Open Android Studio.
2.  **Import Settings?**: If asked, select **"Do not import settings"** and click OK.
3.  **Welcome Wizard**: You will see a "Welcome" screen. Click **Next**.
4.  **Install Type**: Select **"Standard"** (Do NOT choose Custom). This automates the SDK setup. Click **Next**.
5.  **Theme**: Choose Dark or Light (doesn't matter). Click **Next**.
6.  **Verify Settings**: It will show a review page. Look for "SDK Folder".
    *   It should be: `C:\Users\REVANTH\AppData\Local\Android\Sdk`
    *   (Note: `AppData` is a hidden folder, but that's fine).
7.  **License Agreement**: Click "Accept" for the licenses on the left side (you may need to click each category like `android-sdk-license`).
8.  **Finish**: Click **Finish**.
    *   **WAIT**: The software will now download 1GB+ of necessary Android tools. Do not close it.

## Phase 3: Create a Virtual Phone (Emulator)

Once Phase 2 is done, you will see the main "Welcome to Android Studio" menu.

1.  **Open Device Manager**:
    *   Click on the "More Actions" (three dots or dropdown) button.
    *   Select **"Virtual Device Manager"**.
2.  **Create Device**: Click **"Create Device"** (or "+").
3.  **Choose Hardware**: Select **"Pixel 7"** (or similar). Click **Next**.
4.  **System Image**:
    *   You will see a list of Android versions (VanillaIceCream, UpsideDownCake, Tiramisu, etc.).
    *   Click the **Download icon** (arrow) next to **"Tiramisu"** (Android 13) or the recommended one.
    *   Wait for the download to finish.
5.  **Finalize**: Select that system image, click Next, then **Finish**.

**SUCCESS:** You now have a working Android Studio and a virtual phone ready to receive your KalaSync app!
