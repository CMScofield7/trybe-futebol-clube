import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import Teams from '../database/models/TeamsModel';
import { teamMock, teamsMock } from './mocks/team.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('GET /teams', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Should return all teams', async function () {
        sinon.stub(Teams, 'findAll').resolves(teamsMock as any);

        const { status, body} = await chai.request(app).get('/teams');

        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq(teamsMock);
    });

    it('Should return a team by id', async function () {
        sinon.stub(Teams, 'findByPk').resolves(teamMock as any);

        const { status, body} = await chai.request(app).get('/teams/1');

        expect(status).to.be.eq(200);
        expect(body).to.be.deep.eq(teamMock);
    });

    // it('Should return a 404 error when team is not found', async function () {
    //     sinon.stub(Teams, 'findByPk').resolves(null);

    //     const { status, body} = await chai.request(app).get('/teams/1');

    //     expect(status).to.be.eq(404);
    //     expect(body).to.be.deep.eq({ message: 'Team not found' });
    // });
});