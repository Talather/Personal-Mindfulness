import { Button, Progress, Radio, RadioGroup } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "./quiz.module.css"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import "./slideComponent.css"
import { AnimatePresence } from "framer-motion"
import { createResponses, createSubmittedQuiz, getQuiz } from "../../firebase"
import { useSearchParams } from "react-router-dom"

export default function QuizComponent() {
  const [completed, setCompleted] = useState(false)
  const {
    control,
    formState: { isSubmitting },
    getValues,
    handleSubmit,
    // getValues,
    // handleSubmit,
    // setValue,
  } = useForm({ mode: "onChange" })

  const [progress, setProgress] = useState(0)
  const [state, setState] = useState({})
  const [quiz, setQuiz] = useState()
  const [questions, setQuestions] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState(0)
  const video = searchParams.get("video")
  const user = searchParams.get("user")

  // Fetch quiz data
  useEffect(() => {
    const fetchData = async () => {
      // try {

      setLoading(true)
      const response = await getQuiz(video)

      setQuestions(response.quiz[0].questions)
      setQuiz(response.quiz[0].id)
      setLoading(false)

      // } catch (error) {

      //   console.error("Error fetching quiz data:", error)
      // }
    }
    fetchData()
  }, [])

  //   [
  //   {
  //     id: 1,
  //     name: "What is the largest country in the world by land area?",
  //     answers: [
  //       { id: "1", name: "China" },
  //       { id: "2", name: "Russia" },
  //       { id: "3", name: "Pakistan" },
  //       { id: "4", name: "USA" },
  //     ],
  //     correctAnswerId: "2",
  //   },
  //   {
  //     id: 2,
  //     name: "Who painted the Mona Lisa?",
  //     answers: [
  //       { id: "1", name: " Pablo Picasso" },
  //       { id: "2", name: "Vincent van Gogh" },
  //       { id: "3", name: "Leonardo da Vinci" },
  //       { id: "4", name: " Michelangelo" },
  //     ],
  //     correctAnswerId: "3",
  //   },
  //   {
  //     id: 3,
  //     name: "Which planet is known as the Red Planet?",
  //     answers: [
  //       { id: "1", name: "Earth" },
  //       { id: "2", name: "Mars" },
  //       { id: "3", name: "Venus" },
  //       { id: "4", name: "Jupiter" },
  //     ],
  //     correctAnswerId: "2",
  //   },
  // ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctAnswerScore, setCorrectAnswerScore] = useState(0)

  const handleNext = () => {
   
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  // const handleSkip = () => {
  //   setCurrentIndex((currentIndex + 1) % questions.length)
  // }

  async function evaluateQuiz(formData) {
    console.log("zalalat",questions[0])
    let correctAnswers = 0
    const responseCreates = []
    const k = Object.keys(formData)

    for (const key in k) {
      if (formData[k[key]] === questions[key].correctAnswer) {
        correctAnswers = correctAnswers + 1
      }
      responseCreates.push({ answer: formData[k[key]], user: user, quiz: quiz })
    }
     await createSubmittedQuiz({ quiz: quiz, user: user })
    

   await createResponses(responseCreates)
    
    return correctAnswers
  }

  const onSubmit = async (formData) => {
    const correctAnswerScore = await evaluateQuiz(formData)

    setCorrectAnswerScore(correctAnswerScore)
    setState({})
    setCompleted(true)

    // const response = await createCompletedSurvey({}, formData)
    setState({ success: true })
  }

  const updateProgress = () => {
    const values = Object.values(getValues())

    const completedAnswers = values.filter((v) => v)
    setSelectedAnswers(completedAnswers.length)
    setProgress((completedAnswers.length / questions.length) * 100)
  }

  useEffect(() => {
    updateProgress()
  }, [currentIndex])

  // useEffect(() => {
  //   if (state.success) {
  //     setCompleted(true)
  //   }
  // }, [state])







  const handleKeyPress = (event) => {
    
    
    if (event.key === "Enter")
    {
      console.log("bihari vajpai")
      event.preventDefault()
      handleNext() // Trigger next question on Enter
    }
  }

  
  useEffect(() => {
    // Add the event listener
    
    window.addEventListener("keydown", handleKeyPress)
 
    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])




  const removeFocus = () => {
    // Get the currently focused element
    const activeElement = document.activeElement

    // Check if it's a radio button and remove focus
    if (activeElement && activeElement.type === "radio") {
      activeElement.blur() // Remove focus from the radio button
    }
  }

  return (
    <AnimatePresence>
      {questions.length && !completed && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.audit}>
            <div className={styles.topBar}>
              {/* <img
                alt="Inspire Logo"
                height={74}
                src="/logo-green.png"
                width={130}
              /> */}
              <p className={styles.title}>Quiz Derived From Video</p>
            </div>

            <div className={styles.content}>
              <div className={`${styles.contentInner}`}>
                <div className="slider-container">
                  <TransitionGroup component={null}>
                    <CSSTransition
                      key={currentIndex}
                      timeout={900}
                      classNames="slide-next"
                    >
                      <div
                        className={`${styles.question} border border-black p-4`}
                        key={questions[currentIndex].id}
                      >
                        <Controller
                          control={control}
                          name={`answer${questions[currentIndex].id}`}
                          defaultValue={getValues(
                            `answer${questions[currentIndex].id}`
                          )}
                          render={({ field: { onChange, value } }) => (
                            <RadioGroup
                              label={
                                <p>
                                  Q{currentIndex + 1}:{" "}
                                  {questions[currentIndex].name}
                                </p>
                              }
                              // onChange={onChange}
                              onChange={(val) => {
                                onChange(val)
                                // setValue(
                                //   `answer${questions[currentIndex].id}`,
                                //   val
                                // )
                                updateProgress();
                                removeFocus();
                              }}
                              value={value}
                              
                            >
                              {questions[currentIndex].answers.map((answer) => (
                                <Radio
                                  onClick={() => {
                                    currentIndex + 1 === questions.length
                                      ? setProgress(100)
                                      : null
                                    
                                  }}
                                  key={answer.id}
                                  value={answer.id}
                                >
                                  {answer.name}
                                </Radio>
                              ))}
                            </RadioGroup>
                          )}
                          rules={{ required: true }}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>

                <div className={`${styles.buttons} `}>
                  <Button
                    color="primary"
                    className="w-full"
                    // isLoading={isSubmitting}
                    // type="submit"
                    onClick={() => {
                      handlePrevious()
                    }}
                  >
                    Previous
                  </Button>
                  {currentIndex === questions.length - 1 &&
                  selectedAnswers === questions.length ? (
                    <Button
                      color="primary"
                      className="w-full"
                      isLoading={isSubmitting}
                      // isDisabled={currentIndex === questions.length - 1}
                      type={"Submit"}
                      // onClick={() => {
                      //   handleNext()
                      // }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      className="w-full"
                      // isLoading={isSubmitting}
                      // isDisabled={currentIndex === questions.length - 1}
                      
                      onClick={() => {
                        handleNext()
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              {state.error && <div className="error">{state.error}</div>}
              <div className={styles.footerInner}>
                {/* <Button
                  color="primary"
                  isDisabled={currentIndex + 1 != questions.length}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button> */}
                <div className={styles.progress}>
                  <Progress
                    aria-label="Survey Progress"
                    color="primary"
                    value={progress}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {completed && (
        <div className={styles.completed}>
          <div className={""} style={{ marginBottom: "6px" }}>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9mGX9W3pxxwM5WOzVGvBVZ_UrFagSFPbmQ&s"
              }
              width={100}
            ></img>
          </div>

          <h1>Quiz Completed!</h1>
          <p>Thank you for your reflection.</p>
          <p>
            Your quiz score is around {correctAnswerScore}/{questions.length}
          </p>
          {/* <h1 className={styles.completedFooter}>Your INSPIRE® Team</h1> */}
        </div>
      )}
      {loading ? <div className="spinner"></div> : null}
    </AnimatePresence>
  )
}
