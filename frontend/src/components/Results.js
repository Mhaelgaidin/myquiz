import React, { useState, useEffect } from 'react'

const Results = ({ time, answers, questions, retry, start }) => {
  const [score, setScore] = useState(0)

  useEffect(() => {
    let total = 0
    questions.forEach((question, index) => {
      if (question.correct_answer === answers[index]) {
        total++
      }
    })
    setScore(total)
  }, [questions, answers])

  return (
    <section className='container'>
      <section className='heading'>
        <h2>{JSON.stringify(time.time)}</h2>
        <p>
          Score: {score}/{questions.length}
        </p>
        {score >= questions.length * 0.8 ? (
          <p style={{ color: 'green' }}>Pass</p>
        ) : (
          <>
            <p style={{ color: 'red' }}>Fail</p>{' '}
            <button onClick={retry}>Retry</button>
          </>
        )}
        <button onClick={start}>New Quiz</button>
      </section>
      <section className='results'>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              {index + 1}. {question.question}
            </p>
            <p
              style={{
                color:
                  question.correct_answer === answers[index] ? 'green' : 'red',
              }}
            >
              {answers[index]}
            </p>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Results
