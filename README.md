# Netvisor Client for typescript / javascript
This is a library for interacting with Netvisor API. It is currently being developed and all api calls haven't been added

## Installation
TODO

## Usage
```typescript
import {ApiProvider, resources, EnvironmentConfigProvider} from "netvisor-client-node";

const conf = new EnviromentConfigProvider(); // remember to add all required fields to env if you use EnviromentConfigProvider
const api = new ApiProvider(conf);


const customerRoot = await resources.customer.getCustomerList(api); // request customer list

// print all customers
for(const customer of customerRoot.customers){
	console.log(customers); 
}
```