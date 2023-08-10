import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.updateMatchToFinished = this.updateMatchToFinished.bind(this);
  }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { data } = await this._matchesService.getAllMatches();

    if (inProgress) {
      const matches = data.filter((match) => match.inProgress === (inProgress === 'true'));
      console.log(matches);

      return res.status(200).send(matches);
    }

    return res.status(200).send(data);
  }

  public async updateMatchToFinished(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this._matchesService.updateMatchToFinished(Number(+id));

    return res.status(status === 'SUCCESS' ? 200 : 401).send(data);
  }
}
