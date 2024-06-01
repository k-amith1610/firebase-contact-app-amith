import React from 'react'

const NotFoundContact = () => {
    return (
        <div className="flex justify-center items-center h-[70vh] gap-4">
            <div>
                <img src="/assets/contact.png" alt="" />
            </div>
            <h3 className="text-white text-2xl font-semibold">No Contacts Added</h3>
        </div>
    )
}

export default NotFoundContact
