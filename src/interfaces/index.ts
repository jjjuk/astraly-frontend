import {number} from 'starknet';
import {OrganizedEvent} from 'utils/types/organizedStarknet';

export interface Round {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

type ProjectType = 'IDO' | 'LBP' | 'GDA';
export interface Project {
  id: number;
  name?: string;
  description?: string;
  ticker?: string;
  logo?: string;
  cover?: string;
  totalRaise?: number;
  maxAllocation?: number;
  currentRoundId: number;
  type?: ProjectType;
  categories?: string[];
  rounds: Round[];
}

export interface Quest {
  _id: string;
  idoId: number;
  name?: string;
  description?: string;
  event: OrganizedEvent;
}
