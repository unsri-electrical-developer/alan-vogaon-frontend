export const getProfile = (profile, name) => {
    return profile
        ? profile
        : `https://ui-avatars.com/api/?name=${name}&background=FCF6EC&color=F09856`;
};
