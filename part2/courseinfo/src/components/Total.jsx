function Total({ exercises }) {
    const exercisesArray = exercises.map(({exercises}) => ({exercises}));
    console.log('Array of Exercies', exercisesArray);

    //let total, num = 0;
    let exercisesTotal = exercisesArray.reduce((total, exercise) =>  total + exercise.exercises, 0,);
    console.log('Total exercises', exercisesTotal);

    return (
        <h4>Total of {exercisesTotal} exercises</h4>
    );
}

export default Total