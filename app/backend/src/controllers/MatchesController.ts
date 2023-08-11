import { Request, Response } from 'express';
import MatchesService from '../services/MatchesServices';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.updateMatchToFinished = this.updateMatchToFinished.bind(this);
    this.updateMatchScore = this.updateMatchScore.bind(this);
    this.createMatch = this.createMatch.bind(this);
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

  public async updateMatchScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this._matchesService.updateMatchScore(+id, {
      homeTeamGoals, awayTeamGoals });

    return res.status(status === 'SUCCESS' ? 200 : 401).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this._matchesService.createMatch(req.body);

    if (status !== 'SUCCESS') {
      return res.status(status === 'NOT_FOUND' ? 404 : 422).json(data);
    }

    return res.status(201).json(data);
  }
}
