import React from 'react'
import ModalContent from './modal/ModalContent'
import ModalBody from './modal/ModalBody'
import InputFields from './InputFields'
import ModalContainer from './modal/ModalContainer'
import ModalHeader from './modal/ModalHeader'
import ModalTweetButton from './modal/ModalTweetButton'
import ModalParent from './modal/ModalParent'

const TweetModal = () => {
  return (

   <ModalParent>
    <ModalTweetButton />
    <ModalContainer>
            <ModalContent >
                <ModalHeader />
                <ModalBody >
                    <InputFields />
                </ModalBody>
            </ModalContent>
    </ModalContainer>
   </ModalParent>
  )
}

export default TweetModal