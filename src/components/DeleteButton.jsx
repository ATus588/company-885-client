import React from 'react'
import { useMutation, gql } from '@apollo/client'

const ADMIN_DELETE = gql``
const NEWS_DELETE = gql``

function DeleteButton({ id, page }) {


    return (
        <div>DeleteButton</div>
    )
}

export default DeleteButton

function getMutation(page) {
    switch (page) {
        case 'admin':
            return ADMIN_DELETE
        case 'news':
            return NEWS_DELETE

    }
}