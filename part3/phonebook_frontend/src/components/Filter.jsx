
const Filter = ({ search, searchChange }) => {
    return(
        <div>
            filter shown with <input value={search} onChange={searchChange}/>
        </div>
    )
}

export default Filter