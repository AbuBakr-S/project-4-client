# Project 4: Learn

## Overview
In this project we built another full stack web application, this time using Django REST framework with a React Front end. In the spirit of moving online during lockdown, we decided to try our hand at building an E - Learning platform where users can upload courses as Instructors or take a course as a Learner.

[Deployed Here](https://learn-as.netlify.app/)

### Architecture

### Web Technologies / Frameworks
* Django REST Framework
* Python
* SQL
* TablePlus
* React

### Tools
* Zoom
* Github
* Visual Studio Live Share
* Excalidraw - White boarding 
* Slack
* Trello
* Cloudinary

### Technical Requirements
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it’s publicly accessible.

## Approach
We started by creating wireframes and an Entity Relationship Diagram (ERD) for the project which helped us visualise the tables and fields in our database and the relationships between our Models. 

### Planning

*Wireframes*
![Wireframe 1](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/wireframe-1.png)
![Wireframe2](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/wireframe-2.png)
![Wireframe 3](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/wireframe-3.png)
![Wireframe 4](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/wireframe-4.png)

*ERD*
![ERD Diagram](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/erd.png)

We realised that there was going to be some depth to our app from the nesting of assessments and lessons within courses in the Serializers and Views. These assessments were also multiple choice so we had to figure out how to store this in our database.

*serializers.py*
![Serializer](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/serializers.png)

### User Roles
We also realised that we’d have to figure out how to handle the different user roles we had in mind (Instructor and Learner). I couldn’t figure out how to create this and so I decided to set a role on the User Model upon registration and user conditional flow inside the CRUD requests in the Views to limit requests. 

`if request.user.role == “INS”`
`if request.user.role == “LRN”`

*jwt_auth/models.py*
![User Model](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/auth-model.png)

*learn/views.py*
![Course List View](https://github.com/AbuBakr-S/project-4-client/blob/development/src/assets/images/view.png)

## Unsolved Problems / Major Hurdles
* The dashboard is incomplete. I couldn’t figure out how to display the User role on the front end without making a request to the user model from the front end. I need to limit the fields being returned to user role only in the serializer.

## Future Additions + Key Learning
* My Dashboard
* Format Lesson Details (`h1`, `h2` ect)


### Features to Implement 
* Giving Instructors ability to post assessments
* Styling for Assessments with model to make it more visually attractive
* Sharing Results on social media
* Implementing the Dashboard to allow the users to have motivational Quote and view all favourited courses, all courses currently started, viewing
* Badges for Learners to show points for courses
* having Instructor list pages with rating 
* Implementing rating feature so a learner can post a rating for a course after watching, then the average is calculated on the courses index page.
* Complete and populate My Dashboard
* Format Lesson Details (`h1`, `h2` ect)
