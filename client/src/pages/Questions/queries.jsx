import { gql } from '@apollo/client';

export const QuestionsSubs = gql`
  subscription getQuestions {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`;
