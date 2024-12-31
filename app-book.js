     
// Event listener for form submission
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const studentName = document.getElementById('stu-name').value;
    const teacherName = document.getElementById('lecturer-name').value;
    const deptt = document.getElementById('department').value;
    const sub = document.getElementById('subject').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    
    // Create appointment object
    const appointment = {
        studentName,
        teacherName,
        deptt,
        sub,
        appointmentDate,
        appointmentTime,
        
    };
    
    // Save appointment to local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Reset form
    document.getElementById('appointment-form').reset();
    alert('Appointment booked successfully!');
});
    
// Function to book appointment
document.getElementById('book-appointment-button').addEventListener('click', async () => {
    const email = document.getElementById('appointment-email').value;
    const date = document.getElementById('appointment-date').value;
    const deptt = document.getElementById('department').value;
    const sub = document.getElementById('subject').value;
    const time = document.getElementById('appointment-time').value;
    const teacherName = document.getElementById('lecturer-name').value;
    const studentName = document.getElementById('stu-name').value;

    try {
        // Add appointment to Firestore
        await db.collection('appointments').add({
            email: email,
            appointmentDate: date,
            appointmentTime: time,
            teacherName: teacherName,
            studentName: studentName,
            department: deptt,
            subject: sub,
            status: 'Pending' // Adding status
        });

        // Display success message
        document.getElementById('booking-message').innerText = 'Appointment booked successfully!';
    } catch (error) {
        // Display error message
        document.getElementById('booking-message').innerText = `Error: ${error.message}`;
    }
});
