import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { App } from '../app';
import Users from '../database/models/UsersModel';
// import UserService from '../services/UsersServices';
import usersMock from './mocks/users.mock';
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
        sinon.stub(Users, 'findOne').resolves(usersMock.userMock as any);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'sign').returns();

        const { status, body } = await chai.request(app).post('/login').send(usersMock.userMock);

        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq({ token: usersMock.tokenMock });
    });

    it('Should return a 400 error when email is blank', async function () {
        const { status, body } = await chai.request(app).post('/login').send(usersMock.blankEmail);

        expect(status).to.be.eq(400);
        expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('Should return a 400 error when password is blank', async function () {
        const { status, body } = await chai.request(app).post('/login').send(usersMock.blankPassword);

        expect(status).to.be.eq(400);
        expect(body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('Should return a 401 error when email is invalid', async function () {
        const { status, body } = await chai.request(app).post('/login').send(usersMock.invalidEmail);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when password is invalid', async function () {
        const { status, body } = await chai.request(app).post('/login').send(usersMock.invalidPassword);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when user is not found', async function () {
        sinon.stub(Users, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).post('/login').send(usersMock.unregisterUser);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Should return a 401 error when password is incorrect', async function () {
        sinon.stub(Users, 'findOne').resolves(usersMock.userMock as any);
        sinon.stub(bcrypt, 'compare').resolves(false);

        const { status, body } = await chai.request(app).post('/login').send(usersMock.unregisterUser);

        expect(status).to.be.eq(401);
        expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
  }
);