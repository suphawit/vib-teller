// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    domainHardware: "http://localhost:5000/",
    // domainHardware: "http://10.195.65.78:5000/",
    // domainHardware: "http://192.168.2.19:5000/",
    domainImageOutput: "http://localhost:3500/",
    // domainAPI: "http://10.201.113.26:3000/api/",
    domainAPI: "VIB/",
    // machineID: "A001",
    // socketTellerAbsorption: "https://10.201.113.26:3005?machine_id=",
    //socketTellerAbsorption: "https://10.202.104.236:3005?machine_id=",
    socketTellerAbsorption: "http://localhost:5800?machine_id=",
    domainVIB: "http://localhost:5200/",
    requestTimeout: 120000,
    idleTimeout: 320, // Sec

};
