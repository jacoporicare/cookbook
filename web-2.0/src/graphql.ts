import assert from 'node:assert/strict';

import { GraphQLClient } from 'graphql-request';

assert(process.env.NEXT_PUBLIC_API_URL, 'Env var NEXT_PUBLIC_API_URL is missing');

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL);
