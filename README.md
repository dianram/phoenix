# Phoenix Inmobilizer

**Phoenix Inmobilizer** is a web application for managing and controlling vehicle immobilizer devices. This platform allows three types of users (MegaUser, DealerShip, and EndUser) to view information and control devices, enabling vehicle startup control and obtaining real-time data based on user roles.

## Table of Contents

- [Phoenix Inmobilizer](#phoenix-inmobilizer)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environments](#environments)
  - [Firebase Managment](#firebase-managment)
  - [User Guide](#user-guide)
    - [Authentication:](#authentication)
    - [Device Management:](#device-management)
    - [Remote Activation and Deactivation:](#remote-activation-and-deactivation)
  - [Aditional Documentation](#aditional-documentation)
  - [License](#license)

---

## Introduction

Phoenix Inmobilizer is a solution for managing vehicle startup control devices. The app allows users to assign devices to specific users, remotely control device activation, and monitor information and status in real-time. Permissions and features vary by user role, providing a tailored experience for each user type.

## Features

- **User Roles**:
  - **MegaUser**: Manages users and devices on a global level.
  - **DealerShip**: Manages devices and users within their dealership.
  - **EndUser**: Views and controls devices assigned to them.
- **Device Management**:
  - Assigning and unassigning devices to/from users.
  - Remote device activation and deactivation.
  - Real-time monitoring of device information and status.
- **Intuitive Interface**: Built on the **Veltrix React v4.2.0** template for a responsive, user-friendly experience.
- **Access Control**: Firebase Authentication and Realtime Database for secure, role-based access.
- **Real-Time Updates**: Instant data updates via Firebase Realtime Database.


## Technologies Used

- **React**: Core library for building the user interface.
- **Firebase SDK**: Authentication, Realtime Database, and Storage for real-time data and security.
- **Reactstrap**: UI components based on Bootstrap for React.
- **Veltrix React v4.2.0**: Responsive and customizable React template.
- **Yarn**: Dependency management.

## Installation & Setup

### Prerequisites

- **Node.js** (>= 14.x)
- **Yarn** (>= 1.x)
- **Firebase CLI** (optional, for setup via terminal)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dianram/phoenix
   cd phoenix
2. **Install dependencies**:
    ```bash
    yarn install
3. **Environment Variables**:
    Those are already located on .env file

    - REACT_APP_DEFAULTAUTH
    - REACT_APP_APIKEY
    - REACT_APP_AUTHDOMAIN
    - REACT_APP_DATABASEURL
    - REACT_APP_PROJECTID
    - REACT_APP_STORAGEBUCKET
    - REACT_APP_MESSAGINGSENDERID
    - REACT_APP_APPID
    - REACT_APP_MEASUREMENTID
    - SENDGRID_APIKEY
4. **Start the Application on local**:
      ```bash
      yarn start  
  The app will open at http://localhost:3000
### Environments
  **Local**
  
  For development and testing in a local environment. Uses environment variables from .env.local.
  
  [http://localhost:3000](http://localhost:3000)

  **Production**
  
  Uses Firebase Production setup for live data and access.
  
 [ http://phoenixwebapp.click/](https://phoenixwebapp.click/)

## Firebase Managment
  Due to the structure provided in the Veltrix template, all interactions with Firebase (RTDB, Storage, and Firestore) are included in this file:

  [firebase_helper](./src/helpers/firebase_helper.js)

## User Guide

### Authentication:
Users must log in to access the platform. Each user will see views and features tailored to their role.
### Device Management:
MegaUsers and DealerShips can assign devices, while EndUsers can monitor and control assigned devices.
### Remote Activation and Deactivation:
With the correct permissions, users can control device activation status.

## Aditional Documentation
- https://themesbrand.com/veltrix-react/doc/index.html
- [Project Components And Functionalities](./Documentation.md)


## License

This project is licensed under the Phoenix Inmobilizer License.