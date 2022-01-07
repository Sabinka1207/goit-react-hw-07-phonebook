import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Notiflix from "notiflix";
// import shortid from "shortid";
import Loader from "react-loader-spinner";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import "./App.css";


import { getContacts, addContact, deleteContact, search } from './slices/phoneBookSlice' 

const App = () => {
  const contacts = useSelector(state => state.contacts.contactsList)
  const filter = useSelector(state => state.contacts.filter)
  const loading = useSelector(state => state.contacts.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])

  console.log(contacts)

  const addContactHandler = (name, number) => {
    console.log(name, number)
    const normalizedName = name.toLowerCase();
    const doubledNames = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedName)
    ).length;
    if (!doubledNames) {
      const contact = {
        // createdAt: "ksjvbsd",
        name: name,
        phone: number,
        // id: '1'
      };
      dispatch(addContact(contact))
    } else {
      Notiflix.Report.warning(
        "Warning",
        `${name} is already in contacts`,
        "OK"
      );
    }
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId))
  };

  const changeFilter = (e) => {
    dispatch(search(e.currentTarget.value))
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactHandler} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilter} value={filter} />
      {loading && <Loader type="MutatingDots" color="#91FCA8 " secondaryColor="#FF9F9F" height={100} width={100}/>}
      {!loading &&  <ContactList contacts={visibleContacts} onDeleteContact={deleteContactHandler} />}
    </div>
  );
};

export default App;
