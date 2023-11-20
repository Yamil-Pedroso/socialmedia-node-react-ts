import { useState, useEffect, useRef } from 'react'
import {
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Box,
} from '@mui/material'
import { Search, Close } from '@mui/icons-material'
import FlexBetween from '../FlexBetween'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import styles from './styles'
import './style.css'
import axios from 'axios'
import UserImg from '../UserImg'

interface UserProps {
  firstName: string
  lastName: string
  occupation: string
  email: string
  picPath: string
}

interface BoxProps {
  active: boolean
}

const SearchFunc: React.FC<BoxProps> = ({ active }) => {
  const localhostProxy = 'http://localhost:3001/api/v1/users'
  const [findUser, setFindUser] = useState('')
  const myUser = useSelector((state: any) => state.user)
  const [users, setUsers] = useState<UserProps[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null)
  const [showBox, setShowBox] = useState(false)
  const friends = useSelector((state: any) => state.user.friends)
  console.log(friends.map((friend: any) => friend._id))
  console.log(selectedUser?.picPath)

  const theme = useTheme()
  const neutralLight = theme.palette.grey[200]

  useEffect(() => {
    axios
      .get(localhostProxy, {
        headers: {
          Authorization: `Bearer ${myUser.token}`,
        },
      })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => console.log(err))
  }, [myUser.token])

  useEffect(() => {
    const searchTerms = findUser.split(' ')

    const filtered = users.filter((u: any) => {
      const firstNameMatch = u.firstName
        .toLowerCase()
        .startsWith(searchTerms[0]?.toLowerCase() || '')
      const lastNameMatch =
        searchTerms.length > 1
          ? u.lastName
              .toLowerCase()
              .startsWith(searchTerms.slice(1).join(' ').toLowerCase())
          : true
      return firstNameMatch && lastNameMatch
    })

    setFilteredUsers(filtered)
  }, [findUser, users])

  const handleOnChange = (e: any) => {
    e.preventDefault()
    setFindUser(e.target.value)
    setShowBox(false) // Hide the Box when input changes
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    if (selectedUser) {
      setShowBox(true) // Set the state to show the Box
    } else {
      setShowBox(false) // Set the state to hide the Box
    }
  }

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredUsers([])
    }
  }

  const handleUserClick = (user: UserProps) => {
    setSelectedUser(user)
    setFindUser(user.firstName + ' ' + user.lastName)
    setShowBox(false) // Hide the Box when a user is selected from the dropdown
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const imageStyle = {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  }

  return (
    <FlexBetween
      backgroundColor={neutralLight}
      mt="0.7rem"
      borderRadius="9px"
      padding="0.1rem .8rem"
    >
      <InputBase
        placeholder="Search..."
        inputProps={{ style: { color: '#000' } }}
        value={findUser}
        onChange={handleOnChange}
      />
      <IconButton>
        <Search sx={{ color: '#464646' }} onClick={handleOnSubmit} />
      </IconButton>
      {filteredUsers.length > 0 && (
        <Paper
          ref={dropdownRef}
          elevation={3}
          style={{ position: 'absolute', zIndex: 1, top: '6rem' }}
        >
          <List>
            {filteredUsers.map((u) => (
              <ListItem key={u.firstName} onClick={() => handleUserClick(u)}>
                <ListItemText primary={u.firstName + ' ' + u.lastName} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {showBox && (
        <div className={showBox ? 'box active' : 'box'}>
          <div className="box-content">
            {selectedUser && (
              <>
                {selectedUser.firstName} {selectedUser.lastName} <br />
                {selectedUser.occupation} <br />
                {selectedUser.email} <br />
                {selectedUser && (
                  <UserImg
                    picPath={selectedUser.picPath}
                    size="200px"
                    borderRadius="none"
                  />
                )}
              </>
            )}
            <IconButton
              onClick={() => setShowBox(false)}
              className="close-wrapper"
            >
              <Close
                style={{ transition: 'all 0.3s ease' }}
                className="close-icon"
              />
            </IconButton>
          </div>
        </div>
      )}
    </FlexBetween>
  )
}

export default SearchFunc
