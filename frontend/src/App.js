import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Question from './components/Question'
import Results from './components/Results'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [answers, setAnswers] = useState([])
  const [time, setTime] = useState({ complete: false })

  const answer = (answer) => {
    setAnswers([...answers, answer])
  }

  const endTimer = (endDate) => {
    setTime({
      ...time,
      complete: true,
      endDate: endDate,
      time: endDate - time.startDate,
    })
  }

  const start = async () => {
    const { data } = await axios.get(
      'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
    )
    setTime({ startDate: new Date(), complete: false })
    setCurrentQuestion({})
    setQuestions(data.results)
  }

  const retry = () => {
    setTime({ startDate: new Date(), complete: false })
    setCurrentQuestion({})
    setAnswers([])
  }

  const nextQuestion = () => {
    if (questions.length > 0 && answers.length < questions.length) {
      let next = {}
      if (currentQuestion.index >= 0) {
        next = questions[currentQuestion.index + 1]
        next.index = currentQuestion.index + 1
      } else {
        next = questions[0]
        next.index = 0
      }
      setCurrentQuestion(next)
    }
  }

  useEffect(() => {
    if (answers.length > 0 && answers.length === questions.length) {
      endTimer(new Date())
    } else {
      nextQuestion()
    }
  }, [answers])

  useEffect(() => {
    setAnswers([])
  }, [questions])

  return (
    <div className='App'>
      <header className='App-header'>
        {!time.complete && questions.length === 0 && (
          <>
            <h1>My Quiz</h1>
            <button onClick={start}>Start</button>
          </>
        )}
        {!time.complete && currentQuestion.index >= 0 && (
          <Question
            question={currentQuestion}
            answer={answer}
            quizlength={questions.length}
          />
        )}
        {time.complete && (
          <Results
            answers={answers}
            time={time}
            questions={questions}
            retry={retry}
            start={start}
          />
        )}
      </header>
    </div>
  )
}

export default App
