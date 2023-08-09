import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import Jwt from '../utils/Jwt';
import { App } from '../app';
import Users from '../database/models/UsersModel';
// import UserService from '../services/UsersServices';
import {
        blankEmail,
        blankPassword,
        invalidEmail,
        invalidPassword,
        unregisterUser,
        userMock,
        tokenMock
    } from './mocks/users.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('POST /login', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return a 200 status and a token when login is successful', async function () {
        sinon.stub(Users, 'findOne').resolves(userMock as any);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(Jwt.prototype, 'sign').returns(tokenMock);

        const { status, body } = await chai.request(app).post('/login').send(userMock);

        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq({ token: tokenMock });
    });

    it('Should return a 400 error when email is blank', async function () {
        const { status, body } = await chai.request(app).post('/login').send(blankEmail);

        expect(status).to.be.eq(400);
        expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('Should return a 400 error when password is blank', async function () {
        const { status, body } = await chai.request(app).post('/login').send(blankPassword);

        expect(status).to.be.eq(400);
        expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('Should return a 401 error when email is invalid', async function () {
        const { status, body } = await chai.request(app).post('/login').send(invalidEmail);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when password is invalid', async function () {
        const { status, body } = await chai.request(app).post('/login').send(invalidPassword);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when user is not found', async function () {
        sinon.stub(Users, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).post('/login').send(unregisterUser);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when password is incorrect', async function () {
        sinon.stub(Users, 'findOne').resolves(userMock as any);
        sinon.stub(bcrypt, 'compare').resolves(false);

        const { status, body } = await chai.request(app).post('/login').send(unregisterUser);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
  }
);

describe ('GET /login/role', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return a 200 status and a role when user is found', async function () {
        const tokenPayload = {
            id: userMock.id,
            role: userMock.role,
        };
        
        const token = new Jwt().sign(tokenPayload);

        sinon.stub(Jwt.prototype, 'verify').returns(tokenPayload);
        sinon.stub(Users, 'findOne').resolves(userMock as any);

        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq({ role: userMock.role });
    });

    it('Should return a 401 error when user is not found', async function () {
        const tokenPayload = {
            id: userMock.id,
            role: userMock.role,
        };
        
        const token = new Jwt().sign(tokenPayload);

        sinon.stub(Jwt.prototype, 'verify').returns(tokenPayload);
        sinon.stub(Users, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when token is not found', async function () {
        const { status, body } = await chai.request(app).get('/login/role');

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Token not found' });
    });

    it('Should return a 401 error when token is invalid', async function () {
        const tokenPayload = {
            id: userMock.id,
            role: userMock.role,
        };
        
        const token = new Jwt().sign(tokenPayload);

        sinon.stub(Jwt.prototype, 'verify').throws(new Error('Invalid token'));

        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Token must be a valid token' });
    });
});