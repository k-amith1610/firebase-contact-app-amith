import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { db } from '../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {


    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact, id);
            toast.success("Contact Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="flex justify-center">
                    <h1 className="font-bold text-xl">Enter Contact Details</h1>
                </div>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={isUpdate ? {
                        name: contact.name,
                        email: contact.email,
                    }
                        : {
                            name: "",
                            email: "",
                        }}
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contact.id) : addContact(values);
                        onClose();
                    }}
                >
                    <Form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-semibold">Name:</label>
                            <Field name="name" className="border h-10 rounded-lg p-2 text-lg" />
                            <div className="text-red-500 text-xs font-medium">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email:</label>
                            <Field type="email" name="email" className="border h-10 rounded-lg p-2 text-lg" />
                            <div className="text-red-500 text-xs font-medium">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <button className="w-50 mt-4 bg-orange px-3 py-1.5 border rounded-lg hover:bg-green-600 hover:font-semibold hover:text-lg">
                            {isUpdate ? "Update" : "Add"} Contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddAndUpdateContact
