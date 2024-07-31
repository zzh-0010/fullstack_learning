import { useState, useEffect } from 'react'
import axios from 'axios'
import nameService from './services/names'

//原来是我一开始理解错了吗？APP里始终维护所有的事件处理程序！
//那么这样的话事情看起来简单了很多

const Filter = ({filterName, handleFilterChange}) => {
  return (
    <div>
      <form>
      <div>
        filter show with<input 
        value={filterName}
        onChange={handleFilterChange}
      />
      </div>
      </form>
    </div>
  )
}

const PersonForm = ( {addNote, newName, handleNameChange, newNumber, handleNumberChange} ) => {
  return( 
    <div>
      <form onSubmit={addNote}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
          <br />
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ( {numberToShow, persons, setPersons} ) => {
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log( `deleting person...${id}`)
    //你写到了删除操作这里，服务器已经删除了，APP界面如何更新呢？
    const restName = persons.map(person => {
      if (person.id !== id) {
        return person
      }
    }).filter(person => person !== undefined)

    nameService.deleteName(id)
      .then(initialName => {
        console.log(initialName)
        setPersons(restName)
      })
    }
    else {
      console.log('not deleting...')
    }
  }

  return (
    <div>
      {numberToShow.map(person => {
        return (
          <div key={person.id}>{person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          <br/>
          </div>
        )}
      )}
    </div>
  )
}

const Notification = ( {message, ifError} ) => {
  if (message === null) {
    return null
  }
  else if (ifError === true){
    return (
      <div className='fail'>
        {message}
      </div>
    )
  }
  else {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState(null)
  const [ifError, setIfError] = useState(false)

  useEffect(() => {
    console.log('effect')
    nameService
      .getAll()
      .then(initialName => {
        console.log('promis fulfilled')
        setPersons(initialName)
      })
  },[])

  console.log('render', persons.length, 'persons')

  const handleNameChange  = (event) => {  //记录表单输入的change
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //现在注册一个电话号码的处理程序吧！
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const exist = (person) =>
      person.name === newName
    if (persons.some(exist)) {
      if(window.confirm(`${newName} is already added to phonebook! You wanna replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        console.log('changedPersons: ',changedPerson)
        nameService.update(person.id, changedPerson)
        .then(initialName => {
          console.log('initialName',initialName)
          setPersons(persons.map(temperson => temperson.id !== person.id ? temperson : initialName))
        }
        )
        .catch(error => {
          setIfError(true)
          setMessage(`Error! ${newName} has already been deleted`)
          setPersons(persons.filter(temperson => temperson.id !== person.id))
        })
        console.log('person:', persons)
      }
      setNewName('')
      setNewNumber('')
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      nameService
        .creat(nameObject)
        .then(initialName => {
          setPersons(persons.concat(initialName))
          setNewName('')
          setNewNumber('')
        })
      console.log('Clicked...', event.target)
    }
    //添加or更新完成
    setIfError(false)
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    },4000)
  }

  //现在来实现过滤功能吧！
  //新增一个numberToShow
  const [showFilter, setShowFilter] = useState(false)
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
    if (filterName === '') {
      setShowFilter(false)
    }
    else{
      setShowFilter(true)
    }
  }
  const numberToShow = showFilter ? persons.filter(person => 
    person.name.toLowerCase().includes(filterName)
  ) : persons
  console.log('numberto show: ', numberToShow)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} ifError={ifError}/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addNote={addNote} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons numberToShow={numberToShow} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App