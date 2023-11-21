import { useState } from 'react'
import { MagicExit, MagicMotion } from 'react-magic-motion'
import { Notifications } from '@mui/icons-material'
import { FaBell } from 'react-icons/fa'

function Accordion() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MagicMotion>
      <div
        style={{
          padding: '1rem',
          borderRadius: 12,
          margin: '1rem 0',
          overflow: 'hidden',
        }}
      >
        Hola
        <MagicExit
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { y: { type: 'spring', damping: 12, stiffness: 120 } },
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: {
              opacity: { duration: 0.175 },
              y: { duration: 0.25 },
            },
          }}
        >
          {isOpen && (
            <div
              style={{
                gap: '1rem',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
                position: 'absolute',
              }}
            >
              <div>Lorem ipsum</div>
            </div>
          )}
        </MagicExit>
      </div>
    </MagicMotion>
  )
}

export default Accordion
