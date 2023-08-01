const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const invalidField = 'invalid_field';

const blankEmail = {
    email: '',
    password: validPassword,
};

const blankPassword = {
    email: validEmail,
    password: '',
};

const invalidEmail = {
    email: invalidField,
    password: validPassword,
};

const invalidPassword = {
    email: validEmail,
    password: invalidField,
};

const unregisterUser = {
    email: 'eu@eu.com',
    password: 'secret',
};

const userMock = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: validEmail,
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjkwODk5ODcyfQ.gE0_IXxJAPh0ER_GpYWrakSRUGmedODZDso-SpV2whs';

export default {
    validEmail,
    validPassword,
    invalidField,
    blankEmail,
    blankPassword,
    invalidEmail,
    invalidPassword,
    unregisterUser,
    userMock,
    tokenMock
};