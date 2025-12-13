const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <div>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {all} <br />
        average {average} <br />
        positive {positive} %
    </div>
  )
}

export default Statistics