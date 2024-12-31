# Student-Teacher-Booking-Appointment
This web application focusses on booking appointments between the student and teacher via online, that allows the students to be aware of the appointment's date and timings.

All the relevant data of authenticated users are stored in the firestore database.

The description of the project:

The basic execution of the appointment booking system:

1. main.html -> Main landing page for either registration of a new user or login of an existing user.
   Contains styling for the same. Firebase is integrated for authentication and access to the appointment booking section.
   
2. app-book.html -> After valid login creadentials are authenticated by the firebase, this page is directed to appointment booking section.
   Here, the inputs are given, such as, the student name, the teacher name, department where the student belong to, subject that is handled by the teacher, appointment date and appointment time.
   Once all the fields are filled, the appointment is booked successfully.
   
3. app-book.js -> This JavaScript file handles whether the appointment has been booked successfully or not. If not, error message pops up.
   
4. view-app.html -> Here, all the appointments gets displayed with the help of localStorage functionality.
   Fields are formatted as the column headers, in the table and the inputs are displayed.
   Status field is displayed for Approve/Delete functionalities. 

6. view-app.js -> This JavaScript file concentrates on the firestore database, whether the authenticated users and the database are stored or not.

Styles have been provided inside the html files.



