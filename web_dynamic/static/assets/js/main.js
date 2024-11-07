/*===== LOGIN SHOW and HIDDEN =====*/
const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up')

let count = document.getElementById('body-pd').getAttribute('data-id');
if (count == 0) {
    signUp.addEventListener('click', ()=>{
        // Remove classes first if they exist
        loginIn.classList.remove('block')
        loginUp.classList.remove('none')
    
        // Add classes
        loginIn.classList.toggle('none')
        loginUp.classList.toggle('block')
    })
}


signIn.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    // Add classes
    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})


document.addEventListener("DOMContentLoaded", function () {
    // Reference to the forms
    const registerForm = document.getElementById("login-up");
    const loginForm = document.getElementById("login-in");

    // Handle Sign Up button click
    const signUpButton = document.getElementById("msign-in");
    signUpButton.addEventListener("click", function () {
        const username = registerForm.querySelector("input[name='username']").value;
        const email = registerForm.querySelector("input[name='email']").value;
        const password = registerForm.querySelector("input[name='password']").value;
        const confirmPassword = registerForm.querySelector("input[name='confirm_password']").value;

        // Ensure passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Prepare data for POST request to register
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        fetch("/admins", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "admin created") {
                // Registration was successful, trigger login
                loginUser(email, password); // Log in after successful registration
            } else {
                alert(data.message || "Registration failed.");
            }
        })
        .catch(error => console.error("Error during registration:", error));
    });

    // Handle Sign In button click
    const signInButton = document.getElementById("msign-up");
    signInButton.addEventListener("click", function () {
        const email = loginForm.querySelector("input[name='email']").value;
        const password = loginForm.querySelector("input[name='password']").value;

        // Log in after sign-in button click
        loginUser(email, password);
    });

    // Function to handle login
    async function loginUser(email, password) {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
    
            // Send the POST request
            const response = await fetch("/sessions", {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                // If login is successful, redirect to the admin dashboard
                window.location.href = `/mainadmin/${data.session_id}`;
            } else {
                // If login fails, display an error message
                const errorData = await response.json();
                alert(errorData.message || "Wrong login details");
            }
    
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    }
    
    
});


