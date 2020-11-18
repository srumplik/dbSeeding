Name: CSIS483 Capstone Project - Asset Tracking  
Purpose: Web Application for Asset Tracking  
Student: Anthony Gathye

# Asset Tracking
A web application for
### System requirements
+ nodeJS
	- version 14.15.0
	- npm version 6.14.8
+ mongoDB (community edition version 4.4.1)
	- Utilizing localhost
	- Using default port 27017
	- mongod service running

### Use cases
1 - Auth user to DB  
2 - CRUD for gear (assets)  
3 - CRUD for customers  
4 - CRUD for events
5 - Query customer's rental records

### DB Collections & Documents
+ Assets    
	- Asset ID
	- Description
	- Serial Number
	- IP address
	- Subnet Mask
	- OS username
	- OS password
	- Currently Rented
	- Initial cost
	- Rental Income
+ Clients
	- Customer ID
	- Organization Name
	- Organization Contact First Name
	- Organization Contact Last Name
	- Organization Contact Phone Number
	- Organization Address
	- Organization City
	- Organization State
	- Organization Zip Code
	- Rented Assets

+ Events
	- Event ID
	- Event Venue
	- Event Venue Contact First Name
	- Event Venue Contact Last Name
	- Event Venue Contact Phone Number
	- Event Venue Address
	- Event Venue City
	- Event Venue State
	- Event Venue Zip Code
	- Rental Contract Number

+ Users
	- Username
	- Password

### Application
ExpressJS framework running on port 8080  

### Routes
*GET*    / <--- home page (log in) --->  
*POST*   /login <--- logic for login credentials --->
// USER routes
*GET*    /user/all <--- get all users --->  
*GET*    /user/one/:id <--- get specific user --->  
*GET*    /user/create <--- form to create user --->
*POST*   /user/create <--- logic for adding user --->
*POST*   /user/update/:id <--- update user --->  
*GET*    /user/delete/:id <--- delete user --->  
