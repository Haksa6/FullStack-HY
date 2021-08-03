import React from 'react'
import {
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ user }) => {

  return(
    <Table borderless size="sm">
      <thead>
        <tr>
          <th style={{ width: 200 }}><Link to={`users/${user.id}`}> {user.name}</Link></th>
          <th><b>blogs created</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td >{user.blogs.length}</td>
        </tr>
      </tbody>
    </Table>
  )
}
export default Users