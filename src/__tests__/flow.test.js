// @flow
import { loader, gql } from '../index';

// $FlowFixMe number [1] is incompatible with  string
export const loaderWithNumber = loader(3);
export const loaderWithString = loader('./fixtures/query3.graphql');

export const PostFragment = gql`
  fragment Post on PostType {
    title
    date
  }
`;
export const queryWithFragment = gql`
  query User {
    posts(id: 5) {
      lastName
      ...PostFragment
    }
  }
  ${PostFragment}
`;
export const queryWithoutFragment = gql`
  query User {
    posts(id: 5) {
      lastName
    }
  }
`;
