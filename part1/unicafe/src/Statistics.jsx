import StatisticLine from "./StatisticLine.jsx";

export default function Statistics({ good=0, neutral=0, bad=0 }) {
    let sum = good + neutral + bad;
    if (sum) {
        return (
            <>
                <h2>Statistics</h2>
                <table>
                    <tbody>
                        <StatisticLine text="Good" value={good} />
                        <StatisticLine text="Neutral" value={neutral} />
                        <StatisticLine text="Bad" value={bad} />
                        <tr>
                            <td>All</td>
                            <td>{sum}</td>
                        </tr>
                        <tr>
                            <td>Average</td>
                            <td>{(sum/3).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Positive</td>
                            <td>{((good/sum)*100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    return <p>No feedback given</p>

}