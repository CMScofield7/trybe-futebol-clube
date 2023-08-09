import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { ServiceResponse } from '../types/ServiceResponse';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private _matches = Matches,
    private _teams = Teams,
  ) { }

  public async getMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this._matches.findAll({
      include: [
        { model: this._teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this._teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return { status: 'SUCCESS', data: matches };
  }
}
