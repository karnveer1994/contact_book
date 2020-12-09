import React, { useState } from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";
import "./ContactList.scss";
import SearchBox from "../SeachBox/SearchBox";

const ContactList = props => {
  const [contacts, setContacts] = useState(props.contacts);
  const { selectContact } = props;
  const searchFields = ["name", "address", "postalCode", "city"];
  const storeFields = ["id", "name", "address", "postalCode", "city"];

  return (
    <div>
      <SearchBox
        primaryField="name"
        storeFields={storeFields}
        fields={searchFields}
        data={props.contacts}
        setData={setContacts}
        placeholder="Search contacts by name, address, city or postal code"
      />
      <ul className="ContactList">
        {sortBy(contacts, contact => contact.name).map(contact => (
          <Contact
            key={contact.id}
            {...contact}
            onClick={() => selectContact(contact)}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectContact: PropTypes.func.isRequired,
};

const Contact = ({ name, address, postalCode, city, onClick }) => (
  <li onClick={onClick}>
    <b>{name}</b>
    <span>
      {address}, {postalCode}, {city}
    </span>
  </li>
);

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactList;
export { Contact };
