import React from "react";

function QuestionItem({ question,questions, setQuestions, handlePatch }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r)=>r.json())
      .then(()=>{
        let updatedQuestion=questions.filter((question)=>question.id !==id)
      setQuestions(updatedQuestion)})
  }



  function handleAnswerChange(event){

    handlePatch(id,parseInt(event.target.value))

  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
