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
    const tiebreaker: (keyof ILeaderboard)[] = ['totalVictories', 'goalsBalance',
      'goalsFavor', 'totalPoints'];

    return this._leaderboard.sort((a, b) => {
      const sortedTable = tiebreaker.find((key) => a[key] !== b[key]) as keyof ILeaderboard;
      return +b[sortedTable] - +a[sortedTable];
    });
  }

  public async homeTeamsTable(): Promise<ServiceResponse<ILeaderboard[]>> {
    this._leaderboard = await this.getLeaderboardHome();
    console.log(this.orderingTeams());
    

    return { status: 'SUCCESS', data: this.orderingTeams() };
  }
}
