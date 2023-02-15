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

function UtilButton({ id, func, name, text }) {

  const navigate = useNavigate();
  let MUTATION;
  if (func === 'pass-user') {
    MUTATION = PASS_USERS
  }
  if (func === 'delete-user') {
    MUTATION = DELETE_USERS
  }

  const [onclick, { data, loading }] = useMutation(MUTATION, {
    update(_, result) {
      navigate(0)
    },
    variables: { id: id }
  })

  function OnClick() {
    onclick();
  }

  return (
    <button className={`util-button-${name}`} onClick={OnClick} > {text}</button >
  )
}

export default UtilButton
