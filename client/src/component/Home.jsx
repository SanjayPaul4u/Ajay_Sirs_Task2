import React from 'react'
import AddNote from './AddNote'
import Note from './Note'




const Home = () => {
  return (

    <section className='container'>
      <h1>To Do Application</h1>
      <br />
      <br />
     <AddNote/>
     <hr />
     <Note/>
    </section>
  )
}

export default Home