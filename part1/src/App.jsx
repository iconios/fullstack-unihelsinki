import Header from '../courseinfo/Header.jsx';
import Content from "../courseinfo/Content.jsx";
import Total from "../courseinfo/Total.jsx";

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id:0,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id:1,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id:2,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const parts = course.parts;
  const exercise = [ parts[0].exercises, parts[1].exercises, parts[2].exercises ]

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total total={exercise} />
    </div>
  )
}

export default App
