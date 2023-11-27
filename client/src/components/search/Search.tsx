import { useState, useEffect, useRef } from 'react'
import {
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material'
import { Search, Close } from '@mui/icons-material'
import FlexBetween from '../FlexBetween'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
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

interface SearchFuncProps extends BoxProps {
  closeDropdowns: () => void
}

const SearchFunc: React.FC<SearchFuncProps> = ({ closeDropdowns, active }) => {
  //const localhostProxy = 'http://localhost:3001/api/v1/users'
  const renderProxy = 'https://linkto-me.onrender.com/api/v1/users'
  const [findUser, setFindUser] = useState('')
  const myUser = useSelector((state: any) => state.user)
  const [users, setUsers] = useState<UserProps[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([])
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null)
  const [showBox, setShowBox] = useState(false)

  const theme = useTheme()
  const neutralLight = theme.palette.grey[200]

  useEffect(() => {
    axios
      .get(renderProxy, {
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

  useEffect(() => {
    // Ajusta la animación cuando cambia el estado de showBox
    const box = document.querySelector('.box') as HTMLDivElement
    if (box) {
      box.style.animation = showBox
        ? 'slide-in 1s ease-in-out forwards'
        : 'slide-out 1s ease-in-out forwards'
    }
  }, [showBox])

  const handleOnChange = (e: any) => {
    e.preventDefault()
    setFindUser(e.target.value)
    setShowBox(false)
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    if (selectedUser) {
      setShowBox(true)
    } else {
      setShowBox(false)
      closeDropdowns()
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

  return (
    <FlexBetween
      backgroundColor={neutralLight}
      mt="0.7rem"
      borderRadius="9px"
      padding="0.1rem .8rem"
    >
      <InputBase
        placeholder="Search a friend..."
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
                {selectedUser && (
                  <div className="box-img">
                    <div
                      style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-5rem',
                        borderRadius: '50%',
                        overflow: 'hidden',
                      }}
                    >
                      <UserImg
                        picPath={selectedUser.picPath}
                        size="380px"
                        borderRadius="50%"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'relative',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))`,
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="user-info-wrapper">
                  <p>
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>{' '}
                  <br />
                  <p>{selectedUser.occupation} </p>
                  <br />
                  <p>{selectedUser.email} </p>
                  <br />
                </div>
              </>
            )}

            <Close
              onClick={() => setShowBox(false)}
              style={{ transition: 'all 0.3s ease' }}
              className="close-icon"
            />
          </div>
        </div>
      )}
    </FlexBetween>
  )
}

export default SearchFunc
