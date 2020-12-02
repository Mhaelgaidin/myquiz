import React, { useState, useEffect } from 'react'

const Question = ({ question, answer, quizlength }) => {
  const [options, setOptions] = useState([])

  //Fisher-Yates Shuffle
  const shuffle = (array) => {
    var m = array.length,
      t,
      i

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }

    return array
  }

  useEffect(() => {
    let options = shuffle([
      ...question.incorrect_answers,
      question.correct_answer,
    ])
    setOptions(options)
  }, [question])

  return (
    <section className='container'>
      <section className='question'>
        <h2>
          {question.index + 1}/{quizlength}. {question.question}{' '}
        </h2>
      </section>
      <section className='options'>
        {options.map((option, index) => (
          <div className='option' key={index} onClick={(e) => answer(option)}>
            <span>{option}</span>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Question
