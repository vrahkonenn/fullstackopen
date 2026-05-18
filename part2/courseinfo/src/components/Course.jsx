const Header = ({ course }) => {
    return(
      <div>
        <h2>{course}</h2>
      </div>
    )
  }
const Contents = ({ parts }) => {
  return(
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}
const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const totalExercises = exercises.reduce((partialSum, a) => partialSum + a, 0)
  return(
    <div>
      <b><p>total of exercises {totalExercises}</p></b>
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return(
    <div>
      <p>{part} {exercises}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course.name}/>
      <Contents parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
export default Course