import { test, expect } from '@playwright/test';
import savedResponse from '../test-data/api_name_responses.json';

test.describe.only('API Testing.', () => {

    //1. Get all users.
    test('GET all users - match saved response.', async({ request }) => {

        // Make the request.
        const response = await request.get(""); // API resource endpoint.

        console.log(response);
        console.log(response.status());
        console.log(await response.json());
        
        // Verify response code.
        expect(response.status).toBe(200);

        // Parse response body.
        const body = await response.json();

        // Compare response with saved structure.
        // TODO : Implementation details(Need api account.). 
        // API mocking ?
        // structure and data comparison.
        // static responses.
        expect(body).toEqual(savedResponse);

    });

    //2. GET One user - field by field assertions.
    test('GET single user - check fields.', async({request}) => {

        // Single entry.
        const response = await request.get("");
        const body = await response.json();

        console.log(body);

        expect(response.status()).toBe(200);
        expect(body.data.id).toBe(2);
        expect(body.data.email).toBe('abc@xyz.com');
        expect(body.data.first_name).toBe('Janet');
        expect(body.data.last_name).toBe('Weaver');
        expect(body.support.text).toBe('foo');
    });

    //3. POST - Create a new user.
    test('POST create user.', async({ request }) => {

        const new_user = {name: 'john', job: 'leader'};

        const response = await request.post('',{
            data: new_user,
            headers: {
                'x-api-key': ''
            }
        }
            
        );

        const body  = await response.json();

        expect(response.status()).toBe(201);
        expect(body.name).toBe(new_user.name);
        expect(body.job).toBe(new_user.job);

    });

    //4. PUT - Update existing user.
    test('PUT Update user.', async({ request }) => {

        const response = await request.put('',{
            data: {
                name: 'Neo',
                job: 'the One'
            },
            headers: {
                'x-api-key': ''
            }
        })

        const body = await response.json();

        console.log(body);

        expect(response.status()).toBe(200);
        expect(body.name).toBe('Neo');
        expect(body.job).toBe('theOne');

    });

    //5. DELETE - Remove a user.
    test('Delete User', async({ request })=> {

        const response = await request.delete('', {
            headers: {
                'x-api-key': ''
            }
        });
        
        console.log(response.status());

        expect(response.status()).toBe(204);
    });

});