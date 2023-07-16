import { Request, Response } from 'express';
import TeamsService from '../services/TeamsServices';

export default class TeamsController {
  constructor(private _teams: TeamsService) {
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getTeamById = this.getTeamById.bind(this);
  }

  async getAllTeams(_req: Request, res: Response) {
    const allTeams = await this._teams.getAllTeams();
    res.status(200).send(allTeams);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    // console.log(this._teams, 'FUNCIONA, SATANÁS');
    const teamById = await this._teams.getTeamById(+id);
    res.status(200).send(teamById);
  }
}
