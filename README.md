# Event Booking App

A React Native app built with Expo for event code entry, QR code scanning, and ticket validation. This app allows users to:
1. Enter an event code to verify the event.
2. Scan tickets associated with the verified event.
3. Display a success screen for valid tickets or a failure screen for invalid ones.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Screens](#screens)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- Event code entry for validating the event.
- QR code scanning to check ticket validity.
- Success screen (green) for valid tickets.
- Failure screen (red) with reason for invalid tickets.

## Tech Stack

- **React Native**: For building the UI.
- **Expo**: For easy setup and testing on mobile devices.
- **React Navigation**: For navigation between screens.
- **React Native QR Code Scanner**: For scanning QR codes.
- **Dummy API**: Used for testing purposes, simulating event and ticket validation responses.

## API Endpoints

This app uses two dummy API endpoints to validate events and tickets:

1. **`/api/checkeventcode`**
   - **Input**: `{ "code": "<event_code>" }`
   - **Response (success)**: `{ "event_id": "123", "event_name": "Sample Event" }`
   - **Response (error)**: `{ "error": "Event not found" }`

2. **`/api/checkqrcode`**
   - **Input**: `{ "event_id": "<event_id>", "qrcode": "<scanned_code>" }`
   - **Response (valid)**: `{ "status": "valid", "name": "John Doe", "ticket_info": "VIP Pass" }`
   - **Response (not valid)**: `{ "status": "notvalid", "reason": "Ticket expired" }`

## Screens

1. **EventCodeScreen**: Enter event code and validate it.
2. **QRScannerScreen**: Scan QR codes to verify tickets.
3. **SuccessScreen**: Green screen for valid tickets.
4. **FailureScreen**: Red screen displaying the error reason for invalid tickets.

## Installation

### Prerequisites

- Node.js (v20.18.0 or higher)
- Expo CLI
- React Native dependencies

1. **Clone the repository**:

   ```bash
   git clone https://github.com/suniltiru/VerifyX-.git
   cd VerifyX
