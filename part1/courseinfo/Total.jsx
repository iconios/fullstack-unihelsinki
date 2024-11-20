function Total({ total }) {
    const totalItems = total.length;
    let totalValue = 0;
    for (let index = 0; index < totalItems; index++) {
        totalValue += total[index]
    }

    return (
        <p>Number of exercises {totalValue}</p>
    );
}

export default Total