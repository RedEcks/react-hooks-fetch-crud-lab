import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {

  const [questions, setQuestions]= useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
      .then((res)=>res.json())
      .then((data)=>setQuestions(data))
    })

    function handlePatch(id,correctIndex){
      
      fetch(`http://localhost:4000/questions/${id}`,{
        method: "PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({correctIndex})
        
      })  
      .then((r)=>r.json())
      .then((data)=>{
        const matchQuestion= questions.map((question)=>{
          if(data.id===question.id){
              return (data)
          }
          return question
        })
        setQuestions(matchQuestion)
      })
    }
  
    
    let questionItem=questions.map((question)=><QuestionItem key={question.id} question={question} setQuestions={setQuestions} questions={questions} handlePatch={handlePatch}/>)



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;
