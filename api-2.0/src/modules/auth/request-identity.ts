import { RunContextVar } from '../../core/run-context/run-context-var';

import { Identity } from './domain/identity';

export const requestIdentity = new RunContextVar<Identity | null>('RequestIdentity', null);
