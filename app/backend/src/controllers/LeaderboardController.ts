import { Request, Response } from 'express';
import LeaderboardSerivce from '../services/LeaderboardServices';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardSerivce()) {
    this.homeTeamsTable = this.homeTeamsTable.bind(this);
  }

  public async homeTeamsTable(_req: Request, res: Response) {
    const { data } = await this._leaderboardService.homeTeamsTable();

    return res.status(200).send(data);
  }
}
