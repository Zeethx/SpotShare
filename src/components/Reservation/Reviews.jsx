import React, {useState, useEffect} from 'react'
import api from '../../conf/axiosConfig'

function Reviews({spotId}) {
 const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/review/${spotId}/all`)
                setReviews(response.data.data)
            } catch (error) {
                console.error("Error fetching reviews:", error)
            }
        }
        fetchReviews()
    }, [spotId])

  return (
    <div>

    </div>
  )
}

export default Reviews