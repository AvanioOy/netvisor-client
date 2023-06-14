# Netvisor Client for typescript / javascript
This is a library for interacting with Netvisor API. It is currently being developed and all api calls haven't been added

## Installation
`npm i @avanio/netvisor-client`


## Usage
Required env variables if `EnvironmentConfigProvider` is used(You can also pass these directly to ApiProvider):
```
NETVISOR_CLIENT = 'userchosenname'
NETVISOR_ENV = 'isv'
NETVISOR_USER_KEY = 'keyfromnetvisor'
NETVISOR_PARTNER_KEY = 'partkeyfromemail'
NETVISOR_LANGUAGE = 'FI' // or EN
NETVISOR_ORGANISATION_ID = 'yourregistrationnumber'
NETVISOR_PRIVATE_KEY = 'privatekeyfromnetvisor'
NETVISOR_PARTNER_PRIVATE_KEY = 'partnerkeyfromemail'
```

```typescript
import {ApiProvider, resources, EnvironmentConfigProvider} from "@avanio/netvisor-client";

const conf = new EnviromentConfigProvider(); // remember to add all required fields to env if you use EnviromentConfigProvider
const api = new ApiProvider(conf);


const customerRoot = await resources.customer.getCustomerList(api); // request customer list

// print all customers
for(const customer of customerRoot.customers){
	console.log(customers); 
}
```