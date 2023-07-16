import Teams from '../database/models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ICRUDTeamsServiceReader } from '../Interfaces/ICRUDTeamsService';

export default class TeamsService implements ICRUDTeamsServiceReader<ITeams> {
  constructor(private _teams = Teams) { }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._teams.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeams | null> {
    const team = await this._teams.findByPk(id);
    return !team ? null : team;
  }
}
