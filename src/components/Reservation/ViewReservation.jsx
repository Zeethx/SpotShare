import React from 'react'

function ViewReservation({parkingSpace}) {
    const { reservationId } = useParams();

  return (
    <div>
      <h1>Reservation Details</h1>
      <p>Reservation ID: {reservationId}</p>
    </div>
  )
}

export default ViewReservation