import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NewQuestion } from './queries';

function NewQuestions() {
  const [addQuestion, { loading }] = useMutation(NewQuestion);

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([{ title: '' }, { title: '' }]);

  const handleChangeOption = ({ target }) => {
    const newArr = options;
    newArr[target.id].title = target.value;
    setOptions([...newArr]);
  };

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== '');
    if (title === '' || filledOptions.length < 2) return false;

    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });
  };

  return (
    <div>
      <h2>Question:</h2>
      <input disabled={loading} placeholder="Type your question..." value={title} onChange={({ target }) => setTitle(target.value)} />
      <h2>Options:</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input disabled={loading} placeholder="Type a option..." id={index} value={option.title} onChange={handleChangeOption} />
        </div>
      ))}
      <button disabled={loading} onClick={() => setOptions([...options, { title: '' }])}>
        New Option
      </button>
      <button disabled={loading} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default NewQuestions;
