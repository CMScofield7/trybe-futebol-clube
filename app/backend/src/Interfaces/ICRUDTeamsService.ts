export interface ICRUDTeamsServiceReader<Type> {
  getAllTeams(): Promise<Type[]>,
  getTeamById(id: number): Promise<Type | null>,
}
