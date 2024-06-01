import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclouser from '../hooks/useDisclouser'
import { toast } from 'react-toastify'

const ContactCard = ({ contact }) => {


    const {isOpen, onClose, onOpen} = useDisclouser();


    const deletedContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Contact Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div key={contact.id} className="flex items-center bg-yellow justify-between p-2 rounded-lg">
                <div className="flex gap-1">
                    <HiOutlineUserCircle className="text-5xl text-orange" />
                    <div className="">
                        <h2 className="font-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex pr-4 text-3xl">
                    <RiEditCircleLine onClick={onOpen} className="text-green-500 cursor-pointer hover:text-blue-600" />
                    <IoMdTrash onClick={() => deletedContact(contact.id)} className="text-orange cursor-pointer hover:text-red-600 ml-3" />
                </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ContactCard
