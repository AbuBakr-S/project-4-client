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
[image:57DD0069-D154-4927-939C-1CA436383043-69724-0000054C19EC2212/Screenshot 2021-06-13 at 11.09.53.png]
[image:C3326F91-1FF3-421C-8C19-4036BB3EC462-69724-0000054C19ED4F68/Screenshot 2021-06-13 at 11.11.24.png]
[image:D9773446-5A0F-48B6-B1FA-EABC7A2A3639-69724-0000054C19EDF3B0/Screenshot 2021-06-13 at 11.11.29.png]
[image:6CD440BF-BB03-44CC-B5A3-75B1DEF0A167-69724-0000054C19EE6A3B/Screenshot 2021-06-13 at 11.11.37.png]

*ERD*
[image:3CA9EB2F-272E-4902-A1BB-A3758CD7A9B9-69724-000005474C308C8E/erd.png]

We realised that there was going to be some depth to our app from the nesting of assessments and lessons within courses in the Serializers and Views. These assessments were also multiple choice so we had to figure out how to store this in our database.

*serializers.py*
[image:84645C1F-96C3-4BEA-9AC9-2E735B26836F-69724-000009CE32EE5AE9/assessment-serialisers.png]

### User Roles
We also realised that we’d have to figure out how to handle the different user roles we had in mind (Instructor and Learner). I couldn’t figure out how to create this and so I decided to set a role on the User Model upon registration and user conditional flow inside the CRUD requests in the Views to limit requests. 

`if request.user.role == “INS”`
`if request.user.role == “LRN”`

*jwt_auth/models.py*
[image:7C70C25D-21F4-4E54-A624-8553FC69C003-69724-000005707179759C/user-role.png]

*learn/views.py*
[image:BC50D4E9-D09D-463B-B239-F1395D0AAF18-69724-00000572AB71665B/user-role-conditional.png]

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