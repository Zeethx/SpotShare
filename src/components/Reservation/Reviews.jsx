import React, {useState, useEffect} from 'react'
import api from '../../conf/axiosConfig'

function Reviews({spotId}) {
 const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/review/${spotId}/all`)
                setReviews(response.data.data)
                console.log("Reviews:", response.data.data)
            } catch (error) {
                console.error("Error fetching reviews:", error)
            }
        }
        fetchReviews()
    }, [spotId])

  return (
    // TODO: Implement the UI for the reviews section
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b-2 border-black">
        Reviews
      </h2>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between border-b-2 border-gray-200 py-4"
            >
              <div className="flex items-center">
                <img
                  src={review.user.profilePhoto}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-semibold">{review.user.firstName} {review.user.lastName}</p>
                  <p className="text-gray-500">{review.createdAt}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p>{review.comment}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-6h4v-2h-4v2z" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-gray-500 ml-2">{review.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  )
}

export default Reviews