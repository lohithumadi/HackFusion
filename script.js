// Sample user data for demonstration purposes (in a real app, this should be stored in a database)
let users = [
    { username: "user1", password: "password123", fullName: "User One", email: "user1@example.com" },
    { username: "user2", password: "password456", fullName: "User Two", email: "user2@example.com" }
  ];
  
  // Show the "Create Account" modal when the user clicks "Sign Up"
  document.getElementById('showSignUp').addEventListener('click', function() {
    document.getElementById('createAccountModal').style.display = 'flex';
  });
  
  // Close the "Create Account" modal when the user clicks "Sign In"
  document.getElementById('closeCreateAccountModal').addEventListener('click', function() {
    document.getElementById('createAccountModal').style.display = 'none';
  });
  
  // Handle Create Account form submission
  document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Validate if passwords match
    if (password !== confirmPassword) {
      document.getElementById('error-message').textContent = "Passwords do not match. Please try again.";
      return;
    }
  
    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
  
    if (existingUser) {
      // Display error message if username is taken
      document.getElementById('error-message').textContent = "Username already taken. Please choose another.";
    } else {
      // Create new account and add to the 'users' array
      users.push({ username, password, fullName, email });
      alert("Account created successfully! Please sign in.");
      // Close the modal after account creation
      document.getElementById('createAccountModal').style.display = 'none';
    }
  });
  
  // Handle Login (just for demonstration purposes)
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    // Simulate a simple login check
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      alert("Login successful! Welcome.");
    } else {
      document.getElementById('loginError').textContent = "Invalid username or password.";
    }
  });
  