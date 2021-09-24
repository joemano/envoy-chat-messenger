import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const TeamChannelPreview = ({ channel, type, setToggleContainer, setIsCreating, setIsEditing, setActiveChannel }) => {
  // renamed to active channel to avoid same name conflict
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # { channel?.data?.name || channel?.data?.id }
    </p>
  );

  const DirectPreview = () => {
    // retrieve every member except yourself
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={ members[0]?.user?.image }
          name={ members[0]?.user?.fullName }
          size={ 24 }
        />
        <p>{ members[0]?.user?.fullName || members[0]?.user?.id }</p>
      </div>
    )
  }

  return (
    <div className={ 
        channel?.id === activeChannel 
        ? 'channel-preview__wrapper__selected' 
        : 'channel-preview__wrapper' 
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);

        if(setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      { type === 'team' ? <ChannelPreview /> : <DirectPreview /> }
    </div>
  )
}

export default TeamChannelPreview
