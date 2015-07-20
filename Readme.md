## Installation

```
$ npm install mango
```

## Usage

### Import the library and set your secret API key:
```
var mango = require('mango')({ 'api_key': 'your Mango secret API key'});
```

### Create a charge
In order to create a Charge, you must call the `create()` method with [the required arguments](https://developers.getmango.com/en/api/charges/?platform=node#arguments).

```
mango.Charges.create({
  'token': 'token_mwhushs06o62aruq9n3pmvu7f0ia696y',
  'amount': 2000,
  'email': 'test@example.org'
}, function(err, charge) {
  console.log(charge);
});
```

### Get single charge
When you have a charge `uid`, you can get a full detail using the `get()` method:
```
mango.Charges.get('charge_1234123141231', function(err, charge) {
  console.log(charge);
});
```

You can also work with all the other resources authenticated with a secret API Key:
- [Charges](https://developers.getmango.com/en/api/charges/?platform=node)
- [Refunds](https://developers.getmango.com/en/api/refunds/?platform=node)
- [Customers](https://developers.getmango.com/en/api/customers/?platform=node)
- [Cards](https://developers.getmango.com/en/api/cards/?platform=node)
- [Queue](https://developers.getmango.com/en/api/queue/?platform=node)
- [Installments](https://developers.getmango.com/en/api/installments/?platform=node)
- [Promotions](https://developers.getmango.com/en/api/promotions/?platform=node)
- [Coupons](https://developers.getmango.com/en/api/coupons/?platform=node)

## Tests

Install the module along with the dev dependencies.
```
$ git clone git://github.com/mango/mango-node.git
$ cd mango-node
$ npm install
```

To run the tests you'll need Mango API keys (mode Sandbox):
```
export MANGO_SECRET_TEST_KEY='your secret test API key'
export MANGO_PUBLIC_TEST_KEY='your public test API Key'
```

### Run the tests
```
$ npm test
```

### Run code coverage
```
$ npm run coverage
```

## License
Licensed under the MIT license.

Copyright (c) 2014 Mango.
