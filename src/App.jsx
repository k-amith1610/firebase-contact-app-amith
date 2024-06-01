import Nav from "./components/Nav"
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouser from "./hooks/useDisclouser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {

  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouser();



  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          // console.log(contactLists);
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();

  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    // const contactsSnapshot = await getDocs(contactsRef);
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });

      const filteredContacts = contactLists.filter(contact => 
        contact.name.toLowerCase().includes(value.toLowerCase())
      )
      // console.log(contactLists);
      setContacts(filteredContacts);
      return filteredContacts;
    });

  }


  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Nav />
        <div className="flex">
          <div className="relative flex flex-grow items-center ">
            <FiSearch className="ml-1 absolute text-white text-3xl" />
            <input type="text" onChange={filterContacts} className="text-white flex-grow h-12 rounded-md border border-white bg-transparent pl-10 text-xl" />
            <AiFillPlusCircle onClick={onOpen} className="text-6xl cursor-pointer text-white pl-3 hover:text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {contacts.length <= 0? <NotFoundContact /> : contacts.map((contact) => {
            return (
              <ContactCard key={contact.id} contact={contact} />
            )
          })}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App