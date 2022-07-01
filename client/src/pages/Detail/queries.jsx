import { gql } from '@apollo/client';

export const getDetailSubs = gql`
  subscription getQuestion($id: Int!) {
    questions_by_pk(id: $id) {
      id
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const newVote = gql`
  mutation newVote($id: Int!) {
    insert_votes_one(object: { option_id: $id }) {
      id
    }
  }
`;
