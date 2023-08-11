import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import Matches from '../database/models/MatchesModel';
import { matchesMock, newMatchRequestMock, newMatchResponseMock, sameTeamMatchRequestMock, teamNotFoundMatchRequestMock } from './mocks/matches.mock';
import { userMock, tokenMock } from './mocks/users.mock';
import Jwt from '../utils/Jwt';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();

describe('GET /matches', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return all matches', async function () {
        sinon.stub(Matches, 'findAll').returns(matchesMock as any);
    
        const { status, body } = await chai.request(app).get('/matches');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesMock);
    });

    it('Should return all matches in progress', async function () {
        sinon.stub(Matches, 'findAll').returns(matchesMock as any);
    
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal([matchesMock[1]]);
    });

    it('Should return all matches finished', async function () {
        sinon.stub(Matches, 'findAll').returns(matchesMock as any);
    
        const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal([matchesMock[0]]);
    });
});

describe('POST /matches', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return a 201 status and the new match when it is created successfully', async function () {
        sinon.stub(Jwt.prototype, 'verify').callsFake(() => userMock);
        sinon.stub(Matches, 'create').resolves(newMatchResponseMock as any);
    
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${tokenMock}`).send(newMatchRequestMock);
    
        expect(status).to.equal(201);
        expect(body).to.deep.equal(newMatchResponseMock);
    });

    it('Should return a 422 status when the teams are the same', async function () {
        sinon.stub(Jwt.prototype, 'verify').callsFake(() => userMock);
    
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${tokenMock}`).send(sameTeamMatchRequestMock);
    
        expect(status).to.equal(422);
        expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('Should return a 404 status when the team is not found', async function () {
        sinon.stub(Jwt.prototype, 'verify').callsFake(() => userMock);
        sinon.stub(Matches, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `Bearer ${tokenMock}`).send(teamNotFoundMatchRequestMock);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'There is no team with such id!' });
    });
});

describe('PATCH /matches/:id/finish', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return a 200 status and the updated match when it is updated successfully', async function () {
        sinon.stub(Jwt.prototype, 'verify').callsFake(() => userMock);
        sinon.stub(Matches, 'findOne').resolves(Matches.build(matchesMock[1]));
        sinon.stub(Matches, 'update').resolves([1]);
    
        const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${tokenMock}`);
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal({ message: 'Finished' });
    });

    it('Should return a 404 status when the match is not found', async function () {
        sinon.stub(Jwt.prototype, 'verify').callsFake(() => userMock);
        sinon.stub(Matches, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).patch('/matches/999/finish').set('Authorization', `Bearer ${tokenMock}`);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({ message: 'There is no match with such id!' });
    });
});
