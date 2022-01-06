import css from './ContactList.module.css';
import PropTypes from 'prop-types'

function ContactList({ contacts, onDeleteContact }) {

    return (
        <ul className={ css.allContacts}>
            {contacts.map(contact => (
                <li key={contact.id} className={css.contact}>
                    <span>{contact.name}: {contact.phone}</span>
                    <button className={css.delete} type="button" onClick={()=> onDeleteContact(contact.id)}>Delete</button>
                </li>))}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        createdAt: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ContactList
