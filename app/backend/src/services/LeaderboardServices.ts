import Teams from '../database/models/TeamsModel';
import TeamsService from './TeamsServices';
import Matches from '../database/models/MatchesModel';
import Leaderboard from '../utils/Leaderboard';
import { IMatches } from '../Interfaces/IMatches';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../types/ServiceResponse';

export default class LeaderboardSerivce {
  constructor(
    private _teams = Teams,
    private _matches = Matches,
    private _leaderboard: ILeaderboard[] = [],
  ) { }

  public async getMatches(): Promise<IMatches[]> {
    const matches = await this._matches.findAll({
      where: { inProgress: false },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: this._teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const matches = await this.getMatches();
    const teams = await new TeamsService().getAllTeams();

    return teams.map(({ teamName, id }) => {
      const homeMatches = matches.filter(({ homeTeamId }) => homeTeamId === id);
      const leaderboard = new Leaderboard(homeMatches);

      return {
        name: teamName,
        totalPoints: leaderboard.totalPoints,
        totalGames: homeMatches.length,
        totalVictories: leaderboard.totalVictories,
        totalDraws: leaderboard.totalDraws,
        totalLosses: leaderboard.totalLosses,
        goalsFavor: leaderboard.goalsFavor,
        goalsOwn: leaderboard.goalsOwn,
        goalsBalance: leaderboard.goalsBalance,
        efficiency: leaderboard.efficiency,
      };
    });
  }

  private orderingTeams(): ILeaderboard[] {
    const tiebreaker: (keyof ILeaderboard)[] = ['totalPoints', 'totalVictories',
      'goalsBalance', 'goalsFavor'];

    return this._leaderboard.sort((teamA, teamB) => {
      for (let i = 0; i < tiebreaker.length; i += 1) {
        const key = tiebreaker[i];

        if (teamA[key] > teamB[key]) return -1;
        if (teamA[key] < teamB[key]) return 1;
      }

      return 0;
    });
  }

  public async homeTeamsTable(): Promise<ServiceResponse<ILeaderboard[]>> {
    this._leaderboard = await this.getLeaderboardHome();

    return { status: 'SUCCESS', data: this.orderingTeams() };
  }
}
