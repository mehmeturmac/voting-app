import { gql } from '@apollo/client';

export const NewQuestion = gql`
  mutation newQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      id
      title
      options {
        title
      }
    }
  }
`;
