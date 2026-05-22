const CountryList = ({ searchedCountries, search, setSearch }) => {
    if (searchedCountries.length > 10) return (<p>too many matches...</p>)

    else if (searchedCountries.length > 1 && searchedCountries.length <= 10) {
        const countriesToShow = searchedCountries.map(c => <p key={c.name.common}>{c.name.common}<button onClick={() => setSearch(c.name.common)}>Show</button></p>)
        
        return(
            <div>
                {countriesToShow}
            </div>
        )
    }
}

export default CountryList