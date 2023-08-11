const matchesMock = [
    {
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 0,
        awayTeamId: 2,
        awayTeamGoals: 1,
        inProgress: false,
        homeTeam: {
            teamName: 'Flamengo',
        },
        awayTeam: {
            teamName: 'Vasco',
        }
    },
    {
        id: 2,
        homeTeamId: 3,
        homeTeamGoals: 2,
        awayTeamId: 4,
        awayTeamGoals: 1,
        inProgress: true,
        homeTeam: {
            teamName: 'Botafogo',
        },
        awayTeam: {
            teamName: 'Fluminense',
        }
    }
];

const newMatchRequestMock = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 1,
};

const newMatchResponseMock = {
    id: 3,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 0,
    awayTeamGoals: 1,
    inProgress: true,
};

const sameTeamMatchRequestMock = {
    homeTeamId: 1,
    awayTeamId: 1,
    homeTeamGoals: 0,
    awayTeamGoals: 1,
};

const teamNotFoundMatchRequestMock = {
    homeTeamId: 999,
    awayTeamId: 998,
    homeTeamGoals: 0,
    awayTeamGoals: 1,
};

export {
    matchesMock,
    newMatchRequestMock,
    newMatchResponseMock,
    sameTeamMatchRequestMock,
    teamNotFoundMatchRequestMock,
};