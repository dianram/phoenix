# Phoenix Project Documentation

This documentation includes only the custom components, Firebase functions, and UI components created by Carlos Murcia in the project. These components and functions provide the main functionality of the web application. However, it does not include the functionality of the Vertex template. For documentation on the Vertex template, please visit the official Veltrix page.

[Veltrix Documentation](https://themesbrand.com/veltrix/docs/index.html)

All the documentation about the project's components and functions can be found above the code as well.

## Functionality

The application has a dashboard with different sections depending on the user type (Megauser, Dealership, or User). It also has a profile section for editing user information. Another important aspect is the modules/devices, which are the core elements of the application.

## Components Documentation

### Folder: phoenix/src/components

#### Action.js

The Actions component renders a list of actions, including adding a device and adding a device to a dealer.

@returns The `Actions` component is being returned. It contains a heading "Actions" followed by a `div` element with two child components: `AddDevice` and `AddDeviceToDealer`. The `AddDeviceToDealer` component is passed props `allModules`, `user`, `userModules`, and `setUserModules`.

#### Dealerships.js

The Dealerships component fetches and displays a list of dealerships with search functionality.

@returns The `Dealerships` component is being returned. It displays a list of dealerships with a search bar to filter the results. The component fetches the list of dealerships from Firestore and then displays them using the `UserInfoCard` component for each dealership in the `filterResult` state array. The component also allows toggling the visibility of the dealerships list with a chevron icon.

#### Devices.js

The component `Devices` manages devices, including filtering, pagination, and performing actions on the devices.

@returns The `Devices` component is being returned. It includes various elements such as a header for "Devices", a search functionality, paginated results, a massive shutdown component, stock information, and voltage information. The component also utilizes state variables like `showDevices`, `filterResult`, and `currentPage` to manage the display and functionality of the component.

#### GroupItem.js

The GroupItem component renders a card text item with a remove button that triggers a modal to confirm removal from a group.

@returns The `GroupItem` component is being returned. It renders a div containing the item name, a button to trigger a modal, and a modal that prompts the user to confirm the removal of the item from the group.

#### Groups.js

The component `Groups` renders a list of user groups with the ability to create new groups.

@returns The `Groups` component is returning JSX elements that display a list of groups for a user. The component conditionally renders group cards for each group the user is a part of, along with an option to create a new group if the user has less than 3 groups. If there are no groups or the user has reached the maximum limit of 3 groups, appropriate messages are displayed.

#### LostDeviceControl.js

The `LostDeviceControl` component handles the functionality for a user to remove a module from their profile and lose control of it.

@returns The `LostDeviceControl` component is being returned. It consists of a button labeled “Lost Control" that triggers a modal when clicked. The modal displays a warning message about losing control of a device/module and provides options to either proceed with "Lost Device Control" or cancel. The component handles the state of the modal and the actions to be taken when the buttons are clicked.

#### MassiveShutdown.js

The MassiveShutdown component handles a modal for initiating a massive shutdown process for devices.

@returns The `MassiveShutdown` component is being returned. It consists of a button labeled “Massive Shutdown" that triggers a modal when clicked. The modal displays a warning message about shutting down all devices and provides options to either proceed with the shutdown or cancel.

#### QRCodeReader.js

The QRCodeReader component allows users to scan QR codes using the camera, displaying the scanned data and handling permissions accordingly.

@returns The `QRCodeReader` component is being returned, which contains the logic for scanning QR codes using the camera. The component renders different UI elements based on the camera permission status and whether a QR code has been scanned.

#### SearchBar.js

The SearchBar component allows users to search for specific names within a list of allUsers and filter the results accordingly.

@returns The `SearchBar` component is being returned. It is a functional component that contains a form with an input field for searching users. The user can input a search term, which triggers a filtering process on the `allUsers` data based on the user's name. The filtered results are then passed to the `setFilterResult` function, and the form is reset. The form includes an input.

#### SearchDevice.js

The SearchDevice component allows users to search for devices by PIN number and filter the results accordingly.

@returns The `SearchDevice` component is being returned. It is a functional component that renders a form with an input field for entering a PIN number and a search button. The component handles the search functionality by filtering the `allDevices` based on the entered PIN number and updating the filter result, show state, and current page state accordingly.

#### UploadModal.js

The UploadModal component allows users to upload an image, display the selected image, and submit the upload to a database.

@returns The `UploadModal` component is being returned. It is a modal component that allows users to upload an image file, display the selected file, and submit the upload to save the image URL in the database. The modal includes options to submit the upload, cancel the operation, and displays feedback messages upon successful image upload.

#### UserDevicesDetail.js

The component `userDevicesDetail` displays a list of devices for a user with the ability to search and filter the devices.

@returns The `userDevicesDetail` component is being returned. It displays a list of devices for a user, with the ability to search and filter the devices. The component includes a header with a search input field and a toggle button to show/hide the device list. The list of devices is displayed as `DeviceCard` components for each device in the `filterResult`. If there are no devices to show, it displays ‘No Devices’.

#### Users.js

The Users component fetches user data from Firestore, allows filtering and displaying user information based on search criteria.

@returns The Users component is being returned. It consists of a list of users displayed in `UserInfoCard` components based on the filterResult state. The component also includes a search bar for filtering users, a toggle button to show/hide the users list, and fetches user data from Firestore using the `getCollectionFromFirestore` function.

#### Welcome.js

The `Welcome` component renders a welcome message to a user, displaying their name and user type.

@returns The `Welcome` component is being returned, which displays a welcome message to the user along with information about the Vehicle Control Platform. The component includes the user's name, user type, and a brief description of the platform's features.

### Folder: phoenix/src/pages/Dashboard/MasterDashboard/index.js

#### MasterDashboard.js

The MasterDashboard component fetches modules data from Firestore and displays various components based on the user's userType.

@returns The `MasterDashboard` component is being returned. It includes several child components such as `Welcome`, `Devices`, `Users`, `Dealerships`, and `Groups`. Additionally, it fetches data from Firestore using the `getCollectionFromFirestore` function and sets the retrieved data in the `modules` state using `useState` and `useEffect` hooks. The component also renders `AddDevice` and `QRCodeReader` components.

### Folder: phoenix/src/pages/Dashboard/UserDashboard/index.js

#### UserDashboard.js

The UserDashboard component fetches modules data from Firestore, displays user information and devices, and includes features based on user type.

@returns The `UserDashboard` component is being returned. It consists of various components such as `Welcome`, `UserInfoCard`, `UserDevicesDetail`, `MassiveShutdown`, `Voltage`, `Actions`, and `Groups` based on the user's userType.

### Folder: phoenix/src/pages/Dashboard/

#### DeviceCard.js

The DeviceCard component manages the display and functionality of a device card with options for toggling device status and uploading images.

@returns The `DeviceCard` component is being returned. It is a functional component that displays information about a device module, such as module ID, PIN, installation date, batch number, and whether the device is active. The component also includes a switch to toggle the device's active status, an option to upload an image, and a modal for uploading images.

#### GroupCard.js

The GroupCard component renders a card displaying group information and allows users to add new items to the group.

@returns The `GroupCard` component is being returned. It consists of a Card component that displays group information, group items, and a button to add a new item to the group. The component also includes a Modal component that allows users to input an ID for the new item to be added to the group. The Modal has input validation for the ID field.

#### UserDevices.js

The component `UserDevices` renders a list of user devices based on the provided `userModules` array.

@returns The `UserDevices` component is being returned. It displays a list of user devices based on the `userModules` prop passed to it. If there are user modules present, it will display each module in a Card component within a Row. If there are no user modules, it will display a message saying “No devices"

#### UserInfoCard.js

The UserInfoCard component displays user information with the ability to toggle additional details based on the current user type.

@returns The `UserInfoCard` component is being returned. It displays user information based on the props passed to it, such as the user object, whether to show modules, and the current user type. The component includes a toggle functionality to show/hide additional user information when clicking on the chevron icon. The user's name is displayed with different styles based on the user type.

### Folder: phoenix/src/pages/Forms

#### AddDevice.js

The AddDevice component creates a modal for adding a new device with a form inside.

@returns The `AddDevice` component is being returned. It consists of a button labeled "Add a new device" that, when clicked, opens a modal with a form to add a new device. The modal includes a header "New Device", the form itself, and a "Cancel" button to close the modal.

#### AddDeviceToDealer.js

The component `AddDeviceToDealer` renders a form with a button to subscribe a device, which opens a modal for subscribing a device with additional form fields.

@returns The `AddDeviceToDealer` component is being returned. It consists of a form with a button to subscribe a device. When the button is clicked, a modal opens up with a form to subscribe a device. The modal includes a header, body with the subscription form, and a footer with a cancel button.

#### CreateGroup.js

The CreateGroup component renders a form to add a new group with a modal popup in a React application.

@returns The CreateGroup component is being returned. It consists of a Form with a Button to add a new group. When the button is clicked, a Modal is displayed with a form to create a new group. The Modal includes a header, body with CreateGroupForm component, and a footer with a cancel button.

#### CustomAlert.js

The CustomAlert function is a React component that displays an alert message with a specified type and visibility status.

@returns The CustomAlert component is being returned, which renders an Alert component with the specified message, type of alert, visibility, and dismiss functionality.

#### PaginatedResults.js

The PaginatedResults component handles pagination of items based on the specified items per page and current page number.

@returns The `PaginatedResults` component is being returned. It renders a paginated list of items based on the current page and items per page. It includes a list of items for the current page, a pagination component to navigate between pages, and a `DeviceCard` component for each item on the current page.

### Folder: phoenix/src/pages/Forms/customForms

#### AddDeviceForm.js

The AddDeviceForm component handles form validation and submission for adding a new device to Firestore.

@returns The `AddDeviceForm` component is being returned. It is a form component that allows users to input information about a new device. The form includes fields for asset description, asset name, asset status, batch number, battery voltage, module install date, module owner, module PIN, module state, USB input voltage, and VIN number.

#### DealerRegistrationForm.js

The DealerRegistrationForm component is a form for registering dealers with input fields for email, full name, password, address, phone, location, manager, and manager phone, along with validation handling.

@returns The `DealerRegistrationForm` component is being returned. It is a form component that includes input fields for dealer registration information such as email, full name, password, address, phone, location, manager, and manager phone. The form also includes validation logic using the `validation` prop which handles form submission and error display. Finally, there is a submit button for registering the dealer and a link to login.

#### PQRFormModal.js

The PQRFormModal component is a form modal in JavaScript that allows users to send PQR (queries or requests) with fields for name, email, and message.

@returns The code snippet is a functional component named `PQRFormModal` that renders a modal dialog for sending a PQR (Possible Quality Report). The modal contains a form with input fields for name, email, and message, along with a submit button and a cancel button. The form is set to submit to a specific email address using the `formsubmit.co` service.

#### RemoveDeviceFromUserForm.js

The RemoveDeviceFromUserForm is a React component that renders a form to remove a device from a user with specific styling and functionality.

@returns The `RemoveDeviceFromUserForm` component is being returned. It is a functional component that renders a form with a button for "Lost Device Control". The form has an onSubmit event handler that prevents the default form submission behavior, calls `subscribeValidation.handleSubmit()`, and returns false.

#### SubscribeDeviceForm.js

The SubscribeDeviceForm component in handles subscription validation and form submission for adding modules to a user's account.

@returns The `SubscribeDeviceForm` component is being returned. It is a form component that allows a user to subscribe to a module by entering its ID. The form includes input fields for the module ID, validation messages for the input field, and a submit button. The form also displays a message if the module ID is not valid for subscription.

#### UserRegistrationForm.js

The UserRegistrationForm component is a form that allows users to register by providing their email, full name, password, address, phone, and location, with validation for each input field.

@returns The UserRegistrationForm component is being returned. It is a form component that includes input fields for user registration details such as email, full name, password, address, phone, and location. The form also has a submit button for user registration and a link to the Terms of Use.

#### CreateGroupForm.js

The CreateGroupForm component is a form that allows users to input a group name and ID, with validation using Formik and Yup, and onSubmit function to create a group and toggle the form.

@returns The `CreateGroupForm` component is being returned. It is a form component that allows users to input a group name and an ID/user ID. The form includes validation for both fields using Yup validation schema. When the form is submitted, the `onSubmit` function is called, which in turn calls the `createGroup` function with the provided values and then toggles the form.

### Folder: phoenix/src/pages/Ui

#### CustomDropdown.js

The CustomDropdown is a React component that displays a dropdown menu to select the type of user (dealer or customer) and triggers corresponding actions when an option is selected.

@returns The CustomDropdown component is being returned. It is a functional component that renders a Dropdown component from a UI library with options for selecting the type of user (Dealer or Customer). The component also takes in props for direction, setUserType function, and setShowForm function.


## Firebase Helpers Documentation

### Folder: phoenix/src/helpers/firebase_helper.js

### addNewUserToFirestore

Adds a new user to Firestore.

@param {Object} user - The user object containing user details.


@returns An object that contains the user object and details object.

### addNewDealerToFirestore

Adds a new dealer to Firestore.

@param {Object} user - The user object containing dealer details.


@returns An object that contains the user object and details object.

### getCollectionFromFirestore

Fetches a collection from Firestore.

@param {string} collectionName - The name of the collection to fetch.


@returns {Promise<Array>} Resolves to an array with collection items.

### getUserInfo

Fetches the user information from Firestore.

@returns {Object} User information.

### addNewDeviceToFirestore

Adds a new device to Firestore.

@param {Object} device - The device form fields.


@returns {Object} Details of the added device.

### modulesShutDownOnFireStore

Shuts down multiple modules on Firestore.

@param {Array} modules - An array of modules to shut down.

### singleModuleShutDownOnFireStore

Shuts down a single module on Firestore.

@param {String} moduleID - The ID of the module to shut down.


@param {Boolean} isOn - The status to set for the module.

### createGroup

Creates a new group in Firestore.

@param {String} groupName - The name of the group.


@param {String} itemId - The ID of the item.


@param {Object} user - The user object.


@param {Array} groups - The array of existing groups.


@param {Function} setGroups - The function to update the groups state.

### addItemToGroup

Adds an item to a group in Firestore.

@param {String} groupName - The name of the group.


@param {String} newItem - The new item to add.


@param {Object} user - The user object.


@param {Array} groups - The array of existing groups.


@param {Function} setGroups - The function to update the groups state.


@param {Array} groupItems - The array of group items.

### updatedGroups

Updates the groups in Firestore.

@param {Object} item - The item to update.


@param {String} groupName - The name of the group.


@param {Array} groups - The array of existing groups.


@param {Array} groupItems - The array of group items.


@returns {Array} Updated array of groups.

### updateUserProfile

Updates the user profile in Firestore.

@param {Object} dataToUpdate - The data to update.


@param {String} collection - The collection to update in.


@param {String} uid - The user ID.


@param {Function} setEditFeedBack - The function to set edit feedback.


@param {Function} setUser - The function to set the user state.


@param {Object} user - The user object.

### updateDevice

Updates a device in Firestore.

@param {Object} dataToUpdate - The data to update.


@param {String} uid - The device ID.


@param {Function} setEditFeedBack - The function to set edit feedback.


@param {Function} setCurrentModule - The function to set the current module state.


@param {Object} currentModule - The current module object.

### handleImageUpload

Handles the image upload to Firestore.

@param {Object} file - The file to upload.


@returns {String} The URL of the uploaded image.

### removeItemFromGroup

Removes an item from a group in Firestore.

@param {Object} user - The user object.


@param {Object} item - The item to remove.


@param {String} groupName - The name of the group.


@param {Array} groups - The array of existing groups.


@param {Function} setGroups - The function to update the groups state.


@param {Array} groupItems - The array of group items.

### addModuleToUserOnFireBase

Adds a module to a user in Firestore.

@param {String} userID - The user ID.


@param {String} IDToSubscribe - The ID of the module to subscribe.


@param {Array} userModules - The array of user modules.

### removeModuleFromUserOnFirestore

Removes a module from a user in Firestore.

@param {Object} user - The user object.


@param {Object} module - The module object.

