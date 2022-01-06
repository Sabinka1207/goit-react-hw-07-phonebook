import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Notiflix from "notiflix";
import shortid from "shortid";
import Loader from "react-loader-spinner";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import "./App.css";


import { getContacts, addContact, remove, add, search } from './slices/phoneBookSlice' 

const App = () => {
  const contacts = useSelector(state => state.contacts.contactsList)
  const filter = useSelector(state => state.contacts.filter)
  const loading = useSelector(state => state.contacts.loading)

  const dispatch = useDispatch()

  const addContactHandler = (name, number) => {
    console.log(name, number)
    const normalizedName = name.toLowerCase();
    const doubledNames = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedName)
    ).length;
    if (!doubledNames) {
      const contact = {
        createdAt: null,
        name: name,
        phone: number,
        id: shortid.generate()
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

  const deleteContact = (contactId) => {
    dispatch(remove(contactId))
  };

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])

  console.log(contacts)

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // }, [contacts]);

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
    
      {!loading &&  <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />}
    </div>
  );
};

export default App;
