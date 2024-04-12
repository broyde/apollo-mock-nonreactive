const {ApolloClient, InMemoryCache, gql} = require('@apollo/client');
const {MockLink} = require('@apollo/client/testing');

const query = gql`
query TestQuery {
  photos {
    id
    url @nonreactive
  }
}
`;

const photos = [{id: 1, url: '/', __typename: 'Photo'}];

const link = new MockLink([
  {
    request: {
      query,
    },
    result: {
      data: {
        photos,
        __typename: 'Query',
      }
    }
  }
]);
const cache = new InMemoryCache();
const client = new ApolloClient({link, cache});


it('Should load mocked query result', async () => {
  const {data} = await client.query({query});
  expect(data.photos).toEqual(photos);
});
