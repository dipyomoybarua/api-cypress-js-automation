import faker from 'faker';
// These are the function body that will be called by the API service
// Function to generate the request body for creating a new pet
export function constructNewPetRequestBody() {
    const id = faker.datatype.number({ min: 1, max: 999 }); 
    const name = faker.random.word();
    const photoUrls = [faker.internet.url()]; 
    const status = faker.random.arrayElement(['available', 'pending', 'sold']); 
    return {
        id: id,
        category: {
            id: id,
            name: name
        },
        name: name,
        photoUrls: photoUrls,
        tags: [{
            id: id,
            name: name
        }],
        status: status
    };
}

export function constructPetRequest() {
    const id = faker.datatype.number({ min: 1, max: 999 }); 
    const name = faker.name.findName(); 
    const status = faker.random.arrayElement(['available', 'pending', 'sold']); 
    return {
        petId: id,
        name: name,
        status: status
    };
}

export function constructPetInvalidRequest() {
    return [
        {}, // Invalid request object
        { status: faker.random.word() } // Valid, but incomplete request
    ];
}