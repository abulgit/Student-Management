import React from 'react';

const ProfileImage = ({  }) => {
    const imgurl = "https://placehold.co/600x400";
  return (
    <div className="rounded-full overflow-hidden h-24 w-24 mx-auto">
      <img src={imgurl} alt="Profile" className="h-full w-full object-cover" />
    </div>
  );
};

export default ProfileImage;
