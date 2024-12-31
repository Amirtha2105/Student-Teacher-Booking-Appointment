// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNH9yWXJW9JlGNtoAg7_D8gJfEgVex8VU",
    authDomain: "stba-91549.firebaseapp.com",
    projectId: "stba-91549",
    storageBucket: "stba-91549.firebasestorage.app",
    messagingSenderId: "435033725584",
    appId: "1:435033725584:web:81d8f0e1a952d420cb5615",
    measurementId: "G-P34MPZM3YN"
};
// Initialize Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Display appointments from local storage
async function displayApp() {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let mainTable = document.getElementById('app-list');
    mainTable.innerHTML = ''; // Clear existing rows
    
    // Render appointments in the table
    appointments.forEach((appointment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.studentName}</td>
            <td>${appointment.teacherName}</td>
            <td>${appointment.dept}</td>
            <td>${appointment.sub}</td>
            <td>${appointment.appointmentDate}</td>
            <td>${appointment.appointmentTime}</td>
            <td>${appointment.status}</td>
            <td>
                <button class="approve-button">Approve</button>
                <button class="delete-button">Delete</button>
            </td>
        `;
        mainTable.appendChild(row);

        // Attach event listeners for approve and delete buttons
        row.querySelector('.approve-button').addEventListener('click', () => approveApp(index));
        row.querySelector('.delete-button').addEventListener('click', () => deleteApp(index));
    });
}

// Function to approve appointment
async function approveApp(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = appointments[index];

    // Update appointment status to "Approved"
    appointment.status = 'Approved';
    
    // Update in local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Update in Firestore
    if (appointment.firestoreId) {
        const docRef = doc(db, "appointments", appointment.firestoreId);
        await updateDoc(docRef, { status: 'Approved' });
    }

    // Re-display appointments
    displayApp();
}

// Function to delete appointment
async function deleteApp(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = appointments[index];

    // Remove appointment from local storage
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Delete from Firestore
    if (appointment.firestoreId) {
        const docRef = doc(db, "appointments", appointment.firestoreId);
        await deleteDoc(docRef);
    }
    // Re-display appointments
    displayApp();
}

// Save new appointment to Firestore
async function saveToFirestore(appointment) {
    try {
        const docRef = await addDoc(collection(db, "appointments"), appointment);
        return docRef.id; // Return Firestore document ID
    } catch (error) {
        console.error("Error adding document to Firestore:", error);
    }
}
// Save appointment to local storage and Firestore
function saveApp(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    saveToFirestore(appointment).then((firestoreId) => {
        appointment.firestoreId = firestoreId; // Add Firestore ID to appointment
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayApp();
    });
}

// Call displayAppointments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayApp();
});