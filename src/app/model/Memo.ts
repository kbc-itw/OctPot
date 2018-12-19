import {User} from './user';
import {Action} from './action';

export interface Memo {
  user?: User;
  value?: string;
  action?: Action;
}
