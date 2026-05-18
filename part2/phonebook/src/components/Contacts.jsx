const Contacts = ({ persons, search }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    return(
        <div>
            <table>
                <tbody>
                    {personsToShow.map(person => <Contact key={person.name} person={person}/>)}
                </tbody>
            </table>
        </div>
    )
}

const Contact = ({ person }) => {
    return(
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

export default Contacts