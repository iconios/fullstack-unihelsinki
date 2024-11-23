import Part from "./Part.jsx";

function Content({ parts }) {
    console.log('parts object is', parts);
    return (
      parts.map(part => (
      <Part key={part.id} name={part.name} exerciseNumber={part.exercises} /> 
      )
    )
  )    
}

export default Content