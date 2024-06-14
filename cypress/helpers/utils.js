//These all are custom functions for the project that are created .
//You can add or modify these functions according to your requirements.

export function generateRandomUrl() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 10) + 1; // Generate a random length for the URL
    let randomUrl = '';
  
    for (let i = 0; i < length; i++) {
      randomUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return 'https://' + randomUrl + '.com'; // Construct the URL with a random domain
  }
  
  export function generateRandomId() {
    return Math.floor(Math.random() * 1000); // Generate a random ID between 0 and 999
  }
  
  export function generateRandomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 10) + 1; // Generate a random length for the name
    let randomName = '';
  
    for (let i = 0; i < length; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return randomName;
  }
  export function getRandomStatus() {
    const statuses = ['available', 'pending', 'sold'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  export function generatePassword(length) {
    const maxLength = 12; // Maximum length for the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
  
    // Adjust length to maxLength if it exceeds the maximum length
    length = Math.min(length, maxLength);
  
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }
  
  export function generateRandomEmail() {
    const generateRandomString = (length, charset) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return result;
    };
  
    const usernameLength = 8; // Length of the username part of the email
    const domainLength = 6; // Length of the domain part of the email
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    const username = generateRandomString(usernameLength, charset);
    const domain = generateRandomString(domainLength, charset);
  
    return `${username}@${domain}.com`;
  }
  
  export function generateRandomPhoneNumber() {
    const generateRandomDigits = (length) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
      }
      return result;
    };
  
    return `+1-${generateRandomDigits(3)}-${generateRandomDigits(3)}-${generateRandomDigits(4)}`;
  }
  
  export function generateUserStatus() {
    
    const statuses = [0, 1, 2]; // Adjust this array with your specific status values
  
    // Generate a random index to select a status from the array
    const randomIndex = Math.floor(Math.random() * statuses.length);
  
    // Return the randomly selected user status
    return statuses[randomIndex];
  }
  
  
  