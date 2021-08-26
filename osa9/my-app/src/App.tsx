import React from 'react';
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionBase {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;




const Header = ({name}: {name: string}) => {
  return(
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({courseParts}: {courseParts:CoursePart[]}) => {
  return(
    <div>
      {courseParts.map((p) => ( 
      <Part key={p.name} coursePart={p}/>))}
    </div>
  )
}


const Part = ({coursePart}: {coursePart:CoursePart}) => {
    switch(coursePart.type){
      case "normal":
        return(
          <div>
            <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
            <div><i>{coursePart.description}</i></div>
          </div>
        );
        break;
      case "groupProject":
        return(
          <div>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
            <div>project exercises {coursePart.groupProjectCount}</div>
          </div>
        );
        break;
      case "submission":
        return(
          <div>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
            <i>{coursePart.description}</i>
            <p>submit to {coursePart.exerciseSubmissionLink}</p>
          </div>
        );
        break;
      case "special":
        return(
          <div>
            <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
            <i>{coursePart.description}</i>
            <p>required skills: {coursePart.requirements.map((s) => s)}</p>
          </div>
        );
        break;
      default:
        return null;
    }
}

const Total = ({courseParts}: {courseParts:CoursePart[]}) => {
  return(
    <div>
      <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    </div>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
const coursePart: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
  ]
  
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={coursePart} />
      <Total courseParts={coursePart} />
    </div>
  );
};

export default App;