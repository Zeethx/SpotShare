import React from 'react'
import { GetStarted} from '../../components'
import { Helmet } from 'react-helmet'

function GetStartedPage() {
  return (
        <>
            <Helmet>
                <title>SpotShare | Share your Space</title>
                <meta name="description" content="Get started with SpotShare and start renting out your parking spaces or find parking spaces to rent." />
                <meta name="keywords" content="get started, SpotShare, parking spaces, rent parking" />
            </Helmet>
          <GetStarted />
        </>
        
  )
}

export default GetStartedPage