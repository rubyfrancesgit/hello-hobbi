//  not currently in use

import React from 'react'

function AvailableHobbiesList({ availableHobbies }) {
    return (
        




        <ul>
            {availableHobbies.map((availableHobbi) => (
                <li key={availableHobbi.id}>
                <p>{availableHobbi.sessionName}</p>
                <p>${availableHobbi.sessionPrice}</p>
                </li>
            ))}
        </ul>
    )
}

export default AvailableHobbiesList
