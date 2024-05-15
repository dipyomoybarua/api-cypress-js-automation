// These are the function body that will be called by the API service
import {generateRandomId,generateRandomName,generateRandomEmail,generatePassword,generateRandomPhoneNumber,generateUserStatus} from '../helpers/utils'
    const id = generateRandomId();
    const name = generateRandomName();
    const email = generateRandomEmail();
    const passwordId = generatePassword(12);
    const phoneNum = generateRandomPhoneNumber();
    const numStatus = generateUserStatus();
// Function to generate the request body for creating a new user
export function constructNewUserRequestBody() {
    return {
        id: id,
        username: name,
        firstName: name,
        lastName: name,
        email: email,
        password: passwordId,
        phone: phoneNum,
        userStatus: numStatus
  }
}
  export function constructUserUpdateRequest() {
    return {
        "id": id,
        "username": name,
        "firstName": name,
        "lastName": name,
        "email": email,
        "password": passwordId,
        "phone": phoneNum,
        "userStatus": numStatus
    };
  }  