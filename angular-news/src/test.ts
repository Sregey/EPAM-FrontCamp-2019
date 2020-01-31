// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// import { ReportportalAgent } from 'agent-js-jasmine';
// const Jasmine = require('jasmine');

declare const require: any;

// const agent = new ReportportalAgent({
//     // client settings
//     token: '1ac23b16-6fe0-4650-b5b2-31c35e926857',
//     endpoint: 'https://rp.epam.com/api/v1',
//     launch: 'siarhei_pashkouski_TEST_EXAMPLE',
//     project: 'siarhei_pashkouski_personal',
//     // agent settings
//     attachPicturesToLogs: true,
// });

// const jasmine = new Jasmine();
// jasmine.addReporter(agent.getJasmineReporter());

// agent.getExitPromise().then(() => {
//   console.log('Reportportal finish work');
// });

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
