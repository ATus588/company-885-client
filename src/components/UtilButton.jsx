import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const DELETE_ADMIN = gql`mutation MyMutation($id: Int!) {
  delete_admin_by_pk(id: $id) {
    id
  }
}
`
const DELETE_NEWS = gql`mutation MyMutation2($id: Int!) {
  delete_news_by_pk(id: $id) {
    id
  }
}
`
const DELETE_USERS = gql`mutation MyMutation($id: Int!) {
  delete_user_by_pk(id: $id) {
    id
  }
}
`
const PASS_USERS = gql`mutation MyMutation($id: Int!) {
  update_user_by_pk(pk_columns: {id: $id}, _set: {status: 1}) {
    id
  }
}
`

function UtilButton({ id, func, type, text }) {

  const navigate = useNavigate(0);
  const MUTATION = getMutation(func);

  const [resetPass, { data, loading }] = useMutation(MUTATION, {
    update(_, result) {
      navigate(0);
    },
    variables: { id: id }
  })

  return (
    <button className={`util-button-${type}`}>{text}</button>
  )
}

export default UtilButton

const getMutation = (func) => {
  switch (func) {
    case 'delete-admin':
      return DELETE_ADMIN;
    case 'delete-news':
      return DELETE_NEWS;
    case 'pass-user':
      return PASS_USERS;
    case 'delete-user':
      return DELETE_USERS;
  }
}