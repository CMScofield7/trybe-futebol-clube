export interface IMatches {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesResponse extends IMatches {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
}
