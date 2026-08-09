import { useGood, useNeutral, useBad } from "../store"

const Statistics = () => {
  const good = useGood()
  const neutral = useNeutral()
  const bad = useBad()

  const all = good + neutral + bad
  const average = (good - bad) / all 
  const positive = good / all
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{ all > 0 && average}</td></tr>
          <tr><td>positive</td><td>{ all > 0 && positive*100+'%'}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
