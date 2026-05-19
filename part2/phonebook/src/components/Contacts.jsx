const Contacts = ({ persons, search, handleDelete }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    return(
        <div>
            <table>
                <tbody>
                    {personsToShow.map(person => <Contact key={person.name} person={person} handleDelete={handleDelete}/>)}
                </tbody>
            </table>
        </div>
    )
}

const Contact = ({ person, handleDelete }) => {
    return(
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={() => handleDelete(person.id)}>Delete</button></td>
        </tr>
    )
}

export default Contacts