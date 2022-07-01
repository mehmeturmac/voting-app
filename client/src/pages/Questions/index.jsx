import React from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { QuestionsSubs } from './queries';

function Questions() {
  const { loading, data } = useSubscription(QuestionsSubs);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.questions.map((question) => (
        <div key={question.id}>
          <Link to={`/q/${question.id}`}>{question.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Questions;
