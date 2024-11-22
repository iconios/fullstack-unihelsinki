import { useState } from "react";
import Button from "./Button";

function App() {
  
  const anecdotes = [
    {id:0, anecdote:'If it hurts, do it more often.', vote: 0},
    {id:1, anecdote:'Adding manpower to a late software project makes it later!', vote:0},
    {id:2, anecdote:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote:0},
    {id:3, anecdote:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote:0},
    {id:4, anecdote:'Premature optimization is the root of all evil.', vote:0},
   {id:5, anecdote:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote:0},
    {id:6, anecdote:'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote:0},
    {id:7, anecdote:'The only way to go fast, is to go well.', vote:0}
  ]

  const [selected, setSelected] = useState(0);
  const [anecdoteData, setAnecdoteData] = useState(anecdotes);
  

  function handleNextClick() {
    setSelected(Math.floor(Math.random() * 8));
  }  

  function handleVoteClick() {
    const nextVote = anecdoteData.map(data => {
      console.log(`data ID: ${data.id}`)
      console.log(`selected ID: ${selected}`)
      if (data.id === selected) {
        return {
          ...data,
          vote: data.vote + 1,
        };
      }
      else return data;
    })
    setAnecdoteData(nextVote);
  }

  let justVotes = anecdoteData.map((
    {vote}) => ({vote}));
  console.log(justVotes);

  let maxVote = Math.max(...justVotes.map(obj => obj.vote));;
  console.log(`Max votes: ${maxVote}`);
  
  let maxVoteIndex = justVotes.findIndex(aVote => aVote.vote === maxVote);
  console.log(`Index of anecdote with max votes: ${maxVoteIndex}`);
  
  return (
    <>
      <h1>Anecdote of the Day</h1>
      <p>{anecdoteData[selected].anecdote}</p>
      <p>has votes {anecdoteData[selected].vote}</p>
      <Button text="Vote" onClick={handleVoteClick} />
      <Button text="Next Anecdote" onClick={handleNextClick} />
      <br/>
      <h2>Anecdote with Most Votes</h2>
      <p>{anecdoteData[maxVoteIndex].anecdote}</p>
      <p>has votes {anecdoteData[maxVoteIndex].vote}</p>
    </>
  )
}

export default App
