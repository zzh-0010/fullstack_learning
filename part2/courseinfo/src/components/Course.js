import React from 'react'

const Content = ( {course} ) => {
    const parts = course.parts
    const exercises = parts.map(parts => parts.exercises)
    console.log(exercises)
    const total = exercises.reduce(
      (s, p) => s + p,
    )
    return (
      <div>
        {parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )} 
        <b>total of {total} exercises</b>
      </div>
    )
  }
  
  const Header = ( {course} ) => {
    return (
      <h1>
        {course.name}
      </h1>
    )
  }
  
  const Course = ( {courses} ) => {
    return (
      <div>
        {
          courses.map(course => {
            return (
              <div key={course.id}><Header course={course} /><Content course={course} /></div>
            )
          }
          )
        }
      </div>
    )
  }

  export default Course