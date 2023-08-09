import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  public async getAllMatches(_req: Request, res: Response) {
    const { data } = await this._matchesService.getMatches();

    return res.status(200).send(data);
  }
}
