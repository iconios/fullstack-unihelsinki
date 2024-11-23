function Part({name, exerciseNumber}) {
    console.log(`Part name ${name} with exercises ${exerciseNumber}`);
    return (
        <p>{name} {exerciseNumber}</p>
    );
}

export default Part