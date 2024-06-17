import faker from 'faker';
// These are the function body that will be called by the API service
// Function to generate the request body for creating a new user
export function constructNewUserRequestBody() {
    const id = faker.datatype.number(999);
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(12);
    const phone = faker.phone.phoneNumber();
    const userStatus = faker.datatype.number({ min: 0, max: 2 });

    return {
        id: id,
        username: name,
        firstName: name,
        lastName: name,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus
    };
}

export function constructUserUpdateRequest() {
    const id = faker.datatype.number(999);
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(12);
    const phone = faker.phone.phoneNumber();
    const userStatus = faker.datatype.number({ min: 0, max: 2 });

    return {
        id: id,
        username: name,
        firstName: name,
        lastName: name,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus
    };
}