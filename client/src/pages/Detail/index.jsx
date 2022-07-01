import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscription, useMutation } from '@apollo/client';
import { getDetailSubs, newVote } from './queries';

function Detail() {
  const { id } = useParams();

  const [selectedOptionId, setSelectedOptionId] = useState();
  const [isVoted, setIsVoted] = useState(false);

  const { loading, data } = useSubscription(getDetailSubs, { variables: { id } });
  const [addVote, { loading: loadingVote }] = useMutation(newVote);

  const handleClickVote = () => {
    addVote({
      variables: {
        id: selectedOptionId,
      },
    });
    setIsVoted(true);
  };

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const {
    questions_by_pk: { options, title },
  } = data;

  const total = options.reduce((t, value) => t + value.votes_aggregate.aggregate.count, 0);

  return (
    <div>
      <h2>{title}</h2>
      {options.map((option, i) => (
        <div key={i}>
          <label htmlFor={i}>
            <input type="radio" name="selected" id={i} value={option.id} onChange={({ target }) => setSelectedOptionId(target.value)} />
            {option.title}
            {isVoted && <span className="vote_count">(%{((option.votes_aggregate.aggregate.count * 100) / (total === 0 ? 1 : total)).toFixed(2)})</span>}
          </label>
          {isVoted && (
            <div>
              <progress value={option.votes_aggregate.aggregate.count} max={total} />
            </div>
          )}
        </div>
      ))}
      {!isVoted && (
        <button disabled={loadingVote} onClick={handleClickVote}>
          Vote
        </button>
      )}
    </div>
  );
}

export default Detail;
