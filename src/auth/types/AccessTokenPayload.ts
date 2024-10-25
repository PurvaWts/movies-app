import { UUID } from 'crypto';

export type AccessTokenPayload = {
  userId: UUID;
  id: number;
  email: string;
  role: string;
};
