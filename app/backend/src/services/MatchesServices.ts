import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { ServiceResponse } from '../types/ServiceResponse';
import { IMatches, IMatchesScore } from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private _matches = Matches,
    private _teams = Teams,
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this._matches.findAll({
      include: [
        { model: this._teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this._teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return { status: 'SUCCESS', data: matches };
  }

  public async getMatchById(id: number): Promise<IMatches | null> {
    const match = await this._matches.findByPk(id, {
      include: [
        { model: this._teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this._teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (!match) return null;

    return match;
  }

  //   public async updateMatchById(id: number, match: IMatches): Promise<IMatches | null> {
  //     const [affectedRows] = await this._matches.update(match, { where: { id } });

  //     if (affectedRows === 0) return null;

  //     return this.getMatchById(id);
  //   }

  public async updateMatchToFinished(id: number): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.getMatchById(id);

    if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };

    const [affectedRows] = await this._matches.update({ inProgress: false }, { where: { id } });

    if (affectedRows === 0) {
      return { status: 'UNAUTHORIZED', data: { message: 'No updates to do!' } };
    }

    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatchScore(id: number, match: IMatchesScore):
  Promise<ServiceResponse<{ message: string } | number>> {
    const matchToUpdate = await this.getMatchById(id);

    if (!matchToUpdate) return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };

    const [affectedRows] = await this._matches.update(match, { where: { id } });

    if (affectedRows === 0) {
      return { status: 'UNAUTHORIZED', data: { message: 'No updates to do!' } };
    }

    return { status: 'SUCCESS', data: affectedRows };
  }

  public async createMatch(match: IMatches):
  Promise<ServiceResponse<{ message: string } | IMatches>> {
    const newMatch = await this._matches.create(match);

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const teamsIds = [newMatch.homeTeamId, newMatch.awayTeamId];
    const findTeams = teamsIds.map((teamId) => this._teams.findByPk(teamId));
    const teams = await Promise.all(findTeams);

    if (teams.includes(null)) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'SUCCESS', data: newMatch };
  }
}
