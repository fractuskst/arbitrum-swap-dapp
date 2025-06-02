import { Squid } from '@0xsquid/sdk';
import { INTEGRATOR_ID } from '../constants';

export const squid = new Squid({
  baseUrl: 'https://v2.api.squidrouter.com',
  integratorId: INTEGRATOR_ID,
});
