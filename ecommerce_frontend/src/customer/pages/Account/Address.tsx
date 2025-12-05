// import React from 'react'
// import UserAddressCard from './UserAddressCard'

// const Address = () => {
//   return (
//     <div className='space-y-3'>
//         {[1,1,1,1].map((item)=><UserAddressCard/>)}
//     </div>
//   )
// }

// export default Address

// import React, { useEffect, useState } from 'react'
// import UserAddressCard from './UserAddressCard'
// import axios from 'axios'

// const Address = () => {
//   const [addresses, setAddresses] = useState<any[]>([])

//   const fetchAddresses = async () => {
//     try {
//       const token = localStorage.getItem('token')
//       const res = await axios.get('http://localhost:8080/api/address', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       setAddresses(res.data)
//     } catch (err) {
//       console.error("Failed to fetch addresses", err)
//     }
//   }

//   useEffect(() => {
//     fetchAddresses()

//     // refresh when a new address is added
//     const handler = () => fetchAddresses()
//     window.addEventListener("addressAdded", handler)

//     return () => window.removeEventListener("addressAdded", handler)
//   }, [])

//   return (
//     <div className='space-y-3'>
//       {addresses.length === 0 && (
//         <p className='text-gray-500'>No saved addresses yet.</p>
//       )}

//       {addresses.map((addr) => (
//         <UserAddressCard key={addr.id || addr.Id} address={addr} />
//       ))}
//     </div>
//   )
// }

// export default Address












import React, { useEffect, useState } from 'react'
import UserAddressCard from './UserAddressCard'
import axios from 'axios'

const Address = () => {
  const [addresses, setAddresses] = useState<any[]>([])

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8080/api/address', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAddresses(res.data)
    } catch (err) {
      console.error("Failed to fetch addresses", err)
    }
  }

  useEffect(() => {
    fetchAddresses()

    const handler = () => fetchAddresses()
    window.addEventListener("addressAdded", handler)

    return () => window.removeEventListener("addressAdded", handler)
  }, [])

  return (
    <div className='space-y-3'>
      {addresses.length === 0 && (
        <p className='text-gray-500'>No saved addresses yet.</p>
      )}

      {addresses.map((addr, index) => (
        <UserAddressCard 
          key={index}
          index={index}
          address={addr} 
        />
      ))}
    </div>
  )
}

export default Address

