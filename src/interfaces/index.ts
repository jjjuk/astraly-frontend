export interface Round {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

type ProjectType = 'IDO' | 'LBP' | 'GDA';

export interface Project {
  id: number;
  name: string;
  ticker: string;
  logo: string;
  cover: string;
  totalRaise: number;
  maxAllocation: number;
  currentRound: Round;
  type: ProjectType;
}
