import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { data } = await this._matchesService.getMatches();

    if (inProgress) {
      const matches = data.filter((match) => match.inProgress === (inProgress === 'true'));
      console.log(matches);

      return res.status(200).json(matches);
    }

    return res.status(200).json(data);
  }
}
