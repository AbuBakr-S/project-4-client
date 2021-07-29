# Project 4: Learn

## Overview
In this project I worked in a pair with Rizwan where we built another full stack web application, this time using Django REST framework with a React Frontend. In the spirit of moving online during lockdown, we decided to try our hand at building an E-Learning platform where users can upload courses as Instructors or take a course as a Learner.

### Deployed Project
You can find this deployed [here](https://learn-as.netlify.app/).

### Web Technologies / Frameworks
* Django REST Framework
* Python
* SQL
* TablePlus
* React.js
* JavaScript

### Tools
* Zoom
* Github
* Visual Studio Live Share
* Excalidraw - White boarding 
* Slack
* Trello
* Cloudinary
* ERD Modelling using [dbdiagram.io](https://dbdiagram.io/)

### Technical Requirements
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it’s publicly accessible.

## Approach
### Planning
This time we started with visualising the product we aimed to build by discussing the features we wanted to implement and using wireframes to stay mindful of the user experience. Here is a list of the core functionalities:

#### Functionality
* An Instructor can create a Course, Lesson, Assessment
* An Instructor can only delete a Course, Lesson, Assessment that they own
* An Instructor can edit their own Course
* A Learner can view all Course resources
* Assessments will be multiple choice based Questions and Answers
* Register / Login


#### Wireframes & ERD
<img src="src/assets/images/wireframe-1.png" alt="Home Wireframe" width="60%" height="auto">
<img src="src/assets/images/wireframe-2.png" alt="Lesson Wireframe" width="60%" height="auto">
<img src="src/assets/images/wireframe-3.png" alt="Assessments Wireframe" width="60%" height="auto">
<img src="src/assets/images/wireframe-4.png" alt="User's Dashboard Wireframe" width="60%" height="auto">

Once we had a clearer scope for idea, I attempted to model the database design and structure using an Entity Relationship Diagram (ERD). This helped us visualise the tables and fields in our database and the relationships between our Models. 

**Note:** Due to changes made on the fly, this is not an accurate representation of the final structure.

*ERD*
<img src="src/assets/images/erd.png" alt="Entity Relationship Diagram">

#### Division of Tasks
* I worked on the ERD, Authentication, React Forms, User Role
* Rizwan worked on the Serialisers and mainly the Views
* We both worked on the Wireframes, Django Settings, Models, some parts of the Views, URLs

We also used Trello to help us guage our workload and track our progress:

<img src="src/assets/images/trello.png" alt="Trello Board" width="60%">

### Getting Setup
We then worked through the configuration steps of setting up a Django project.

1. Create a virtual environment to isolate our package dependencies locally with Pip
2. Install Django and Django REST framework into the virtual environment
3. Register a new project with a single application
4. Create a serializers file inside the app directory
5. Create Views
6. Hook-up URLs
7. Add the camel case parser to DRF settings 


### Abstract User Model
I decided to extend the default Django user model and add some custom fields of my own. 

*Abstract user model - jwt_auth/models*
```
class User(AbstractUser): 
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=250)
    badge_image = models.CharField(max_length=250, blank=True)
    bio = models.TextField(max_length=350, blank=True)
    LEARNER = 'LRN'
    INSTRUCTOR = 'INS'
    USER_TYPE = [
        (LEARNER, 'Learner'),
        (INSTRUCTOR, 'Instructor')
    ]
    role = models.CharField(
        max_length = 3,
        choices = USER_TYPE
    )
    def is_upperclass(self):
        return f'Role: {self.role}'
```


#### User Roles
We also realised that we’d have to figure out how to handle the different user roles we had in mind (Instructor and Learner). I couldn’t figure out how to create this and so I decided to set a role on the User Model upon registration and user conditional flow inside the CRUD requests in the Views to limit requests. 

`if request.user.role == “INS”`

`if request.user.role == “LRN”`

This was useful for edit requests for example as Django's `IsAuthenticatedOrReadOnly` object level permission is not sufficient. I wrapped the body of the put request inside this condition to screen the user and only let instructors pass proceed. 

*Course detail view*
```
class CourseDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    ...

    def put(self, request, pk):
        if request.user.role == "INS":
            course_to_update = self.get_course(pk=pk)
            updated_course = CourseSerializer(course_to_update, data=request.data)
            if updated_course.is_valid():
                updated_course.save()
                return Response(updated_course.data, status=status.HTTP_202_ACCEPTED)
            return Response(updated_course.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
```

### Authentication
* Add `AUTH_USER_MODEL = 'jwt_auth.User'` to Project settings
* Create an Abstract User Model


### Serializers - Assessment
We realised that there was going to be some depth to our app from the nesting of assessments and lessons within courses in the Serializers and Views. These assessments were also multiple choice so we had to figure out how to store this in our database.

*Assessment serializers*
```
class AssessmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assessment
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = '__all__'

class PopulatedQuestionSerializer(QuestionSerializer):
    answers = AnswerSerializer(many=True)


class PopulatedAssessmentSerializer(AssessmentSerializer):
    questions = PopulatedQuestionSerializer(many=True)
```

### Blockers
* I had an issue with my database migrations when trying to flush initial test data for seed data for the demo.
* We had an issue with creating our seed data.
* We lost our seed data during deployment


## Unsolved Problems / Major Hurdles
* The dashboard is incomplete. I couldn’t figure out how to display the User role on the front end without making a request to the user model from the front end. I need to limit the fields being returned to user role only in the serializer.


## Key Learning / Reflection
On reflection, our product idea for this project was far too ambitious. We had initially lost some time with agreeing on a concept and then got caught up developing the backend which continued to unfold, requiring layers of complexity and nesting. We did however manage to get most of the backend logic working however there is a lot of refactoring and refining to be done. 


### Future Features
* Giving Instructors ability to post assessments
* Styling for Assessments with model to make it more visually attractive
* Sharing Results on social media
* Implementing the Dashboard to allow the users to have motivational Quote and view all favourited courses, all courses currently started, viewing
* Badges for Learners to show points for courses
* having Instructor list pages with rating 
* Implementing rating feature so a learner can post a rating for a course after watching, then the average is calculated on the courses index page.
* Complete and populate My Dashboard
* Format Lesson Details (`h1`, `h2` ect)