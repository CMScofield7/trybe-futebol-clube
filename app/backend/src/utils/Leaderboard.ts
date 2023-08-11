import { IMatches } from '../Interfaces/IMatches';

export default class Leaderboard {
  constructor(private matches: IMatches[]) {
    this.matches = matches;
  }

  get totalPoints(): number {
    return this.matches.reduce((accScore, match) => {
      const win = match.homeTeamGoals > match.awayTeamGoals;
      const draw = match.homeTeamGoals === match.awayTeamGoals;

      if (win) return accScore + 3;
      if (draw) return accScore + 1;

      return accScore;
    }, 0);
  }

  get totalVictories(): number {
    return this.matches.reduce((accWins, match) => {
      const win = match.homeTeamGoals > match.awayTeamGoals;

      return accWins + (win ? 1 : 0);
    }, 0);
  }

  get totalDraws(): number {
    return this.matches.reduce((accDraws, match) => {
      const draw = match.homeTeamGoals === match.awayTeamGoals;

      return accDraws + (draw ? 1 : 0);
    }, 0);
  }

  get totalLosses(): number {
    return this.matches.reduce((accLose, match) => {
      const lose = match.homeTeamGoals < match.awayTeamGoals;

      return accLose + (lose ? 1 : 0);
    }, 0);
  }

  get goalsFavor(): number {
    return this.matches.reduce((accGoalsFavor, match) =>
      accGoalsFavor + match.homeTeamGoals, 0);
  }

  get goalsOwn(): number {
    return this.matches.reduce((accGoalsOwn, match) =>
      accGoalsOwn + match.awayTeamGoals, 0);
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const points = this.totalPoints;
    const totalGames = this.matches.length;

    return Number(((points / (totalGames * 3)) * 100).toFixed(2));
  }
}
