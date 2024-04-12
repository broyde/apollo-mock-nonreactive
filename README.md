# apollo-mock-nonreactive
Example to show apollo client's `MockLink` incorrect work with queries with `@nonreactive` directive.

`normal.test.js` - simle test which creates mock and performs the `client.query(...)` to get mocked result.
`nonreactive.test.js` - the same as `normal.test.js`, but with `@nonreactive` direcive used in `TestQuery`.

## How to run
1. Clone this repo.
2. `yarn install`
3. `yarn test`

## Actual result:
```
 FAIL  ./nonreactive.test.js
  ● Console

    console.warn
      No more mocked responses for the query: query TestQuery {
        photos {
          id
          url
          __typename
        }
      }
      Expected variables: {}

      This typically indicates a configuration error in your mocks setup, usually due to a typo or mismatched variable.

      31 |
      32 | it('Should load mocked query result', async () => {
    > 33 |   const {data} = await client.query({query});
         |                               ^
      34 |   expect(data.photos).toEqual(photos);
      35 | });
      36 |

      at MockLink.Object.<anonymous>.MockLink.request (node_modules/@apollo/client/testing/core/mocking/mockLink.js:74:25)
      at Object.<anonymous>.ApolloLink.execute (node_modules/@apollo/client/link/core/ApolloLink.js:47:22)
      at QueryManager.execute [as getObservableFromLink] (node_modules/@apollo/client/core/QueryManager.js:712:25)
      at QueryManager.Object.<anonymous>.QueryManager.getResultsFromLink (node_modules/@apollo/client/core/QueryManager.js:748:30)
      at resultsFromLink (node_modules/@apollo/client/core/QueryManager.js:1041:26)
      at QueryManager.Object.<anonymous>.QueryManager.fetchQueryByPolicy (node_modules/@apollo/client/core/QueryManager.js:1069:52)
      at fromVariables (node_modules/@apollo/client/core/QueryManager.js:811:41)
      at QueryManager.Object.<anonymous>.QueryManager.fetchConcastWithInfo (node_modules/@apollo/client/core/QueryManager.js:853:35)
      at QueryManager.Object.<anonymous>.QueryManager.fetchQuery (node_modules/@apollo/client/core/QueryManager.js:375:21)
      at QueryManager.Object.<anonymous>.QueryManager.query (node_modules/@apollo/client/core/QueryManager.js:469:21)
      at ApolloClient.Object.<anonymous>.ApolloClient.query (node_modules/@apollo/client/core/ApolloClient.js:232:34)
      at Object.query (nonreactive.test.js:33:31)

  ● Should load mocked query result

    ApolloError: No more mocked responses for the query: query TestQuery {
      photos {
        id
        url
        __typename
      }
    }
    Expected variables: {}

      at new ApolloError (node_modules/@apollo/client/errors/index.js:39:28)
      at node_modules/@apollo/client/core/QueryManager.js:777:71
      at both (node_modules/@apollo/client/utilities/observables/asyncMap.js:22:31)
      at node_modules/@apollo/client/utilities/observables/asyncMap.js:11:72
      at Object.then (node_modules/@apollo/client/utilities/observables/asyncMap.js:11:24)
      at Object.error (node_modules/@apollo/client/utilities/observables/asyncMap.js:24:49)
      at notifySubscription (node_modules/zen-observable/lib/Observable.js:140:18)
      at onNotify (node_modules/zen-observable/lib/Observable.js:179:3)
      at SubscriptionObserver.error (node_modules/zen-observable/lib/Observable.js:240:7)
      at node_modules/@apollo/client/utilities/observables/iteration.js:7:68
          at Array.forEach (<anonymous>)
      at iterateObserversSafely (node_modules/@apollo/client/utilities/observables/iteration.js:7:25)
      at Object.error (node_modules/@apollo/client/utilities/observables/Concast.js:76:21)
      at notifySubscription (node_modules/zen-observable/lib/Observable.js:140:18)
      at onNotify (node_modules/zen-observable/lib/Observable.js:179:3)
      at SubscriptionObserver.error (node_modules/zen-observable/lib/Observable.js:240:7)
      at MockLink.Object.<anonymous>.ApolloLink.onError (node_modules/@apollo/client/link/core/ApolloLink.js:82:22)
      at Timeout.<anonymous> (node_modules/@apollo/client/testing/core/mocking/mockLink.js:104:35)

 PASS  ./normal.test.js

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.435 s, estimated 1 s
```

## Expected result:
Both tests should pass.
